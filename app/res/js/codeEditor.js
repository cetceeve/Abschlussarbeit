import {
    Event,
    Observable,
} from "./utils/Observable.js";
import DataService from "./services/side-comment-data.js";

class CodeEditor extends Observable {
    constructor() {
        super();
        this.counter = this.increment();
        // eslint-disable-next-line no-undef
        this.editor = CodeMirror(document.body, {
            mode: "javascript",
            lineNumbers: true,
        });
        this.initListeners();
        this.editor.setValue(this.loadContent());
        this.notifyAll(new Event("initDone", {
            message: "CodeEditor: initialization complete",
        }));
    }

    initListeners() {
        this.editor.on("renderLine", (instance, line, element) => {
            let number = this.counter.next().value;
            console.log("Line Number: " + number);
            console.log(instance);
            console.log(line);
            console.log(element);
        });
    }

    loadContent() {
        return "function hi(){return 'I love you';}\nconsole.log(hi());";
    }

    * increment() {
        let index = 0;
        while (true) {
            yield index++;
        }
    }
}

export default new CodeEditor();