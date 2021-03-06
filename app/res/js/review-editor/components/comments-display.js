/* global HtmlSanitizer */
import store from "../model/store.js";
import snarkdown from "../../../../vendors/snarkdown/snarkdown.es.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

/**
* Display the currently selected visible section of comments
* @module review-editor/components/CommentsDisplayComponent
* @author Fabian Zeiher <fzeiher@gmail.com>
* @requires module:review-editor/model/Store
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
    /** Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @property {String} rawMarkdown - Text that can be edited by the user. Bound by v-model.
    * @property {Boolean} isEditMode - Sentinel checking if the user interface is in editing mode.
    * @property {module:review-editor/model/Store~CommentCategory[]} commentCategories - Array of possible categories for comments.
    * @property {String} currentCategory - Currently selected comment category id.
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    data() {
        return {
            rawMarkdown: this.comment.content,
            isEditMode: false,
            commentCategories: store.state.content.commentCategories,
            currentCategory: this.comment.categoryId,
        };
    },
    /**
     * Attributes that are exposed to accept data from the parent component.
     * @property {module:review-editor/model/Store~Comment} comment - Data object for a single comment.
    */
    props: {
        comment: Object,
    },
    /**
    * Hold methods for this component.
    * @property {Function} deleteComment - Delete comment from the state by commentId.
    * @property {Function} startEditMode - Change user interface to the editing mode.
    * @property {Function} cancelCommentEdit - Cancel editing the comment. Reset all changes.
    * @property {Function} postUpdatedComment - Set updated comment contents in application state.
    */
    methods: {
        // Trigger deletion of comment by commentId from the state.
        deleteComment() {
            store.deleteComment(store.currentFileSha, this.comment.id);
        },
        startEditMode() {
            this.isEditMode = true;         
            this.$nextTick(function () {
                // DOM is now updated
                this.$refs.editTextarea.focus();
            });
        },
        cancelCommentEdit() {
            this.isEditMode = false;
            this.rawMarkdown = this.comment.content;
            this.currentCategory = this.comment.categoryId;
        },
        postUpdatedComment() {
            this.isEditMode = false;
            store.postComment(store.currentFileSha , 
                {
                    id: this.comment.id,
                    content: this.rawMarkdown,
                    categoryId: this.currentCategory,
                });
        },
    },
    /** Hold computed properties for the component.
    * @property {Boolean} isFromCurrentUser - Checks if this comment is from the current user
    * @property {String} renderedMarkdown - Transformed markdown html string.
    * @property {String} categoryColor - Color for category, can be any css color.
    * @property {String} categoryName - Name for category.
    */
    computed: {
        isFromCurrentUser() {
            return this.comment.authorId === store.state.user.id;
        },
        // Sanitizing snarkdowns Html-output is very important to avoid XSS attacks
        renderedMarkdown() {
            if (this.isEditMode) {
                return HtmlSanitizer.SanitizeHtml(snarkdown(this.rawMarkdown));
            }
            return HtmlSanitizer.SanitizeHtml(snarkdown(this.comment.content));
        },
        categoryColor() {
            return this.commentCategories.find(item => item.value === this.comment.categoryId).color;
        },
        categoryName() {
            return this.commentCategories.find(item => item.value === this.comment.categoryId).text;
        },
    },
    /**
     * Triggered after Vue updated the Dom
     * @see https://vuejs.org/v2/guide/reactivity.html
     */
    updated() {
        if (this.isEditMode) {
            // Automatically resize the textarea to fit its content
            // adapted from: https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
            const resizeTextarea = function() {
                this.style.height = "auto";
                this.style.height = (this.scrollHeight) + "px";
            };
            this.$refs.editTextarea.setAttribute("style", "height:" + (this.$refs.editTextarea.scrollHeight) + "px;overflow-y:hidden;");
            this.$refs.editTextarea.addEventListener("input", resizeTextarea, false);
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
    * @property {module:review-editor/components/CommentsDisplayComponent~CommentComponent} single-comment - Comment component displaying single comment.
    */
    components: {
        "single-comment": CommentComponent,
    },
    /** Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {Object} currentUser - Points to the user area of store.
    * @property {String} newComment - Input text of the comment input box. Bound by v-model.
    * @property {module:review-editor/model/Store~CommentCategory[]} commentCategories - Array of possible categories for comments.
    * @property {String} currentCategory - Currently selected comment category id. Current default is 3
    */
    data() {
        return {
            currentUser: store.state.user,
            newComment: "",
            commentCategories: store.state.content.commentCategories,
            currentCategory: null,
        };
    },
    /** Hold computed properties for the component.
    * @property {module:review-editor/model/Store~Comment[]} comments - Comments to be displayed for the selected section.
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
        activeLineNumber() {
            return parseInt(store.currentFile.activeCommentSection) + 1;
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} clearCommentInput - Clear the comment input.
    * @property {Function} postNewComment - Take newComment and insert it into the state.
    */
    methods: {
        clearCommentInput() {
            this.currentCategory = null;
            this.newComment = "";
        },
        // Create the new comment and trigger addition to the state.
        postNewComment() {
            if (this.newComment.length > 0) {
                let comment = {
                    id: uuidv4(),
                    sectionId: store.currentFile.activeCommentSection,
                    authorId: this.currentUser.id,
                    authorAvatarUrl: this.currentUser.avatarUrl,
                    authorName: this.currentUser.name,
                    authorUrl: this.currentUser.url,
                    content: this.newComment,
                    categoryId: this.currentCategory === null ? "3" : this.currentCategory,
                };
                store.postComment(store.currentFileSha, comment);
                this.clearCommentInput();
            }
        },
    },
};

export default CommentsDisplayComponent;