/* global Vue */
/**
* Module used to log user interaction for testing purposes
* @module utils/logger
* @author Fabian Zeiher <fzeiher@gmail.com>
*/

import serverConnection from "./server-connection.js";
import debounce from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.15/debounce.js";

Vue.mixin({
    data() {
        return {
            loggerTaskId: JSON.parse(localStorage.getItem("currentTask")) ? JSON.parse(localStorage.getItem("currentTask")).id : "unknown",
            scrolling: false,
            startTime: Date.now(),
        };
    },
    methods: {
        loggerBase(event) {
            return {
                taskID: this.loggerTaskId,
                time: new Date().toLocaleString(),
                timeStamp: (Date.now() - this.startTime) / 1000,
                windowHeight: window.outerHeight,
                windowWidth: window.outerWidth,
                type: event.type || null,
                target: event.target.id || null,
                posX: event.clientX || null,
                posY: event.clientY || null,
                tag: event.target.tagName || null,
                content: null,
                data: null,
                info: null,
            };
        },
        logger: async function(event, input) {
            let logData = { ...this.loggerBase(event), ...input};
            serverConnection.sendLog(logData);
        },
        loggerDebounced: debounce(function(event, input) { this.logger(event, input); }, 300, { "leading": true, "trailing": false}),
    },
});