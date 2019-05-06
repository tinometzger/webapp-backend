let createError = require('http-errors');
let express = require('express');
let cors = require('cors');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();

let databaseutils = require('./databaseutils');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



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
