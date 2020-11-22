/* global HtmlSanitizer*/
import snarkdown from "../../../../vendors/snarkdown/snarkdown.es.js";
import serverConnection from "../../utils/server-connection.js";
/**
* Compnent to give the user an introduction in the study
* @module main/components/StudyIntroductionComponent
* @author Fabian Zeiher
*/

/**
* Namespace for study introduction component
* @namespace
*/
let StudyIntroductionComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
   template: "#study-introduction-component-template",
   /**
   * Hold reactive data for the component.
   * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
   * @see https://vuejs.org/v2/guide/reactivity.html
   * @property {Number} rawMarkdown - Introduction text for the study in markdown format.
   */
   data() {
       return {
           rawMarkdown: "there will be `stuff` to render",
       };
   },
    /** Hold computed properties for the component.
    * @property {String} renderedMarkdown - Transformed markdown html string.
    */
    computed: {
        renderedMarkdown() {
            // Sanitizing snarkdowns Html-output is very important to avoid XSS attacks
            return HtmlSanitizer.SanitizeHtml(snarkdown(this.rawMarkdown));
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} startEditor - Fetches the first task into local storage and redirects to review editor
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

export default StudyIntroductionComponent;