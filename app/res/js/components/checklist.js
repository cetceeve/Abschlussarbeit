import store from "../data/store.js";

/**
* Display a checklist, responsive of the review state
* @module components/Checklist
* @requires module:data/store
* @author Fabian Zeiher
* @see https://vuejs.org/v2/examples/tree-view.html
*/

/**
* Namespace for tree view component
* @namespace
*/
var SemanticCheckbox = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#semantic-checkbox-component-template",
    props: {
        data: Object,
        category: String,
    },
    /** Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    data() {
        return {
            blockClick: true,
        };
    },
    methods: {
        toggle() {
            // vue-semantic-ui bug fix!!!!!
            if (this.blockClick) {
                this.blockClick = !this.blockClick;
            } else {
                this.blockClick = !this.blockClick;
                store.toggleCheckbox(this.category, this.data.id);
            }
        },
    },
},

/**
* Namespace for tree view component
* @namespace
*/
 Checklist = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#checklist-component-template",
    components: {
        "costum-checkbox": SemanticCheckbox,
    },
    /** Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {module:data/store} sharedState
    */
    data() {
        return {
            checklistData: store.state.checklist,
        };
    },
};

export default Checklist;