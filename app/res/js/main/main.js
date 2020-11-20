/* global Vue SemanticUIVue HtmlSanitizer*/
import snarkdown from "../../../vendors/snarkdown/snarkdown.es.js";
import serverConnection from "../utils/server-connection.js";

Vue.use(SemanticUIVue);

// eslint-disable-next-line no-new
new Vue({
    el:"#app",
    data: {
        user: "unknown",
        currentTask: {
            name: "unknown",
            description: "unknown",
        },
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
    methods: {
        startEditor() {
            serverConnection.fetchState().then(data => {
                localStorage.setItem("state", data.state);
                location.href = "./review-editor";
                console.log("start editor");
            });
        },
    },
});