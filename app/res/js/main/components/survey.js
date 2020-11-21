import serverConnection from "../../utils/server-connection.js";
/**
* Display a simple task modal.
* @module main/components/SurveyComponent
* @author Fabian Zeiher
*/

/**
* Namespace for FAQ component
* @namespace
*/
let SurveyComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#survey-component-template",
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * 
    */
    data() {
        return {
            
        };
    },
    /** Hold computed properties for the component.
    * 
    */
    computed: {
        
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