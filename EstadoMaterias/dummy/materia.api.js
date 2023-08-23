import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
require('dotenv').config( { path: '../../.env' } );

const HojasDeInteres = ["Estados", "Teoria", "Practica"];

class materia {
    constructor() {
        this._MySheets = new Array(); // Array of Worksheets
    }
    #loadSheets() {}
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
}

class iri extends materia {
    constructor() {
        super();
        this.#loadSheets();
    }
    #loadSheets() {
        let idSheets = (String(process.env.IRI)).split(' ');
        this._MySheets = materia._getSheets(idSheets);
    }
}

class lpii extends materia {
    constructor() {
        super();
        this.#loadSheets();
    }
    #loadSheets() {
        let idSheets = (String(process.env.LPII)).split(' ');
        this._MySheets = materia._getSheets(idSheets);
    }
}

module.exports = {
    materia,
    iri,
    lpii
};