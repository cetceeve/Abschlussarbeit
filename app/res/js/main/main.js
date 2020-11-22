/* global Vue SemanticUIVue */
import TaskSurveyComponent from "./components/task-survey.js";
import AgreementsComponent from "./components/agreements.js";
import FinalSurveyComponent from "./components/final-survey.js";
import StudyIntroductionComponent from "./components/study-introduction.js";

Vue.use(SemanticUIVue);

/**
* Landing page for the user study.
* @module main/Main
* @requires module:main/components/TaskSurveyComponent
* @author Fabian Zeiher
*/

// eslint-disable-next-line no-new
new Vue({
    /** Css-selector for Vue app root.
    * @type {String}
    */
    el:"#app",
    /**
    * Register Subcomponents locally.
    * @property {module:main/components/TaskSurveyComponent} task-survey - 
    */
    components: {
        "study-introduction": StudyIntroductionComponent,
        "task-survey": TaskSurveyComponent,
        "final-survey": FinalSurveyComponent,
        "agreements": AgreementsComponent,
    },
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * 
    */
    data: {
    },
    /**
    * Hold methods for this component.
    * 
    */
    methods: {
        
    },
    /**
    * Code to execute when component is mounted, reference Vue Lifecycle below.
    * Add Comment Marker Components as LineWidgets. Listen for events from codemirror to handle rerender and content changes.
    * @see https://vuejs.org/v2/guide/instance.html
    */
    mounted() {
        return;
    },
});