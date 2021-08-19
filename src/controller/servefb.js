const express = require('express');
const app = express;
const port = 3000;
const ofirebase = require('./setDate');

app.listen(port, function(err, data) {
    if(err){
        console.log(err);
    }else{
        console.log('conected')
    }
});

app.post("/savedata/", function(req, res){
    ofirebase.saveData(req, body, function(err, data){
        res.send(data);
        return res;
    });
});