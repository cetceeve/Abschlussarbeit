/* eslint-env node */
const { v4: uuidv4 } = require("uuid"),
crypto = require("crypto");

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
                // disguise user ip as hash for data privacy
                let ipHash = crypto.createHash("sha1").update(req.ip).digest("hex");
                // check if ip was already, if true, reasign old sessionId
                // this is a mechanism against fraud
                this.redis.get(ipHash, (err, reply) => {
                    if (reply === null) {
                        // this ip was not seen before, create a new sessionId and store it as a cookie
                        let newSessionId = uuidv4();
                        res.cookie("sessionId", newSessionId, { 
                            expires: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 30),
                            httpOnly: true,
                        });
                        // save the ip and sessionId for 23 hours
                        this.redis.set(ipHash, newSessionId);
                        this.redis.expire(ipHash, 60*60*24);
                        // register the new session
                        this.redis.sadd("sessions", newSessionId);
                        this.sql.registerSession(newSessionId);
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
        };
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