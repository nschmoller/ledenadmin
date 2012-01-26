var pg = require('pg');
var constring = 'tcp://node@localhost/ledenadmin';

var route = function (req, res) {
  if (req.url == '/leden') {
    var data = {};
    pg.connect(constring, function (err, client) {
      client.query('select * from members', function (err, result) {
        data.members = result.rows;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
      });
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('File not found.');
  }
};

module.exports.route = route;
