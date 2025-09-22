## Инструкция по разработке

Папка `posts` хранит в себе основной контент в виде `.md` и `.mdx` файлов. Файлы формата `.mdx` поддерживают расширенную кастомизацию с использованием HTML + CSS.

Для разработки кастомных компонентов нужно прописать стили в `styles/global.css` и применить их в `.mdx` файле:

```globals.css
.card {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}
```

```article.mdx
<article className="card">❓ Всего на билеты у меня ушло 100 тыс</article>
```

