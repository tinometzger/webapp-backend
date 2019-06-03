let createError = require('http-errors');
let express = require('express');
let cors = require('cors');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let fs = require('fs');
let app = express();
const formidableMiddleware = require('express-formidable');
let LdapStrategy = require('passport-ldapauth');
let passport     = require('passport');
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
    let result = await databaseutils.addStudienarbeit(req.body.betreuerid, req.body.bezeichnung, req.body.beschreibung, req.body.anzahl);
    console.log(result);
    res.send(result);
});

app.delete("/studienarbeit/delete/:id", async function (req, res) {
    console.log("Posting");
    let result = await databaseutils.deleteStudienarbeit(req.params.id);
    console.log(result);
    res.send(result);
});


app.get("/studienarbeit/get/unselected", async function (req,res) {
    console.log("Getting");
    let result = await databaseutils.getUnselectedStudienarbeit();
    console.log(result);
    res.send(result);
});

app.put("/studienarbeit/select", async function (req, res) {
   console.log("Putting");
   let result = await databaseutils.selectStudienarbeit(req.body.studienarbeitID, req.body.anzahlStudierende, req.body.studierendeID);
   console.log(result);
   res.send(result);
});

app.get("/studienarbeit/get/:studienarbeitsid", async function (req,res) {
    console.log("Getting");
    let result = await databaseutils.getStudienarbeitById(req.params.studienarbeitsid);
    console.log(result);
    res.send(result);
});

app.get("/studienarbeit/getByBetreuer/:betreuerid", async function (req,res) {
    console.log("Getting");
    let result = await databaseutils.getStudienarbeitByBetreuerId(req.params.betreuerid);
    console.log(result);
    res.send(result);
});

app.put("/studienarbeit/update/:id", async function (req,res) {
   console.log("Putting");
    let result = await databaseutils.updateTermin(req.params.id, req.body.betreuerID, req.body.bezeichnung, req.body.beschreibung, req.body.anzahlStudierende, req.body.aufwandBetreuer, req.body.aufwandStudierende);
    console.log(result);
    res.send(result);
});

app.get("/termintype/get", async function (req, res) {
    console.log("Getting");
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

app.delete("/termin/delete/:id", async function (req, res) {
    console.log("Posting");
    let result = await databaseutils.deleteTermin(req.params.id);
    console.log(result);
    res.send(result);
});

app.get("/termin/get/:studienarbeitsid", async function (req, res) {
    console.log("Getting");
    let result = await databaseutils.getTerminByStudienarbeitsID(req.params.studienarbeitsid);
    console.log(result);
    res.send(result);
});

app.put("/termin/update/:id", async function (req, res) {
    console.log("Putting");
    let result = await databaseutils.updateTermin(req.params.id, req.body.typeID, req.body.zeitpunkt, req.body.aufwand, req.body.notizen);
    console.log(result);
    res.send(result);
});


app.post("/upload", function (req, res) {
    console.log("Uploading");
    let form = new formidable.IncomingForm();
    form.maxFileSize = 10 * 1024 * 1024;

    form.on("fileBegin", function (name, file) {
      let dir = __dirname + '/termine/temp/';
      file.path = dir + file.name;
    });

    form.parse(req, function (err, fields, files) {

        let dir = __dirname + "/termine/" + fields.id;
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        } else {
            fs.readdir(dir, function (err, files) {
                if(files.length > 0) {
                    fs.unlinkSync(dir + "/" + files[0]);
                }
            })
        }

        let oldpath = __dirname + "/termine/temp/" + files.file.name;
        let newpath = dir + "/" + files.file.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            databaseutils.setNotizenName(fields.id);
            res.end();
        });
    });
});

app.get('/download/termine/:terminid/:filename', function(req, res){
    res.download(__dirname + '/termine/' + req.params.terminid + "/" + req.params.filename, req.params.filename);
});

/**
 *      AUTH AREA   START
 **/

const OPTS = {
    server: {
        url: 'ldaps://feldberg-nas.dhbw-stuttgart.de:636',
        bindDN: 'uid=root,cn=users,dc=feldberg-nas,dc=dhbw-stuttgart,dc=de',
        bindCredentials: `tinometzger`,
        searchBase: 'cn=users',
        searchFilter: `uid=tinometzger`,
        searchAttributes: ['uidNumber', 'sn'],
        reconnect: true
    }
};
passport.use(new LdapStrategy(OPTS));
app.use(passport.initialize());

app.post('/ldap/login', passport.authenticate('ldapauth', {session: false}), function(req, res) {
    console.log("hallo");
    console.log(req.body);
    res.send({status: 'ok'});
});

app.get("/download/notizentemplate", async function (req, res) {
    res.download(__dirname + '/termine/template/NotizenStandardDokument.docx');
});

/*
app.get("/ldap/user", ensureAuthenticated, function (req, res) {
    res.json({success: true, user:req.user})
});*/

/**
 *      AUTH AREA   END
 */


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
