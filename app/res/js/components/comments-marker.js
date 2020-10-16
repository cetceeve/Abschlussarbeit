import storage from "../data/storage.js";

/**
 * Marker component to be added to one codemirror line.
 * Clickable to create new or display existing comments.
 * Shows number of comments on one line
 * 
 * @module components/CodeEditorComponent/CommentsMarkerComponent
 * @author Fabian Zeiher <fzeiher@gmail.com>
 * @requires module:data/Storage
 */

 /**
  * Namespace Object for Marker Component
  * @namespace
  */
 var CommentsMarkerComponent = {
     /** Css-selector for component template.
     * @type {String}
     */
    template: "#comments-marker-component-template",
    // data() {
    //     return {
    //         sectionID: "undefined",
    //     };
    // },
    props: {
        section: String,
    },
    computed: {
        amountOfComments() {
            console.log(this.section);
            // eslint-disable-next-line no-param-reassign
            let countIDs = (acc, comment) => comment.sectionId === parseInt(this.section) ? ++acc : acc;
            return storage.state.comments[storage.state.code.currentFile].reduce(countIDs, 0);
        },
    },
 };

 export default CommentsMarkerComponent;