/* global Vue VueCodemirror SemanticUIVue */
import ChecklistComponent from "./components/checklist.js";
import CodeEditorComponent from "./components/code-editor.js";
import CommentsDisplayComponent from "./components/comments-display.js";
import FaqComponent from "./components/faq.js";
import TaskComponent from "./components/task.js";
import TreeViewComponent from "./components/tree-view.js";
import UserStudyControlsComponent from "./components/user-study-controls.js";
import store from "./model/store.js";
import "../utils/logger.js";

Vue.use(VueCodemirror);
Vue.use(SemanticUIVue);

/**
* Base page for the review editor.
* @module review-editor/ReviewEditor
* @requires module:review-editor/model/Store
* @requires module:review-editor/components/CodeEditorComponent
* @requires module:review-editor/components/CommentsDisplayComponent
* @requires module:review-editor/components/TreeViewComponent
* @requires module:review-editor/components/ChecklistComponent
* @requires module:review-editor/components/FaqComponent
* @requires module:review-editor/components/TaskComponent
* @requires module:review-editor/components/UserStudyControlsComponent
* @author Fabian Zeiher
*/

// eslint-disable-next-line no-new
new Vue({
    /** Css-selector for Vue app root.
    * @type {String}
    */
    el: "#app",
    /**
    * Register Subcomponents locally.
    * @property {module:review-editor/components/CodeEditorComponent} code-editor - 
    * @property {module:review-editor/components/CommentsDisplayComponent} comments-display - 
    * @property {module:review-editor/components/TreeViewComponent} tree-view - 
    * @property {module:review-editor/components/ChecklistComponent} checklist - 
    * @property {module:review-editor/components/FaqComponent} faq-modal - 
    * @property {module:review-editor/components/TaskComponent} task-modal - 
    * @property {module:review-editor/components/UserStudyControlsComponent} user-study-controls - 
    */
    components: {
        "code-editor": CodeEditorComponent,
        "comments-display": CommentsDisplayComponent,
        "tree-view": TreeViewComponent,
        "checklist": ChecklistComponent,
        "faq-modal": FaqComponent,
        "task-modal": TaskComponent,
        "user-study-controls": UserStudyControlsComponent,
    },
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {module:review-editor/model/Store~State} sharedState - Data model for the app, see store.state. Please note that components utilize their own connections to the model.
    */
    data: {
        sharedState: store.state,
    },
    /**
    * Hold methods for this component.
    * @property {Function} toggleChecklist - Toggles the checklist, the checklist is a seperate component, that can be positioned freely.
    * @property {Function} showFaq - Displays faq modal
    * @property {Function} showTask - Displays task modal
    * @property {Function} showExitConfirmation - Displays exit confirmation modal
    */
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
        showExitConfirmation() {
            store.toggleExitConfirmationVisibility();
        },
    },
    /**
    * Code to execute when component is mounted, reference Vue Lifecycle below.
    * Add Comment Marker Components as LineWidgets. Listen for events from codemirror to handle rerender and content changes.
    * @see https://vuejs.org/v2/guide/instance.html
    */
    mounted() {
        let isMobile = window.matchMedia("only screen and (max-width: 1049px)").matches;

        if (isMobile) {
            document.querySelector("#loader-text").style.display = "none";
            document.querySelector("#spinner").style.display = "none";
            document.querySelector("#mobile-sorry").style.display = "block";
        } else {
            document.querySelector("#startup").style.display = "none";
            document.querySelector("#app").style.display = "block";
        } 
    },
});