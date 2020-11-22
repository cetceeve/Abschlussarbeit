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
    model: {
        prop: "result",
        event: "change",
    },
    /**
    * Attributes that are exposed to accept data from the parent component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @memberof SuiLikertScaleComponent
    * @property {String} range - Range of the likert scale
    * @property {String} id - id for this likert scale
    * @property {String} result - Value of the checkbox that has been selected.
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    props: {
        result: String,
        range: String,
        id: String,
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