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
};

export default CodeEditorComponent;