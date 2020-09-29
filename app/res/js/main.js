const currentUser = {
    id: 123,
    avatarUrl: "https://images6.fanpop.com/image/photos/42600000/LOONA-X-X-photoshoot-behind-Hyunjin-loo-CE-A0-CE-94-42662157-840-1260.jpg",
    name: "Hyunjin"
}

function init() {
    console.log("javascript initialized");
    var SideComments = require("side-comments"),
        existingComments = JSON.parse(document.querySelector("#existing-comments").innerHTML);

    console.log(SideComments);
    console.log(existingComments);

    sideComments = new SideComments("#commentable-area", currentUser, existingComments);
}

init();