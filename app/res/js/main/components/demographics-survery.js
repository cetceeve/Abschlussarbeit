/**
 * Display a simple survey component.
 * @module main/components/DemographicsSurveyComponent
 * @author Fabian Zeiher
 */

import serverConnection from "../../utils/server-connection.js";
import LikertTableComponent from "./likert-table.js";

/**
* Namespace for survey component
* @namespace
*/
let DemographicsSurveyComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#demographics-component-template",
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
            survey: {},
        };
    },
    /** Hold computed properties for the component.
     * @property {Boolean} isComplete - Sentinel to determine if user completed the survey.
    */
    computed: {
        isComplete() {
            return false;
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} sendResults - Save results to the server.
    */
    methods: {
        sendResults() {
            let data = {
            };
            console.log(data);
            serverConnection.sendSurveyResults("/demographics", data).then(response => {
                if (response.status === 200) {
                    // this.$emit("demographics-survey-completed"); 
                }
            });
        },
    },
};

export default DemographicsSurveyComponent;