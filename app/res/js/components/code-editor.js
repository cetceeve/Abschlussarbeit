import storage from "../data/storage.js";

/**
 * Vue-Component to display the code and comments together.
 * Depends on vue-codemirror, codemirror and side-comments.
 * 
 * Adds Hooks for side-comments to codemirror.
 * Handles display and interaction of and with the comments.
 * Handles display of the code
 * Holds the configuration for codemirror
 * 
 * @module CodeEditorComponent
 * @requires storage
 */
var CodeEditorComponent = {
    /** specify css-selector for the component template */
    template: "#code-editor-component-template",
    /** hold data for the component
     * @property {Object} cmOption - codemirror configuration object
     * @property {String} cmLineHeight - height of codemirror lines in css terminology (e.g. "20px")
     * @property {String} linePaddingRight - right padding for codemirror lines in css terminology (e.g. "20px")
     */
    data() {
        return {
            code: storage.state.code.files[storage.state.code.currentFile].value,
            cmOption: {
                placeholder: "nothing here :(",
                mode: "javascript",
                readOnly: true,
                lineNumbers: true,
                scrollbarStyle: "simple",
                foldGutter: true,
                scrollPastEnd: true,
                styleSelectedText: true,
                highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
                matchBrackets: true,
            },
            cmLineHeight: "20px",
            linePaddingRight: "20px",
        };
    },
    /** hold computed properties for the component
     * @property {Object} codemirror - the current codemirror instance
     */
    computed: {
        codemirror() {
          return this.$refs.cmEditor.codemirror;
        },
    },
    /**
     * code to execute when component is mounted
     * @see{@link https://vuejs.org/v2/guide/instance.html|Vue-Instance-Lifecycle}
     */
    mounted() {
        /** Add padding for the side-comments button on every codemirror line.
         *  Necessary to avoid drawing the button on top of code. Additionally avoids click trough onto code.
         * @param {String} linePadding - a string describing the padding amount in css terminology (e.g. "20px")
         */
        const addLinePadding = (linePadding) => {
            this.codemirror.on("renderLine", (instance, lineHandle, element) => {
                element.setAttribute("style", "padding-right: " + linePadding);
            });
        },
        /** 
         * Add the side-comments button on every line utilising codemirrors line-widgets.
         * Parameter lineHeight is required to position the widget on the line instead of below
         * @param {String} lineHeight - a string describing the codemirror line height in css terminlogy (e.g. "20px")
         */
        addSideCommentDomHooks = (lineHeight) => {
            for (let i = 0; i < this.codemirror.lineCount(); i++) {
                let widget = document.createElement("div");
                widget.setAttribute("style", "bottom: " + lineHeight);
                widget.setAttribute("class", "commentable-section");
                widget.setAttribute("data-section-id", i.toString());
                this.codemirror.addLineWidget(i, widget, { handleMouseEvents: true});
            }
        },
        /**
         * iniate a side-comments instance with a user object
         * @param {Object} wrapperElement - The element which contains all the .commentable-section elements.
         * @requires storage
         * @requires ./vendors/side-comments/side-comments.js
         * @see {@link http://aroc.github.io/side-comments-demo/|side-comments-demo}
         * @returns {Object} - side-comments instance
         */
        initSideComments = (wrapperElement) => {
            // eslint-disable-next-line no-undef    
            let SideComments = require("side-comments");
            return new SideComments(wrapperElement, storage.state.user);
        },
        /**
         * Add stored comments for the current file
         * utilises side-comments insertCommit() function internaly
         * @param {Object} sideComments - a side-comments instance
         * @requires storage
         */
        insertStoredComments = (sideComments) => {
            for (let comment of storage.state.comments[storage.state.code.currentFile]) {
                sideComments.insertComment(comment);
            }
        },
        /**
         * Register Listeners on the side-comments instance
         * on "commentPosted" the comment will be saved to storage and then inserted to the DOM
         * @param {Object} sideComments - a side-comments instance
         * @requires storage
         */
        registerSideCommentsListeners = (sideComments) => {
            sideComments.on("commentPosted", comment => {
                sideComments.insertComment(comment);
                storage.setComment(storage.state.code.currentFile, comment);
            });
        };

        console.log("look at my codemirror instance:", this.codemirror);
        // Prepare codemirror for side-comments integration
        addSideCommentDomHooks(this.cmLineHeight);
        addLinePadding(this.linePaddingRight);
        
        // add side-comments elements to codemirror
        let sideComments = initSideComments(this.codemirror.getScrollerElement());
        insertStoredComments(sideComments);
        registerSideCommentsListeners(sideComments);

        // let lineHandle = this.codemirror.addLineClass(0, "background", "background-modifier");
        // console.dir(lineHandle.height);
    },
};

export default CodeEditorComponent;