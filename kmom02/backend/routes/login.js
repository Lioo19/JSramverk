let express = require('express');
let router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
const bcrypt = require('bcryptjs');



bcrypt.compare(USERPASSWORD, hashFROMDATABASE, function(err, res) {
    // res innehåller nu true eller false beroende på om det är rätt lösenord.
});

module.exports = router;
