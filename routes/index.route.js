'use strict'

const express = require('express');
let IndexRoute = express.Router();

IndexRoute.get('/', (res, req) => {
    res.sendFile('../public/index.html');
});

module.exports = IndexRoute;