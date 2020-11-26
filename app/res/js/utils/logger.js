/**
* Module used to log user interaction for testing purposes
* @module utils/logger
* @author Fabian Zeiher <fzeiher@gmail.com>
*/

import serverConnection from "./server-connection.js";

let logger = {
    taskId: null,
    base() {
        return {
            taskID: this.taskId,
            timestamp: new Date().toLocaleString(),
            windowHeight: null,
            windowWidth: null,
            eventType: null,
            eventTarget: null,
            payload: null,
            shortHand: null,
        };
    },
    log: async function(input) {
        let logData = { ...this.base(), ...input};
        serverConnection.sendLog(logData);
    },
};

logger.taskId = JSON.parse(localStorage.getItem("currentTask")).id;

export default logger;