import storage from "../data/storage.js";

var CommentComponent = {
    template: "#review-comments-component-template",
    data() {
        return {
            items: [{
                    id: 1,
                    value: "this is the first line",
                },
                {
                    id: 2,
                    value: "lila morgenmantel",
                },
                {
                    id: 3,
                    value: "wittel",
                },
                {
                    id: 4,
                    value: "spezialitäten vom konditor",
                },
            ],
        };
    },
    mounted: function () {
        // eslint-disable-next-line no-undef
        let SideComments = require("side-comments");
        this.sideComments = new SideComments("#commentable-area", storage.state.user);

        for (let comment of storage.state.comments[storage.state.code.currentFile]) {
            this.sideComments.insertComment(comment);
        }

        this.sideComments.on("commentPosted", comment => {
            this.sideComments.insertComment(comment);
            storage.setComment(storage.state.code.currentFile, comment);
        });
    },
};

export default CommentComponent;