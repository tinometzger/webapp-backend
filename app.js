let createError = require('http-errors');
let express = require('express');
let cors = require('cors');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let fs = require('fs');
let app = express();
const formidableMiddleware = require('express-formidable');
let databaseutils = require('./databaseutils');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let formidable = require('formidable');

/**
 * Post route to add a studienarbeit
 */
app.post("/studienarbeit/add", async function (req, res) {
    console.log("Posting");
    let result = await databaseutils.addStudienarbeit(req.body.betreuerid, req.body.bezeichnung, req.body.beschreibung);
    console.log(result);
    res.send(result);
});

app.get("/termintype/get", async function (req, res) {
    console.log("Getting termintype");
    let result = await databaseutils.getTermintype();
    console.log(result);
    res.send(result);
});

app.post("/termin/add", async function (req, res) {
    console.log("Posting");
    let result = await databaseutils.addTermin(req.body.termintype, req.body.zeitpunkt, req.body.studienarbeitsid);
    console.log(result);
    res.send(result);
});

app.get("/termin/getbystudid", async function (req, res) {
    console.log("Getting");
    let result = await databaseutils.getTerminByStudienarbeitsID(req.query.studienarbeitsid);
    console.log(result);
    res.send(result);
});

app.post("/termin/update", async function (req, res) {
    console.log("Posting");
    let result = await databaseutils.updateTermin(req.body.id, req.body.typeID, req.body.zeitpunkt, req.body.aufwand, req.body.notizen);
    console.log(result);
    res.send(result);
});

app.post("/upload", function (req, res) {
    console.log("Uploading");
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        let dir =__dirname + '/termine/' + fields.id;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        let oldpath = files.file.path;
        let newpath = dir;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    });
});


/**
 * catch 404 and forward to error handler
 **/
app.use(function (req, res, next) {
    next(createError(404));
});

/**
 * error handler
 */
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

/**
 * exporting app
 */
module.exports = app;
