const express = require('express');
const api = express.Router();
const config = require('./config.js');
const FindFinder  = require('node-find-files');

const fs = require('fs');
const uuid = require('node-uuid');


api.get('/',function(req,res){
	var finder = new FindFinder({
		rootFolder : config.data
	});
	var files = [];
	finder.on("match", function(strPath, stat) {
	    	files.push(strPath);
	}).on('complete',function(){
		if(files.length == 0){
			console.log('rien');
			return res.sendStatus(204);
				
		}	
	}).startSearch();
	
});

api.get('/:id',function(req,res){
	fs.readFile(config.data+"/"+req.params.id+".json", function(err,data) {
		if(err) return console.log(err);
		console.log(data);
	});
  	res.sendStatus(200);
});

api.post('/',function(req,res){
	var note = req.body;
	note.id = uuid.v4();
	note.date = Date.now() / 1000;
	console.log(note);
	fs.writeFile(config.data+"/"+note.id+".json",JSON.stringify(note), function(err) {
		if(err) return console.log("err");
	});
	res.status(201).send(JSON.stringify({id: note.id}));
});

module.exports = api;
