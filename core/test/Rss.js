/**
 * Created by liuxing on 14-9-23.
 */
var Rss = require('../models').Rss;

var rss = new Rss({

    title:  '笔戈科技',  //url 名称
    description: '简单、有趣、有价值',   //描述
    link:  String,
    xmlUrl:  String,
    type:String,
    author:String,
    language:String,
    favicon:String,
    copyright:String,
    //date:

});
