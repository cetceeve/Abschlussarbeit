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
    * @property {module:review-editor/model/Store~TreeItem} item - Data item for this node.
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    props: {
        isfirsttask: Boolean,
        tasklist: Array,
        maxtasknumber: Number,
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
        percent() {
            return 100 - ((this.tasklist.length / this.maxtasknumber) * 100); 
        },
        label() {
            return `${this.maxtasknumber - this.tasklist.length} von ${this.maxtasknumber} Tasks abgeschlossen`;
        },
        allTasksComplete() {
            return this.tasklist.length < 1;
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