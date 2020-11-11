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
* NamespaceObject for single somment component
* @namespace
*/
let CommentComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#comment-component-template",
    /**
    * Attributes that are exposed to accept data from the parent component.
    * @property {module:data/store~Comment} data - Data object for the checkbox.
    */
    props: {
        comment: Object,
    },
    /**
    * Hold methods for this component.
    * @property {Function} deleteComment - Delete comment from the state by commentId.
    */
    methods: {
        // Trigger deletion of comment by commentId from the state.
        deleteComment() {
            store.deleteComment(store.currentFileSha, this.comment.id);
        },
    },
    /** Hold computed properties for the component.
    * @property {Boolean} isFromCurrentUser - checks if this comment is from the current user
    */
    computed: {
        isFromCurrentUser() {
            return this.comment.authorId === store.state.user.id;
        },
    },
},

/**
* Namespace Object for comments display component
* @namespace
*/
CommentsDisplayComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#comments-display-component-template",
    /**
    * Register Subcomponents locally.
    * @property {module:components/CommentsDisplayComponent~CommentComponent} comment - Comment component displaying single comment.
    */
    components: {
        "single-comment": CommentComponent,
    },
    /** Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {Object} currentUser - Points to the user area of store.
    * @property {String} newComment - Input text of the comment input box. Bound by v-model.
    */
    data() {
        return {
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