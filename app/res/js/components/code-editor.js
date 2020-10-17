import store from "../data/store.js";
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
 * @requires module:data/store
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
     * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
     * @property {module:data/store~State} sharedState - Reference to the state object in order to utilize Vues built in reactivity for automatic re-render.
     * @property {Object} cmOption - Codemirror configuration object.
     * @property {String} linePaddingRight - Right padding for codemirror lines in css terminology (e.g. "20px").
     * @see https://vuejs.org/v2/guide/reactivity.html
     */
    data() {
        return {
            sharedState: store.state,
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
            linePaddingRight: "22px",
        };
    },
    /** Hold computed properties for the component.
     * @type {Object}
     * @property {Object} codemirror - The current codemirror instance.
     * @property {String} code - Get current code string from shared state.
     */
    computed: {
        codemirror() {
          return this.$refs.cmEditor.codemirror;
        },
        code() {
           return this.sharedState.content.files[this.sharedState.content.currentFile].text;
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
         * @listens CommentsMarkerComponent.methods#onMarkerClicked
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
        };

        console.log("look at my codemirror instance:", this.codemirror);
        // integrate side-comment markers into codemirror
        addSideCommentDomHooks(Vue.extend(CommentsMarkerComponent));
        addLinePadding(this.linePaddingRight);
    },
};

export default CodeEditorComponent;