/* global Vue SemanticUIVue HtmlSanitizer*/
import snarkdown from "../../../vendors/snarkdown/snarkdown.es.js";
import SurveyComponent from "./components/survey.js";

Vue.use(SemanticUIVue);

/**
* Landing page for the user study.
* @module main/Main
* @requires module:main/components/SurveyComponent
* @author Fabian Zeiher
*/

// eslint-disable-next-line no-new
new Vue({
    /** Css-selector for Vue app root.
    * @type {String}
    */
    el:"#app",
    /**
    * Register Subcomponents locally.
    * @property {module:main/components/SurveyComponent} survey - 
    */
    components: {
        "survey": SurveyComponent,
    },
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * 
    */
    data: {
    },
    /** Hold computed properties for the component.
    * @property {String} renderedMarkdown - Transformed markdown html string.
    */
    computed: {
        renderedMarkdown() {
            // Sanitizing snarkdowns Html-output is very important to avoid XSS attacks
            return HtmlSanitizer.SanitizeHtml(snarkdown("there will be stuff to render"));
        },
    },
    /**
    * Hold methods for this component.
    * 
    */
    methods: {
        
    },
    /**
    * Code to execute when component is mounted, reference Vue Lifecycle below.
    * Add Comment Marker Components as LineWidgets. Listen for events from codemirror to handle rerender and content changes.
    * @see https://vuejs.org/v2/guide/instance.html
    */
    mounted() {
        return;
    },
});