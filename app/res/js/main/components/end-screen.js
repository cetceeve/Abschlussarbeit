/**
* Display an end screen with feedback options
* @module main/components/EndScreenComponent
* @author Fabian Zeiher
*/

import serverConnection from "../../utils/server-connection.js";

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
    * Attributes that are exposed to accept data from the parent component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    props: {
        numTasksCompleted: Number,
    },
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
            linkList: ["https://toolslick.com/text/escaper/json", "https://semantic-ui-vue.github.io/#/elements/label"],
            numTasksFinished: this.numTasksCompleted,
        };
    },
    /** Hold computed properties for the component.
    * 
    */
    computed: {
    },
    /**
    * Hold methods for this component.
    * @property {Function} startEditor - Fetches the first task into local storage and redirects to review editor
    */
    methods: {
        sendFeedback() {
            if (this.feedback.length > 0) {
                serverConnection.sendFeedback(this.feedback).then(response => {
                    if (response.status === 200) {
                        this.feedbackWasSent = true;
                    }
                });
            }
        },
    },
    /**
    * Code to execute when component is mounted, reference Vue Lifecycle below.
    * Add Comment Marker Components as LineWidgets. Listen for events from codemirror to handle rerender and content changes.
    * @see https://vuejs.org/v2/guide/instance.html
    */
    mounted() {
        this.numTasksFinished = localStorage.getItem("numTasksCompleted") || this.numTasksCompleted;
    },
};

export default EndScreenComponent;