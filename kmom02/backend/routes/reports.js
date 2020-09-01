var express = require('express');
var router = express.Router();

//SHOULD BE ABLE TO USE DYNAMIC PARAMS FOR REPORT
router.get("/week/:which", (req, res) => {
    const data = {
        data: {
            //msg returns the :which
            msg: req.params.which
        }
    };
    res.json(data);
})

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});



//post route for adding report-data to api. Only possible with active JWT-token
//Shoudl be possible to use BODYPARSER for putting the correct report for each week?
//go back to https://jsramverk.se/backend#route-med-dynamiskt-innehall
router.post("/", (req, res) => {
    res.status(201).json({
        data: {
            report: "Got a POST request for adding report-data to api, sending back 201 created"
        }
    });
});


module.exports = router;
