/* eslint-env node */
const sqlite3 = require("sqlite3").verbose(),
path = require("path");

class dbConnection {
    constructor() {
        this.db = new sqlite3.Database(path.join(__dirname + "/../data/StudyResults.db"), (error) => console.log(error));
    }
    
    registerSession(sessionId) {
        this.db.serialize(() => {
            this.db.run("CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, date TEXT, time TEXT)", (error) => console.log(error));

            this.db.run("INSERT OR IGNORE INTO sessions VALUES (?, CURRENT_DATE, CURRENT_TIME)", sessionId, (error) => console.log(error));
            
            this.db.all("SELECT * FROM sessions", function(err, rows) {
                console.log(rows);
            });
        });
    }
}

module.exports = new dbConnection();