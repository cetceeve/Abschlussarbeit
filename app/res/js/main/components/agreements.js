/* global HtmlSanitizer */
import snarkdown from "../../../../vendors/snarkdown/snarkdown.es.js";

/**
* Display a simple agreements modal.
* @module main/components/AgreementsComponent
* @author Fabian Zeiher
*/

/**
* Namespace for agreements component
* @namespace
*/
let AgreementsComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#agreements-component-template",
    model: {
        prop: "open",
        event: "input",
    },
    props: {
        open: Boolean,
    },
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {Boolean} isChecked - sentinel to guard if the checkbox is checked.
    * @property {String} text - text for the agreements.
    * @property {Boolean} open - Sentinel to guard if modal should be open. Gets initial value from local storage.
    */
    data() {
        return {
            isChecked: false,
            text: "",
        };
    },
    /** Hold computed properties for the component.
    * @property {String} renderedMarkdown - Transformed markdown html string.
    */
    computed: {
        renderedMarkdown() {
            // Sanitizing snarkdowns Html-output is very important to avoid XSS attacks
            return HtmlSanitizer.SanitizeHtml(snarkdown(this.text));
        },
    },
    created() {
        this.isChecked = (localStorage.getItem("agreementIsGiven") === "true");
        fetch("../../data/agreements.md")
        .then(response => response.text())
        .then(textString => {
            this.text = textString;
        });
    },
    /**
    * Hold methods for this component.
    * @property {Function} saveAgreement - Save agreement consensus to local storage and close modal.
    */
    methods: {
        saveAgreement() {
            localStorage.setItem("agreementIsGiven", "true");
            this.$emit("input", false);
        },
    },
};

export default AgreementsComponent;