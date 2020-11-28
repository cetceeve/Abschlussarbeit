/* eslint-env node */

const path = require("path"),
redisClient = require("redis"),
express = require("express"),
cookieParser = require("cookie-parser"),
sql = require("./server/database-connection"),
ServerUtils = require("./server/utils.js"),

redis = redisClient.createClient().on("ready", () => { console.log("DB: redis connected"); }),
port = 3000;

let app = express(),
server = app.listen(port, function () {
    console.log(`AppServer started. Client available at http://localhost:${port}`);
}),
utils = new ServerUtils(server, sql, redis);

app.use(express.json());
app.use(cookieParser());
app.use("/res", express.static("./app/res"));
app.use("/vendors", express.static("./app/vendors"));
app.use("/data", express.static("./app/data"));
app.use(utils.sessionIdMiddleware());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/app/index.html"));
});

app.get("/review-editor", (req, res) => {
    console.log("/review-editor - for session: " + req.cookies.sessionId);
    res.sendFile(path.join(__dirname + "/app/review-editor.html"));
});

app.put("/task", function (req, res) {
    console.log("/task - for session: " + req.cookies.sessionId);
    sql.saveUEQResults(req.cookies.sessionId, req.body.taskId, req.body.surveyResults);
    sql.saveTaskSuccessResults(req.cookies.sessionId, req.body.taskId, req.body.taskSuccess);
    sql.saveTaskCompletionTime(req.cookies.sessionId, req.body.taskId, req.body.taskCompletionTime);
    res.sendStatus(200);
});

app.put("/SUS", function (req, res) {
    console.log("/SUS - for session: " + req.cookies.sessionId);
    sql.saveSUSResults(req.cookies.sessionId, req.body.surveyResults);
    res.sendStatus(200);
});

app.put("/demographics", function (req, res) {
    console.log("/demographics - for session: " + req.cookies.sessionId);
    sql.saveDemographics(req.cookies.sessionId, req.body.surveyResults);
    res.sendStatus(200);
});

app.put("/log", function (req, res) {
    console.log("/log - for session: " + req.cookies.sessionId);
    redis.lpush("log_" + req.cookies.sessionId, JSON.stringify(req.body));
    // redis.XADD("log_stream_" + req.cookies.sessionId, "*", "test", "secondomator");
    res.sendStatus(200);
});

app.put("/feedback", function (req, res) {
    console.log("/log - for session: " + req.cookies.sessionId);
    utils.mail(req.cookies.sessionId, req.body.message);
    res.sendStatus(200);
});

process.on("SIGTERM", () => utils.shutDown());
process.on("SIGINT", () => utils.shutDown());