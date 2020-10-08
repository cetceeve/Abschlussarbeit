import state from "../data/state.js";
import loader from "../data/loader.js";

var CommentComponent = {
    template: "#review-comments-template",
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
    methods: {
        handleCommentPosted: function (comment) {
            this.sideComments.insertComment(comment);
        },
        initSideComments: function () {
            // eslint-disable-next-line no-undef
            let SideComments = require("side-comments");
            this.sideComments = new SideComments("#commentable-area", state.user, state.comments[state.code.currentFile]);
            this.sideComments.on("commentPosted", comment => this.handleCommentPosted(comment));
        },
    },
    beforeCreate: function () {
        loader.addEventListener("commentsLoaded", () => {
            this.initSideComments();
        });
    },
    mounted: function () {
        loader.loadComments(state.code.currentFile);
    },
};

export default CommentComponent;