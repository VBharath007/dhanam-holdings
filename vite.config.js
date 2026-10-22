import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

function getHtmlEntries(dir, baseDir = dir) {
  const entries = {};
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = resolve(dir, file.name);
    if (file.isDirectory()) {
      Object.assign(entries, getHtmlEntries(fullPath, baseDir));
    } else if (file.name.endsWith('.html')) {
      const relPath = fullPath.slice(baseDir.length + 1).replace(/\\/g, '/');
      const key = relPath.replace(/\/index\.html$/, '').replace(/\.html$/, '') || 'main';
      entries[key] = fullPath;
    }
  }
  return entries;
}

const srcDir = resolve(__dirname, 'src');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = resolve(src, entry.name);
    const destPath = resolve(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      const ext = entry.name.split('.').pop().toLowerCase();
      if (!['js', 'css', 'html'].includes(ext) || entry.name.startsWith('.')) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

function copySrcAssetsPlugin() {
  return {
    name: 'copy-src-assets',
    closeBundle() {
      copyDirRecursive(srcDir, resolve(__dirname, 'dist'));
    },
  };
}

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  plugins: [copySrcAssetsPlugin()],
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlEntries(srcDir),
    },
  },
});

