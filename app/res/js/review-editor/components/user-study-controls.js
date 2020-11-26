/* global HtmlSanitizer */
import store from "../model/store.js";
import snarkdown from "../../../../vendors/snarkdown/snarkdown.es.js";
import logger from "../../utils/logger.js";

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
            taskStarted: false,
            taskStartTime: null,
            taskEndTime: null,
        };
    },
    /** Hold computed properties for the component.
    * @property {String} renderedDescription - Transformed markdown html string.
    */
    computed: {
        currentTask() {
            return localStorage.getItem("currentTask") !== null ? JSON.parse(localStorage.getItem("currentTask")) : { id: null, name: "unknown", description: "unknown" };
        },
        renderedDescription() {
            // Sanitizing snarkdowns Html-output is very important to avoid XSS attacks
            return HtmlSanitizer.SanitizeHtml(snarkdown(this.currentTask.description));
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} toggleTaskDesciption - Toggles modal to show user study task description.
    * @property {Function} exitTask - Exits the code review editor.
    * @property {Function} toggleExitConfirmation - Toggles exit confirmation modal via application state.
    */
    methods: {
        toggleTaskDesciption(event) {
            if (!this.taskStarted) {
                this.taskStarted = true;
                this.taskStartTime = performance.now();
            }
            this.taskDescriptionIsVisible = !this.taskDescriptionIsVisible;
            logger.log({ eventType: event.type, eventTarget: "task-description-button", posX: event.clientX, posY: event.clientY });
        },
        exitTask(event) {
            logger.log({ eventType: event.type, eventTarget: "task-exit-confirmation-button", posX: event.clientX, posY: event.clientY });
            if (this.currentTask.id !== null) {
                this.taskEndTime = performance.now();

                // update current task. this is a saveguard in case multiple tabs are used
                let task = localStorage.getItem("currentTask") !== null ? JSON.parse(localStorage.getItem("currentTask")) : { id: null, name: "unknown", description: "unknown" };
                task.isFinished = true;
                task.taskCompletionTime = Math.round((this.taskEndTime - this.taskStartTime) / 1000);
                localStorage.setItem("currentTask", JSON.stringify(task));
                location.href = "./";
            }
        },
        toggleExitConfirmation() {
            store.toggleExitConfirmationVisibility();
        },
    },
    mounted() {
        // task is already finished, exit editor immidiatly
        if (this.currentTask.isFinished) {
            // wait for initialization to be completed
            this.$nextTick(function () {
                location.href = "./";
            });
        }
    },
};

export default UserStudyControlsComponent;