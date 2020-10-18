import store from "../data/store.js";

/**
 * Marker component to be added to one codemirror line.
 * Clickable to create new or display existing comments.
 * Shows number of comments on one line
 * 
 * @module components/CommentsMarkerComponent
 * @author Fabian Zeiher <fzeiher@gmail.com>
 * @requires module:data/store
 */

 /**
  * Namespace Object for Marker Component
  * @namespace
  */
 var CommentsMarkerComponent = {
    /**
     * Attributes that are exposed to accept data from the parent component.
     * @type {Object}
     * @property {String} section - The section this marker is connected to.
    */
    props: {
        section: String,
    },
    /** 
     * Css-selector for component template.
     * @type {String}
     */
    template: "#comments-marker-component-template",
    /** 
     * Hold reactive data for the component.
     * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
     * @type {Object}
     * @property {module:data/store~State} sharedState - Reference to the state object in order to utilize Vues built in reactivity for automatic re-render.
     * @see https://vuejs.org/v2/guide/reactivity.html
     */
    data() {
        return {
            sharedState: store.state,
        };
    },
    /** Hold computed properties for the component.
     * @type {Object}
     * @property {Number} amountOfComments - The amount of comments for this section.
     * @property {Boolean} hasComments - Uses amountOfComments to evaluate if there are comments.
     */
    computed: {
        amountOfComments() {
            // eslint-disable-next-line no-param-reassign
            let countCommentsBySectionId = (acc, comment) => comment.sectionId === this.section ? ++acc : acc;
            return this.sharedState.content.files[this.sharedState.content.currentFile].comments.reduce(countCommentsBySectionId, 0);
        },
        hasComments() {
            return this.amountOfComments > 0;
        },
        isActive() {
            return this.sharedState.content.files[this.sharedState.content.currentFile].activeCommentSection === this.section;
        },
    },
    /**
     * Hold methods for this component.
     * @type {Object}
     * @namespace
     */
    methods: {
        /**
         * Listener for clicks on the marker.
         * @param {Event} event - click event from the DOM
         * @listens click
         */
        markerClick(event) {
            console.log("click on marker for section: " + this.section);
            store.setActiveSection(this.sharedState.content.currentFile, this.section);
            event.preventDefault();
            event.stopPropagation();
        },
    },
 };

 export default CommentsMarkerComponent;