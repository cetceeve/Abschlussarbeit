/* eslint-env node */

const express = require("express"),
fs = require("fs"),
path = require("path"),
cookieParser = require("cookie-parser"),
port = 3000;

let app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/res", express.static("./app/res"));
app.use("/vendors", express.static("./app/vendors"));
app.use("/data", express.static("./app/data"));

app.listen(port, function () {
    console.log(`AppServer started. Client available at http://localhost:${port}`);
});

app.get("/", (req, res) => {
    console.log("/");
    console.log("Cookies: ", req.cookies);
    res.sendFile(path.join(__dirname + "/app/index.html"));
});

app.get("/review-editor", (req, res) => {
    console.log("/review-editor");
    console.log("Cookies: ", req.cookies);
    res.sendFile(path.join(__dirname + "/app/review-editor.html"));
});

app.post("/state", (req, res) => {
    console.log("/state");
    console.log("Cookies: ", req.cookies);
    console.log(req.body);
    res.json({ state: fs.readFileSync("./data/test_state.json", "utf8")});
});
