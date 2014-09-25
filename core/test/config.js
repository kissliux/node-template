/**
 * Created by liuxing on 14-7-30.
 */
var assert = require("assert");
var config = require('./../config');

describe('Config', function(){
    describe('#config()', function(){
        it('print all config', function(){
            //console.log(config());
        })
    });

    describe('#DB()', function(){
        it('connect to db', function(){
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
        })
    });

})