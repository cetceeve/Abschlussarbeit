import store from "../model/store.js";

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
 let CommentsMarkerComponent = {
    /**
     * Attributes that are exposed to accept data from the parent component.
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
    /** Hold computed properties for the component
     * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below..
     * @type {Object}
     * @property {Number} amountOfComments - The amount of comments for this section.
     * @property {Boolean} hasComments - Uses amountOfComments to evaluate if there are comments.
     * @see https://vuejs.org/v2/guide/reactivity.html
     */
    computed: {
        amountOfComments() {
            // eslint-disable-next-line no-param-reassign
            let countCommentsBySectionId = (acc, comment) => comment.sectionId === this.section ? ++acc : acc;
            return store.currentFile.comments.reduce(countCommentsBySectionId, 0);
        },
        hasComments() {
            return this.amountOfComments > 0;
        },
        isActive() {
            return store.currentFile.activeCommentSection === this.section;
        },
    },
    /**
     * Hold methods for this component.
     * @property {Function} markerClick - Listen for clicks on this marker.
     */
    methods: {
        // Set activeMarkerSection in the state.
        markerClick() {
            store.setActiveSection(store.currentFileSha, this.section);
        },
    },
 };

 export default CommentsMarkerComponent;