import store from "../data/store.js";

/**
 * Display the currently selected visible section of comments
 * @module components/CommentsDisplayComponent
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
     * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
     * @see https://vuejs.org/v2/guide/reactivity.html
     * @property {Object} commentStore - points to the comment area of store
     * @property {Object} currentUser - points to the user area of store
     */
    data() {
        return {
            commentStore: store.state.comments,
            currentUser: store.state.user,
        };
    },
     /** Hold computed properties for the component.
     * @type {Object}
     * @property {module:data/store~Comment[]} comments - Comments to be displayed for the selected section.
     * @property {Boolean} hasComments - uses comments internally
     * @property {Boolean} isActive - checks if there is a currently active section
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