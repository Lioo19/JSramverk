const express = require("express");
const app = express();

const port = 1337;

// Add a route
app.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});

// Testing routes with method
app.get("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a GET request"
        }
    });
});

app.post("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a POST request"
        }
    });
});

app.put("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a PUT request"
        }
    });
});

app.delete("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a DELETE request"
        }
    });
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
