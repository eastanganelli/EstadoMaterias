const { response } = require("express");
const { Octokit, App } = require("octokit");

const AddMember = (req, res) => {
    //const subjectFilter = Number(req.query.subject);
    //const usernameFilter = req.query.username;

    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    });
      
    octokit.request('GET /orgs/', {
        org: 'uf-iri',
        team_slug: 'alumnos-2023',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    }).then((data) => {
        console.log(data);
        response.send(data);
    });

    /*switch(subjectFilter) {
        case 1: {
          
            break;
        }
        case 2: {
            break;
        }
        default: {
            break;
        }
    } */
};

module.exports = { AddMember }