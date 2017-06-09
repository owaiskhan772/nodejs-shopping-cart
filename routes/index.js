var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs){
    var productChunk = []; var chunkSize = 3;
    for(var i=0; i < docs.length; i += chunkSize){
      productChunk.push(docs.slice(i, i + chunkSize));
    }
    console.log(productChunk);
    res.render('shop/index', { title: 'Shopping Cart', products: productChunk});
  });
});

module.exports = router;
