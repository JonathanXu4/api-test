var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Received a request to get all friends');
});
router.post('/', function(request, response, next){
  response.send('Received a request to insert into friends')
})
module.exports = router;
