/**
* Module to store the current state and all state operations.
* The state object must not be manipulated directly.
* Follows the {@link https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch|Store-Pattern}.
* @module data/store
* @author Fabian Zeiher <fzeiher@gmail.com>
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
* @property {Object} task - Data for the Task modal
* @property {Boolean} task.isVisible - Sentinel guarding the visibility state of the task modal.
* @property {String} task.content - Content to be displayed. Should be Markdown.
*
* @property {Object} content
* @property {String} content.currentFile - Sha for the currently displayed file.
* @property {module:data/store~CommentCategory[]} content.commentCategories - Array of possible categories for comments
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
* @property {String} path - Relative path of the file in the project. Extention is used to determine codemirror mode.
* @property {String} text - Text content stored inside that file.
* @property {module:data/store~LinePresentationModifier[]} linePresentationModifiers - Array of objects that are used to change the presentation of a codemirror line.
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
* @property {String} [authorAvatarUrl] - Link to the avatar picture of the comment author, should be 1:1 and not too large.
* @property {String} authorName - Display name of the comment author.
* @property {String} [authorUrl] - Url for the page/profile of the author.
* @property {String} content - The value/content of one comment.
* @property {String} categoryId - Id of the category this comment belongs to.
* @see http://aroc.github.io/side-comments-demo/
*/
/**
* @typedef CommentCategory
* @type {Object}
* @property {Sting} value - Serves as an ID for the category, named value because of semantic-vue selection dropdown behaviour, see below
* @property {String} text - Named text because of semantic-vue selection dropdown behaviour, see below
* @property {String} color - Color for this category, can be any css color
* @see https://semantic-ui-vue.github.io/#/modules/dropdown
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
* Object changing the presentation of one line in codemirror using addLineClass on "wrap", see below.
* @typedef LinePresentationModifier
* @typedef {Object}
* @property {String} class - Name for the css class to be applied.
* @property {Number[]} lines - Array of lines that the class should be applied to.
* @see https://codemirror.net/doc/manual.html#addLineClass
*/

