/* eslint-env node */
const { v4: uuidv4 } = require("uuid"),
mailTransporter = require("nodemailer").createTransport({
    service: "gmail",
    auth: {
      user: "fzeiher@gmail.com",
      pass: "nslnpjmvcbfncjpm",
    },
  });

class ServerUtils {
    constructor(server, sql, redis) {
        this.server = server;
        this.sql = sql;
        this.redis = redis;
    }
    
    sessionIdMiddleware() {
        return (req, res, next) => {
            // check if client sent session id cookie
            if (req.cookies.sessionId === undefined) {
                let newSessionId = uuidv4();
                res.cookie("sessionId", newSessionId, { 
                    expires: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 30),
                    httpOnly: true,
                    secure: true,
                });
                // register the new session
                this.redis.sadd("sessions", newSessionId);
                this.sql.registerSession(newSessionId);
                console.log("SERVER: Cookie created successfully");
            }
            next();
        };
    }

    mail(sessionId, text) {
        let mailOptions = {
            from: "fzeiher@gmail.com",
            to: "fzeiher@gmail.com",
            subject: "A message from session: " + sessionId,
            text: text,
        };
        mailTransporter.sendMail(mailOptions, function(error, info) {
            if (error) { console.log(error); }
            else { console.log("Email sent: " + info.response); }
        });
    }
    
    shutDown() {
        console.log("Received kill signal, shutting down gracefully");
        this.server.close(() => {
            console.log("Closed out remaining connections");
            this.sql.close(() => {
                this.redis.quit(() => {
                    console.log("Closed databases");
                    process.exit(0);
                });
            });
        });
        
        setTimeout(() => {
            console.error("Could not close connections in time, shutting down databases");
            this.sql.close(() => {
                this.redis.quit(() => {
                    console.log("Closed databases");
                    process.exit(1);
                });
            });
        }, 30000);
        
        setTimeout(() => {
            console.error("Could not close databases, forcefully shutting down");
            process.exit(1);
        }, 40000);
    }
}

module.exports = ServerUtils;