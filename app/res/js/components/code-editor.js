import store from "../data/store.js";
import CommentsMarkerComponent from "./comments-marker.js";

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
                scrollPastEnd: false,
                lineWrapping: true,
                styleSelectedText: true,
                highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
                matchBrackets: true,
                // viewportMargin: Infinity,
            },
            linePaddingRight: "22px",
            current: "fancy pooh",
        };
    },
    /** Hold computed properties for the component.
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
    methods: {
        showSearch() {
            this.codemirror.execCommand("find");
        },
        clickE(event) {
            console.log(event);
        },
    },
    /**
    * Code to execute when component is mounted, reference Vue Lifecycle below.
    * Add Comment Marker Components as LineWidgets. Listen for events from codemirror to handle rerender and content changes.
    * @see https://vuejs.org/v2/guide/instance.html
    */
    mounted() {
        /*
        Object to store a flexible amount of reusable Marker Components.
        The Runtime initialization of Vue Components is expensive, this caused performace issues with codemirror since the dom is re-rendered often.
        This object stores the Vue Components so on codemirror re-render the components are just re-added to the DOM, but not re-instanciated.
        Since the Components themselfes are complete reactive, they will change there content according to the application state automatically.
        */
        const dynamicMarkerComponentList = {
            // eslint-disable-next-line no-undef
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
                        this.items.push(this.createComponentElement(i.toString()));
                    }
                    // remove components if there are a lot to many
                } else if (this.items.length > length + 100) {
                    this.items.splice(length);
                }
                console.log("Current amount of stored marker-components: " + this.items.length);
            },
        },
        // Manually adds marker components to codemirror once, because codemirror.on("change") is not called when the editor ist started.
        initOnce = () => {
            dynamicMarkerComponentList.setLength(this.codemirror.lineCount());
            for (let i = 0; i < this.codemirror.lineCount(); i++) {
                this.codemirror.addLineWidget(i, dynamicMarkerComponentList.items[i], { handleMouseEvents: true});
            }
        };
        
        // Re-add comment marker elements to codemirror when the editors content changes.
        // Marker elements get reused for performance reasons.
        this.codemirror.on("change", () => {
            dynamicMarkerComponentList.setLength(this.codemirror.lineCount());
            for (let i = 0; i < this.codemirror.lineCount(); i++) {
                this.codemirror.addLineWidget(i, dynamicMarkerComponentList.items[i], { handleMouseEvents: true});
            }
        });
        
        // triggered on every render and re-render of one line
        this.codemirror.on("renderLine", (instance, lineHandle, element) => {
            // Add padding for the side-comments button on every codemirror line.
            // Necessary to avoid drawing the button on top of code. Additionally avoids click trough onto code.
            element.setAttribute("style", "padding-right: " + this.linePaddingRight);
            let currentLineMarkerComponent = dynamicMarkerComponentList.items[this.codemirror.getLineNumber(lineHandle)];
            
            // Add hover effects higlighting gutter, linebackground and the marker
            element.addEventListener("mouseover", () => {
                this.codemirror.addLineClass(lineHandle, "background", "highlight-line");
                this.codemirror.addLineClass(lineHandle, "gutter", "highlight-gutter");
                if (currentLineMarkerComponent !== undefined) {
                    currentLineMarkerComponent.querySelector(".marker").setAttribute("style", "display: block");
                }
            });
            
            // Remove hover effects from gutter, linebackground and the marker
            element.addEventListener("mouseout", () => {
                this.codemirror.removeLineClass(lineHandle, "background", "highlight-line");
                this.codemirror.removeLineClass(lineHandle, "gutter", "highlight-gutter");
                if (currentLineMarkerComponent !== undefined) {
                    currentLineMarkerComponent.querySelector(".marker").setAttribute("style", "display: hidden");
                }
            });
        });
        
        this.codemirror.setSize(null, "90vh");
        initOnce();
    },
};

export default CodeEditorComponent;