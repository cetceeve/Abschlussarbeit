import store from "../data/store.js";
import _uniqueId from "../../../vendors/lodash/modularize/uniqueId.js";
import snarkdown from "../../../vendors/snarkdown/snarkdown.es.js";

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
    * @property {Object} currentUser - Points to the user area of store.
    * @property {String} newComment - Input text of the comment input box. Bound by v-model.
    */
    data() {
        return {
            sharedState: store.state,
            currentUser: store.state.user,
            newComment: "",
        };
    },
    /** Hold computed properties for the component.
    * @property {module:data/store~Comment[]} comments - Comments to be displayed for the selected section.
    * @property {Boolean} hasComments - uses comments internally
    * @property {Boolean} isActive - checks if there is a currently active section
    */
    computed: {
        comments() {
            return store.currentFile.comments.filter(comment => {
                return comment.sectionId === store.currentFile.activeCommentSection;
            });
        },
        hasComments() {
            return this.comments.length > 0;
        },
        isActive() {
            return store.currentFile.activeCommentSection !== null;
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} clearCommentInput - Clear the comment input.
    * @property {Function} postNewComment - Take newComment and insert it into the state.
    * @property {Function} deleteComment - Delete comment from the state by commentId.
    */
    methods: {
        clearCommentInput() {
            this.newComment = "";
        },
        // Create the new comment and trigger addition to the state.
        postNewComment() {
            let commentHtmlString = snarkdown(this.newComment);
            store.addComment(store.currentFileSha, {
                id: _uniqueId("comment_"),
                sectionId: store.currentFile.activeCommentSection,
                authorId: this.currentUser.id,
                authorAvatarUrl: this.currentUser.avatarUrl,
                authorName: this.currentUser.name,
                authorUrl: this.currentUser.url,
                comment: commentHtmlString,
            });
            this.clearCommentInput();
        },
        // Trigger deletion of comment by commentId from the state.
        deleteComment(commentId) {
            store.deleteComment(store.currentFileSha, commentId);
        },
    },
    /**
     * Triggered when Vue has re-rendered the component, reference Vue Life Cycle below.
     * @see https://vuejs.org/v2/guide/instance.html
     */
    updated() {
        // Set focus on the comment input box.
        if (this.isActive) {
            this.$refs.input.focus();
        }
    },
};

export default CommentsDisplayComponent;