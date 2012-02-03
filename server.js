var http = require('http');
var fs = require('fs');
var router = require('./router');

function handleRequest(req, res) {
  req.pause();
  var url = req.url;
  if (url == '/') {
    url = '/index.html';
  }
  var filePath = '.' + url;
  fs.exists(filePath, function (exists) {
    req.resume();
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
      router.route(req, res);
    }
  });
}


http.createServer(function (req, res) {
  handleRequest(req, res);
}).listen(3000, "localhost");

console.log("server running at http://localhost:3000");
