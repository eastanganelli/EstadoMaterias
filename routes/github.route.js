const express = require('express');
let AddMemberRoute       = express.Router(),
    AddMemberFrontRoute  = express.Router();

const GitHubInvite = require('../controllers/github/github.controller');
const AddMember    = require('../controllers/addmember/addmember.controller');

AddMemberRoute.get('/sendinvite', GitHubInvite);
AddMemberFrontRoute.get('/github', AddMember);

module.exports = {
    AddMemberRoute,
    AddMemberFrontRoute
};