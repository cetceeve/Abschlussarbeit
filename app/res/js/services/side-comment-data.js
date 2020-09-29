import {
    Event,
    Observable,
} from "../utils/Observable.js";

class SideCommentsDataService extends Observable {
    constructor() {
        super();
    }

    getComments() {
        console.log("SideCommentService: init all comment fetch");
        this.fetchAllComments().then(
            comments => {
                this.notifyAll(new Event("commentsLoaded", comments));
            });
    }

    async fetchAllComments() {
        let serverRes = await fetch("/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            data = await serverRes.json();
        return data;
    }
}

export default new SideCommentsDataService();