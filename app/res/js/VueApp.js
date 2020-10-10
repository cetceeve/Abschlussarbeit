import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";
import CodeEditorComponent from "./components/code-editor.js";
import CommentComponent from "./components/comments.js";

Vue.use(VueCodemirror);

const vue = new Vue({
    el: "#app",
    components: {
        "review-comments": CommentComponent,
        "code-editor": CodeEditorComponent,
    },
    data: {
        header: "Please, enjoy the vue!",
    },
});