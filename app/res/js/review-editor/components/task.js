/* global HtmlSanitizer */
import store from "../model/store.js";
import snarkdown from "../../../../vendors/snarkdown/snarkdown.es.js";

/**
* Display a simple task modal.
* @module components/TaskComponent
* @requires module:data/store
* @author Fabian Zeiher
*/

/**
* Namespace for FAQ component
* @namespace
*/
let TaskComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#task-component-template",
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {Object} taskData - Data object for task, see store.state
    */
    data() {
        return {
            taskData: store.state.task,
        };
    },
    /** Hold computed properties for the component.
    * @property {String} renderedMarkdown - Transformed markdown html string.
    */
    computed: {
        renderedMarkdown() {
            // Sanitizing snarkdowns Html-output is very important to avoid XSS attacks
            return HtmlSanitizer.SanitizeHtml(snarkdown(this.taskData.content));
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} toggle - Toggles modal via application state.
    */
    methods: {
        toggle() {
            store.toggleTaskVisibility();
        },
    },
};

export default TaskComponent;