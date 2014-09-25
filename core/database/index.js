/**
 * Created by liuxing on 14-7-30.
 */
var mongoose = require('mongoose'),
    config   = require('./../config'),
    db = config().database.connection;
   options = {
    db: { native_parser: true },
    replset: { rs_name: 'rssReplicaSet'},
    server: {
        minPoolSize:db.minPoolSize,
        maxPoolSize: db.maxPoolSize
    },
    user: db.user,
    pass: db.password
   };
function getURI(){
    var uri = 'mongodb://';
    uri += db.host;
    uri += ':'+db.port;
    uri += '/'+db.database;
    return uri;
}
var db = mongoose.connect(getURI(), options).connection;
function init(){
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function callback () {
        console.log("mongodb is ready!");
    });
}
module.exports = init;