var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();
const sql = require('mssql');
const config = require("./dbconfig");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

const db = sql.connect(config, function (err) {
    if (err) throw err;
    console.log("database connected");
})

// authentication here
router.use((req, res, next) => {
    next();
})

// get tours by id
app.get("/tours/:id", async function (req, res) {
    let request = db.request();
    request.input('id', sql.NVarChar, req.params.id);
    const query = "SELECT * from TourDetails where ID = @id";
    const result = await request.query(query);
    res.json({ msg: "Fetch successful", data: result.recordset });
});

// save tours
app.post('/saveTour', async function (req, res) {
    const request = db.request();
    request.input('city', sql.NVarChar, req.body.city)
        .input('country', sql.NVarChar, req.body.country)
        .input('description', sql.NVarChar, req.body.description)
        .input('stops', sql.NVarChar, req.body.stops)
        .input('title', sql.NVarChar, req.body.title)
        .input('id', sql.NVarChar, req.body.id)
    const query = "INSERT INTO TourDetails (city,country,description,stops,title,id) VALUES(@city,@country,@description,@stops,@title,@id)";
    const result = await request.query(query);
    const querySecond = "SELECT * from TourDetails where ID = @id";
    const response = await request.query(querySecond);
    res.send({ msg: "save successfully", data: response.recordset });
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log("API is running at " + port);

