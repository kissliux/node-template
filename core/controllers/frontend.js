/**
 * Created by liuxing on 14-9-25.
 */
var controller ;
controller = {
    'homepage' :function(req,res,next){
        var data = { title: 'Expressaaa hbs' };
        res.render('index', data);
    }
};

module.exports = controller;