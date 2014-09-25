/**
 * Created by liuxing on 14-9-23.
 */
var     Rss = require('../../core/models').Rss;
function findAll(){
    Rss.find({}).exec(function(err,result){
        console.log(result);
    });
}
findAll();