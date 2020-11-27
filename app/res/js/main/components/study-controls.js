/**
* Compnent to give the user control in the study
* @module main/components/StudyControlsComponent
* @author Fabian Zeiher
*/

/**
* Namespace for study controls component
* @namespace
*/
let StudyControlsComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#study-controls-component-template",
    /**
    * Attributes that are exposed to accept data from the parent component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    props: {
        allowExit: Boolean,
        taskList: Array,
        isFirstTask: Boolean,
        maxTaskNumber: Number,
        numTasksCompleted: Number,
    },
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {Number} percent - control parameter for progress bar
    */
    data() {
        return {
            exitConfirmationIsVisible: false,
        };
    },
    /** Hold computed properties for the component.
    * @property {String} label - Label to be displayed below progree bar.
    */
    computed: {
        progressPercent() {
            return 100 - ((this.taskList.length / this.maxTaskNumber) * 100); 
        },
        progressLabel() {
            return `Du hast ${this.numTasksCompleted} von ${this.maxTaskNumber} möglichen Tasks abgeschlossen und ${this.numTasksCompleted * 0.25} VP-Stunden gesammelt.`;
        },
        allTasksComplete() {
            return this.taskList.length < 1;
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} startEditor - Fetches a new state into local storage and redirects to review editor
    */
    methods: {
        toggleExitConfirmation() {
            this.exitConfirmationIsVisible = !this.exitConfirmationIsVisible;
        },
    },
};

export default StudyControlsComponent;