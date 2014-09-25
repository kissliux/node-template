var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res) {
  res.send('respond with a resource');
});
router.get('/', function(req, res) {
    var data = { title: 'Expressaaa' };
    res.render('index', data);
});

module.exports = router;
