/**
 * Display a simple survey component.
 * @module main/components/FinalSurveyComponent
 * @author Fabian Zeiher
 */

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
            survey: {
                name: "SUS",
                title: "Bitte bewerte die Anwendung!",
                description: "Entscheide so spontan wie möglich. Es gibt keine richtigen oder falschen Antworten. Nur deine Meinung zählt.",
                likertRange: "5",
                items: [
                    {
                        question: "1. Ich denke, dass ich das System gerne häufig benutzen würde.",
                        leftLabel: "Stimme überhaupt nicht zu",
                        rightLabel: "Stimme voll zu",
                        value: null,
                    },
                    {
                        question: "2. Ich fand das System unnötig komplex.",
                        leftLabel: "Stimme überhaupt nicht zu",
                        rightLabel: "Stimme voll zu",
                        value: null,
                    },
                    {
                        question: "3. Ich fand das System einfach zu benutzen.",
                        leftLabel: "Stimme überhaupt nicht zu",
                        rightLabel: "Stimme voll zu",
                        value: null,
                    },
                    {
                        question: "4. Ich glaube, ich würde die Hilfe einer technisch versierten Person benötigen, um das System benutzen zu können.",
                        leftLabel: "Stimme überhaupt nicht zu",
                        rightLabel: "Stimme voll zu",
                        value: null,
                    },
                    {
                        question: "5. Ich fand, die verschiedenen Funktionen in diesem System waren gut integriert.",
                        leftLabel: "Stimme überhaupt nicht zu",
                        rightLabel: "Stimme voll zu",
                        value: null,
                    },
                    {
                        question: "6. Ich denke, das System enthielt zu viele Inkonsistenzen.",
                        leftLabel: "Stimme überhaupt nicht zu",
                        rightLabel: "Stimme voll zu",
                        value: null,
                    },
                    {
                        question: "7. Ich kann mir vorstellen, dass die meisten Menschen den Umgang mit diesem System sehr schnell lernen.",
                        leftLabel: "Stimme überhaupt nicht zu",
                        rightLabel: "Stimme voll zu",
                        value: null,
                    },
                    {
                        question: "8. Ich fand das System sehr umständlich zu nutzen.",
                        leftLabel: "Stimme überhaupt nicht zu",
                        rightLabel: "Stimme voll zu",
                        value: null,
                    },
                    {
                        question: "9. Ich fühlte mich bei der Benutzung des Systems sehr sicher.",
                        leftLabel: "Stimme überhaupt nicht zu",
                        rightLabel: "Stimme voll zu",
                        value: null,
                    },
                    {
                        question: "10. Ich musste eine Menge lernen, bevor ich anfangen konnte das System zu verwenden.",
                        leftLabel: "Stimme überhaupt nicht zu",
                        rightLabel: "Stimme voll zu",
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
            return this.survey.items.every(currentValue => currentValue.value !== null);
        },
    },
    /**
    * Hold methods for this component.
    */
    methods: {
        sendResults() {
            console.log("i would send results here");
        },
    },
};

export default FinalSurveyComponent;