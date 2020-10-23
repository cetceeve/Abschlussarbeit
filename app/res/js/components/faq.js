import store from "../data/store.js";

/**
* Display a simple faq modal.
* @module components/FaqComponent
* @requires module:data/store
* @author Fabian Zeiher
*/

/**
* Namespace for FAQ component
* @namespace
*/
var FaqComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#faq-component-template",
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {Object} faqData - Data object for faq, see store.state
    */
    data() {
        return {
            faqData: store.state.faq,
        };
    },
    /**
     * Hold methods for this component.
     * @property {Function} toggle - Toggles modal via application state.
     */
    methods: {
        toggle() {
            store.toggleFaqVisibility();
        },
    },
};

export default FaqComponent;