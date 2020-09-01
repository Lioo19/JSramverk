var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "getting a get"
        }
    };

    res.json(data);
});

//route for creating an account, returns ????
//How do i create an error-code if this doesn't work??
router.post("/register", (req, res) => {
    res.status(201).json({
        data: {
            msg: "Got a POST request for registering, sending back 201 created"
        }
    });
});

//route for logging in, returns JWT-token if successfully completed
//error if not successful login?
router.post("/login", (req, res) => {
    res.status(201).json({
        data: {
            msg: "Got a POST request for logging in, sending back 201 created"
        }
    });
});

module.exports = router;
