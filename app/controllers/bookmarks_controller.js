const express = require('express');
const router = express.Router();

//install mongodb
const { Bookmark } = require('../models/bookmark');


router.get("/", function(req,res){
    Bookmark.find().then(function(bookmarks){
        res.send(bookmarks);
    }).catch(function(err){
        res.send(err);
    })
})

router.get("/tags/:name", function(req,res){
    let name = req.params.name;
    Bookmark.find({ tags: name}).then(function(bookmarks){
        res.send(bookmarks);
    }).catch(function(err){
        res.send(err)
    })
})

router.get("/tags/", function(req,res){
    let allTags = req.query.names;
    let tagsArray = allTags.split(',');
    Bookmark.find({tags:{$in: tagsArray}}).then(function(bookmarks){
        res.send(bookmarks);
    }).catch(function(err){
        res.send(err);
    })
})

router.get("/:id", function(req,res){
    let id = req.params.id
    Bookmark.findById(id).then(function(bookmark){
        res.send(bookmark)
    }).catch(function(err){
        res.send(err)
    })
})

router.post("/", function(req,res){
    let body = req.body;
    let book = new Bookmark(body);
    book.save().then(function(bookmarks){
        res.send(bookmarks)
    }).catch(function(err){
        res.send(err)
    })
});

router.put("/:id", function(req,res){
    let body = req.body
    let id = req.params.id;
    Bookmark.findByIdAndUpdate(id, { $set:body }, { new:true }).then(function(bookmark){
        res.send(bookmark)
    }).catch(function(err){
        res.send(err)
    })
})

router.delete("/:id", function(req,res){
    let id = req.params.id
    Bookmark.findByIdAndDelete(id).then(function(bookmark){
        res.send({
            notice: "Successfully the record has been deleted"
        })
    }).catch(function(err){
        res.send(err);
    })
})



module.exports = {
    bookmarksController: router
}

