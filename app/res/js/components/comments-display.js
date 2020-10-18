import store from "../data/store.js";
import _uniqueId from "../../../vendors/lodash/modularize/uniqueId.js";

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
            commentFormIsVisible: true,
            newComment: "",
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
            return this.sharedState.content.files[this.sharedState.content.currentFile].comments.filter(comment => {
                return comment.sectionId === this.sharedState.content.files[this.sharedState.content.currentFile].activeCommentSection;
            });
        },
        hasComments() {
            this.updateCommentInputForm();
            return this.comments.length > 0;
        },
        isActive() {
            return this.sharedState.content.files[this.sharedState.content.currentFile].activeCommentSection !== null;
        },
    },
    /**
    * Hold methods for this component.
    * @type {Object}
    */
    methods: {
        updateCommentInputForm() {
            this.newComment = "";
            if (this.comments.length > 0) {
                this.commentFormIsVisible = false;
            } else {
                this.commentFormIsVisible = true;
            }
        },
        showCommentForm() {
            this.commentFormIsVisible = true;
        },
        cancelCommentInput() {
            if (this.hasComments) {
                this.commentFormIsVisible = false;
            } else {
                store.setActiveSection(this.sharedState.content.currentFile, null);
            }
            this.newComment = "";
        },
        postNewComment() {
            store.addComment(this.sharedState.content.currentFile, {
                id: _uniqueId("comment_"),
                sectionId: this.sharedState.content.files[this.sharedState.content.currentFile].activeCommentSection,
                authorId: this.currentUser.id,
                authorAvatarUrl: this.currentUser.avatarUrl,
                authorName: this.currentUser.name,
                authorUrl: this.currentUser.url,
                comment: this.newComment,
            });
            this.newComment = "";
        },
        deleteComment(commentId) {
            store.deleteComment(this.sharedState.content.currentFile, commentId);
        },
    },
    updated() {
        if (this.commentFormIsVisible) {
            this.$refs.input.focus();
        }
    },
};

export default CommentsDisplayComponent;