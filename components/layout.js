import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Керес Блог';
export const siteTitle = 'Керес Блог';
const siteUrl = 'https://keresm-blog.vercel.app';
const defaultDescription = 'Blog of Keresm!';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <link rel="canonical" href={`${siteUrl}/`} />
        <link rel="icon" href="/logo.jpg" />
        <meta name="title" content={siteTitle} />
        <meta name="description" content={defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:image" content={`${siteUrl}/logo.jpg`} />
        <meta property="og:image:alt" content={`${siteTitle} logo`} />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={`${siteUrl}/logo.jpg`} />
        <meta name="twitter:url" content={`${siteUrl}/`} />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Назад</Link>
        </div>
      )}
    </div>
  );
}
