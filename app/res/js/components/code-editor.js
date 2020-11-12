/* global CodeMirror */
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
    * @property {Object} editorOptions - Reference to the state object in order to utilize Vues built in reactivity for automatic re-render.
    * @property {Object} cmOption - Codemirror configuration object.
    * @property {String} linePaddingRight - Right padding for codemirror lines in css terminology (e.g. "20px").
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    data() {
        return {
            editorOptions: store.state.editor,
            cmOption: {
                placeholder: "nothing here :(",
                mode: "mixedhtml",
                theme: store.state.editor.activeTheme,
                readOnly: true,
                lineNumbers: true,
                scrollbarStyle: "simple",
                foldGutter: true,
                gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                scrollPastEnd: false,
                lineWrapping: true,
                styleSelectedText: true,
                highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
                matchBrackets: true,
                lint: {
                    options: {
                        esversion: 8,
                        undef: true,
                        unused: true,
                        freeze: true,
                        latedef: "nofunc",
                        nonbsp: true,
                        trailingcomma: true,
                        browser: true,
                        node: true,
                    },
                },
            },
            linePaddingRight: "22px",
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
            return store.currentFile.text;
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} showSearch - Start search function of codemirror.
    * @property {Function} clearSearch - Clear search overlay.
    * @property {Function} foldAll - Use codefold to fold all foldable code sections.
    * @property {Function} unfoldAll - Use codefold to open all folded code sections.
    * @property {Function} setActiveTheme - Sets active theme in application state.
    */
    methods: {
        showSearch() {
            this.codemirror.execCommand("find");
        },
        clearSearch() {
            this.codemirror.execCommand("clearSearch");
        },
        foldAll() {
            this.codemirror.execCommand("foldAll");
        },
        unfoldAll() {
            this.codemirror.execCommand("unfoldAll");
        },
        setActiveTheme(theme) {
            store.setActiveTheme(theme);
        },
    },
    /**
     * Triggered before Vue updates the Dom
     * Used to bring reactive behaviour into codemirror.
     * @see https://vuejs.org/v2/guide/reactivity.html
     */
    beforeUpdate() {
        // Catch a theme change in the application state
        if (this.editorOptions.activeTheme !== this.codemirror.options.theme) {
            this.codemirror.setOption("theme", this.editorOptions.activeTheme);
        }
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
            markerReserve: 100,
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
                } else if (this.items.length > length + this.markerReserve) {
                    this.items.splice(length);
                }
                console.log("Current amount of stored marker-components: " + this.items.length);
            },
        },
        // Change codemirror mode for current file.
        loadMode = () => {
            let info = CodeMirror.findModeByFileName(store.currentFile.path);
            if (info.mode !== this.codemirror.options.mode) {
                this.codemirror.setOption("mode", info.mode);
                CodeMirror.autoLoadMode(this.codemirror, info.mode);
            }
        },
        // Apply a certain css class to all the lines specified
        applyLinePresentationModifiers = () => {
            // first and last line do not get rendered, so we need to clean them manually
            this.codemirror.removeLineClass(0, "wrap");
            this.codemirror.removeLineClass(this.codemirror.lineCount(), "wrap");
            
            let modifierArray = store.currentFile.linePresentationModifiers;
            modifierArray.map(modifier => {
                modifier.lines.map(lineNum => this.codemirror.addLineClass(lineNum, "wrap", modifier.class));
            });
        },
        // Add Comment Markers to each code mirror line.
        // Marker elements get reused for performance reasons.
        addCommentMarkers = () => {
            dynamicMarkerComponentList.setLength(this.codemirror.lineCount());
            for (let i = 0; i < this.codemirror.lineCount(); i++) {
                this.codemirror.addLineWidget(i, dynamicMarkerComponentList.items[i], { handleMouseEvents: true});
            }
        },
        // Stuff that needs to be done after startup
        initOnce = () => {
            loadMode();
            applyLinePresentationModifiers();
            addCommentMarkers();
        };
        
        // Callback runs whenever text in the editor changes (file changes).
        this.codemirror.on("change", () => {
            // set the correct mode for new file
            loadMode();
            // Apply the line presentation modfiers for new file
            applyLinePresentationModifiers();
            // Re-add comment marker elements to codemirror when the editors content changes.
            addCommentMarkers();
        });
        
        // triggered on every render and re-render of one line
        this.codemirror.on("renderLine", (instance, lineHandle, element) => {
            // Add padding for the side-comments button on every codemirror line.
            // Necessary to avoid drawing the button on top of code. Additionally avoids click trough onto code.
            element.setAttribute("style", "padding-right: " + this.linePaddingRight);
            let currentLineMarkerComponent = dynamicMarkerComponentList.items[this.codemirror.getLineNumber(lineHandle)];
            
            // Add hover effects higlighting gutter, linebackground and the marker
            element.addEventListener("mouseover", () => {
                // this.codemirror.addLineClass(lineHandle, "background", "highlight-line"); too performance intensive
                this.codemirror.addLineClass(lineHandle, "gutter", "highlight-gutter");
                if (currentLineMarkerComponent !== undefined) {
                    currentLineMarkerComponent.querySelector(".marker").setAttribute("style", "display: block");
                }
            });
            
            // Remove hover effects from gutter, linebackground and the marker
            element.addEventListener("mouseout", () => {
                // this.codemirror.removeLineClass(lineHandle, "background", "highlight-line"); too performance intensive
                this.codemirror.removeLineClass(lineHandle, "gutter", "highlight-gutter");
                if (currentLineMarkerComponent !== undefined) {
                    currentLineMarkerComponent.querySelector(".marker").setAttribute("style", "display: hidden");
                }
            });
        });
        
        this.codemirror.setSize(null, "100vh");
        initOnce();
    },
};

export default CodeEditorComponent;