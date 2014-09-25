/**
 * Created by liu.xing on 14-2-20.
 */
var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
    title:{type:String,unique:true},
    link :String,
    description :String,
    summary :String,
    context:String,
    comments:String,
    origlink:String,
    image:String,
    date :{
        type:Date,
        'default':Date.now
    },
    source :String,
    categories : Array,
    enclosures:Array
});
module.exports = PostSchema;