import storage from "../data/storage.js";
import CommentsMarkerComponent from "./comments-marker.js";
import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";

/**
 * Vue-Component to display the code and comments together.
 * Depends on vue-codemirror, codemirror and side-comments.
 *
 * Adds Hooks for side-comments to codemirror.
 * Handles display and interaction of and with the comments.
 * Handles display of the code.
 * Holds the configuration for codemirror.
 * 
 * @module components/CodeEditorComponent
 * @author Fabian Zeiher <fzeiher@gmail.com>
 * @requires module:data/Storage
 */
/**
 * Namespace Object for Code Editor Component.
 * @namespace
 */
var CodeEditorComponent = {
    /** Css-selector for component template.
     * @type {String}
     */
    template: "#code-editor-component-template",
    /** Hold reactive data for the component.
     * Component will re-render if this data changes, see link below.
     * @property {String} code
     * @property {Object} cmOption - Codemirror configuration object.
     * @property {String} linePaddingRight - Right padding for codemirror lines in css terminology (e.g. "20px").
     * @see https://vuejs.org/v2/guide/reactivity.html
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
                // viewportMargin: Infinity,
            },
            linePaddingRight: "20px",
        };
    },
    /** Hold computed properties for the component.
     * @type {Object}
     * @property {Object} codemirror - The current codemirror instance.
     */
    computed: {
        codemirror() {
          return this.$refs.cmEditor.codemirror;
        },
    },
    /**
     * Code to execute when component is mounted.
     * Reference Vue Lifecycle below.
     * @function mounted
     * @memberof module:components/CodeEditorComponent~CodeEditorComponent
     * @see https://vuejs.org/v2/guide/instance.html
     * @namespace
     */
    mounted() {
        /** Add padding for the side-comments button on every codemirror line.
         *  Necessary to avoid drawing the button on top of code. Additionally avoids click trough onto code.
         * @param {String} linePadding - String describing the padding amount in css terminology (e.g. "20px").
         */
        const addLinePadding = (linePadding) => {
            this.codemirror.on("renderLine", (instance, lineHandle, element) => {
                element.setAttribute("style", "padding-right: " + linePadding);
            });
        },
        /** 
         * Add the side-comments marker on all visible lines
         * @param {Object} widgetClass - Vue Component Class to generate new component instance from
         */
        addSideCommentDomHooks = (widgetClass) => {
            this.codemirror.on("viewportChange", (instance, fromLine, toLine) => {
                for (let i = fromLine; i <= toLine; i++) {
                    let widget = new widgetClass({
                        propsData: {section: i},
                    });
                    // vue component is rendered at the end of the dom
                    // component is then injected into codemirror as a line-widget
                    widget.$mount();
                    this.codemirror.addLineWidget(i, widget.$el, { handleMouseEvents: true});
                }
            });
        },
        /**
         * Iniate a side-comments instance with a user object.
         * @param {Object} wrapperElement - The element which contains all the .commentable-section elements.
         * @see http://aroc.github.io/side-comments-demo/
         * @returns {Object} - New instance of side-comments.
         */
        initSideComments = (wrapperElement) => {
            // eslint-disable-next-line no-undef    
            let SideComments = require("side-comments");
            return new SideComments(wrapperElement, storage.state.user);
        },
        /**
         * Add stored comments for the current file.
         * Utilises side-comments insertCommit() function internaly.
         * @param {Object} sideComments - A side-comments instance.
         */
        insertStoredComments = (sideComments) => {
            for (let comment of storage.state.comments[storage.state.code.currentFile]) {
                sideComments.insertComment(comment);
            }
        },
        /**
         * Register Listeners on the side-comments instance.
         * On "commentPosted" the comment will be saved to storage and then inserted to the DOM.
         * @param {Object} sideComments - A side-comments instance.
         */
        registerSideCommentsListeners = (sideComments) => {
            sideComments.on("commentPosted", comment => {
                sideComments.insertComment(comment);
                storage.setComment(storage.state.code.currentFile, comment);
            });
        };

        console.log("look at my codemirror instance:", this.codemirror);
        // integrate side-comment markers into codemirror
        addSideCommentDomHooks(Vue.extend(CommentsMarkerComponent));
        addLinePadding(this.linePaddingRight);
        
        // // add side-comments elements to codemirror
        // let sideComments = initSideComments(this.codemirror.getScrollerElement());
        // insertStoredComments(sideComments);
        // registerSideCommentsListeners(sideComments);

        // let lineHandle = this.codemirror.addLineClass(0, "background", "background-modifier");
        // console.dir(lineHandle.height);
    },
};

export default CodeEditorComponent;