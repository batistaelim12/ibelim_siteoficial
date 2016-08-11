var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.getConnection(function (err, connection) {
    connection.query('SELECT * FROM ConteudoSite', function(err, result) {
      res.render('index',{conteudo: result[0]});
    });
  });
});


router.post('/contato', function (req, res) {
  res.send('POST request to homepage');
});

module.exports = router;
