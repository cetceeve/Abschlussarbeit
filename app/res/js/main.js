import CodeEditor from "./codeEditor.js";
import SideComments from "./sideComments.js";

function init() {
  var codeEditor = new CodeEditor(),
    sideComments;

  codeEditor.addEventListener("initDone", event => {
    console.log(event.data.message);
    sideComments = new SideComments(codeEditor.wrapperElement);
    sideComments.addEventListener("initDone", event => {
      console.log(event.data.message);
    });
  });
}

init();