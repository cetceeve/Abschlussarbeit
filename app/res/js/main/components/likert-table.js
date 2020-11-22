/**
* Display a table of likert scales..
* @module main/components/LikertTableComponent
* @author Fabian Zeiher
*/

/**
* Namespace for likert table component
* @namespace
*/
let LikertTableComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#likert-table-component-template",
    model: {
        prop: "items",
        event: "change",
    },
    /**
    * Attributes that are exposed to accept data from the parent component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @property {module:review-editor/model/Store~TreeItem} item - Data item for this node.
    * @memberof SuiLikertScaleComponent
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    props: {
        items: Array,
        range: String,
    },
};

export default LikertTableComponent;