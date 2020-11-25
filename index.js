/* eslint-env node */

const express = require("express"),
fs = require("fs"),
path = require("path"),
cookieParser = require("cookie-parser"),
{ v4: uuidv4 } = require("uuid"),
db = require("./server/database-connection"),
port = 3000;

let app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/res", express.static("./app/res"));
app.use("/vendors", express.static("./app/vendors"));
app.use("/data", express.static("./app/data"));

// set session id if not there
app.use(function (req, res, next) {
    // check if client sent cookie
    let sessionId = req.cookies.sessionId;
    console.log(req.ip);
    if (sessionId === undefined) {
        let newSessionId = uuidv4();
        res.cookie("sessionId", newSessionId, { 
            expires: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 30),
        });
        console.log("cookie created successfully");
        db.registerSession(newSessionId);
    }
    next();
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/app/index.html"));
});

app.get("/review-editor", (req, res) => {
    console.log("/review-editor - for session: " + req.cookies.sessionId);
    res.sendFile(path.join(__dirname + "/app/review-editor.html"));
});

app.post("/state", (req, res) => {
    console.log("/state - for session: " + req.cookies.sessionId);
    console.log(req.body);
    res.json({ state: fs.readFileSync("./data/test_state.json", "utf8")});
});

app.put("/task", function (req, res) {
    console.log("/task - for session: " + req.cookies.sessionId);
    db.saveUEQResults(req.cookies.sessionId, req.body.taskId, req.body.surveyResults);
    db.saveTaskSuccessResults(req.cookies.sessionId, req.body.taskId, req.body.taskSuccess);
    db.saveTaskCompletionTime(req.cookies.sessionId, req.body.taskId, req.body.taskCompletionTime);
    res.json({ message: "Processed /task PUT request" });
});

app.put("/SUS", function (req, res) {
    console.log("/SUS - for session: " + req.cookies.sessionId);
    db.saveSUSResults(req.cookies.sessionId, req.body.surveyResults);
    res.json({ message: "Processed /SUS PUT request" });
});

app.listen(port, function () {
    console.log(`AppServer started. Client available at http://localhost:${port}`);
});