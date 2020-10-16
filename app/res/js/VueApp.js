import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";
import CodeEditorComponent from "./components/code-editor.js";
import CommentsMarkerComponent from "./components/comments-marker.js";

/* eslint-disable-next-line no-undef */
Vue.use(VueCodemirror);

const vue = new Vue({
    el: "#app",
    components: {
        "code-editor": CodeEditorComponent,
        "comment-marker": CommentsMarkerComponent,
    },
    data: {
        header: "Please, enjoy the vue!",
    },
});