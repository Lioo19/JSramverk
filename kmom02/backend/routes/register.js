let express = require('express');
let router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.post("/", (req, res) => {
    register(res, req.body);
});

function register(res, body) {
    const email = body.email;
    const password = body.password;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        db.run("INSERT INTO users (email, password) VALUES (?, ?)",
            email,
            hash, (err) => {
                if (err) {
                    console.log(err);
                }
                return res.status(201).json({
                    data: {
                        message: "Registration successful!"
                    }
                });
            });
    });
}


module.exports = router;
