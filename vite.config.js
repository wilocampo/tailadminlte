import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import fs from 'fs';

// Auto-discover all HTML pages in src/pages/
function getPageEntries(dir, base = '') {
  const entries = {};
  if (!fs.existsSync(dir)) return entries;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const rel = base ? `${base}/${item.name}` : item.name;
    if (item.isDirectory()) {
      Object.assign(entries, getPageEntries(`${dir}/${item.name}`, rel));
    } else if (item.name.endsWith('.html')) {
      const key = rel.replace('.html', '');
      entries[key] = resolve(dir, item.name);
    }
  }
  return entries;
}

const pageEntries = getPageEntries(resolve(__dirname, 'src/pages'));

export default defineConfig({
  root: 'src',
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: pageEntries,
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@css': resolve(__dirname, 'src/css'),
      '@js': resolve(__dirname, 'src/js'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  plugins: [
    tailwindcss(),
    handlebars({
      partialDirectory: [
        resolve(__dirname, 'src/partials'),
        resolve(__dirname, 'src/layouts'),
      ],
      reloadOnPartialChange: true,
      helpers: {
        eq: (a, b) => a === b,
        neq: (a, b) => a !== b,
        or: (a, b) => a || b,
        and: (a, b) => a && b,
        json: (context) => JSON.stringify(context),
        includes: (arr, val) => arr && arr.includes(val),
        startsWith: (str, prefix) => str && str.startsWith(prefix),
      },
    }),
  ],
});
