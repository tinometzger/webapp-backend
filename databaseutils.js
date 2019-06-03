var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "studienarbeit_db"
});

/**
 * Function adds wine to database
 * @param id
 * @param bezeichnung
 * @param beschreibung
 * @returns {Promise<any>}
 */
const addStudienarbeit = (betreuerid, bezeichnung, beschreibung, anzahlStudierende) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let studienarbeitID;
        let sql = "INSERT INTO studienarbeit (betreuerID, bezeichnung, beschreibung, anzahlStudierende, aufwandBetreuer, aufwandStudierende) "
            + "VALUES ('" + betreuerid + "','" + bezeichnung + "','" + beschreibung + "','" + anzahlStudierende + "','0','0')";
        db.query(sql, function (err, result) {
            console.log('result: ');
            console.log(result);
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Studienarbeit successfully added");
                studienarbeitID = result.studienarbeitid;
            }
        });
        sql = "INSERT INTO studienarbeit_betreuer_studierende (studienarbeitID, studierendeID) "
            + "VALUES ('" + "1" + "',"  + "'" + "0" + "')";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Studienarbeit successfully added");
            }
        });
    });

const deleteStudienarbeit = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "DELETE from studienarbeit WHERE id= '" + id + "'";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Studienarbeit successfully deleted");
            }
            resolve({result: true});
        });
});

const updateStudienarbeit = (id, betreuerID, bezeichnung, beschreibung, anzahlStudierende, aufwandBetreuer, aufwandStudierende) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "UPDATE studienarbeit SET betreuerID = '" + betreuerID + "', bezeichnung = '" + bezeichnung + "', beschreibung = '" + beschreibung
            + "', anzahlStudierende = '" +  anzahlStudierende +  + "', aufwandBetreuer = '" +  aufwandBetreuer +
            + "', aufwandStudierende = '" +  aufwandStudierende + "' WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Studienarbeit successfully updated");
            }
            resolve(result);
        });
    });

const getUnselectedStudienarbeit = () =>
    new Promise ((resolve, reject) => {
        let sql = "SELECT * FROM studienarbeit, studienarbeit_betreuer_studierende as studbs WHERE studbs.studierendeID = 0 AND studienarbeit.id = studienarbeitID";
        db.query(sql, function (err, result){
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Studienarbeiten without StudierendeID succesfully retrurned");
            }
            let jsonResultArray = [];
            for(let i = 0; i < result.length; i++) {
                let jsonResult = {
                    "id": result[i].id,
                    "bezeichnung": result[i].bezeichnung,
                    "beschreibung": result[i].beschreibung,
                    "anzahlStudierende": result[i].anzahlStudierende
                };
                jsonResultArray.push(jsonResult);
            }
            resolve(jsonResultArray);
        })
    });

const getStudienarbeitById = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        console.log(id);
        let sql = "SELECT * FROM studienarbeit WHERE id = '" + id + "'";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Studienarbeit successfully returned");
            }
            console.log(result);
            let jsonResult = {
                "id": result[0].id,
                "bezeichnung": result[0].bezeichnung,
                "beschreibung": result[0].beschreibung,
                "anzahlStudierende": result[0].anzahlStudierende,
                "aufwandBetreuer": result[0].aufwandBetreuer,
                "aufwandStudierende": result[0].aufwandStudierende
            }
            resolve(jsonResult);
        });
    });


const getStudienarbeitByBetreuerId = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        console.log(id);
        let sql = "SELECT * FROM studienarbeit WHERE betreuerID = '" + id + "'";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Studienarbeit successfully returned");
            }
            console.log(result);
            let jsonResultArray = [];
            for(let i = 0; i < result.length; i++) {
                let jsonResult = {
                    "id": result[i].id,
                    "bezeichnung": result[i].bezeichnung,
                    "beschreibung": result[i].beschreibung,
                    "anzahlStudierende": result[i].anzahlStudierende,
                    "aufwandBetreuer": result[i].aufwandBetreuer,
                    "aufwandStudierende": result[i].aufwandStudierende
                };
                jsonResultArray.push(jsonResult);
            }
            resolve(jsonResultArray);
        });
    });



const getTermintype = () =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM termintype";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Termintype successfully returned");
            }
            let jsonResultArray = [];
            for(let i = 0; i < result.length; i++) {
                let jsonResult = {
                    "id": result[i].id,
                    "bezeichnung": result[i].bezeichnung,
                    "ort": result[i].ort
                };
                jsonResultArray.push(jsonResult);
            }
            resolve(jsonResultArray);
        });
    });

const addTermin = (typeid, zeitpunkt, studienarbeitsid) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "INSERT INTO termin (typeid, zeitpunkt, studienarbeitsID) "
            + "VALUES ('" + typeid + "','" + zeitpunkt + "','" + studienarbeitsid + "')";
        db.query(sql, function (err, result) {
            console.log('result: ');
            console.log(result);
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Termin successfully added");
            }
        });
    });

