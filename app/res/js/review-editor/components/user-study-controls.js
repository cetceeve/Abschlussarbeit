/* global HtmlSanitizer */
import store from "../model/store.js";
import snarkdown from "../../../../vendors/snarkdown/snarkdown.es.js";

/**
* Display a simple task modal.
* @module review-editor/components/UserStudyControlsComponent
* @requires module:review-editor/model/Store
* @author Fabian Zeiher
*/

/**
* Namespace for FAQ component
* @namespace
*/
let UserStudyControlsComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#user-study-controls-component-template",
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {Object} metaData - Data object for meta data which holds information relevant to the user study, see store.state.
    * @property {Boolean} taskDescriptionIsVisible=true - Sentinel to determine if task desctiption should be visible.
    */
    data() {
        return {
            metaData: store.state.meta,
            taskDescriptionIsVisible: true,
        };
    },
    /** Hold computed properties for the component.
    * @property {String} renderedDescription - Transformed markdown html string.
    */
    computed: {
        renderedDescription() {
            // Sanitizing snarkdowns Html-output is very important to avoid XSS attacks
            return HtmlSanitizer.SanitizeHtml(snarkdown(this.metaData.task.description));
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} toggleTaskDesciption - Toggles modal to show user study task description.
    * @property {Function} exitTask - Exits the code review editor.
    * @property {Function} toggleExitConfirmation - Toggles exit confirmation modal via application state.
    */
    methods: {
        toggleTaskDesciption() {
            this.taskDescriptionIsVisible = !this.taskDescriptionIsVisible;
        },
        exitTask() {
            location.href = "./";
        },
        toggleExitConfirmation() {
            store.toggleExitConfirmationVisibility();
        },
    },
};

export default UserStudyControlsComponent;