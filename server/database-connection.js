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
                if (error === null) { console.log("DB: registered sission: " + sessionId); }
                else { console.log(error); }
            });
        });
    }
    
    saveUEQResults(sessionId, taskId, surveyResults) {
        this.db.serialize(() => {
            let inputArray = [ sessionId, ...surveyResults];
            
            this.db.run(`CREATE TABLE IF NOT EXISTS ${taskId} (sessionId TEXT PRIMARY KEY, q1 INTEGER, q2 INTEGER, q3 INTEGER, q4 INTEGER, q5 INTEGER, q6 INTEGER, q7 INTEGER, q8 INTEGER)`, (error) => {
                if (error !== null) { console.log(error); }
            });
            
            this.db.run(`INSERT OR IGNORE INTO ${taskId} VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, inputArray, (error) => {
                if (error === null) { console.log("DB: saved UEQ result: " + surveyResults); }
                else { console.log(error); }
            });
        });
    }
    
    saveSUSResults(sessionId, surveyResults) {
        this.db.serialize(() => {
            let inputArray = [ sessionId, ...surveyResults];
            
            this.db.run("CREATE TABLE IF NOT EXISTS sus (sessionId TEXT PRIMARY KEY, q1 INTEGER, q2 INTEGER, q3 INTEGER, q4 INTEGER, q5 INTEGER, q6 INTEGER, q7 INTEGER, q8 INTEGER, q9 INTEGER, q10 INTEGER)", (error) => {
                if (error !== null) { console.log(error); }
            });
            
            this.db.run("INSERT OR IGNORE INTO sus VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", inputArray, (error) => {
                if (error === null) { console.log("DB: saved SUS result: " + surveyResults); }
                else { console.log(error); }
            });
        });
    }
    
    saveTaskSuccessResults(sessionId, taskId, taskSuccess) {
        this.db.serialize(() => {
            this.db.run("CREATE TABLE IF NOT EXISTS tsr (sessionId TEXT PRIMARY KEY, exploration INTEGER, task1 INTEGER, task2 INTEGER, task3 INTEGER, task4 INTEGER, task5 INTEGER)", (error) => {
                if (error !== null) { console.log(error); }
            });
            
            this.db.run("INSERT OR IGNORE INTO tsr(sessionId) VALUES($sessionId)", {
                $sessionId: sessionId,
            }, (error) => {
                if (error !== null) { console.log(error); }
            });
            
            this.db.run(`UPDATE OR IGNORE tsr SET ${taskId}=$value WHERE tsr.sessionId = $sessionId`, {
                $sessionId: sessionId,
                $value: taskSuccess,
            }, (error) => {
                if (error === null) { console.log("DB: saved TSR result: " + taskId + " - " + taskSuccess); }
                else { console.log(error); }
            });
        });
    }

    saveTaskCompletionTime(sessionId, taskId, taskCompletionTime) {
        this.db.serialize(() => {
            this.db.run("CREATE TABLE IF NOT EXISTS tct (sessionId TEXT PRIMARY KEY, exploration INTEGER, task1 INTEGER, task2 INTEGER, task3 INTEGER, task4 INTEGER, task5 INTEGER)", (error) => {
                if (error !== null) { console.log(error); }
            });

            this.db.run("INSERT OR IGNORE INTO tct(sessionId) VALUES($sessionId)", {
                $sessionId: sessionId,
            }, (error) => {
                if (error !== null) { console.log(error); }
            });

            this.db.run(`UPDATE OR IGNORE tct SET ${taskId}=$value WHERE tct.sessionId = $sessionId`, {
                $sessionId: sessionId,
                $value: taskCompletionTime,
            }, (error) => {
                if (error === null) { console.log("DB: saved TCT result: " + taskId + " - " + taskCompletionTime); }
                else { console.log(error); }
            });
        });
    }
}

module.exports = new dbConnection();