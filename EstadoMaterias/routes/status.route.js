'use strict'

const express = require('express');
let StatusRoute = express.Router();

const {
    StudentStatus
} = require('../controllers/status.controller');

StatusRoute.get('/mystatus', StudentStatus);

module.exports = StatusRoute;