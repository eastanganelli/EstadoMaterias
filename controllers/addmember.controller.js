const Octokit = require('@octokit/rest');

const AddMember = (req, res) => {
    //const subjectFilter = Number(req.query.subject);
    //const usernameFilter = req.query.username;

    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    });
      
    octokit.request('GET /orgs/uf-iri/teams/alumnos-2023', {
        org: 'ORG',
        team_slug: 'TEAM_SLUG',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    }).then((data) => {
        console.log(data);
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