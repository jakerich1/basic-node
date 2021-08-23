const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
  const myURL = new URL(req.url, 'https://localhost:3000');
  returnPage(myURL.pathname, res)
})

const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
  if (err) throw err;
  return data;
});

const returnPage = (path, res) => {
  let cleansedPath = path.replace('/', '')
  if(cleansedPath === ''){
    cleansedPath = 'index.html';
  }

  fs.readFile(cleansedPath, 'utf8', function(err, data){ 
    res.setHeader('Content-Type', 'text/html')

    if(err){
      res.statusCode = 404
      res.write(page404)    
    }else if(data){
      res.statusCode = 200
      res.write(data)
    }

    res.end()
  })
}

server.listen(3000, () => {
  console.log('Server started! --- listening on port 3000')
});