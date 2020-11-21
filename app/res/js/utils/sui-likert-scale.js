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
    * 
    */
    data() {
        return {
            value: null,
        };
    },
    /** Hold computed properties for the component.
    * 
    */
    computed: {
        rangeNumber() {
            return parseInt(this.range);
        },
    },
    updated() {
        console.log("Row:" + this.id + " is set to: " + this.value);
    },
});