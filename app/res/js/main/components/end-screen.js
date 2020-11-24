/**
* Display an end screen with feedback options
* @module main/components/EndScreenComponent
* @author Fabian Zeiher
*/

/**
* Namespace for end screen component
* @namespace
*/
let EndScreenComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#end-screen-component-template",
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {String} feedback - 
    */
    data() {
        return {
            feedback: "",
            feedbackWasSent: false,
        };
    },
    /**
    * Hold methods for this component.
    * @property {Function} startEditor - Fetches the first task into local storage and redirects to review editor
    */
    methods: {
        sendFeedback() {
            this.feedbackWasSent = true;
        },
    },
};

export default EndScreenComponent;