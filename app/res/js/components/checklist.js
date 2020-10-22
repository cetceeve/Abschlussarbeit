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
var Checklist = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#checklist-component-template",
    /** Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {module:data/store~TreeItem} sharedState
    */
    data() {
        return {
            sharedState: store.state,
        };
    },
};

export default Checklist;