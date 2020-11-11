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
    /** Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @property {String} rawMarkdown - Text that can be edited by the user. Bound by v-model.
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    data() {
        return {
            rawMarkdown: this.comment.content,
            isEditMode: false,
            commentCategories: store.state.content.commentCategories,
            currentCategory: this.comment.categoryID,
        };
    },
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
        startEditMode() {
            this.isEditMode = true;
        },
        cancelCommentEdit() {
            this.isEditMode = false;
            this.rawMarkdown = this.comment.content;
        },
        postUpdatedComment() {
            this.isEditMode = false;
            store.postComment(store.currentFileSha , this.comment.sectionId, this.comment.id, this.rawMarkdown);
        },
    },
    /** Hold computed properties for the component.
    * @property {Boolean} isFromCurrentUser - Checks if this comment is from the current user
    * @property {String} renderComment - Transforms markdown into html string.
    */
    computed: {
        isFromCurrentUser() {
            return this.comment.authorId === store.state.user.id;
        },
        renderedMarkdown() {
            if (this.isEditMode) {
                return snarkdown(this.rawMarkdown);
            }
            return snarkdown(this.comment.content);
        },
        categoryColor() {
            return this.commentCategories.find(item => item.value === this.comment.categoryID).color;
        },
        categoryName() {
            return this.commentCategories.find(item => item.value === this.comment.categoryID).text;
        },
    },
    updated() {
        if (this.isEditMode) {
            // adapted from: https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
            const resizeTextarea = function() {
                this.style.height = "auto";
                this.style.height = (this.scrollHeight) + "px";
            };
            this.$refs.editTextarea.setAttribute("style", "height:" + (this.$refs.editTextarea.scrollHeight) + "px;overflow-y:hidden;");
            this.$refs.editTextarea.addEventListener("input", resizeTextarea, false);
            this.$refs.editTextarea.focus();
        }
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
            commentCategories: store.state.content.commentCategories,
            currentCategory: "1",
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
    */
    methods: {
        clearCommentInput() {
            this.newComment = "";
        },
        // Create the new comment and trigger addition to the state.
        postNewComment() {
            store.postComment(store.currentFileSha, store.currentFile.activeCommentSection , _uniqueId("comment_"), this.newComment, this.currentCategory);
            this.clearCommentInput();
        },
    },
};

export default CommentsDisplayComponent;