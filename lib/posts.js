import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { serialize } from 'next-mdx-remote/serialize';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.(md|mdx)$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  const mdPath = path.join(postsDirectory, `${id}.md`);
  const mdxPath = path.join(postsDirectory, `${id}.mdx`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const isMdx = fullPath.endsWith('.mdx');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  let contentHtml = null;
  let mdxSource = null;
  if (isMdx) {
    mdxSource = await serialize(matterResult.content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
      scope: matterResult.data,
    });
  } else {
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html)
      .process(matterResult.content);
    contentHtml = processedContent.toString();
  }

  // Combine the data with the id and contentHtml
  return {
    id,
    isMdx,
    contentHtml,
    mdxSource,
    ...matterResult.data,
  };
}
