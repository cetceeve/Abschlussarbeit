/* global Vue VueCodemirror SemanticUIVue*/
import ChecklistComponent from "./components/checklist.js";
import CodeEditorComponent from "./components/code-editor.js";
import CommentsDisplayComponent from "./components/comments-display.js";
import FaqComponent from "./components/faq.js";
import TaskComponent from "./components/task.js";
import TreeViewComponent from "./components/tree-view.js";
import store from "./model/store.js";

Vue.use(VueCodemirror);
Vue.use(SemanticUIVue);

// eslint-disable-next-line no-new
new Vue({
    el: "#app",
    components: {
        "code-editor": CodeEditorComponent,
        "comments-display": CommentsDisplayComponent,
        "tree-view": TreeViewComponent,
        "checklist": ChecklistComponent,
        "faq-modal": FaqComponent,
        "task-modal": TaskComponent,
    },
    data: {
        sharedState: store.state,
        exitConfirmationIsVisible: false,
    },
    methods: {
        toggleChecklist() {
            store.toggleChecklistVisibility();
        },
        showFaq() {
            store.toggleFaqVisibility();
        },
        showTask() {
            store.toggleTaskVisibility();
        },
        toggleExitConfirmation() {
            this.exitConfirmationIsVisible = !this.exitConfirmationIsVisible;
        },
        exit() {
            location.href = "./";
        },
    },
    mounted() {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("#app").style.display = "block"; 
    },
});