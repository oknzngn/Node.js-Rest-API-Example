var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
    res.send('GET ile arabalar isteği yapıldı.');
});
router.post('/', function(req,res){
    res.send('POST ile arabalar isteği yapıldı.');
});

module.exports = router;
