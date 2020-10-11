import storage from "../data/storage.js";

var CodeEditorComponent = {
    template: "#code-editor-component-template",
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
        };
    },
    computed: {
        codemirror() {
          return this.$refs.cmEditor.codemirror;
        },
    },
    mounted() {
        console.log("look at my codemirror instance:", this.codemirror);

        let lineHandle = this.codemirror.addLineClass(0, "background", "background-modifier");
        console.dir(lineHandle);
    },
};

export default CodeEditorComponent;