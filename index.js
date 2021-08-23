import { createServer } from 'http';
import { readFileSync, readFile } from 'fs';

const page404 = readFileSync('404.html', 'utf-8', (err, data) => {
  if (err) throw err;
  return data;
});

const returnPage = (path, res) => {
  let cleansedPath = path.replace('/', '');
  if (cleansedPath === '') {
    cleansedPath = 'index.html';
  }

  readFile(cleansedPath, 'utf8', (err, data) => {
    res.setHeader('Content-Type', 'text/html');

    if (err) {
      res.statusCode = 404;
      res.write(page404);
    } else if (data) {
      res.statusCode = 200;
      res.write(data);
    }

    res.end();
  });
};

createServer((req, res) => {
  const myURL = new URL(req.url, 'https://localhost:3000');
  returnPage(myURL.pathname, res);
});
