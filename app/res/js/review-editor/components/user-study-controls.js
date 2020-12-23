/* global HtmlSanitizer */
import store from "../model/store.js";
import snarkdown from "../../../../vendors/snarkdown/snarkdown.es.js";
// import logger from "../../utils/logger.js";

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
    * @property {Boolean} taskDescriptionIsVisible - Sentinel to determine if task desctiption should be visible.
    * @property {Boolean} taskControlsAreVisible - Sentinel to determine if task controls should be visible.
    * @property {Boolean} mainIsLoading - Used to show loading animation on page close.
    * @property {Boolean} taskStarted - Sentinel to determine if task is already started. Used to return to correct state when user left the page.
    * @property {Number} taskStartTime - Timestamp for when task was started. Used to compute task completion time.
    * @property {Number} taskEndTime - Timestamp for when task was ended. Used to compute task completion time.
    */
    data() {
        return {
            taskDescriptionIsVisible: (localStorage.getItem("hideUsabilityTaskDescription") !== "true"),
            taskControlsAreVisible: false,
            metaData: store.state.meta,
            mainIsLoading: false,

            taskStarted: localStorage.getItem("startTaskTime") !== null ? true : false,
            taskStartTime: localStorage.getItem("startTaskTime") !== null ? parseFloat(localStorage.getItem("startTaskTime")) : null,
            taskEndTime: null,
        };
    },
    /** Hold computed properties for the component.
    * @property {String} renderedDescription - Transformed markdown html string.
    * @property {Object} currentTask - Object representing the current usability task.
    * @property {String} barIcon - returns the icon to be displayed in the ui
    */
    computed: {
        currentTask() {
            return localStorage.getItem("currentTask") !== null ? JSON.parse(localStorage.getItem("currentTask")) : { id: null, name: "unknown", description: "unknown" };
        },
        renderedDescription() {
            // Sanitizing snarkdowns Html-output is very important to avoid XSS attacks
            return HtmlSanitizer.SanitizeHtml(snarkdown(this.currentTask.description));
        },
        barIcon() {
            return this.taskControlsAreVisible ? "caret up" : "caret down";
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} toggleTaskDesciption - Toggles modal to show user study task description.
    * @property {Function} exitTask - Exits the code review editor.
    * @property {Function} toggleExitConfirmation - Toggles exit confirmation modal via application state.
    * @property {Funtion} toggleTaskControls - Toggles task controls interface.
    */
    methods: {
        toggleTaskDesciption() {
            this.taskDescriptionIsVisible = !this.taskDescriptionIsVisible;
            // set starting timestamp for task completion time
            if (!this.taskStarted) {
                this.taskStarted = true;
                this.taskStartTime = Date.now();
                localStorage.setItem("hideUsabilityTaskDescription", "true");
                localStorage.setItem("startTaskTime", this.taskStartTime);
            }
        },
        exitTask() {
            if (this.currentTask.id !== null) {
                this.taskEndTime = Date.now();

                // allow last log connection to close out
                setTimeout(() => {
                    // update current task. this is a saveguard in case multiple tabs are used
                    let task = localStorage.getItem("currentTask") !== null ? JSON.parse(localStorage.getItem("currentTask")) : { id: null, name: "unknown", description: "unknown" };
                    task.isFinished = true;
                    task.taskCompletionTime = Math.round((this.taskEndTime - this.taskStartTime) / 1000);
                    localStorage.setItem("currentTask", JSON.stringify(task));
    
                    // clear localstroage
                    localStorage.removeItem("state");
                    localStorage.removeItem("hideUsabilityTaskDescription");
                    localStorage.removeItem("startTaskTime");
    
                    // return to main page
                    location.href = "./";
                }, 100);
            }
        },
        toggleExitConfirmation() {
            store.toggleExitConfirmationVisibility();
        },
        toggleTaskControls() {
            this.taskControlsAreVisible = !this.taskControlsAreVisible;
        },
    },
    // triggered after page is fully loaded
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