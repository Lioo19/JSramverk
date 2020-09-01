let express = require('express');
let router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

//SHOULD BE ABLE TO USE DYNAMIC PARAMS FOR REPORT
router.get("/week/:which", (req, res) => {
    db.each("SELECT reporttext FROM reports WHERE reportnr = " + req.params.which,
    function(err, row) {
        console.log(row.reporttext );
        const data = {
            data: {
                reporttext: row.reporttext
            }
        }
        res.json(data);
    });
})

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});



//post route for adding report-data to api/db. Only possible with active JWT-token
//Should be possible to use BODYPARSER for putting the correct report for each week?
//go back to https://jsramverk.se/backend#route-med-dynamiskt-innehall
router.post("/", (req, res) => {
    res.status(201).json({
        data: {
            report: "Got a POST request for adding report-data to api, sending back 201 created"
        }
    });
});


module.exports = router;
