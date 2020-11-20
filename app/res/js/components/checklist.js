/* global HtmlSanitizer */
import store from "../model/store.js";
import snarkdown from "../../../vendors/snarkdown/snarkdown.es.js";

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
let CostumCheckboxComponent = {
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
    /** Hold computed properties for the component.
    * @property {String} renderedMarkdown - Transformed markdown html string.
    * @property {String} iconName - icon to be displayed next to the text
    */
    computed: {
        iconName() {
            if (this.data.checked) {
                return "check";
            }
            return "outline circle";
        },
        renderedMarkdown() {
            // Sanitizing snarkdowns Html-output is very important to avoid XSS attacks
            return HtmlSanitizer.SanitizeHtml(snarkdown(this.data.label));
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} toggle - Toggles checkbox via application state.
    */
    methods: {
        toggle() {
            store.toggleCheckbox(this.category, this.data.id);
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