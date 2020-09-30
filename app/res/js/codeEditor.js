import {
    Event,
    Observable,
} from "./utils/Observable.js";
import DataConnection from "./utils/editor-data-connection.js";

class CodeEditor extends Observable {
    constructor() {
        super();
        this.counter = this.increment();
        // eslint-disable-next-line no-undef
        this.editor = CodeMirror(document.body, {
            mode: "javascript",
            lineNumbers: true,
            readOnly: true,
            inputStyle: "contenteditable",
        });

        // eslint-disable-next-line no-undef
        // this.editor = CodeMirror.fromTextArea(document.querySelector("#textarea"));
        // this.setConfiguration();

        this.initListeners();
        this.loadContent();
    }

    setConfiguration() {
        this.editor.setOption("lineNumbers", true);
        this.editor.setOption("mode", "javascript");
        this.editor.setOption("readOnly", true);
    }

    initListeners() {
        this.editor.on("renderLine", (instance, line, element) => {
            this.embedSideComments(element);
        });
    }

    loadContent() {
        // this.editor.setValue(this.testText);
        let dataConnection = new DataConnection();
        dataConnection.getContent().then(content => {
            this.editor.setValue(content);

            this.notifyAll(new Event("initDone", {
                message: "CodeEditor: initialization complete",
            }));
        });
    }

    embedSideComments(lineEl) {
        let number = this.counter.next().value;
        lineEl.classList.add("commentable-section");
        lineEl.setAttribute("data-section-id", number.toString());
    }

    get wrapperElement() {
        return this.editor.getWrapperElement();
    }

    * increment() {
        let index = 0;
        while (true) {
            yield index++;
        }
    }

    get testText() {
        return "20\n19\n18\n17\n16\n15\n14\n13\n12\n11\n10\n9\n8\n7\n6\n5\n4\n3\n2\n1\n0";
    }
}

export default CodeEditor;