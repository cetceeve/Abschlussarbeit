/**
* Compnent to give the user control in the study
* @module main/components/StudyControlsComponent
* @author Fabian Zeiher
*/

import serverConnection from "../../utils/server-connection.js";

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
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {Number} percent - control parameter for progress bar
    */
    data() {
        return {
            percent: 10,
        };
    },
    /** Hold computed properties for the component.
    * @property {String} label - Label to be displayed below progree bar.
    */
    computed: {
        label() {
            return `${this.percent}% Complete`;
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} startEditor - Fetches a new state into local storage and redirects to review editor
    */
    methods: {
        startEditor() {
            serverConnection.fetchState().then(data => {
                localStorage.setItem("state", data.state);
                location.href = "./review-editor";
                console.log("start editor");
            });
        },
    },
};

export default StudyControlsComponent;