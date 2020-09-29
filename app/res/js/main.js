const currentUser = {
    id: 123,
    avatarUrl: "https://pbs.twimg.com/profile_images/964204609186222081/I7Mc16_z.jpg",
    name: "Seoulbear"
}

function init() {
    console.log("javascript initialized");
    var SideComments = require("side-comments"),
        existingComments = JSON.parse(document.querySelector("#existing-comments").innerHTML),
        myCodeMirror = CodeMirror(document.body, {
            value: "function myScript(){return 100;}\n",
            mode: "javascript"
        });

    let sideComments = new SideComments("#commentable-area", currentUser, existingComments);
}

init();