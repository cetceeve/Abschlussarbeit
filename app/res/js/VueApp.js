import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";
import CommentComponent from "./components/comments.js";

const vue = new Vue({
    el: "#app",
    components: {
        "review-comments": CommentComponent,
    },
    data: {
        header: "Please, enjoy the vue!",
    },
});