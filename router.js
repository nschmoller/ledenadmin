var pg = require('pg');
var constring = 'tcp://node@localhost/ledenadmin';

var handleError = function(err, req, res) {
  if (err) {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end();
  }
};


var route = function (req, res) {
  console.log(req.method + ": " + req.url);
  if (req.url == '/leden') {
    if (req.method == "GET") {
      var data = {};
      pg.connect(constring, function (err, client) {
        if (err) {
          handleError(err, res, req);
        }
        client.query('select * from members', function (err, result) {
          data.members = result.rows;
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(data));
        });
      });
    } else if (req.method == "POST") {
      var data = "";
      req.on('data', function(chunk) {
        data += chunk;
      });
      req.on('end', function() {
        pg.connect(constring, function(err, client) {
          var newMember = JSON.parse(data);
          client.query("insert into members (name) values ('" + newMember.name + "')");
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({status: 'ok'}));
        });
      });
    }
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('File not found.');
  }
};

module.exports.route = route;
