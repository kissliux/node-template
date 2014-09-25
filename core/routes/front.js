/**
 * Created by liuxing on 14-9-25.
 */
var frontendRoutes,
    express =   require('express'),
    frontend    = require('../controllers/frontend'),
    utils       = require('../utils/index');

frontendRoutes = function(){
    var router = express.Router();
    router.get('/feed/', function redirect(req, res) {
        /*jshint unused:true*/
        res.set({'Cache-Control': 'public, max-age=' + utils.ONE_YEAR_S});
        res.redirect(301, '/rss/');
    });


    router.get('/', frontend.homepage);
    //router.get('*', frontend.single);

    return router;
};
module.exports = frontendRoutes;