var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    title :{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref : "Users",
    },
    imgUrl:{
        type:String,
        required:true,
    },
});
module.exports = mongoose.model('Posts',PostSchema);