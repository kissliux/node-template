/**
 * Created by liuxing on 14-7-30.
 */

/**
 * rss site description
 *
 * @type {exports}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rssSchema = new Schema({
    title: {type:String,unique:true},  //url 名称
    description: String,   //描述
    link:  String,
    xmlUrl:  String,
    type:String,
    author:String,
    language:String,
    favicon:String,
    copyright:String,
    generator:String,
    image:{
        url: String
    },
    date: { type: Date, default: Date.now },

})

module.exports  = mongoose.model('Rss', rssSchema);
