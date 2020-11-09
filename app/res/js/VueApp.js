/* global Vue VueCodemirror SemanticUIVue*/
import ChecklistComponent from "./components/checklist.js";
import CodeEditorComponent from "./components/code-editor.js";
import CommentsDisplayComponent from "./components/comments-display.js";
import FaqComponent from "./components/faq.js";
import TreeViewComponent from "./components/tree-view.js";
import store from "./data/store.js";
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
        "faq": FaqComponent,
    },
    data: {
        sharedState: store.state,
    },
    methods: {
        toggleChecklist() {
            store.toggleChecklistVisibility();
        },
        showFaq() {
            store.toggleFaqVisibility();
        },
    },
    mounted() {
        let md = "_this_ is **easy** to `use`.",
         html = snarkdown(md);
        console.log(html);
    },
});