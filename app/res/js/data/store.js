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
* @property {String} user.id - User id.
* @property {String} user.name - Display name of the user.
* @property {String} user.avatarUrl - Link to the avatar picture of the user. Should be 1:1 and not too large.
* @property {String} [user.url] - Url for the page/profile of the author.
* 
* @property {Object} faq - Data for a simple faq to be displayed.
* @property {Boolean} faq.isVisible - Sentinel guarding the visibility state of the faq modal.
* @property {module:data/store~FaqItem[]} faq.data - Array holding data object for the faq.
* 
* @property {Object} checklist - Data for the checklist.
* @property {Boolean} checklist.isVisible - Sentinel guarding the visibility state of the checklist.
* @property {Object.<String, module:data/store~Checkbox>} checklist.categories - Dictionary for checklist displayed on the bottom left. Key: category string. Value: checkbox object.
* 
* @property {Object} content
* @property {String} content.currentFile - Sha for the currently displayed file.
* @property {Object.<String, module:data/store~File>} content.files - Dictonary of files. Key: file sha. Value: file object.
* @property {module:data/store~TreeItem} content.filetree - File tree for the repository. Root item of the file tree.
*
* @property {Object} editor - Data object for look and behaviour of the editor.
* @property {String} editor.activeTheme - Active code highlighting theme for the editor.
* @property {String[]} editor.themes - List of themes for the editor.
*/
/**
* @typedef File
* @type {Object}
* @property {String} sha - Unique identifier for file.
* @property {String} text - Text content stored inside that file.
* @property {String} activeCommentSection - Currently active Comment section. 'null' if no section is active.
* @property {module:data/store~Comment[]} comments - Array of comment objects.
*/
/**
* Data object for side-comments. Origin see below.
* @typedef Comment
* @type {Object}
* @property {String} id - Unique identifier for that comment.
* @property {String} sectionId - Generally represents which element the comment is attached to.
* @property {String} authorId - Id of the author.
* @property {String} authorAvatarUrl - Link to the avatar picture of the comment author, should be 1:1 and not too large.
* @property {String} authorName - Display name of the comment author.
* @property {String} [authorUrl] - Url for the page/profile of the author.
* @property {String} comment - The value/content of one comment.
* @see http://aroc.github.io/side-comments-demo/
*/
/**
* Object to be recursivly used in file tree. Can represent a folder or a file.
* @typedef TreeItem
* @type {Object}
* @property {String} name - Display name of the item.
* @property {module:data/store~TreeItem[]} [children] - Array if tree items. Having children makes a tree item a folder.
* @property {Boolean} [isOpen] - Sentinel indicating if the items children are visible.
* @property {String} [sha] - Sha for the file represeted by this tree item.
* @property {Boolean} [isModified] - Indicates if the file was modified by the review author.
*/
/**
* Data object for checkboxes
* @typedef Checkbox
* @type {Object}
* @property {String} id - Unique identifier for this checkbox.
* @property {String} label - Text to be dispayed with the checkbox.
* @property {Boolean} checked - True if checkbox should be checked.
*/
/**
* Data object for one faq item.
* @typedef FaqItem
* @type {Object}
* @property {String} question - A reasonable question.
* @property {String} answer - A formidable answer to the question.
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
            id: "123",
            name: "Monkey D. Ruffy",
            avatarUrl: "data:image/jpeg;base64,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",
        },
        faq: {
            isVisible: false,
            data: [
                {
                    question: "what is going on?",
                    answer: "well i'm coding like hella fast",
                },
                {
                    question: "Am I too bigheaded?",
                    answer: "Ask a psychiatrist.",
                },
                {
                    question: "What is the meaning of life?",
                    answer: "Many major historical figures in philosophy have provided an answer to the question of what, if anything, makes life meaningful, although they typically have not put it in these terms. Consider, for instance, Aristotle on the human function, Aquinas on the beatific vision, and Kant on the highest good. While these concepts have some bearing on happiness and morality, they are straightforwardly construed as accounts of which final ends a person ought to realize in order to have a life that matters. Despite the venerable pedigree, it is only in the last 50 years or so that something approaching a distinct field on the meaning of life has been established in Anglo-American philosophy, and it is only in the last 30 years that debate with real depth has appeared. Concomitant with the demise of positivism and of utilitarianism in the post-war era has been the rise of analytical enquiry into non-hedonistic conceptions of value, including conceptions of meaning in life, grounded on relatively uncontroversial (but not certain or universally shared) judgments of cases, often called “intuitions.” English-speaking philosophers can be expected to continue to find life's meaning of interest as they increasingly realize that it is a distinct topic that admits of rational enquiry to no less a degree than more familiar ethical categories such as well-being, virtuous character, and right action." + 
                    "This survey critically discusses approaches to meaning in life that are prominent in contemporary Anglo-American philosophical literature. To provide context, sometimes it mentions other texts, e.g., in Continental philosophy or from before the 20th century. However, the central aim is to acquaint the reader with recent analytic work on life's meaning and to pose questions about it that are currently worthy of consideration." + 
                    "When the topic of the meaning of life comes up, people often pose one of two questions: 'So, what is the meaning of life?' and 'What are you talking about?' The literature can be divided in terms of which question it seeks to answer. This discussion starts off with works that address the latter, abstract question regarding the sense of talk of 'life's meaning,' i.e., that aim to clarify what we are asking when we pose the question of what, if anything, makes life meaningful. Afterward, it considers texts that provide answers to the more substantive question about the nature of meaning as a property. Some accounts of what make life meaningful provide particular ways to do so, e.g., by making certain achievements (James 2005), developing moral character (Thomas 2005), or learning from relationships with family members (Velleman 2005). However, most recent discussions of meaning in life are attempts to capture in a single principle all the variegated conditions that can confer meaning on life. This survey focuses heavily on the articulation and evaluation of these theories of what would make life meaningful. It concludes by examining nihilist views that the conditions necessary for meaning in life do not obtain for any of us, i.e., that all our lives are meaningless.",
                },
                {
                    question: "Do you have some more philosophy?",
                    answer: "The term “free will” has emerged over the past two millennia as the canonical designator for a significant kind of control over one’s actions. Questions concerning the nature and existence of this kind of control (e.g., does it require and do we have the freedom to do otherwise or the power of self-determination?), and what its true significance is (is it necessary for moral responsibility or human dignity?) have been taken up in every period of Western philosophy and by many of the most important philosophical figures, such as Plato, Aristotle, Augustine, Aquinas, Descartes, and Kant. (We cannot undertake here a review of related discussions in other philosophical traditions. For a start, the reader may consult Marchal and Wenzel 2017 and Chakrabarti 2017 for overviews of thought on free will, broadly construed, in Chinese and Indian philosophical traditions, respectively.) In this way, it should be clear that disputes about free will ineluctably involve disputes about metaphysics and ethics. In ferreting out the kind of control involved in free will, we are forced to consider questions about (among others) causation, laws of nature, time, substance, ontological reduction vs emergence, the relationship of causal and reasons-based explanations, the nature of motivation and more generally of human persons. In assessing the significance of free will, we are forced to consider questions about (among others) rightness and wrongness, good and evil, virtue and vice, blame and praise, reward and punishment, and desert. The topic of free will also gives rise to purely empirical questions that are beginning to be explored in the human sciences: do we have it, and to what degree?" + 
                    "Here is an overview of what follows. In Section 1, we acquaint the reader with some central historical contributions to our understanding of free will. (As nearly every major and minor figure had something to say about it, we cannot begin to cover them all.) As with contributions to many other foundational topics, these ideas are not of ‘merely historical interest’: present-day philosophers continue to find themselves drawn back to certain thinkers as they freshly engage their contemporaries. In Section 2, we map the complex architecture of the contemporary discussion of the nature of free will by dividing it into five subtopics: its relation to moral responsibility; the proper analysis of the freedom to do otherwise; a powerful, recent argument that the freedom to do otherwise (at least in one important sense) is not necessary for moral responsibility; ‘compatibilist’ accounts of sourcehood or self-determination; and ‘incompatibilist’ or ‘libertarian’ accounts of source and self-determination. In Section 3, we consider arguments from experience, a priori reflection, and various scientific findings and theories for and against the thesis that human beings have free will, along with the related question of whether it is reasonable to believe that we have it. Finally, in Section 4, we survey the long-debated questions involving free will that arise in classical theistic metaphysics.",
                },
            ],
        },
        checklist: {
            isVisible: true,
            categories: {
                "Vorbereitung": [
                    {
                        id: "11",
                        label: "Aufgabenstellung ausführlich durchlesen",
                        checked: false,
                    },
                    {
                        id: "12",
                        label: "Should be checked",
                        checked: true,
                    },
                    {
                        id: "13",
                        label: "Very very long label to see how the system responds to such kind of nonsensical usage.",
                        checked: false,
                    },
                ],
                "Überblick": [
                    {
                        id: "21",
                        label: "Aufgabenstellung ausführlich durchlesen",
                        checked: false,
                    },
                    {
                        id: "22",
                        label: "Should be checked",
                        checked: true,
                    },
                    {
                        id: "23",
                        label: "Very very long label to see how the system responds to such kind of nonsensical usage.",
                        checked: false,
                    },
                ],
                "Feedback": [
                    {
                        id: "31",
                        label: "Aufgabenstellung ausführlich durchlesen",
                        checked: false,
                    },
                    {
                        id: "32",
                        label: "Should be checked",
                        checked: true,
                    },
                    {
                        id: "33",
                        label: "Very very long label to see how the system responds to such kind of nonsensical usage.",
                        checked: false,
                    },
                ],
            },
        },
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
                            id: "10001",
                            sectionId: "1",
                            authorId: "2",
                            authorAvatarUrl: "https://i.kym-cdn.com/photos/images/original/001/474/942/012.gif",
                            authorUrl: "https://i.imgflip.com/40ga2o.jpg",
                            authorName: "Winnie",
                            comment: "Morning my Friend",
                        },
                        {
                            id: "10002",
                            sectionId: "1",
                            authorId: "12",
                            authorAvatarUrl: "https://www.kindpng.com/picc/m/28-287073_elonlol-discord-emoji-elon-musk-laughing-deer-hd.png",
                            authorName: "Elon",
                            comment: "I am gonna write a super long and not at all helpful comment because i am a dick and i want to destroy this holes tool career.",
                        },
                        {
                            id: "10003",
                            sectionId: "3",
                            authorId: "12",
                            authorAvatarUrl: "https://www.kindpng.com/picc/m/28-287073_elonlol-discord-emoji-elon-musk-laughing-deer-hd.png",
                            authorName: "Elon",
                            comment: "Coding is not hard.",
                        },
                        {
                            id: "10004",
                            sectionId: "54",
                            authorId: "2",
                            authorAvatarUrl: "https://i.kym-cdn.com/photos/images/original/001/474/942/012.gif",
                            authorUrl: "https://i.imgflip.com/40ga2o.jpg",
                            authorName: "Winnie",
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
                    activeCommentSection: "2",
                    comments: [
                        {
                            id: "20001",
                            sectionId: "2",
                            authorId: "1111",
                            authorAvatarUrl: "https://media.vanityfair.com/photos/5c2fdb09ef10e32ca1332862/1:1/w_1420,h_1420,c_limit/trumpshutdownraises.jpg",
                            authorName: "Trump",
                            comment: "What's up with you?",
                        },
                        {
                            id: "20002",
                            sectionId: "12",
                            authorId: "123",
                            authorAvatarUrl: "data:image/jpeg;base64,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",
                            authorName: "Monkey D. Ruffy",
                            comment: "Why would you delete this?",
                        },
                        {
                            id: "20003",
                            sectionId: "12",
                            authorId: "123",
                            authorAvatarUrl: "data:image/jpeg;base64,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",
                            authorName: "Monkey D. Ruffy",
                            comment: "ID3 lol",
                        },
                    ],
                },
            },
            filetree: {
                name: "src",
                isOpen: true,
                children: [
                    { sha: "undefined", name: "test.html", isModified: false},
                    { sha: "undefined", name: "test.htm", isModified: true},
                    { sha: "undefined", name: "test.css", isModified: false},
                    { sha: "undefined", name: "test.txt", isModified: false},
                    {
                        name: "js",
                        isOpen: false,
                        children: [
                            { sha: "fileSha0000", name: "AppServer.js", isModified: true},
                            { sha: "fileSha0001", name: "SideComments.js", isModified: false},
                        ],
                    },
                    {
                        name: "test",
                        isOpen: false,
                        children: [
                            { sha: "undefined", name: "test.js", isModified: true},
                            { sha: "testfile0000", name: "testfile.js", isModified: false},
                            {
                                name: "emptyFolder", isOpen: false, children: [],
                            },
                        ],
                    },
                ],
            },
        },
        editor: {
            activeTheme: "monokai",
            themes: [
                "default","gruvbox-dark","monokai","seti","idea","the-matrix",
            ],
        },
    },
    /**
    * Add one comment for one code file
    * @param {String} fileSha
    * @param {module:data/store~Comment} comment - Comment for side-comments.
    */
    addComment(fileSha, comment) {
        this.state.content.files[fileSha].comments.push(comment);
        this.log();
    },
    
    /**
    * Delete one comment
    * @param {String} fileSha
    * @param {String} commentID - Id of comment to be deleted.
    */
    deleteComment(fileSha, commentId) {
        let index = this.state.content.files[fileSha].comments.findIndex((comment) => {
            return comment.id === commentId;
        });
        if (index !== -1) {
            this.state.content.files[fileSha].comments.splice(index, 1);
            this.log();
        }
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
                this.log();
            }
        }
    },
    
    /**
    * Set active selection for comments on one file
    * @param {String} fileSha - File the comments are connected to.
    * @param {String} sectionId - Section id to set as active section.
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
    * Set active code editor theme.
    * @param {String} theme - Name for each theme originates from codemirrors implementation.
    */
    setActiveTheme(theme) {
        if (this.state.editor.themes.includes(theme)) {
            this.state.editor.activeTheme = theme;
            this.log();
        }
    },
    
    /**
    * Toggle checkbox item in checklist.
    * @param {String} category - category the item belongs too.
    * @param {String} id - checkbox id of the system.
    */
    toggleCheckbox(category, id) {
        if (Object.keys(this.state.checklist.categories).includes(category)) {
            let result = this.state.checklist.categories[category].find(item => item.id === id);
            if (result !== undefined) {
                result.checked = !result.checked;
                this.log();
            }
        }
    },
    
    /**
    * Toggles the visibility state of the checklist
    */
    toggleChecklistVisibility() {
        this.state.checklist.isVisible = !this.state.checklist.isVisible;
        this.log();
    },
    
    /**
    * Toggle the visibility state of the faq
    */
    toggleFaqVisibility() {
        this.state.faq.isVisible = !this.state.faq.isVisible;
        this.log();
    },
    
    /**
     * Toggle isOpen property of a folder.
     * @param {String} folderName 
     */
    toggleFolderOpen(folderName) {
        let folder = this.searchFileTree({name: folderName});
        if (folder !== null) {
            folder.isOpen = !folder.isOpen;
            this.log();
        }
    },
    
    /**
     * Search for any item in file tree.
     * @param {Object} searchOptions - Object must have one key and one value, from the filetree item that is searched for. If the combination is not unique the fist result will be returned.
     * @returns {module:data/store~TreeItem}
     */
    searchFileTree(searchOptions) {
        // general tree search function
        // with kind help by stackoverflow (https://stackoverflow.com/questions/9133500/how-to-find-a-node-in-a-tree-with-javascript)
        function recursiveSearch(node, key, value) {
            if (node[key] === value) {
                return node;
            } else if (node.children !== undefined) {
                let result = null;
                for (let child of node.children) {
                    result = recursiveSearch(child, key, value);
                    if (result !== null) { break; }
                }
                return result;
            }
            return null;
        }
        
        if (Object.keys(searchOptions).length === 1) {
            let searchKey = Object.keys(searchOptions)[0],
            searchValue = searchOptions[searchKey];
            
            return recursiveSearch(this.state.content.filetree, searchKey, searchValue);
        }
        return null;
    },

    /**
     * Open all folders of file tree.
     */
    openFileTree() {
        this.changeFileTreeRecusive(this.state.content.filetree, "isOpen", true);
        this.log();
    },

    /**
     * Close all folders of filetree.
     */
    collapseFileTree() {
        this.changeFileTreeRecusive(this.state.content.filetree, "isOpen", false);
        this.log();
    },

    /**
     * Change one parameter in all items of the file tree
     * @param {module:data/store~TreeItem} node 
     * @param {String} key 
     * @param {*} value 
     */
    changeFileTreeRecusive(node, key, value) {
        if (node[key] !== undefined) {
            node[key] = value;
        } 
        if (node.children !== undefined) {
            for (let child of node.children) {
                this.changeFileTreeRecusive(child, key, value);
            }
        }
    },
    
    /**
    * if debug is enabled in state, outputs current state to console
    */
    log() {
        if (this.debug) {
            console.log("State changed:");
            console.log(this.state);
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