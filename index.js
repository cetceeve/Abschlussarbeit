/* eslint-env node */

const fs = require("fs"),
path = require("path"),
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

app.post("/state", (req, res) => {
    console.log("/state - for session: " + req.cookies.sessionId);
    console.log(req.body);
    res.json({ state: fs.readFileSync("./data/test_state.json", "utf8")});
});

app.put("/task", function (req, res) {
    console.log("/task - for session: " + req.cookies.sessionId);
    sql.saveUEQResults(req.cookies.sessionId, req.body.taskId, req.body.surveyResults);
    sql.saveTaskSuccessResults(req.cookies.sessionId, req.body.taskId, req.body.taskSuccess);
    sql.saveTaskCompletionTime(req.cookies.sessionId, req.body.taskId, req.body.taskCompletionTime);
    res.json({ message: "Processed /task PUT request" });
});

app.put("/SUS", function (req, res) {
    console.log("/SUS - for session: " + req.cookies.sessionId);
    sql.saveSUSResults(req.cookies.sessionId, req.body.surveyResults);
    res.json({ message: "Processed /SUS PUT request" });
});

app.put("/log", function (req, res) {
    console.log("/log - for session: " + req.cookies.sessionId);
    redis.lpush("log_" + req.cookies.sessionId, JSON.stringify(req.body));
    // redis.XADD("log_stream_" + req.cookies.sessionId, "*", "test", "secondomator");
    res.sendStatus(200);
});

process.on("SIGTERM", () => utils.shutDown());
process.on("SIGINT", () => utils.shutDown());