var pg = require('pg');
var constring = 'tcp://node@localhost/ledenadmin';

var route = function (req, res) {
  console.log(req.method + ": " + req.url);
  if (req.url == '/leden') {
    if (req.method == "GET") {
      var data = {};
      pg.connect(constring, function (err, client) {
        client.query('select * from members', function (err, result) {
          data.members = result.rows;
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(data));
        });
      });
    } else if (req.method == "POST") {
      console.log('leden post');
      req.on('data', function(chunk) {
        console.log(chunk);
      });
      req.on('end', function() {
        console.log('received end');
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end("bla");
      });
      req.on('close', function() {
        console.log('connection closed');
      });
    }
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('File not found.');
  }
};

module.exports.route = route;
