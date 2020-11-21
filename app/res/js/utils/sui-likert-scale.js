/* global Vue */
/**
* Namespace for likert scale component.
* @namespace SuiLikertScaleComponent
* @author Fabian Zeiher
* @global
*/
Vue.component("sui-likert", {
    /** Css-selector for component template.
    * @type {String}
    * @memberof SuiLikertScaleComponent
    */
    template: "#likert-scale-component-template",
    /**
    * Attributes that are exposed to accept data from the parent component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @property {module:review-editor/model/Store~TreeItem} item - Data item for this node.
    * @memberof SuiLikertScaleComponent
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    props: {
        leftLabel: String,
        rightLabel: String,
        range: String,
        id: String,
    },
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @memberof SuiLikertScaleComponent
    * @property {String} result - Value of the checkbox that has been selected.
    */
    data() {
        return {
            version: false,
            result: null,
        };
    },
    /** Hold computed properties for the component.
     * @memberof SuiLikertScaleComponent
    * @property {Number} rangeNumber - Prses range prop to string.
    */
    computed: {
        rangeNumber() {
            return parseInt(this.range);
        },
    },
    /**
    * Triggered after Vue updated the Dom
    * Used to bubble change events upwards
    * @memberof SuiLikertScaleComponent
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    updated() {
        this.$emit("change", this.result);
    },
});