const { GoogleSpreadsheet } = require('google-spreadsheet');
const { Octokit } = require("octokit");

const SheetsOfInterest = ["Estados", "Teoria", "Practica"];

class materia {
    constructor() {
        this._MySheets = new Array(); // Array of Worksheets
    }
    static async _getSheets(idSheets = []) {
        let returnSheets = [];
        for (let idSheet of idSheets) {
            const doc = new GoogleSpreadsheet(idSheet, { apiKey: process.env.GKEY });
            await doc.loadInfo();
            for (let hoja of SheetsOfInterest) {
                let hojaTrabajo = doc.sheetsByTitle[hoja];
                if (hojaTrabajo != undefined)
                    returnSheets.push(hojaTrabajo);
            }
        }
        return returnSheets;
    }
    static _badgeExam(note, name) {
        const status = note == 'A' ? 'success' : note == 'I' ? 'danger' : 'info';

        return `<span class="badge text-bg-${status}">${name}: ${note == '' ? 'Sin Nota' : note}</span>`;
    }
    static _badgeAsis(porcen, name) {
        const aux = Number(porcen.slice(0, porcen.length - 1));
        const status = aux >= 93.75 ? 'success' : aux >= 81.25 ? 'warning' : 'danger';

        return `<span class="badge text-bg-${status}">${name}: ${aux} %</span>`;
    }
    static _GitHubInviteOrg(org, year, studentmail) {
        return new Promise((resolve, reject) => {
            const octokit = new Octokit({
                auth: process.env.GHKEY
            });
              
            octokit.request('GET /orgs/{org}/teams/{team_slug}', {
                org: `UF-${org}`,
                team_slug: `Alumnos-${year}`
            }).then((organization) => {
                octokit.request('POST /orgs/{org}/invitations', {
                    org: `UF-${org}`,
                    email: studentmail,
                    team_ids: [ organization['data']['id'] ]
                }).then((invite) => {
                    resolve(invite);
                }).catch(err => { reject(err); });
            }).catch(err => { reject(err); }); 
        });
    }
};

class iri extends materia {
    constructor() {
        super();
        this._MySheets = materia._getSheets((String(process.env.IRI)).split(' '));
    }
    studentData(data) {
        return new Promise((resolve, reject) => {

            let myStudent = ``;
            this._MySheets.then(async hojas => {
                const sheetEstado = hojas[0],
                    sheetAsisT = hojas[1],
                    sheetAsisP = hojas[2];

                for (const row of await sheetEstado.getRows()) {
                    if (row.get('DNI') == data || row.get('Mail') == data) { 
                        myStudent = `
                        <div class="card"">
                            <div class="card-header">
                                <h5 class="card-title">${row.get('Nombre')} ${row.get('Apellido')}</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">${row.get('DNI')}</h6>
                            </div>
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <p>Notas</p>
                                    <footer class="blockquote-footer">${materia._badgeExam(row.get('1er Parcial'), '1er Parcial')} ${materia._badgeExam(row.get('2do Parcial'), '2do Parcial')} ${materia._badgeExam(row.get('TP Final'), 'TP Final')}</footer>
                                </blockquote>
                                <blockquote class="blockquote mb-0">
                                    <p>Porcentaje de Asistencia</p>
                                    <footer class="blockquote-footer">${materia._badgeAsis(row.get('T Asist'), 'Teoría')} ${materia._badgeAsis(row.get('P Asist'), 'Práctica')}</footer>
                                </blockquote>
                            </div>
                        </div>
                        `;
                        resolve(myStudent);
                        break;
                    }
                }
                reject(`No se encontró el estudiante`);
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

            let myStudent = ``;
            this._MySheets.then(async hojas => {
                const sheetEstado = hojas[0],
                    sheetAsis = hojas[1];

                for (const row of await sheetEstado.getRows()) {
                    if (row.get('DNI') == data || row.get('Mail') == data) { 
                        myStudent = `
                        <div class="card"">
                            <div class="card-header">
                                <h5 class="card-title">${row.get('Nombre')} ${row.get('Apellido')}</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">${row.get('DNI')}</h6>
                            </div>
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <p>Notas</p>
                                    <footer class="blockquote-footer">${materia._badgeExam(row.get('1er Parcial'), '1er Parcial')} ${materia._badgeExam(row.get('2do Parcial'), '2do Parcial')} ${materia._badgeExam(row.get('TP Final'), 'TP Final')}</footer>
                                </blockquote>
                                <blockquote class="blockquote mb-0">
                                    <p>Porcentaje de Asistencia</p>
                                    <footer class="blockquote-footer">${materia._badgeAsis(row.get('Asist'), 'Teoría y Práctica')}</footer>
                                </blockquote>
                            </div>
                        </div>
                        `;
                        resolve(myStudent);
                        break;
                    }
                }
                reject(`No se encontró el estudiante`);
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