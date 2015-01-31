var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/movie', function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    title: "mib",
    price: 9900
  }));
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
