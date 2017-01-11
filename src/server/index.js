const express = require('express');
const api = require('./api.js');
const config = require('./config.js');

var app = express();

app.use('/notes',api);

app.listen(config.port,function(){
	console.log("je suis sur localhost");
});

