import {
    Event,
    Observable,
} from "./utils/Observable.js";
import DataService from "./services/side-comment-data.js";

class SideComments extends Observable {
    constructor() {
        super();

        this.initDataServiceListeners();
        DataService.getComments();
    }

    initDataServiceListeners() {
        DataService.addEventListener("commentsLoaded", event => this.initSideComments(event.data));
    }

    initSideComments(commentData) {
        // eslint-disable-next-line no-undef
        let SideComments = require("side-comments");
        this.sideComments = new SideComments("#commentable-area", this.currentUser, commentData);

        this.initUIListeners();

        this.notifyAll(new Event("initDone", {
            message: "Side Comments are initialized!",
        }));
    }

    initUIListeners() {
        this.sideComments.on("commentPosted", comment => this.handleCommentPosted(comment));
    }

    get currentUser() {
        return {
            id: 123,
            avatarUrl: "https://pbs.twimg.com/profile_images/964204609186222081/I7Mc16_z.jpg",
            name: "Seoulbear",
        };
    }

    handleCommentPosted(comment) {
        console.log(comment);
    }
}

export default new SideComments();