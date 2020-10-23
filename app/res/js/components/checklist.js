import store from "../data/store.js";

/**
* Display a checklist, responsive of the review state
* @module components/ChecklistComponent
* @requires module:data/store
* @author Fabian Zeiher
*/

/**
* Namespace for Costum Checkbox wrapping the semantic ui checkbox component.
* Costum build to work correctly with my atore pattern compliant application state data model.
* The original component would have corrupted my stricly one way data flow by a v-model binding.
* @namespace
*/
var CostumCheckboxComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#semantic-checkbox-component-template",
    /**
     * Attributes that are exposed to accept data from the parent component.
     * @property {String} category - The category this checkbox belongs to.
     * @property {module:data/store~Checkbox} data - Data object for the checkbox.
    */
    props: {
        data: Object,
        category: String,
    },
    /** 
    * @property {Boolean} blockClick - Switched used for bug not fixed in semantic ui for Vue.js, see below
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @see https://github.com/Semantic-Org/Semantic-UI-React/issues/3433
    */
    data() {
        return {
            blockClick: true,
        };
    },
    /**
     * Hold methods for this component.
     * @property {Function} toggle - Toggles checkbox via application state.
     */
    methods: {
        toggle() {
            // vue-semantic-ui has a bug that the checkbox element fires all onClick events twice.
            // The bug is known and fixed in Semantic Ui Base and Semantic Ui React but is still present in Semantic Ui Vue.
            // https://github.com/Semantic-Org/Semantic-UI-React/issues/3433
            // This simple conditional logic only lets the second click pass trough, making everything behave as expected.
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
* Namespace for Checklist component
* @namespace
*/
 ChecklistComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#checklist-component-template",
    /**
     * Register Subcomponents locally.
     * @property {module:components/Checklist~CostumCheckbox} costum-checkbox - Costum checkbox component wrapping semantic uis checkbox.
     */
    components: {
        "costum-checkbox": CostumCheckboxComponent,
    },
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {Object} checklistData - Data object for checklist, see store.state
    */
    data() {
        return {
            checklistData: store.state.checklist,
        };
    },
};

export default ChecklistComponent;