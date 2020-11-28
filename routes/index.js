var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Friends' });
});
router.get('/add-friend', function(request, response, next){
  response.render('add-friend')
});

module.exports = router;
