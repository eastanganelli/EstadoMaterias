const { GoogleSpreadsheet, GoogleSpreadsheetRow } = require('google-spreadsheet');
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
        const status  = note == 'A' ? 'success'  : note == 'I' ? 'danger' : 'info';
        const noteStr = note == 'A' ? 'Aprobado' : 'Desaprobado';

        return `<span class="badge text-bg-${status}">${name}: ${note == '' ? 'Sin Nota' : noteStr}</span>`;
    }
    static _badgeAsis(porcen) {
        const aux    = Number(porcen.slice(0, porcen.length - 1));
        const status = aux >= 93.75 ? 'success' : aux >= 81.25 ? 'warning' : 'danger';

        return `<span class="badge text-bg-${status}">${aux} %</span>`;
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
    static _asistanceTable(asistRow) {
        let asistlist = new Array();
        
        try {
            Object.entries(asistRow.toObject()).reverse().forEach(([key, value]) => {
                if (key === '%')
                    throw 'break';
    
                const status = value == 'P' ? 'success' : value == 'A' ? 'danger' : value == 'J' ? 'info' : 'light';
        
                asistlist.push(`<span class="badge text-bg-${status}">${key == undefined ? 'Sin Datos' : key}</span>`);
            });
        } catch (e) {
            //console.log(e);
        }
        return asistlist.reverse().toString().split(',').join(' ');
    }
};

module.exports = materia; 