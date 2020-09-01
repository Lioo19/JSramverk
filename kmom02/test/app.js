const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const bodyParser = require('body-parser');

const port = 1337

const index = require('./routes/index');
const hello = require('./routes/hello');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

const bcrypt = require('bcryptjs');
const saltRounds = 10;
const myPlaintextPassword = 'longandhardP4$w0rD';
const hash = 'superlonghashedpasswordfetchedfromthedatabase';

const jwt = require('jsonwebtoken');

const payload = { email: "user@example.com" };
const secret = process.env.JWT_SECRET;

const token = jwt.sign(payload, secret, { expiresIn: '1h'});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
        // not a valid token
    }

    // valid token
});




bcrypt.hash(myPlaintextPassword, saltrounds, function(err, hash) {
    // spara lösenord i databasen.
});

bcrypt.compare(myPlaintextPassword, hasg, function(err, res) {
    // res innehåller nu true eller false beroende på om det är rätt lösenord.
});

//inserting new user into database
db.run("INSERT INTO users (email, password) VALUES (?, ?)",
    "user@example.com",
    "superlonghashedpasswordthatwewillseehowtohashinthenextsection", (err) => {
        if (err) {
            console.log("ERR");
        }

        console.log("SUCCESS");
    })

// This is middleware called for all routes.
// Middleware takes three parameters.
// app.use((req, res, next) => {
//     console.log(req.method);
//     console.log(req.path);
//     next();
// });

app.use(cors());

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan("combined"));
}

app.use('/', index);
app.use('/hello', hello);

// Add a route
app.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});

app.get("/hello/:msg", (req,res) => {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
});

/// Testing routes with method
app.get("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a GET request, sending back default 200"
        }
    });
});

app.post("/user", (req, res) => {
    res.status(201).json({
        data: {
            msg: "Got a POST request, sending back 201 Created"
        }
    });
});

app.put("/user", (req, res) => {
    // PUT requests should return 204 No Content
    res.status(204).send();
});

app.delete("/user", (req, res) => {
    // DELETE requests should return 204 No Content
    res.status(204).send();
});

app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headerSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title": err.message,
                "detail": err.message
            }
        ]
    });
});

router.post("/reports",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => reports.addReport(req, req.body));

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            //send error response
        }

        //valid token send on the requests
        next();
    });
}

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
