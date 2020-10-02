import {
    Event,
    Observable,
} from "./utils/Observable.js";
import DataService from "./services/side-comment-data.js";

class SideComments extends Observable {
    constructor(wrapper) {
        super();

        let dataService = new DataService();
        dataService.addEventListener("commentsLoaded", event => {
            // eslint-disable-next-line no-undef
            let SideComments = require("side-comments");
            this.sideComments = new SideComments(wrapper, this.currentUser, event.data.allComments);
            this.initUIListeners();

            this.notifyAll(new Event("initDone", {
                message: "Side Comments are initialized!",
            }));
        });
        dataService.getComments();
    }

    initUIListeners() {
        this.sideComments.on("commentPosted", comment => this.handleCommentPosted(comment));
    }

    get currentUser() {
        return {
            id: 123,
            avatarUrl: "https://i.pinimg.com/736x/94/4d/e6/944de633cabdd975da26380177a58c50.jpg",
            name: "Seoulbear",
        };
    }

    handleCommentPosted(comment) {
        let dataService = new DataService();
        dataService.addEventListener("commentSaved", () => {
            this.sideComments.insertComment(comment);
        });
        dataService.saveComment(comment);
    }
}

export default SideComments;