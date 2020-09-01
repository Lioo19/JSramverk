var express = require('express');
var router = express.Router();

var hometext = `<h2>Me-sida för JSRamverk</h2>
            <h4>Välkommen till min me-sida för kursen JavaScript-baserade webbramverk, JSRamverk,
            som ges vid Blekinge Tekniska Högskola hösten av kaosåret 2020.</h4>
            <p>Så vem är då jag?
            </p>
            <p>Jag är för det mesta energisk och alldeles för lösningsorienterad.
            Mån om att hitta den bästa, mest optimala lösningen bubblar jag ofta av alternativa
            vägar och spännande möjligheter. Ibland bubblar jag över och är mest spretig med energi
            åt alla håll, innan beslut har tagits åt vilket håll näsan ska peka.
            </p>
            <p>
            Mitt syre är de relationer som byggs i livet, de som utmanar mig att bli
            bättre, skapar skratt och stödjer när det behövs. Utöver det är personlig utveckling,
            psykologi, aktier och pyssel med diverse garnrelaterade saker inom intresse-omfånget.
            </p>
            <p>
            Vardagarna består av timmar framför datorn med kod för skolans räkning, en och annan tur i skogen
            (antingen med löparskor eller kängor) och en rätt orimlig mängd brädspel.
            </p>
            <i>Linnéa O</i>`

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: hometext
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
