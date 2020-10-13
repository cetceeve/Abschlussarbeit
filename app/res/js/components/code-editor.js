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

        // let codemirrorCodeElementChildNodes = document.querySelector(".CodeMirror-code").childNodes;
        
        // for (let i = 0; i < codemirrorCodeElementChildNodes.length; i++) {
        //     let div = document.createElement("div");
        //     div.classList.add("commentable-section", "CodeMirror-linebackground");
        //     div.setAttribute("data-section-id", i + "");
        //     codemirrorCodeElementChildNodes[i].insertBefore(div, codemirrorCodeElementChildNodes[i].firstChild);
        //     console.log(codemirrorCodeElementChildNodes[i]);
        //     console.log(codemirrorCodeElementChildNodes[i].parentElement);
        // }

        // for (let i = 0; i < codemirrorCodeElementChildNodes.length; i++) {
        //     this.codemirror.addLineClass(i, "background", "identifier" + i);
        //     let el = this.codemirror.getWrapperElement().querySelector(".identifier" + i);
        //     el.classList.add("commentable-section", "CodeMirror-linebackground");
        //     el.setAttribute("data-section-id", i + "");
        //     console.log(el);
        // }
    
        // this.codemirror.on("renderLine", (instance, lineHandle, element) => {
        //     element.classList.add("commentable-section");
        //     element.setAttribute("data-section-id", this.codemirror.lineInfo(lineHandle).line.toString());
        //     //element.parentElement.insertBefore(div, element.parentElement.firstChild);
        // });

        let lineHandle = this.codemirror.addLineClass(0, "background", "background-modifier");
        console.dir(lineHandle);

        for (let i = 0; i < this.codemirror.lineCount(); i++) {
            let widget = document.createElement("div");
            widget.setAttribute("style", "bottom: 15px;");
            widget.setAttribute("class", "commentable-section");
            widget.setAttribute("data-section-id", i.toString());
            let lineWidget = this.codemirror.addLineWidget(i, widget, { handleMouseEvents: true});
            // lineWidget.node.addEventListener("click", event => event.stopPropagation());
            console.log(lineWidget);
        }

        // eslint-disable-next-line no-undef    
        let SideComments = require("side-comments"),
        sideComments = new SideComments(this.codemirror.getScrollerElement(), storage.state.user);

        for (let comment of storage.state.comments[storage.state.code.currentFile]) {
            sideComments.insertComment(comment);
        }

        sideComments.on("commentPosted", comment => {
            sideComments.insertComment(comment);
            storage.setComment(storage.state.code.currentFile, comment);
        });
    },
};

export default CodeEditorComponent;