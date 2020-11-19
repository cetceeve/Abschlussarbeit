/* eslint-env node */

const AppServer = require("./lib/AppServer.js"),
  fs = require("fs");

var server,
  state = JSON.parse(fs.readFileSync("./data/test_state.json", "utf8"));

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

server.app.get("/", (req, res) => {
  console.log(req.query);
  console.log("did this work?");
});

server.app.post("/", (req, res) => {
  console.log("Endpoint /");
});

server.app.post("/editor", (req, res) => {
  console.log("/editor: sending");
  let fileString = fs.readFileSync("./lib/AppServer.js", "utf8");
  res.json({
    sha: "fileSha0000",
    value: fileString,
  });
});