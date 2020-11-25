/**
 * Module used to log user interaction for testing purposes
 * @module utils/logger
 * @author Fabian Zeiher <fzeiher@gmail.com>
 */

let logger = {
    base: {
        taskID: null,
        timestamp: null,
        windowHeight: null,
        windowWidth: null,
        eventType: null,
        eventTarget: null,
        payload: null,
        shortHand: null,
    },
};

export default logger;