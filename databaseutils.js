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
const addStudienarbeit = (betreuerid, bezeichnung, beschreibung) =>
    new Promise((resolve, reject) => {
        console.log("Connected!");
        let studienarbeitID;
        let sql = "INSERT INTO studienarbeit (betreuerID, bezeichnung, beschreibung, aufwandBetreuer, aufwandStudierende) "
            + "VALUES ('" + betreuerid + "','" + bezeichnung + "','" + beschreibung + "','0','0')";
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
                "bezeichnung": result[0].bezeichnung,
                "beschreibung": result[0].beschreibung,
                "aufwandBetreuer": result[0].aufwandBetreuer,
                "aufwandStudierende": result[0].aufwandStudierende
            }
            resolve(jsonResult);
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



/**
 * Exported functions from module
 */
module.exports = {
    addStudienarbeit,
    getStudienarbeitById,
    getTermintype,
    addTermin,
    getTerminByStudienarbeitsID,
    updateTermin,
    setNotizenName
};