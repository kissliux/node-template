/**
 * Created by liuxing on 14-9-22.
 */
var Promise         = require('bluebird'),
    FeedParser      = require('feedparser'),
    _               = require('lodash'),
    //iconv           = require('iconv-lite'),
    //BufferHelper    = require('bufferhelper'),
    FeedParser      = require('feedparser')
    request         = require('request'),
    postOptions = ['title','description','summary','date','link',
        'guid','author','comments','origlink','image','source','categories','enclosures'],
    siteInfoOption = ['title','description','date','link','xmlurl','author','favicon','copyright','generator','image'];
function fetchRSS(url,options) {
    options = options || postOptions;

    return new Promise(function(resolve,reject) {
        var posts;
        // Define our streams
        var req = request(url, {timeout: 10000, pool: false});
        req.setMaxListeners(50);
        // Some feeds do not response without user-agent and accept headers.
        req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
            .setHeader('accept', 'text/html,application/xhtml+xml');

        var feedparser = new FeedParser();
        // Define our handlers
        req.on('error', reject);
        req.on('response', function(res) {
            var stream = this;
            posts = [];
            if (res.statusCode !== 200){ return this.emit('error', new Error('Bad status code'));}
            //charset = getParams(res.headers['content-type'] || '').charset;
            stream.pipe(feedparser);
        });
        feedparser.on('error', reject);
        feedparser.on('end', function(err) {
            if(err){
                reject(err);
            }
            resolve(posts);
        });
        feedparser.on('readable', function() {
            var post;
            while (post = this.read()) {
                var post = _.pick(post,options);
                posts.push(post);//添加到数组
            }
        });
    });
}
function fetchSiteInfo(url,options) {
    options = options || siteInfoOption;

    return new Promise(function(resolve,reject) {
        var rss;
        // Define our streams
        var req = request(url, {timeout: 10000, pool: false});
        req.setMaxListeners(50);
        // Some feeds do not response without user-agent and accept headers.
        req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
            .setHeader('accept', 'text/html,application/xhtml+xml');

        var feedparser = new FeedParser();
        // Define our handlers
        req.on('error', reject);
        req.on('response', function(res) {
            var stream = this;
            if (res.statusCode !== 200){ return this.emit('error', new Error('Bad status code'));}
            //charset = getParams(res.headers['content-type'] || '').charset;
            stream.pipe(feedparser);
        });
        feedparser.on('error', reject);
        feedparser.on('end', function(err) {
            if(err){
                reject(err);
            }
            resolve(rss);
        });
        feedparser.on('readable', function() {
            var post;
            if (post = this.read()) {
                rss = _.pick(post.meta,options);
                resolve(rss);
            }
        });
    });
}
var url = 'http://www.bigertech.com/rss';

/*fetchRSS(url).then(function(posts){
    console.log(posts[0]);
}).catch(function(e) {
    console.error("Exception " + e.stack);
});*/
module.exports = {
    fetchRSS     :  fetchRSS,
    fetchSiteInfo:  fetchSiteInfo
}