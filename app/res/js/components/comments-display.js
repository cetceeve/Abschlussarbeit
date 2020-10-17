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
            commentStore: store.state.comments,
            currentUser: store.state.user,
        };
    },
     /** Hold computed properties for the component.
     * @type {Object}
     */
    computed: {
        comments() {
            return this.commentStore[store.state.code.currentFile].comments.filter(comment => comment.sectionId === this.commentStore[store.state.code.currentFile].activeSection);
        },
        hasComments() {
            return this.comments.length > 0;
        },
        isActive() {
            return this.commentStore[store.state.code.currentFile].activeSection !== null;
        },
    },
    /**
     * Hold methods for this component.
     * @type {Object}
     */
    methods: {
    },
 };

 export default CommentsDisplayComponent;