import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";
import DataService from "./services/side-comment-data.js";

var vue = new Vue({
    el: "#app",
    data: {
        header: "Please, enjoy the vue!",
        currentUser: {
            id: 123,
            avatarUrl: "https://i.pinimg.com/736x/94/4d/e6/944de633cabdd975da26380177a58c50.jpg",
            name: "Seoulbear",
        },
    },
    computed: {

    },
    methods: {
        handleCommentPosted: function (comment) {
            let dataService = new DataService();
            dataService.addEventListener("commentSaved", () => {
                this.sideComments.insertComment(comment);
            });
            dataService.saveComment(comment);
        },
    },
    mounted: function () {
        let dataService = new DataService();
        dataService.addEventListener("commentsLoaded", event => {
            // eslint-disable-next-line no-undef
            let SideComments = require("side-comments");
            this.sideComments = new SideComments("#commentable-area", this.currentUser, event.data.allComments);
            this.sideComments.on("commentPosted", comment => this.handleCommentPosted(comment));
        });
        dataService.getComments();
    },
});