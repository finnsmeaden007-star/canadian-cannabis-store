import { mkdir, copyFile, cp } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const output = new URL('./public/', import.meta.url);
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'styles.css', 'script.js', 'config.js', 'article.css', 'blog-cannabis-101.html', 'blog-reading-labels.html', 'blog-mindful-night.html']) {
  await copyFile(new URL(name, root), new URL(name, output));
}
await cp(new URL('assets/', root), new URL('assets/', output), { recursive: true });
