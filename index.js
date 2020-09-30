/* eslint-env node */

const AppServer = require("./lib/AppServer.js"),
  fs = require("fs");

var server;

/**
 * Starts webserver to serve files from "/app" folder
 */
function init() {
  // Access command line parameters from start command (see package.json)
  let appDirectory = process.argv[2], // folder with client files
    appPort = process.argv[3]; // port to use for serving static files
  server = new AppServer(appDirectory);
  server.start(appPort);
}

init();

server.app.post("/comments", (req, res) => {
  let comments = JSON.parse(fs.readFileSync("./data/comments.json", "utf8"));
  console.log("/comments: sending...");
  res.json(comments);
});

server.app.post("/insert", (req, res) => {
  console.log(req.body);
  res.json({
    "success": true,
  });
});

server.app.post("/editor", (req, res) => {
  console.log("/editor: sending");
  res.send(fs.readFileSync("./lib/AppServer.js", "utf8"));
});