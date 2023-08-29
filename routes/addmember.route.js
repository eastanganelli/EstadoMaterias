'use strict'

const express = require('express');
let AddMemberRoute = express.Router();

const {
    AddMember
} = require('../controllers/addmember.controller');

AddMemberRoute.get('/addmember', AddMember);

module.exports = AddMemberRoute;