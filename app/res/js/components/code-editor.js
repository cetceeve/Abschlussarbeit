import storage from "../data/storage.js";

var CodeEditorComponent = {
    template: "#code-editor-component-template",
    data() {
        return {
            code: storage.state.code.files[storage.state.code.currentFile].value,
            cmOption: {
                mode: "javascript",
                foldGutter: true,
                lineNumbers: true,
                readOnly: true,
            },
        };
    },
};

export default CodeEditorComponent;