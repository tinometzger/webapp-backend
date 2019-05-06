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



/**
 * Exported functions from module
 */
module.exports = {
    addStudienarbeit,
    getStudienarbeitById,
    getTermintype
};