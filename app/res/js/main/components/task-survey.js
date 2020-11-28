/* global HtmlSanitizer*/
/**
 * Display a simple survey component.
 * @module main/components/TaskSurveyComponent
 * @author Fabian Zeiher
 */

import snarkdown from "../../../../vendors/snarkdown/snarkdown.es.js";
import ueqShort from "../../../../data/ueq-short-survey.js";
import serverConnection from "../../utils/server-connection.js";
import LikertTableComponent from "./likert-table.js";

/**
* Namespace for survey component
* @namespace
*/
let TaskSurveyComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#task-survey-component-template",
    /**
    * Register Subcomponents locally.
    * @property {module:main/components/LikertTableComponent} likert-table - Component to display a table with lickert items.
    */
    components: {
        "likert-table": LikertTableComponent,
    },
    /**
    * Attributes that are exposed to accept data from the parent component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    props: {
        task: Object,
    },
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    data() {
        return {
            taskSuccess: {
                description: "Wir bewerten nur die Anwendung. Antworte also so ehrlich wie möglich.",
                value: null,
                options: [
                    {
                        text: "Ja",
                        value: 1,
                    },
                    {
                        text: "Nein",
                        value: 0,
                    },
                ],
            },
            survey: ueqShort,
        };
    },
    /** Hold computed properties for the component.
     * @property {Boolean} isComplete - Sentinel to determine if user completed the survey.
     * @property {String} renderedTaskDescription - Transformed markdown html string.
    */
    computed: {
        isComplete() {
            return this.survey.items.every(currentValue => currentValue.value !== null) && this.taskSuccess.value !== null;
        },
        renderedTaskDescription() {
            // Sanitizing snarkdowns Html-output is very important to avoid XSS attacks
            return HtmlSanitizer.SanitizeHtml(snarkdown(this.task.description));
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} sendResults - Save results to the server.
    */
    methods: {
        sendResults() {
            let data = {
                taskId: this.task.id,
                taskSuccess: this.taskSuccess.value,
                taskCompletionTime: this.task.taskCompletionTime === undefined ? 0 : this.task.taskCompletionTime,
                surveyResults: this.survey.items.map(item => parseInt(item.value)),
            };
            console.log(data);
            serverConnection.sendSurveyResults("/task", data).then(response => {
                if (response.status === 200) {
                    this.$emit("task-survey-completed"); 
                }
            });
        },
    },
};

export default TaskSurveyComponent;