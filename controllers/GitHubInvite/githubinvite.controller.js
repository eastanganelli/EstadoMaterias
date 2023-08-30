const { iri, lpii } = require('./../subjects.controller');
const GitHubInvite = (req, res) => {
    const subjectFilter = Number(req.query.subject);
    const mailFilter    = req.query.mail;

    let subject_ = null;
    switch(subjectFilter) {
        case 1: {
            subject_ = new iri();
            subject_.InviteToOrg(mailFilter).then(response => {
                res.status(200).send(response);
            }).catch(err => {
                res.status(403).send(err);
            });
            break;
        }
        case 2: {
            subject_ = new lpii();
            subject_.InviteToOrg(mailFilter).then(response => {
                res.status(200).send(response);
            }).catch(err => {
                res.status(403).send(err);
            });
            break;
        }
        default: {
            res.status(403).send(`No se encuentra la materia`);
            break;
        }
    }
};

module.exports = GitHubInvite;