/**
 * Created by liuxing on 14-9-23.
 */
var Promise = require('bluebird'),
    Rss = require('../../core/models').Rss,
    uitl = require('../../core/service/util');
var urls = ['http://www.pingwest.com/feed/','http://www.bigertech.com/rss'];

function testFetchRss(){
    Promise.reduce(urls, function(total, url) {
        console.log(total.length);
        console.log(url);
        urls.push('http://www.ifanr.com/feed');
        return uitl.fetchRSS(url).then(function(posts) {
            total.push.apply(total,posts);
            return  total;
        });
    }, []).then(function(total) {
        console.log(total[0]);
        console.log(total[total.length-1]);
    });
}

function fetchSiteInfo(){
    uitl.fetchSiteInfo(urls[1]).then(function(data){
       console.log(data);
        var rss = new Rss(data);
        rss.save(function(err,data){
            console.log(data);
        });
    });
}

fetchSiteInfo();