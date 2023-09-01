const express = require('express');
const IndexRoute = express.Router();

/* GET home page. */
IndexRoute.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Estado Materias', year: new Date().getUTCFullYear() });
});

module.exports = IndexRoute;