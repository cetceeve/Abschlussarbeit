import {
    Event,
    Observable,
} from "../utils/Observable.js";
import state from "./state.js";
import api from "./api.js";

class Loader extends Observable {
    constructor() {
        super();
    }

    loadComments(fileSha) {
        api.fetchFileComments(fileSha).then(data => {
            state.setComments(fileSha, data);
            this.notifyAll(new Event("commentsLoaded"));
        });
    }
}

export default new Loader();