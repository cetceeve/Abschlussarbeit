import sideComments from "./sideComments.js";
import codeEditor from "./codeEditor.js";

function init() {
  codeEditor.addEventListener("initDone", event => {
    console.log(event.data.message);
  });
  sideComments.addEventListener("initDone", event => {
    console.log(event.data.message);
  });
}

init();