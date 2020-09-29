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
                this.notifyAll(new Event("commentsLoaded", {
                    allComments: comments,
                }));
            });
    }

    async fetchAllComments() {
        let serverRes = await fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await serverRes.json();
    }

    saveComment(comment) {
        console.log("SideCommentService: Saving Comment");
        this.fetchSaveComment(comment).then(
            success => {
                if (success) {
                    this.notifyAll(new Event("commentSaved"));
                }
            });
    }

    async fetchSaveComment(comment) {
        let serverRes = await fetch("/insert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        });
        return await serverRes.json();
    }
}

export default SideCommentsDataService;