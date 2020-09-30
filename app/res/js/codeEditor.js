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
        // this.editor = CodeMirror(document.body, {
        //     mode: "javascript",
        //     lineNumbers: true,
        // });

        // eslint-disable-next-line no-undef
        this.editor = CodeMirror.fromTextArea(document.querySelector("#textarea"));
        this.setConfiguration();

        this.initListeners();
        this.editor.setValue(this.loadContent());
        this.notifyAll(new Event("initDone", {
            message: "CodeEditor: initialization complete",
        }));
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
        return "function hi(){return 'I love you';}\nconsole.log(hi());";
    }

    // <p data-section-id="1" class="commentable-section">Ich will einen Kaffee und zwar schnell!</p>
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
}

export default new CodeEditor();