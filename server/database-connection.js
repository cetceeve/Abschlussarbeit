/* eslint-env node */
const sqlite3 = require("sqlite3").verbose(),
path = require("path");

class dbConnection {
    constructor() {
        this.db = new sqlite3.Database(path.join(__dirname + "/../data/StudyResults.db"), (error) => console.log(error));
    }
    
    registerSession(sessionId) {
        this.db.serialize(() => {
            this.db.run("CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, date TEXT, time TEXT)", (error) => {
                if (error !== null) { console.log(error); }
            });

            this.db.run("INSERT OR IGNORE INTO sessions VALUES ($id, CURRENT_DATE, CURRENT_TIME)", {
                $id: sessionId,
            }, (error) => {
                if (error !== null) { console.log(error); }
            });
        });
    }

    saveUEQResults(taskId, sessionId, surveyResults) {
        this.db.serialize(() => {
            let inputArray = [ sessionId, ...surveyResults];

            this.db.run(`CREATE TABLE IF NOT EXISTS ${taskId} (sessionId TEXT PRIMARY KEY, q1 INTEGER, q2 INTEGER, q3 INTEGER, q4 INTEGER, q5 INTEGER, q6 INTEGER, q7 INTEGER, q8 INTEGER)`, (error) => {
                if (error !== null) { console.log(error); }
            });

            this.db.run(`INSERT OR IGNORE INTO ${taskId} VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, inputArray, (error) => {
                if (error !== null) { console.log(error); }
            });
        });
    }
}

module.exports = new dbConnection();