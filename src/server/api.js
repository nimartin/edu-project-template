const express = require('express');
const api = express.Router();
const config = require('./config.js');
const FindFinder  = require('node-find-files');

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


module.exports = api;
