var http = require('http');
var fs = require('fs');
var path = require('path');

function handleRequest(req, res) {
  var url = req.url;
  if (url == '/') {
    url = '/index.html';
  }
  var filePath = '.' + url;
  path.exists(filePath, function (exists) {
    if (exists) {
      fs.readFile(filePath, function (err, data) {
        if (err) {
          res.writeHead(500);
          res.end();
        }
        console.log("200: " + url);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    } else {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end('File not found.');
    }
  });
}

http.createServer(function (req, res) {
  handleRequest(req, res);
}).listen(3000, "localhost");

console.log("server running at http://localhost:3000");
