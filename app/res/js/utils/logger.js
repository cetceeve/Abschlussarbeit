/**
* Module used to log user interaction for testing purposes
* @module utils/logger
* @author Fabian Zeiher <fzeiher@gmail.com>
*/

import serverConnection from "./server-connection.js";

class Logger {
    constructor() {
        this.taskId = JSON.parse(localStorage.getItem("currentTask")).id;
    }

    base() {
        return {
            taskID: this.taskId,
            time: new Date().toLocaleString(),
            timestamp: Date.now(),
            windowHeight: window.outerHeight,
            windowWidth: window.outerWidth,
            eventType: null,
            eventTarget: null,
            posX: null,
            posY: null,
            payload: null,
            shortHand: null,
        };
    }

    async log(input) {
        let logData = { ...this.base(), ...input};
        console.log(logData);
        // serverConnection.sendLog(logData);
    }
}

export default new Logger();