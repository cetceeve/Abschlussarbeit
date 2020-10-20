import store from "../data/store.js";

/**
* Display tree view of the projects/repositories file structure.
* Originally from an example on the Vue website, see below.
* @module components/TreeViewComponent
* @requires module:data/store
* @see https://vuejs.org/v2/examples/tree-view.html
*/

/**
* Namespace for tree item component
* @namespace
*/
var TreeItemComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#tree-item-component-template",
    /**
    * Attributes that are exposed to accept data from the parent component.
    * @property {Object} item - data item for this node
    */
    props: {
        item: Object,
    },
    /** Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {Boolean} isOpen - Sentinel indicating if the items children are visible.
    */
    data: function() {
        return {
            isOpen: false,
        };
    },
    /**
    * Hold computed properties for the component.
    * @property {Boolean} isFolder - Determines if the item should be considered a 'folder'.
    */
    computed: {
        isFolder: function() {
            return this.item.children && this.item.children.length;
        },
    },
    /**
    * Hold methods for this component.
    * @property {Function} toggle - Changes the value on isOpen.
    */
    methods: {
        toggle: function() {
            if (this.isFolder) {
                this.isOpen = !this.isOpen;
            }
        },
    },
},

/**
* Namespace for tree view component
* @namespace
*/
TreeViewComponent = {
    /** Css-selector for component template.
    * @type {String}
    */
    template: "#tree-view-component-template",
    /**
    * Locally registered components.
    * @property {Component} tree-item - Component representing one item inside the tree.
    */
    components: {
        "tree-item": TreeItemComponent,
    },
    /** Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * @property {module:data/store~State} sharedState - Reference to the state object in order to utilize Vues built in reactivity for automatic re-render.
    */
    data() {
        return {
            sharedState: store.state,
        };
    },
    /**
    * Hold computed properties for the component.
    */
    computed: {
    },
    /**
    * Hold methods for this component.
    */
    methods: {
        
    },
};

export default TreeViewComponent;