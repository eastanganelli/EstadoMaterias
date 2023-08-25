const { iri, lpii } = require('./subjects.controller');

const StudentStatus = (req, res) => {
    const subjectFilter = Number(req.query.subject);
    const studentFilter = req.query.student;

    let subject_ = null;

    switch(subjectFilter) {
        case 1: {
            subject_ = new iri();
            subject_.studentData(studentFilter).then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                res.status(403).send(err);
            });
            break;
        }
        case 2: {
            subject_ = new lpii();
            subject_.studentData(studentFilter).then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
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

module.exports = { StudentStatus }