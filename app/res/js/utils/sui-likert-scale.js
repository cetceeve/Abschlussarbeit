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
    * @type {Object}
    * @memberof SuiLikertScaleComponent
    * @property {String} range - Range of the likert scale
    * @property {String} id - id for this likert scale
    * @property {String} inputValue - Value of the checkbox that has been selected.
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    props: {
        inputValue: String,
        range: String,
        id: String,
    },
    /** Hold computed properties for the component.
     * @type {Object}
    * @memberof SuiLikertScaleComponent
    * @property {Number} rangeNumber - Prses range prop to string.
    */
    computed: {
        rangeNumber() {
            return parseInt(this.range);
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} bubbleEvent - Bubbles event to parent, enriches event data object.
    */
    methods: {
        bubbleEvent(newValue) {
            this.$emit("input", {id: this.id, value: newValue});
        },
    },
});