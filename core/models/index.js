/**
 * Created by liuxing on 14-9-23.
 */
var db = require('./../database')();
var Post = require('./Post'),
    Rss = require('./Rss');

module.exports = {
    Post:   Post,
    Rss:    Rss
};