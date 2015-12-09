var express = require('express');
var app = express();

app.use('/', express.static(__dirname));

app.listen(1337);
console.log('1337 is the magic port!');