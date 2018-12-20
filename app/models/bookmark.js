const mongoose = require('mongoose');
const sh = require('shorthash');
const validator = require('validator');


const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    originalUrl:{
        type:String,
        unique:true,
        required:true,
        validate:{
            validator:function(value){
                return validator.isURL(value)
            }, 
            message: function(){
                return 'invalid URL'
            }
        }
    },
    tags:{
        type: [String]
    },
    hashedUrl:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


bookmarkSchema.pre('save', function(next){
    let bookmark = this;
        console.log(bookmark);
        let shortedUrl = sh.unique(bookmark.originalUrl)
        bookmark.hashedUrl = shortedUrl
        next();    
})



const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = {
    Bookmark
}
