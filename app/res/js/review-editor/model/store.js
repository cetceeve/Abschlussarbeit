
/**
* Module to store the current state and all state operations.
* The state object must not be manipulated directly.
* Follows the {@link https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch|Store-Pattern}.
* @module review-editor/model/Store
* @author Fabian Zeiher <fzeiher@gmail.com>
*/
/**
* Represents the state of the Review-Editor, can be safed to external database.
* @typedef State
* @type {Object}
* @property {Object} meta - Information regarding the Review-Editors context and status.
* @property {String} meta.id - the ID of the current state.
* @property {Boolean} meta.ready - Status of the state.
* @property {module:review-editor/model/Store~Task} meta.task - The user study task this state is used for.
* @property {Boolean} meta.exitConfirmationIsVisible - Sentinel to determine if exit confirmation should be visible.
* 
* @property {Object} user - Data for the logged in user.
* @property {String} user.id - User id.
* @property {String} user.name - Display name of the user.
* @property {String} user.avatarUrl - Link to the avatar picture of the user. Should be 1:1 and not too large.
* @property {String} [user.url] - Url for the page/profile of the author.
* 
* @property {Object} faq - Data for a simple faq to be displayed.
* @property {Boolean} faq.isVisible - Sentinel guarding the visibility state of the faq modal.
* @property {module:review-editor/model/Store~FaqItem[]} faq.data - Array holding data object for the faq.
* 
* @property {Object} checklist - Data for the checklist.
* @property {Boolean} checklist.isVisible - Sentinel guarding the visibility state of the checklist.
* @property {Object.<String, module:review-editor/model/Store~Checkbox>} checklist.categories - Dictionary for checklist displayed on the bottom left. Key: category string. Value: checkbox object.
* 
* @property {Object} task - Data for the Task modal
* @property {Boolean} task.isVisible - Sentinel guarding the visibility state of the task modal.
* @property {String} task.content - Content to be displayed. Should be Markdown.
*
* @property {Object} content
* @property {String} content.currentFile - Sha for the currently displayed file.
* @property {module:review-editor/model/Store~CommentCategory[]} content.commentCategories - Array of possible categories for comments
* @property {Object.<String, module:review-editor/model/Store~File>} content.files - Dictonary of files. Key: file sha. Value: file object.
* @property {module:review-editor/model/Store~TreeItem} content.filetree - File tree for the repository. Root item of the file tree.
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
* @property {module:review-editor/model/Store~LinePresentationModifier[]} linePresentationModifiers - Array of objects that are used to change the presentation of a codemirror line.
* @property {String} activeCommentSection - Currently active Comment section. 'null' if no section is active.
* @property {module:review-editor/model/Store~Comment[]} comments - Array of comment objects.
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
* @property {module:review-editor/model/Store~TreeItem[]} [children] - Array if tree items. Having children makes a tree item a folder.
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
* @type {Object}
* @property {String} class - Name for the css class to be applied.
* @property {Number[]} lines - Array of lines that the class should be applied to.
* @see https://codemirror.net/doc/manual.html#addLineClass
*/
/**
* Object for one user study task
* @typedef Task
* @type {Object}
* @property {String} id
* @property {String} name
* @property {String} description
*/

/**
* Namespace object for store module.
* @namespace
* @property {module:review-editor/model/Store~State} state - Represents the state of the Review-Editor, can be safed to external database.
*/
let store = {
    debug: true,
    state: {
        meta: {
            id: "unknown",
            exitConfirmationIsVisible: false,
        },
        user: {
            id: "unknown",
            name: "unknown",
        },
        faq: {
            isVisible: false,
            data: [],
        },
        checklist: {
            isVisible: false,
            categories: {},
        },
        task: {
            isVisible: false,
            content: "unknown",           
        },
        content: {
            currentFile: "unknown",
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
                "unknown": {
                    sha: "unknown",
                    path: "root/unknown.js",
                    text: "",
                    linePresentationModifiers: [],
                    activeCommentSection: null, 
                    comments: [],
                },
            },
            filetree: {
                name: "root",
                isOpen: true,
                children: [
                    { sha: "unknown", name: "unknown.js", isModified: false},
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
    * @param {module:review-editor/model/Store~Comment} newComment
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
    * Toggle the visibility state of the exit confirmation
    */
    toggleExitConfirmationVisibility() {
        this.state.meta.exitConfirmationIsVisible = !this.state.meta.exitConfirmationIsVisible;
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
    * @returns {module:review-editor/model/Store~TreeItem}
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
    * @param {module:review-editor/model/Store~TreeItem} node 
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
            console.log("state loaded");
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
    * @return {module:review-editor/model/Store~State} Deep copy of state
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
        localStorage.setItem("state", this.getStateString());
        if (this.debug) {
            console.log("state saved");
            console.log(this.state);
        }
    },
};

store.setState((function() {
    if (localStorage.getItem("state") !== undefined) {
        return localStorage.getItem("state");
    }
    return null;
})());

export default store;