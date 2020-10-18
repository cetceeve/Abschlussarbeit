/**
* Module to store the current state and all state operations.
* The state object must not be manipulated directly.
* Follows the {@link https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch|Store-Pattern}.
* @module data/store
*/
/**
* Represents the state of the Review-Editor, can be safed to external database.
* @typedef State
* @type {Object}
* @property {Object} meta - Information regarding the Review-Editors context and status.
* @property {String} meta.id - the ID of the current state.
* @property {boolean} meta.debug - Used to trigger debug behaviour.
* @property {String} meta.status - Status of the Review [open, in-progress, finished].
* @property {String} meta.activeStage - The currently active stage of the Review.
* 
* @property {Object} user - Data for the logged in user.
* @property {Number} user.id - User id.
* @property {String} user.name - Display name of the user.
* @property {String} user.avatarUrl - Link to the avatar picture of the user. Should be 1:1 and not too large.
* @property {String} [user.url] - Url for the page/profile of the author.
* 
* @property {Object} content
* @property {String} content.currentFile - Sha for the currently displayed file.
* @property {Object.<String, module:data/store~File>} content.files - Dictonary of files. Key: file sha. Value: file object.
* @property {Object} content.filetree - File tree for the repository.
*/
/**
 * @typedef File
 * @type {Object}
 * @property {String} sha - Unique identifier for file.
 * @property {String} text - Text content stored inside that file.
 * @property {Number} activeCommentSection - Currently active Comment section. 'null' if no section is active.
 * @property {module:data/store~Comment[]} comments - Array of comment objects.
 */
/**
* Data object for side-comments. Origin see below.
* @typedef Comment
* @type {Object}
* @property {Number} sectionId - Generally represents which element the comment is attached to.
* @property {Number} authorId - Id of the author.
* @property {String} authorAvatarUrl - Link to the avatar picture of the comment author, should be 1:1 and not too large.
* @property {String} authorName - Display name of the comment author.
* @property {String} [authorUrl] - Url for the page/profile of the author.
* @property {String} comment - The value/content of one comment.
* @see http://aroc.github.io/side-comments-demo/
*/