/**
* Namespace object for store module.
* @namespace
* @property {module:data/store~State} state - Represents the state of the Review-Editor, can be safed to external database.
*/
let store = {
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
        },
        faq: {
            isVisible: false,
            data: [
                {
                    question: "what is going on?",
                    answer: "well i'm coding like hella fast",
                },
                {
                    question: "Is this Markdown?",
                    answer: "is this **Markdowned**?",
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
                "Bearbeitung": [
                    {
                        id: "31",
                        label: "Wurden bekannte *Coding Guidelines* eingehalten?",
                        checked: false,
                    },
                    {
                        id: "32",
                        label: "Wurden für Variablen und Methoden verständliche und treffend formulierte Bezeichner verwendet?",
                        checked: true,
                    },
                    {
                        id: "33",
                        label: "Folgt der Aufbau des Codes einem nachvollziehbaren und sinnvollen Konzept?",
                        checked: false,
                    },
                    {
                        id: "34",
                        label: "Wurden die verschiedenen Aufgabenbereiche der Software sichtbar und sinnvoll voneinander getrennt?",
                        checked: false,
                    },
                    {
                        id: "35",
                        label: "Wurde auf eine modularisierte Code-Strtuktur, z.B. durch gute *Decomposition* oder wiederverwendbare Methoden und Prototypen geachtet?",
                        checked: false,
                    },
                    {
                        id: "36",
                        label: "Wurde das [MVC-Konzept](https://de.wikipedia.org/wiki/Model_View_Controller) korrekt umgesetzt: Sind Model und UI klar voneinander getrennt?",
                        checked: false,
                    },
                    {
                        id: "37",
                        label: "Wurden kritische oder komplexe Stellen im Code ausreichend kommentiert?",
                        checked: false,
                    },
                    {
                        id: "38",
                        label: "Wurden alle nicht benötigten Teilbereiche des Codes entfernt? Wurden alle Debug-Ausgaben und -Methoden vor der Abgabe entfernt?",
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
            isVisible: false,
            owner: "Fabian Zeiher",
            content: "##Führe ein Code-Review durch\nby Fabi\n\n---\n\nlet's go!",           
        },
        content: {
            currentFile: "fileSha0000",
            commentCategories: [
                {
                    text: "Bug",
                    color: "red",
                    value: "1",
                },
                {
                    text: "Alternative",
                    color: "orange",
                    value: "2",
                },
                {
                    text: "Anmerkung",
                    color: "blue",
                    value: "3",
                },
                {
                    text: "Kompliment",
                    color: "green",
                    value: "4",
                },
            ],
            files: {
                "fileSha0000": {
                    sha: "fileSha000",
                    path: "src/js/Appserver.js",
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
                    linePresentationModifiers: [
                        {
                            class: "unchanged_line",
                            lines: [0,1,2,3,55],
                        },
                    ],
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
                            content: "Morning my Friend",
                            categoryId: "2",
                        },
                        {
                            id: "10002",
                            sectionId: "1",
                            authorId: "12",
                            authorAvatarUrl: "https://www.kindpng.com/picc/m/28-287073_elonlol-discord-emoji-elon-musk-laughing-deer-hd.png",
                            authorName: "Elon",
                            content: "I am gonna write a **super long** and not at all helpful comment because i am a ~~dick~~ and i want to destroy this `holes tool` career.",
                            categoryId: "1",
                        },
                        {
                            id: "10003",
                            sectionId: "3",
                            authorId: "12",
                            authorAvatarUrl: "https://www.kindpng.com/picc/m/28-287073_elonlol-discord-emoji-elon-musk-laughing-deer-hd.png",
                            authorName: "Elon",
                            content: "Coding is not hard.",
                            categoryId: "4",
                        },
                        {
                            id: "10004",
                            sectionId: "54",
                            authorId: "2",
                            authorAvatarUrl: "https://i.kym-cdn.com/photos/images/original/001/474/942/012.gif",
                            authorUrl: "https://i.imgflip.com/40ga2o.jpg",
                            authorName: "Winnie",
                            content: "Side-Comments is not coded well.",
                            categoryId: "1",
                        },
                    ],
                },
                "fileSha0001": {
                    sha: "fileSha0001",
                    path: "src/js/SideComments.js",
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
                    "insertStoredComments = () => {\r\n" +
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
                    "    sidecomments.on(\"commentPosted\", comment => {\r\n" +
                    "        sidecomments.insertComment(comment);\r\n" +
                    "        storage.setComment(storage.state.code.currentFile, comment)\r\n" +
                    "    });\r\n" +
                    "};",
                    linePresentationModifiers: [
                        {
                            class: "unchanged_line",
                            lines: [0,1,2,3,4,5,6,7,8,9,10],
                        },
                        {
                            class: "halloween_line",
                            lines: [0,6,7,8,9,10,11,12,13,14],
                        },
                    ],
                    activeCommentSection: "2",
                    comments: [
                        {
                            id: "20001",
                            sectionId: "2",
                            authorId: "1111",
                            authorAvatarUrl: "https://media.vanityfair.com/photos/5c2fdb09ef10e32ca1332862/1:1/w_1420,h_1420,c_limit/trumpshutdownraises.jpg",
                            authorName: "Trump",
                            content: "What's up with you?",
                            categoryId: "3",
                        },
                        {
                            id: "20002",
                            sectionId: "12",
                            authorId: "123",
                            authorName: "Monkey D. Ruffy",
                            content: "Why would you delete this?",
                            categoryId: "2",
                        },
                        {
                            id: "20003",
                            sectionId: "12",
                            authorId: "123",
                            authorName: "Monkey D. Ruffy",
                            content: "ID3 lol",
                            categoryId: "2",
                        },
                    ],
                },
                "fileSha0002": {
                    sha: "fileSha0002",
                    path: "src/test.htm",
                    text: "<!DOCTYPE HTML>\n<html>\n<head>\n    <meta charset=\"UTF-8\">\n    <title>HTMLHint</title>\n</head>\n<body>\n    <div>HTMLHint: help your html code better\n</body>\n</html>",
                    linePresentationModifiers: [],
                    activeCommentSection: null,
                    comments: [],
                },
                "fileSha0003": {
                    sha: "fileSha0003",
                    path: "src/test.css",
                    text: ".checklist-button {\n" + 
                    "    position: absolute !important;\n}\n\n" +
                    ".code-editor-search-fab {\n" + 
                    "    position: absolute;\n" +
                    "    right: 1em;\n" +
                    "    bottom: 1em\n" +
                    "    z-index: 99;\n}",
                    linePresentationModifiers: [],
                    activeCommentSection: null,
                    comments: [],
                },
            },
            filetree: {
                name: "src",
                isOpen: true,
                children: [
                    { sha: "undefined", name: "test.html", isModified: false},
                    { sha: "fileSha0002", name: "test.htm", isModified: true},
                    { sha: "fileSha0003", name: "test.css", isModified: true},
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
                            { sha: "undefined", name: "test.js", isModified: false},
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
    * Add or update one comment for one code file, enriches user inputed data with the user data
    * @param {String} fileSha
    * @param {module:data/store~Comment} newComment
    */
    postComment(fileSha, newComment) {
        // search if that comment already exists in the database
        let existingComment = this.state.content.files[fileSha].comments.find((comment) => {
            return comment.id === newComment.id;
        });

        // update exiting or create a new comment
        if (existingComment) {
            existingComment.content = newComment.content;
            existingComment.categoryId = newComment.categoryId;
        } else {
            this.state.content.files[fileSha].comments.push(newComment);
        }
        this.save();
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
            this.save();
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
                this.save();
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
        this.save();
    },
    
    /**
    * Set active code editor theme.
    * @param {String} theme - Name for each theme originates from codemirrors implementation.
    */
    setActiveTheme(theme) {
        if (this.state.editor.themes.includes(theme)) {
            if (this.state.editor.activeTheme !== theme) {
                this.state.editor.activeTheme = theme;
                this.save();
            }
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
                this.save();
            }
        }
    },
    
    /**
    * Toggles the visibility state of the checklist
    */
    toggleChecklistVisibility() {
        this.state.checklist.isVisible = !this.state.checklist.isVisible;
        this.save();
    },
    
    /**
    * Toggle the visibility state of the faq
    */
    toggleFaqVisibility() {
        this.state.faq.isVisible = !this.state.faq.isVisible;
        this.save();
    },
    
    /**
    * Toggle the visibility state of the task
    */
    toggleTaskVisibility() {
        this.state.task.isVisible = !this.state.task.isVisible;
        this.save();
    },
    
    /**
    * Toggle isOpen property of a folder.
    * @param {String} folderName 
    */
    toggleFolderOpen(folderName) {
        let folder = this.searchFileTree({name: folderName});
        if (folder !== null) {
            folder.isOpen = !folder.isOpen;
            this.save();
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
        this.save();
    },
    
    /**
    * Close all folders of filetree.
    */
    collapseFileTree() {
        this.changeFileTreeRecusive(this.state.content.filetree, "isOpen", false);
        this.save();
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
    
    setState(stateString) {
        if (stateString !== null) {
            this.state = JSON.parse(stateString);
            console.log("state recovered");
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
    
    get currentFileSha() {
        return this.state.content.currentFile;
    },
    
    get currentFile() {
        return this.state.content.files[this.state.content.currentFile];
    },
    
    // Save current state to the nrowsers local storage
    save() {
        localStorage.setItem("autosave_state", this.getStateString());
        if (this.debug) {
            console.log("state saved");
            console.log(this.state);
        }
    },
};

store.setState((function() {
    
    return null;
})());

export default store;