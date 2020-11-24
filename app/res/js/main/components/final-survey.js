/**
 * Display a simple survey component.
 * @module main/components/FinalSurveyComponent
 * @author Fabian Zeiher
 */

import sus from "../../../../data/sus-survey.js";
import LikertTableComponent from "./likert-table.js";

/**
* Namespace for survey component
* @namespace
*/
let FinalSurveyComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#final-survey-component-template",
    /**
    * Register Subcomponents locally.
    * @property {module:main/components/LikertTableComponent} likert-table - Component to display a table with lickert items.
    */
    components: {
        "likert-table": LikertTableComponent,
    },
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    data() {
        return {
            survey: sus,
        };
    },
    /** Hold computed properties for the component.
    * @property {Boolean} isComplete - Sentinel to determine if user completed the survey.
    */
    computed: {
        isComplete() {
            return this.survey.items.every(currentValue => currentValue.value !== null);
        },
    },
    /**
    * Hold methods for this component.
    */
    methods: {
        sendResults() {
            localStorage.setItem("studyCompleted", "true");
            this.$emit("study-completed");
        },
    },
};

export default FinalSurveyComponent;