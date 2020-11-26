/* eslint-env node */

const fs = require("fs"),
path = require("path"),
{ v4: uuidv4 } = require("uuid"),
crypto = require("crypto"),
redisClient = require("redis"),
sql = require("./server/database-connection"),
express = require("express"),
cookieParser = require("cookie-parser"),

redis = redisClient.createClient(),
port = 3000;

let app = express(),

shutDown = () => {
    console.log("Received kill signal, shutting down gracefully");
    server.close(() => {
        console.log("Closed out remaining connections");
        sql.close(() => {
            redis.quit(() => {
                console.log("Closed databases");
                process.exit(0);
            });
        });
    });
    
    setTimeout(() => {
        console.error("Could not close connections in time, shutting down databases");
        sql.close(() => {
            redis.quit(() => {
                console.log("Closed databases");
                process.exit(1);
            });
        });
    }, 30000);

    setTimeout(() => {
        console.error("Could not close databases, forcefully shutting down");
        process.exit(1);
    }, 40000);
},
server;

redis.on("ready", () => {
    console.log("DB: redis connected");
    server = app.listen(port, function () {
        console.log(`AppServer started. Client available at http://localhost:${port}`);
    });
});

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

app.use(express.json());
app.use(cookieParser());
app.use("/res", express.static("./app/res"));
app.use("/vendors", express.static("./app/vendors"));
app.use("/data", express.static("./app/data"));

// set session id if not there
app.use(function (req, res, next) {
    // check if client sent session id cookie
    if (req.cookies.sessionId === undefined) {
        // disguise user ip as hash for data privacy
        let ipHash = crypto.createHash("sha1").update(req.ip).digest("hex");
        // check if ip was already, if true, reasign old sessionId
        // this is a mechanism against fraud
        redis.get(ipHash, (err, reply) => {
            if (reply === null) {
                // this ip was not seen before, create a new sessionId and store it as a cookie
                let newSessionId = uuidv4();
                res.cookie("sessionId", newSessionId, { 
                    expires: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 30),
                    httpOnly: true,
                });
                // save the ip and sessionId for 23 hours
                redis.set(ipHash, newSessionId);
                redis.expire(ipHash, 60*60*24);
                // register the new session
                sql.registerSession(newSessionId);
                console.log("SERVER: Cookie created successfully");
            } else {
                // user was already seen, reasign old sessionId
                res.cookie("sessionId", reply, { 
                    expires: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 30),
                    httpOnly: true,
                });
                console.log("SERVER: Fraud attempt blocked");
            }
        });
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

