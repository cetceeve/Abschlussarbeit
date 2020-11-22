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
    /**
    * Attributes that are exposed to accept data from the parent component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @property {module:review-editor/model/Store~TreeItem} item - Data item for this node.
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    props: {
        value: Array,
        range: String,
    },
    /**
    * Hold methods for this component.
    * @property {Function} bubbleEvent - Bubbles event to parent, enriches event data object.
    */
    methods: {
        bubbleEvent(data) {
            let clone = this.value.map(obj => ({ ...obj }));
            clone[data.id].value = data.value;
            this.$emit("input", clone);
        },
    },
};

export default LikertTableComponent;