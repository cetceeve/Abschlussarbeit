/**
* Display a simple survey component.
* @module main/components/TaskSurveyComponent
* @author Fabian Zeiher
*/

import ueqShort from "../../../../data/ueq-short-survey.js";
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
    model: {
        prop: "task",
        event: "input",
    },
    /**
    * Attributes that are exposed to accept data from the parent component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @property {module:review-editor/model/Store~TreeItem} item - Data item for this node.
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
                        value: 0,
                    },
                    {
                        text: "Nein",
                        value: 1,
                    },
                ],
            },
            survey: ueqShort,
        };
    },
    /** Hold computed properties for the component.
    * @property {Boolean} isComplete - Sentinel to determine if user completed the survey.
    */
    computed: {
        isComplete() {
            return this.survey.items.every(currentValue => currentValue.value !== null) && this.taskSuccess.value !== null;
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} sendResults - Save results to the server.
    */
    methods: {
        sendResults() {
            let clone = { ...this.task };
            clone.surveyCompleted = true;
            localStorage.setItem("currentTask", JSON.stringify(clone));
            this.$emit("input", clone);
        },
    },
};

export default TaskSurveyComponent;