import store from "../data/store.js";

/**
 * Display the currently selected visible section of comments
 * @module CommentsDisplayComponent
 * @author Fabian Zeiher <fzeiher@gmail.com>
 * @requires module:data/store
 */
/**
  * Namespace Object for Comments Display Component
  * @namespace
  */
 var CommentsDisplayComponent = {
    /**
     * Attributes that are exposed to accept data from the parent component.
     * @type {Object}
     * @property {Number} section - The section this marker is connected to.
    */
    props: {
        section: Number,
    },
    /** Css-selector for component template.
     * @type {String}
     */
    template: "#comments-display-component-template",
    /** Hold reactive data for the component.
     * Component will re-render if this data changes, see link below.
     * @see https://vuejs.org/v2/guide/reactivity.html
     */
    data() {
        return {
            currentUser: store.state.user,
            isActive: true,
        };
    },
     /** Hold computed properties for the component.
     * @type {Object}
     */
    computed: {

    },
    /**
     * Hold methods for this component.
     * @type {Object}
     */
    methods: {
    },
 };

 export default CommentsDisplayComponent;