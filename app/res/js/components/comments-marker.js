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
     * @property {Number} section - The section this marker is connected to.
    */
    props: {
        section: Number,
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
     * @property {Array} commentArray - The Array of comments currently relevant for display
     * @see https://vuejs.org/v2/guide/reactivity.html
     */
    data() {
        return {
            commentStore: store.state.comments,
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
            return this.commentStore[store.state.code.currentFile].comments.reduce(countCommentsBySectionId, 0);
        },
        hasComments() {
            return this.amountOfComments > 0;
        },
        isActive() {
            return this.commentStore[store.state.code.currentFile].activeSection === this.section;
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
            console.log("Click on marker for section: " + this.section);
            store.setActiveSection(store.state.code.currentFile, this.section);
            event.preventDefault();
            event.stopPropagation();
        },
    },
 };

 export default CommentsMarkerComponent;