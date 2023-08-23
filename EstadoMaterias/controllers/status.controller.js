const { iri, lpii } = require('./subjects.controller');

const StudentStatus = (req, res) => {
    const subjectFilter = Number(req.query.subject);
    const studentFilter = req.query.student;

    if (studentFilter != ``) {
        let subject_ = null;

        switch(subjectFilter) {
            case 1: {
                subject_ = new iri();
                res.send(subject_.studentData(studentFilter));
                break;
            }
            case 2: {
                break;
            }
            default: {
                res.status(403).send(`No se encuentra la materia`);
                break;
            }
        }
    } else {
        res.status(403).send(`Faltan datos`);
    }
};

module.exports = { StudentStatus }