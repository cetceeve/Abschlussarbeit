/* global Vue SemanticUIVue */
import TaskSurveyComponent from "./components/task-survey.js";
import AgreementsComponent from "./components/agreements.js";
import FinalSurveyComponent from "./components/final-survey.js";
import StudyIntroductionComponent from "./components/study-introduction.js";
import StudyControlsComponent from "./components/study-controls.js";
import serverConnection from "../utils/server-connection.js";

import studyTasks from "../../../data/study-tasks.js";

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
        "study-controls": StudyControlsComponent,
    },
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * 
    */
    data: {
        studyCompleted: false,
        isFinalSurvey: false,
        currentTask: {
            id: null,
            name: "unknown",
            description: "unknown",
            isFinished: false,
            surveyCompleted: false,
        },
        taskList: ["task1", "task2"],
        tasks: studyTasks,
    },
    /** Hold computed properties for the component.
    * @property {Boolean} isTaskSurvey - 
    */
    computed: {
        isTaskSurvey() {
            return this.currentTask.isFinished && !this.currentTask.surveyCompleted;
        },
    },
    created() {
        this.studyCompleted = (localStorage.getItem("studyCompleted") === "true");
        this.isFinalSurvey = (localStorage.getItem("isFinalSurvey") === "true");
        this.currentTask = localStorage.getItem("currentTask") !== null ? JSON.parse(localStorage.getItem("currentTask")) : this.currentTask;
    },
    /**
    * Hold methods for this component.
    * 
    */
    methods: {
        startNextTask() {
            localStorage.setItem("currentTask", JSON.stringify({ id: "unknown", name: "Test Task", description: "ist *fesche* description.", isFinished: false, surveyCompleted: false}));
            serverConnection.fetchState().then(data => {
                localStorage.setItem("state", data.state);
                location.href = "./review-editor";
                console.log("start editor");
            });
        },
        showFinalSurvey() {
            localStorage.setItem("isFinalSurvey", "true");
            this.isFinalSurvey = true;
        },
        showFinalScreen() {
            this.studyCompleted = true;
        },
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