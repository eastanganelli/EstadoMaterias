const express = require('express');
let StatusRoute = express.Router();

const StudentStatus = require('../controllers/status/status.controller');

StatusRoute.get('/studentstatus', StudentStatus);

module.exports = StatusRoute;