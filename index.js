/* eslint-env node */

const express = require("express"),
fs = require("fs"),
path = require("path"),
port = 3000;

let app = express();
app.use(express.json());
app.use("/res", express.static("./app/res"));
app.use("/vendors", express.static("./app/vendors"));

app.listen(port, function () {
    console.log(`AppServer started. Client available at http://localhost:${port}`);
});

app.get("/", (req, res) => {
    console.log("did this work?");
    res.sendFile(path.join(__dirname + "/app/index.html"));
});

app.get("/review-editor", (req, res) => {
    console.log(req.query);
    res.sendFile(path.join(__dirname + "/app/review-editor.html"));
});

app.get("/state", (req, res) => {
    console.log(req.body.taskId);
});
