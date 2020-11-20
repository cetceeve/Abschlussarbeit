/* global Vue VueCodemirror SemanticUIVue HtmlSanitizer*/
import ChecklistComponent from "./components/checklist.js";
import CodeEditorComponent from "./components/code-editor.js";
import CommentsDisplayComponent from "./components/comments-display.js";
import FaqComponent from "./components/faq.js";
import TaskComponent from "./components/task.js";
import TreeViewComponent from "./components/tree-view.js";
import store from "./model/store.js";
import snarkdown from "../../vendors/snarkdown/snarkdown.es.js";

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
        taskDescriptionIsVisible: true,
        exitConfirmationIsVisible: false,
        currentTaskName: "undefined",
    },
    /** Hold computed properties for the component.
    * @property {String} renderedMarkdown - Transformed markdown html string.
    */
    computed: {
        renderedMarkdown() {
            // Sanitizing snarkdowns Html-output is very important to avoid XSS attacks
            return HtmlSanitizer.SanitizeHtml(snarkdown(localStorage.getItem("currentTaskDescription")));
        },
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
        toggleTaskDesciption() {
            this.taskDescriptionIsVisible = !this.taskDescriptionIsVisible;
        },
        exit() {
            location.href = "./";
        },
    },
    mounted() {
        this.currentTaskName = localStorage.getItem("currentTaskName");
        document.querySelector("#loader").style.display = "none";
        document.querySelector("#app").style.display = "block"; 
    },
});