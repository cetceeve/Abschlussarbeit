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
     * Component will re-render if this data changes, see link below.
     * @type {Object}
     * @property {Array} commentArray - The Array of comments currently relevant for display
     * @see https://vuejs.org/v2/guide/reactivity.html
     */
    data() {
        return {
            // the relevant comment array is added as a data property to utilize Vue build in reactivity to update on state changes automatically
            commentArray: store.state.comments[store.state.code.currentFile],
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
            return this.commentArray.reduce(countCommentsBySectionId, 0);
        },
        hasComments() {
            return this.amountOfComments > 0;
        },
    },
    /**
     * Hold methods for this component.
     * @type {Object}
     * @namespace
     */
    methods: {
        /**
         * Event: onMarkerClicked
         * @event CommentsMarkerComponent.methods#onMarkerClicked
         * @type {object}
         * @property {number} sectionId - Id of the section that the clicked comment marker belonged to.
         */
        /**
         * Listener for clicks on the marker. Emits event with section id.
         * @param {Event} event - click event from the DOM
         * @listens click
         * @fires CommentsMarkerComponent.methods#onMarkerClicked
         */
        onMarkerClicked(event) {
            this.$emit("onMarkerClicked", { sectionId: this.section});
            event.preventDefault();
            event.stopPropagation();
        },
    },
 };

 export default CommentsMarkerComponent;