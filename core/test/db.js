/**
 * Created by liuxing on 14-7-31.
 */
var db = require('./../database')();
var Kitten = require('../models/Kitten.js');
var kit = new Kitten({name: 'Shane'});
kit.save(function(err,data){
    if (err) return console.error(err);
    data.speak();

    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens)
    })
});