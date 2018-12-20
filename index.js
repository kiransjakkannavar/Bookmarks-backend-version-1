const express = require('express');
const app = express();

const { mongoose } = require('./config/db')
const { bookmarksController } = require('./app/controllers/bookmarks_controller');

const port = 3001;

app.use(express.json());

app.get('/', function(req,res){
    res.send('Welcome to Bookmark Site')
})


app.use('/bookmarks', bookmarksController );

const { Bookmark } = require("./app/models/bookmark");

app.get("/:hash", function(req,res){
    let hashedUrl = req.params.hash;
    Bookmark.findOne({hashedUrl: hashedUrl}).then(function(Bookmark){
        res.redirect(Bookmark.originalUrl);
    }).catch(function(err){
        console.log(err)
    })
})


app.listen(port, function(){
    console.log('listening to the port', port)
})