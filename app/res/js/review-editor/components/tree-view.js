/* global Vue */
import store from "../model/store.js";

/**
* Display tree view of the projects/repositories file structure.
* Originally from an example on the Vue website, see below.
* @module review-editor/components/TreeViewComponent
* @requires module:review-editor/model/Store
* @author Fabian Zeiher
* @see https://vuejs.org/v2/examples/tree-view.html
*/
/**
* Namespace for tree view component
* @namespace
*/
let TreeViewComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#tree-view-component-template",
    /** Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {module:review-editor/model/Store~TreeItem} treeData - File tree for the repository. Root item of the file tree.
    */
    data() {
        return {
            treeData: store.state.content.filetree,
        };
    },
    /**
    * Hold methods for this component.
    * @property {Function} openFileTree - Open all folders in the file tree.
    * @property {Function} collapseFileTree - Collapse all folders in the file tree.
    */
    methods: {
        openFileTree() {
            store.openFileTree();
        },
        collapseFileTree() {
            store.collapseFileTree();
        },
    },
};

/**
* Namespace for tree item component.
* Component is globaly registered to allow for recursion.
* Originally from an example on the Vue website, see below.
* @namespace TreeItemComponent
* @requires module:review-editor/model/Store
* @author Fabian Zeiher
* @see https://vuejs.org/v2/examples/tree-view.html
* @global
*/
Vue.component("tree-item", {
    /** Css-selector for component template.
    * @type {String}
    * @memberof TreeItemComponent
    */
    template: "#tree-item-component-template",
    /**
    * Attributes that are exposed to accept data from the parent component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @property {module:review-editor/model/Store~TreeItem} item - Data item for this node.
    * @memberof TreeItemComponent
    * @see https://vuejs.org/v2/guide/reactivity.html
    */
    props: {
        item: Object,
    },
    /**
    * Hold computed properties for the component.
    * @property {Boolean} isFolder - Determines if the item should be considered a 'folder'.
    * @property {Boolean} isSelected - Checks if this file is the current file in application state.
    * @property {String} iconName - Conditional logic to figure out which icon should be displayed.
    * @memberof TreeItemComponent
    */
    computed: {
        isFolder: function() {
            return this.item.children && this.item.children.length;
        },
        isSelected: function() {
            return this.item.sha === store.currentFileSha;
        },
        iconName: function() {
            if (this.isFolder) {
                if (this.item.isOpen) {
                    return "folder open";
                } 
                return "folder";
            }
            switch (this.item.name.split(".")[1]) {
                case "js":
                    return "js";
                case "html":
                    return "html5";
                case "htm":
                    return "html5";
                case "css":
                    return "css3 alternate";
                case "py":
                    return "python";
                default:
                    return "file";
            }
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} toggle - Toggles isOpen on folder clicks. Sets new current file for file clicks.
    * @memberof TreeItemComponent
    */
    methods: {
        toggle: function() {
            if (this.isFolder) {
                store.toggleFolderOpen(this.item.name);
            } else {
                store.setCurrentFile(this.item.sha);
            }
        },
    },
});

export default TreeViewComponent;