const deleteTermin = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "DELETE from termin WHERE id= '" + id + "'";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Termin successfully deleted");
            }
            resolve({result: true});
        });
    });


const getTerminByStudienarbeitsID = (id) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM termin WHERE studienarbeitsID = '" + id + "'";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Termine successfully returned");
            }
            console.log(result);

            let jsonResultArray = [];
            for(let i = 0; i < result.length; i++) {
                let jsonResult = {
                    "id": result[i].id,
                    "typeID": result[i].typeID,
                    "zeitpunkt": result[i].zeitpunkt,
                    "notizen": result[i].notizen,
                    "aufwand": result[i].aufwand
                };
                jsonResultArray.push(jsonResult);
            }
            resolve(jsonResultArray);
        });
    });

const updateTermin = (id,typeID, zeitpunkt, notizen, aufwand) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "UPDATE termin SET typeID = '" + typeID + "', zeitpunkt = '" + zeitpunkt + "', notizen = '" + notizen + "', aufwand = '"
            + aufwand + "' WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Termin successfully updated");
            }
            resolve(result);
        });
});

const setNotizenName = (id, name) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "UPDATE termin SET notizen = '" + name + "' WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Termin successfully updated");
            }
            resolve(result);
        });
    });

const selectStudienarbeit = (studienarbeitID, anzahlStudierende, studierendeID) =>
    new Promise ((resolve, reject) => {
        console.log("Connected!");
        let anzahlEintraege;
        let sql;
       if(anzahlStudierende>1) {
           var sqlcount = "SELECT COUNT(studienarbeitID) AS anzahl FROM studienarbeit_betreuer_studierende WHERE studienarbeitID = "
               + studienarbeitID;
           db.query(sqlcount, function (err, result) {
               if (err) {
                   throw err;
                   console.log(err);
               } else {
                   anzahlEintraege = result[0].anzahl;

                   if(anzahlEintraege = 1)
                   {
                       sql = "INSERT INTO studienarbeit_betreuer_studierende (studienarbeitID, studierendeID) VALUES ('" + studienarbeitID
                           + "', '" + studierendeID + "')";
                   } else {
                       sql = "UPDATE studienarbeit_betreuer_studierende SET studierendeID = '" + studierendeID + "' WHERE studienarbeit = '"
                           + studienarbeitID + "' AND studierendeID = '0'";
                   }
               }
           });
       } else {
           sql = "UPDATE studienarbeit_betreuer_studierende SET studierendeID = '" + studierendeID + "' WHERE studienarbeitID = '"
               + studienarbeitID + "'";
       }

       db.query(sql, function(err, result) {
           if (err) {
               throw err;
               console.log(err);
           } else {
               console.log("Studienarbeit successfully selected");
               resolve(studienarbeitID);
           }
       });
    });

const addWikiEintrag = (autor, titel, inhalt, datum) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "INSERT INTO wikieintrag (autor, titel, inhalt, datum) "
            + "VALUES ('" + autor + "','" + titel + "','" + inhalt + "','" +  datum + "')";
        db.query(sql, function (err, result) {
            console.log('result: ');
            console.log(result);
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Wiki-Eintrag successfully added");
            }
        });
    });

const getWikiEintraege = () =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "SELECT * FROM wikieintrag";
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Wiki-Eintraege successfully returned");
            }
            let jsonResultArray = [];
            for(let i = 0; i < result.length; i++) {
                let jsonResult = {
                    "id": result[i].id,
                    "autor": result[i].autor,
                    "titel": result[i].titel,
                    "datum": result[i].datum,
                };
                jsonResultArray.push(jsonResult);
            }
            resolve(jsonResultArray);
        });
    });


const updateWikiEintrag = (id, autor, titel, inhalt, datum) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let sql = "UPDATE wikieintrag SET autor = '" + autor + "', titel = '" + titel + "', inhalt = '" + inhalt + "', datum = '"
            + datum + "' WHERE id = " + id;
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
                console.log(err);
            } else {
                console.log("Wiki-Eintrag successfully updated");
            }
            resolve(result);
        });
    });

/**
 * Exported functions from module
 */
module.exports = {
    addStudienarbeit,
    getStudienarbeitById,
    updateStudienarbeit,
    deleteStudienarbeit,
    getTermintype,
    addTermin,
    getTerminByStudienarbeitsID,
    updateTermin,
    deleteTermin,
    setNotizenName,
    getUnselectedStudienarbeit,
    selectStudienarbeit,
    getStudienarbeitByBetreuerId,
    addWikiEintrag,
    getWikiEintraege,
    updateWikiEintrag

};