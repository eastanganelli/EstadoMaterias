const materia = require('./subject.controller');

class iri extends materia {
    constructor() {
        super();
        this._MySheets = materia._getSheets((String(process.env.IRI)).split(' '));
    }
    studentData(data) {
        return new Promise((resolve, reject) => {

            let myStudent = {
                'status': null,
                'assistance_t': null,
                'assistance_p': null
            };

            this._MySheets.then(async hojas => {
                const sheetEstado = hojas[0],
                    sheetAsisT = hojas[1],
                    sheetAsisP = hojas[2];
                
                (await sheetEstado.getRows()).find((row) => {
                    if (row.get('DNI') == data || row.get('Mail') == data) {
                        myStudent['status'] = row;
                        return true;
                    }
                });

                (await sheetAsisT.getRows()).find((row) => {
                    if (row.get('DNI') == data || row.get('Mail') == data) {
                        myStudent['assistance_t'] = row;
                        return true;
                    }
                });

                (await sheetAsisP.getRows()).find((row) => {
                    if (row.get('DNI') == data || row.get('Mail') == data) {
                        myStudent['assistance_p'] = row;
                        return true;
                    }
                });

                if (myStudent['status'] === null) {
                    reject({ 'statusResponse': 403, 'error': 'No se encontró el estudiante' });
                    return;
                }

                resolve({
                    'name': myStudent['status'].get('Nombre'),
                    'lastname': myStudent['status'].get('Apellido'),
                    'dni': myStudent['status'].get('DNI'),
                    'notes': {
                        'exam_i':   materia._badgeExam(myStudent['status'].get('1er Parcial'), '1er Parcial'),
                        'exam_ii':  materia._badgeExam(myStudent['status'].get('2do Parcial'), '2do Parcial'),
                        'final_tp': materia._badgeExam(myStudent.status.get('TP Final'), 'TP Final')
                    },
                    'assistance': {
                        'asist_t': {
                            'porcent': materia._badgeAsis(myStudent['status'].get('T Asist')),
                            'table': materia._asistanceTable(myStudent['assistance_t'])
                        },
                        'asist_p':{
                            'porcent': materia._badgeAsis(myStudent['status'].get('P Asist')),
                            'table': materia._asistanceTable(myStudent['assistance_p'])
                        }
                    }
                });
            });

        });
    }
    InviteToOrg(Mail) {
        return materia._GitHubInviteOrg('IRI', (new Date()).getFullYear(), Mail);
    }
};

class lpii extends materia {
    constructor() {
        super();
        this._MySheets = materia._getSheets((String(process.env.LPII)).split(' '));
    }
    studentData(data) {
        return new Promise((resolve, reject) => {

            let myStudent = {
                'status': null,
                'assistance': null
            };

            this._MySheets.then(async hojas => {
                const sheetEstado = hojas[0],
                    sheetAsis = hojas[1];
                
                (await sheetEstado.getRows()).find((row) => {
                    if (row.get('DNI') == data || row.get('Mail') == data) {
                        myStudent['status'] = row;
                        return true;
                    }
                });

                (await sheetAsis.getRows()).find((row) => {
                    if (row.get('DNI') == data || row.get('Mail') == data) {
                        myStudent['assistance'] = row;
                        return true;
                    }
                });

                if (myStudent['status'] === null) {
                    reject({ 'statusResponse': 403, 'error': 'No se encontró el estudiante' });
                    return;
                }

                resolve({
                    'name': myStudent['status'].get('Nombre'),
                    'lastname': myStudent['status'].get('Apellido'),
                    'dni': myStudent['status'].get('DNI'),
                    'notes': {
                        'exam_i':   materia._badgeExam(myStudent['status'].get('1er Parcial'), '1er Parcial'),
                        'exam_ii':  materia._badgeExam(myStudent['status'].get('2do Parcial'), '2do Parcial'),
                        'final_tp': materia._badgeExam(myStudent['status'].get('TP Final'), 'TP Final')
                    },
                    'asistance': {
                        'asist': {
                            'porcent': materia._badgeAsis(myStudent['status'].get('Asist')),
                            'table': materia._asistanceTable(myStudent['assistance'])
                        }
                    }
                });
            });

        });
    }
    InviteToOrg(Mail) {
        return materia._GitHubInviteOrg('LP2', (new Date()).getFullYear(), Mail);
    }
};

module.exports = {
    iri,
    lpii
};