/**
* Namespace object for store module.
* @namespace
* @property {module:data/store~State} state - Represents the state of the Review-Editor, can be safed to external database.
*/
var store = {
    debug: true,
    state: {
        meta: {
            id: "0000",
            status: "wip",
            activeStage: "undefined",
        },
        user: {
            id: 123,
            name: "Seoulbear",
            avatarUrl: "https://pbs.twimg.com/profile_images/964204609186222081/I7Mc16_z.jpg",
        },
        faq: {
            url: "undefined",
        },
        checklist: [],
        database: {
            repositoryUrl: "undefined",
            revisionId: "undefined",
            databaseUrl: "undefined",
            saved: false,
        },
        task: {
            title: "undefined",
            description: "undefined",
            owner: "undefined",
        },
        content: {
            currentFile: "fileSha0000",
            files: {
                "fileSha0000": {
                    sha: "fileSha000",
                    text: "/* eslint-env node */\r\n" +
                    "\r\n" +
                    "const path = require(\"path\"),\r\n" +
                    "  express = require(\"express\");\r\n" +
                    "\r\n" +
                    "/**\r\n" +
                    " * AppServer\r\n" +
                    " *\r\n" +
                    " * Creates a simple web server by using express to static serve files from a given directory.\r\n" +
                    " *\r\n" +
                    " * @author: Alexander Bazo\r\n" +
                    " * @version: 1.0\r\n" +
                    " */\r\n" +
                    "\r\n" +
                    "class AppServer {\r\n" +
                    "\r\n" +
                    "  /**\r\n" +
                    "   * Creates full path to given appDir and constructors express application with\r\n" +
                    "   * static \"/app\" route to serve files from app directory.\r\n" +
                    "   * \r\n" +
                    "   * @constructor\r\n" +
                    "   * @param  {String} appDir Relative path to application dir (from parent)\r\n" +
                    "   */\r\n" +
                    "  constructor(appDir) {\r\n" +
                    "    this.appDir = path.join(__dirname, \"../\", appDir);\r\n" +
                    "    this.app = express();\r\n" +
                    "    this.app.use(express.json());\r\n" +
                    "    this.app.use(\"/app\", express.static(this.appDir));\r\n" +
                    "  }\r\n" +
                    "\r\n" +
                    "  /**\r\n" +
                    "   * Starts server on given port\r\n" +
                    "   * \r\n" +
                    "   * @param  {Number} port Port to use for serving static files\r\n" +
                    "   */\r\n" +
                    "  start(port) {\r\n" +
                    "    this.server = this.app.listen(port, function () {\r\n" +
                    "      console.log(\r\n" +
                    "        `AppServer started. Client available at http://localhost:${port}/app`\r\n" +
                    "      );\r\n" +
                    "    });\r\n" +
                    "  }\r\n" +
                    "\r\n" +
                    "  /**\r\n" +
                    "   * Stops running express server\r\n" +
                    "   */\r\n" +
                    "  stop() {\r\n" +
                    "    if (this.server === undefined) {\r\n" +
                    "      return;\r\n" +
                    "    }\r\n" +
                    "    this.server.close();\r\n" +
                    "  }\r\n" +
                    "\r\n" +
                    "}\r\n" +
                    "\r\n" +
                    "module.exports = AppServer;",
                    activeCommentSection: null, 
                    comments: 
                    [
                        {
                            sectionId: 1,
                            authorAvatarUrl: "https://www.ansoko.info/wp-content/uploads/2020/01/Kim-Hyunjin.jpg",
                            authorUrl: "https://images6.fanpop.com/image/photos/40900000/HyunJin-loo-CE-A0-CE-94-40926384-400-400.gif",
                            authorName: "Hyunjini",
                            comment: "AERYONG",
                        },
                        {
                            sectionId: 1,
                            authorAvatarUrl: "https://media.tenor.com/images/2358de5b4a95de5aa74418305b3c2728/tenor.gif",
                            authorName: "Yerimi",
                            comment: "I am gonna write a super long and not at all helpful comment because i am a dick and i want to destroy this holes tool career.",
                        },
                        {
                            sectionId: 3,
                            authorAvatarUrl: "https://media.tenor.com/images/2358de5b4a95de5aa74418305b3c2728/tenor.gif",
                            authorName: "Yerimi",
                            comment: "Coding is not hard.",
                        },
                        {
                            sectionId: 54,
                            authorAvatarUrl: "https://www.ansoko.info/wp-content/uploads/2020/01/Kim-Hyunjin.jpg",
                            authorUrl: "https://images6.fanpop.com/image/photos/40900000/HyunJin-loo-CE-A0-CE-94-40926384-400-400.gif",
                            authorName: "Hyunjini",
                            comment: "Side-Comments is not coded well.",
                        },
                    ],
                },
                "fileSha0001": {
                    sha: "fileSha0001",
                    text: "/**\r\n" +
                    " * Iniate a side-comments instance with a user object.\r\n" +
                    " * @param {Object} wrapperElement - The element which contains all the .commentable-section elements.\r\n" +
                    " * @see http://aroc.github.io/side-comments-demo/\r\n" +
                    " * @returns {Object} - New instance of side-comments.\r\n" +
                    " */\r\n" +
                    "initSideComments = (wrapperElement) => {\r\n" +
                    "    // eslint-disable-next-line no-undef    \r\n" +
                    "    let SideComments = require(\"side-comments\");\r\n" +
                    "    return new SideComments(wrapperElement, storage.state.user);\r\n" +
                    "},\r\n" +
                    "/**\r\n" +
                    " * Add stored comments for the current file.\r\n" +
                    " * Utilises side-comments insertCommit() function internaly.\r\n" +
                    " * @param {Object} sideComments - A side-comments instance.\r\n" +
                    " */\r\n" +
                    "insertStoredComments = (sideComments) => {\r\n" +
                    "    for (let comment of storage.state.comments[storage.state.code.currentFile]) {\r\n" +
                    "        sideComments.insertComment(comment);\r\n" +
                    "    }\r\n" +
                    "},\r\n" +
                    "/**\r\n" +
                    " * Register Listeners on the side-comments instance.\r\n" +
                    " * On \"commentPosted\" the comment will be saved to storage and then inserted to the DOM.\r\n" +
                    " * @param {Object} sideComments - A side-comments instance.\r\n" +
                    " */\r\n" +
                    "registerSideCommentsListeners = (sideComments) => {\r\n" +
                    "    sideComments.on(\"commentPosted\", comment => {\r\n" +
                    "        sideComments.insertComment(comment);\r\n" +
                    "        storage.setComment(storage.state.code.currentFile, comment);\r\n" +
                    "    });\r\n" +
                    "};",
                    activeCommentSection: 2,
                    comments: [
                        {
                            sectionId: 2,
                            authorAvatarUrl: "https://i.pinimg.com/originals/fe/62/e3/fe62e3a5963a4ab3310f5f95d3c72b4e.jpg",
                            authorName: "Bae",
                            comment: "What's up with you?",
                        },
                        {
                            sectionId: 12,
                            authorId: 123,
                            authorAvatarUrl: "https://pbs.twimg.com/profile_images/964204609186222081/I7Mc16_z.jpg",
                            authorName: "Seoulbear",
                            comment: "Why would you delete this?",
                        },
                    ],
                },
            },
            filetree: {
                name: "undefined",
                children: [],
            },
        },
    },
    /**
    * Set one comment for one code file
    * @param {String} fileSha
    * @param {module:data/store~Comment} comment - Comment for side-comments.
    */
    setComment(fileSha, comment) {
        this.state.content.files[fileSha].comments.push(comment);
        this.log();
    },
    
    /**
    * Set the current file on display
    * @param {String} fileSha
    */
    setCurrentFile(fileSha) {
        if (fileSha !== this.state.content.currentFile) {        
            if (Object.keys(this.state.content.files).includes(fileSha)) {
                this.state.content.currentFile = fileSha;
                if (this.debug) { console.log("new current File: " + this.state.content.currentFile); }
            }
        }
        this.log();
    },
    
    /**
    * Set active selection for comments on one file
    * @param {String} fileSha - File the comments are connected to.
    * @param {Number} sectionId - Section id to set as active section.
    */
    setActiveSection(fileSha, sectionId) {
        // This is essentially a deselect
        if (this.state.content.files[fileSha].activeCommentSection === sectionId) {
            this.state.content.files[fileSha].activeCommentSection = null;
            if (this.debug) { console.log("active comment section deselected"); }
        } else {
            this.state.content.files[fileSha].activeCommentSection = sectionId;
            if (this.debug) { console.log("new active comment section selected: " + this.state.content.files[fileSha].activeCommentSection); }
        }
        this.log();
    },
    
    /**
    * if enabled in state, outputs current state to console
    */
    log() {
        if (this.debug) {
            console.log("--------  State changed  ----------");
            console.log(this.state);
            console.log("-----------------------------------");
        }
    },
    
    /**
    * Stringify current state.
    * @return {String} String of the current state
    */
    getStateString() {
        return JSON.stringify(this.state);
    },
    
    /**
    * Meke deep copy of current state.
    * @return {module:data/store~State} Deep copy of state
    */
    getStateCopy() {
        return JSON.parse(this.getStateString());
    },
};

export default store;