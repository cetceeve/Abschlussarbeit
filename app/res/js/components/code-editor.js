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
        const dynamicComponentList = {
            componentClass: Vue.extend(CommentsMarkerComponent),
            items: [],
            createComponentElement(sectionId) {
                let instance = new this.componentClass({
                    propsData: {section: sectionId},
                });
                // vue component is rendered at the end of the dom
                // component can later be injected into codemirror as a line-widget
                instance.$mount();
                return instance.$el;
            },
            setLength(length) {
                // add components if there are not enouph
                if (this.items.length < length) {
                    for (let i = this.items.length; i <= length; i++) {
                        this.items.push(this.createComponentElement(i));
                    }
                // remove components if there are a lot to many
                } else if (this.items.length > length + 100) {
                    this.items.splice(length);
                }
            },
        },
        initOnce = () => {
            dynamicComponentList.setLength(this.codemirror.lineCount());
            for (let i = 0; i < this.codemirror.lineCount(); i++) {
                this.codemirror.addLineWidget(i, dynamicComponentList.items[i], { handleMouseEvents: true});
            }
        };

        // Re-add comment marker elements to codemirror when the editors content changes.
        // Marker elements get reused for performance reasons.
        this.codemirror.on("change", () => {
            dynamicComponentList.setLength(this.codemirror.lineCount());
            for (let i = 0; i < this.codemirror.lineCount(); i++) {
                this.codemirror.addLineWidget(i, dynamicComponentList.items[i], { handleMouseEvents: true});
            }
        });
        
        // Add padding for the side-comments button on every codemirror line.
        // Necessary to avoid drawing the button on top of code. Additionally avoids click trough onto code.
        this.codemirror.on("renderLine", (instance, lineHandle, element) => {
            element.setAttribute("style", "padding-right: " + this.linePaddingRight);
        });

        initOnce();
    },
};

export default CodeEditorComponent;