import http from 'http';
import { readFile } from 'fs/promises';
import { createReadStream, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const notFoundPage = `<html lang="ru"><head><meta charset="utf-8" /><title>Страница не найдена</title><style>body{font-family:system-ui;background:#f4f6fb;margin:0;display:grid;place-items:center;height:100vh;color:#1a1c3b;}article{background:white;padding:2rem 3rem;border-radius:18px;box-shadow:0 20px 40px rgba(26,28,59,0.15);text-align:center;}h1{margin:0 0 1rem;font-size:2rem;color:#d21f3f;}a{color:#1f2a5c;text-decoration:none;font-weight:600;}a:hover{color:#d21f3f;}</style></head><body><article><h1>404</h1><p>Такой страницы нет в демо LexiQuest.</p><p><a href="/">Вернуться на главную</a></p></article></body></html>`;

function resolveFile(url) {
  const cleanPath = url.split('?')[0];
  let filePath = path.join(publicDir, cleanPath);

  if (!path.extname(filePath)) {
    filePath = path.join(filePath, 'index.html');
  }

  if (cleanPath === '/' || cleanPath === '') {
    filePath = path.join(publicDir, 'index.html');
  }

  return filePath;
}

const server = http.createServer(async (req, res) => {
  const filePath = resolveFile(req.url ?? '/');
  const ext = path.extname(filePath).toLowerCase();

  try {
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      const indexFile = path.join(filePath, 'index.html');
      const indexStats = statSync(indexFile);
      res.writeHead(200, {
        'Content-Type': mimeTypes['.html'],
        'Content-Length': indexStats.size
      });
      createReadStream(indexFile).pipe(res);
      return;
    }

    const stream = createReadStream(filePath);
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] ?? 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-store' : 'public, max-age=3600'
    });
    stream.pipe(res);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Server error:', error);
    }

    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(notFoundPage);
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`LexiQuest demo запущен на http://localhost:${PORT}`);
});
