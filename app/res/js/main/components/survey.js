/**
 * Display a simple survey component.
 * @module main/components/SurveyComponent
 * @author Fabian Zeiher
 */

import serverConnection from "../../utils/server-connection.js";
import LikertTableComponent from "./likert-table.js";
/**
* Namespace for survey component
* @namespace
*/
let SurveyComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#survey-component-template",
    /**
    * Register Subcomponents locally.
    * @property {module:main/components/SurveyComponent} likert-table - 
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
            task: {
                name: "unknown",
            },
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
            survey: {
                description: "Entscheide so spontan wie möglich welcher der folgenden widersprüchlichen Terme die Anwendung besser beschreibt. Es gibt keine richtigen oder falschen Antworten. Nur deine Meinung zählt.",
                likertRange: "7",
                items: [
                    {
                        leftLabel: "behindernd",
                        rightLabel: "unterstützend",
                        value: null,
                    },
                    {
                        leftLabel: "kompliziert",
                        rightLabel: "einfach",
                        value: null,
                    },
                    {
                        leftLabel: "ineffizient",
                        rightLabel: "effizient",
                        value: null,
                    },
                    {
                        leftLabel: "verwirrend",
                        rightLabel: "übersichtlich",
                        value: null,
                    },
                    {
                        leftLabel: "langweilig",
                        rightLabel: "spannend",
                        value: null,
                    },
                    {
                        leftLabel: "uninteressant",
                        rightLabel: "interessant",
                        value: null,
                    },
                    {
                        leftLabel: "konventionell",
                        rightLabel: "originell",
                        value: null,
                    },
                    {
                        leftLabel: "herkömmlich",
                        rightLabel: "neuartig",
                        value: null,
                    },
                ],
            },
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

export default SurveyComponent;