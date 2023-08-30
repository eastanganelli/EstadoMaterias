'use strict'

const express = require('express');
let AddMemberRoute       = express.Router(),
    AddMemberFrontRoute  = express.Router();

const GitHubInvite = require('../controllers/githubinvite/githubinvite.controller');
const AddMember    = require('../controllers/addmember/addmember.controller');

AddMemberRoute.get('/sendinvite', GitHubInvite);
AddMemberFrontRoute.get('/addmember/:subject', AddMember);

module.exports = {
    AddMemberRoute,
    AddMemberFrontRoute
};