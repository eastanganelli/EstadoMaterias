const { iri, lpii } = require('./../student/subjects.controller');

const StudentStatus = (req, res) => {
    const subjectFilter = Number(req.query.subject);
    const studentFilter = req.query.student;

    const streaming = false //|| process.env.STREAMING;

    let subject_ = null;

    switch(subjectFilter) {
        case 1: {
            subject_ = new iri();
            subject_.studentData(studentFilter).then((student) => {
                res.status(200).send(`
                    <div class="animate__animated animate__tada card">
                        <div class="card-header">
                            <h5 ${streaming ? 'aria-hidden="true"' : ''} class="card-title placeholder-glow"><span class="${streaming ? 'placeholder' : ''}"">${student['name']} ${student['lastname']}</span></h5>
                            <h6 ${streaming ? 'aria-hidden="true"' : ''} class="card-subtitle mb-2 text-body-secondary placeholder-glow"><span class="${streaming ? 'placeholder' : ''}">${student['dni']}</span></h6>
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>Notas</p>
                                <footer class="blockquote-footer">${student['notes']['exam_i']} ${student['notes']['exam_ii']} ${student['notes']['final_tp']}</footer>
                            </blockquote>
                            <blockquote class="blockquote mb-0">
                                <p>Porcentaje de Asistencia Teórica: ${student['assistance']['asist_t']['porcent']}</p>
                                <footer class="blockquote-footer">${student['assistance']['asist_t']['table']}</footer>
                            </blockquote>
                            <blockquote class="blockquote mb-0">
                                <p>Porcentaje de Asistencia Práctica: ${student['assistance']['asist_p']['porcent']}</p>
                                <footer class="blockquote-footer">${student['assistance']['asist_p']['table']}</footer>
                            </blockquote>
                        </div>
                    </div>
                `);
            }).catch((err) => {
                res.status(403).send(err);
            });
            break;
        }
        case 2: {
            subject_ = new lpii();
            subject_.studentData(studentFilter).then((student) => {
                res.status(200).send(`
                    <div class="animate__animated animate__tada card">
                        <div class="card-header">
                            <h5 ${streaming ? 'aria-hidden="true"' : ''} class="card-title placeholder-glow"><span class="${streaming ? 'placeholder' : ''}"">${student['name']} ${student['lastname']}</span></h5>
                            <h6 ${streaming ? 'aria-hidden="true"' : ''} class="card-subtitle mb-2 text-body-secondary placeholder-glow"><span class="${streaming ? 'placeholder' : ''}">${student['dni']}</span></h6>
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>Notas</p>
                                <footer class="blockquote-footer">${student['notes']['exam_i']} ${student['notes']['exam_ii']} ${student['notes']['final_tp']}</footer>
                            </blockquote>
                            <blockquote class="blockquote mb-0">
                                <p>Porcentaje de Asistencia: ${student['asistance']['asist']['porcent']}</p>
                                <footer class="blockquote-footer">${student['asistance']['asist']['table']}</footer>
                            </blockquote>
                        </div>
                    </div>
                `);
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

module.exports = StudentStatus;