import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";
import CodeEditorComponent from "./components/code-editor.js";
import store from "./data/store.js";

/* eslint-disable-next-line no-undef */
Vue.use(VueCodemirror);

const vue = new Vue({
    el: "#app",
    components: {
        "code-editor": CodeEditorComponent,
    },
    data: {
        header: "Please, enjoy the vue!",
    },
    methods: {
        toSha(fileSha) {
            store.setCurrentFile(fileSha);
        },
        addComment() {
            store.setComment("fileSha0000", {
                sectionId: 2,
                authorAvatarUrl: "https://i.pinimg.com/originals/fe/62/e3/fe62e3a5963a4ab3310f5f95d3c72b4e.jpg",
                authorName: "Bae",
                comment: "Whats up with you?",
            });
        },
    },
});