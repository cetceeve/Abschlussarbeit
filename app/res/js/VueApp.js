/* global Vue VueCodemirror SemanticUIVue*/
// import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";
import ChecklistComponent from "./components/checklist.js";
import CodeEditorComponent from "./components/code-editor.js";
import CommentsDisplayComponent from "./components/comments-display.js";
import FaqComponent from "./components/faq.js";
import TreeViewComponent from "./components/tree-view.js";
import store from "./data/store.js";

Vue.use(VueCodemirror);
Vue.use(SemanticUIVue);

const vue = new Vue({
    el: "#app",
    components: {
        "code-editor": CodeEditorComponent,
        "comments-display": CommentsDisplayComponent,
        "tree-view": TreeViewComponent,
        "checklist": ChecklistComponent,
        "faq": FaqComponent,
    },
    data: {
        sharedState: store.state,
    },
    methods: {
        toSha(fileSha) {
            store.setCurrentFile(fileSha);
        },
        addComment() {
            store.addComment("fileSha0000", {
                sectionId: "2",
                authorAvatarUrl: "https://media.vanityfair.com/photos/5c2fdb09ef10e32ca1332862/1:1/w_1420,h_1420,c_limit/trumpshutdownraises.jpg",
                authorName: "Trump",
                comment: "This app is wining bigly!",
            });
        },
        deleteFatamorgana() {
            store.deleteComment(store.state.content.currentFile, "99999999");
        },
        toggleChecklist() {
            store.toggleChecklistVisibility();
        },
        showFaq() {
            store.toggleFaqVisibility();
        },
    },
});