var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use('/submitscore', jsonParser, function(req, res) {
  console.log(req.body);
  var obj;
  fs.readFile('rankings.json', 'utf8', function(err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    obj.leaders.push(req.body);
    
    //Sort the rankings
    obj.leaders.sort(function (a,b) {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    });

    obj = JSON.stringify(obj, null, 2);
    fs.writeFile(__dirname + '/rankings.json', obj);
  });
  res.end();
});

app.use('/', express.static(__dirname));

app.listen(8080, '0.0.0.0');
console.log('1337 is the magic port!');