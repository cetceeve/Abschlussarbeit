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
            results: {
                age: null,
                studentStatus: null,
                semester: null,
                experience: null,
                experienceOrigin: null,
                experienceReview: null,
                experienceCoding: null,
                assessmentReview: null,
                assessmentTools: null,
                assessmentCode: null,
            },
            survey: {
                studentStatusOptions: [
                    {
                        text: "Bachelor",
                        value: 1,
                    },
                    {
                        text: "Master",
                        value: 2,
                    },
                    {
                        text: "kein Studentenstatus",
                        value: 3,
                    },
                ],
                experienceOriginOptions: [
                    {
                        text: "Universität",
                        value: 1,
                    },
                    {
                        text: "Beruf",
                        value: 2,
                    },
                    {
                        text: "Freizeit",
                        value: 3,
                    },
                    {
                        text: "andere",
                        value: 4,
                    },
                ],
                experience: {
                    leftLabel: "sehr wenig",
                    rightLabel: "sehr viel",
                    likertRange: "5",
                },
                assessment: {
                    leftLabel: "Stimme überhaupt nicht zu",
                    rightLabel: "Stimme voll zu",
                    likertRange: "5",
                },
            },
        };
    },
    /** Hold computed properties for the component.
    * @property {Boolean} isComplete - Sentinel to determine if user completed the survey.
    */
    computed: {
        demographieIsComplete() {
            return this.results.age !== null && this.results.studentStatus !== null && (this.results.semester !== null || this.results.studentStatus === 3) ;
        },
        experienceIsComplete() {
            return this.results.experience === "0" || (this.results.experience === "1" && this.results.experienceOrigin !== null && this.results.experienceReview !== null && this.results.experienceCoding !== null);
        },
        assessmentIsComplete() {
            return this.results.assessmentReview !== null && this.results.assessmentTools !== null && this.results.assessmentCode !== null;
        },
        isComplete() {
            return this.demographieIsComplete && this.experienceIsComplete && this.assessmentIsComplete;
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