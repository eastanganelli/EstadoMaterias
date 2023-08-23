const { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } = require('google-spreadsheet');

const HojasDeInteres = ["Estados", "Teoria", "Practica"];

class materia {
    constructor() {
        this._MySheets = new Array(); // Array of Worksheets
    }
    static async _getSheets(idSheets = []) {
        let returnSheets = [];
        for(let idSheet of idSheets) {
            const doc = new GoogleSpreadsheet(idSheet, { apiKey: process.env.GOOGLE_KEY });
            await doc.loadInfo();
            for(let hoja of HojasDeInteres) {
                let hojaTrabajo = doc.sheetsByTitle[hoja];
                if(hojaTrabajo != undefined)
                    returnSheets.push(hojaTrabajo);
            }
        }
        return returnSheets;
    }
};

class iri extends materia {
    constructor() {
        super();
        this._MySheets = materia._getSheets((String(process.env.IRI)).split(' '));
    }
    studentData(data) {
        return this._MySheets;
        //return `<p> ${data} <\p>`;
    }
};

class lpii extends materia {
    constructor() {
        super();
        this._MySheets = materia._getSheets((String(process.env.LPII)).split(' '));
    }
};

module.exports = {
    iri,
    lpii
};