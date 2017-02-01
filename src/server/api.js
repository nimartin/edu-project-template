const express = require('express');
const api = express.Router();
const config = require('./config.js');
const FindFinder  = require('node-find-files');

const fs = require('fs');
const uuid = require('node-uuid');


api.get('/',function(req,res){
	
 	var content = [];
    var files = [];
    var finder = new FindFinder({
        rootFolder : config.data,
        filterFunction: function () {
                return true;
        }
    });

    finder.on('match', function(strPath, stat) {
        //console.log(strPath + " - " + stat.mtime);
        files.push(strPath);
    }).on('complete', function() {
        console.log(files.length);
        if(files.length == 0) return res.status(204).send('No notes found');
        
        for(file of files) {
            content.push(JSON.parse(fs.readFileSync(file)))
        };

        return res.status(200).send(content);
    });

    finder.startSearch();
	
});

api.get('/:id',function(req,res){
	var file = config.data+"/"+req.params.id+".json";
	fs.exists(file, (exists) => {
		if(exists) {
			res.status(200).sendFile(file);	
		}
		else{
			res.sendStatus(404);
		}
	});
	
});

api.post('/',function(req,res){
	var note = req.body;
	note.id = uuid.v4();
	note.date = parseInt(Date.now() / 1000);
	fs.writeFile(config.data+"/"+note.id+".json",JSON.stringify(note), function(err) {
		if(err) return console.log("err");
	});
	res.status(201).send(JSON.stringify({id: note.id}));
});

api.delete('/:id',function(req,res){
	var file = config.data+"/"+req.params.id+".json";
	fs.unlink(file, (err) => {
		  if (err) {
		  		res.sendStatus(404, 'Page Not Found');
		  };
		  console.log('Supression effectué');
		  res.sendStatus(204);
});
	
});

module.exports = api;
