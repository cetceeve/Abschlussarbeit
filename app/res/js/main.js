/* global CodeMirror */
import sideComment from "./sideComments.js";

function init() {
  // initCodeMirror();

  sideComment.addEventListener("initDone", event => {
    console.log(event.data.message);
  });
}

function initCodeMirror() {
  // eslint-disable-next-line no-undef
  let myCodeMirror = CodeMirror(document.body, {
    value: "function myScript(){return 100;}\n",
    mode: "javascript",
    lineNumbers: true,
  });
}

init();