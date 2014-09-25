/**
 * Created by liuxing on 14-8-24.
 */
var rssUtil         = require('../spide/rssUtil');
var rssUrl = 'http://news.163.com/special/00011K6L/rss_newstop.xml';
rssUtil.fetchRSS(rssUrl).then(function(posts){

    console.log(posts[0]);
});