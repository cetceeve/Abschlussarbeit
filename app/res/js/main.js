import sideComment from "./sideComments.js";
import codeEditor from "./codeEditor.js";

function init() {
  sideComment.addEventListener("initDone", event => {
    console.log(event.data.message);
  });
  codeEditor.addEventListener("initDone", event => {
    console.log(event.data.message);
  });
}

init();