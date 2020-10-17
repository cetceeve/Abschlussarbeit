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
     * @property {module:data/store~State} sharedState - Reference to the state object in order to utilize Vues built in reactivity for automatic re-render.
     * @property {Object} currentUser - points to the user area of store
     */
    data() {
        return {
            sharedState: store.state,
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
            return this.sharedState.content[store.state.code.currentFile].comments.filter(comment => {
                return comment.sectionId === this.sharedState.content[this.sharedState.content.currentFile].activeCommentSection;
            });
        },
        hasComments() {
            return this.comments.length > 0;
        },
        isActive() {
            return this.sharedState.comments[store.state.code.currentFile].activeCommentSection !== null;
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