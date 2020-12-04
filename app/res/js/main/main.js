/* global Vue SemanticUIVue */
import AgreementsComponent from "./components/agreements.js";
import DemographicsSurveyComponent from "./components/demographics-survery.js";
import TaskSurveyComponent from "./components/task-survey.js";
import FinalSurveyComponent from "./components/final-survey.js";
import StudyIntroductionComponent from "./components/study-introduction.js";
import StudyControlsComponent from "./components/study-controls.js";
import EndScreenComponent from "./components/end-screen.js";

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
        "demographics": DemographicsSurveyComponent,
        "task-survey": TaskSurveyComponent,
        "final-survey": FinalSurveyComponent,
        "agreements": AgreementsComponent,
        "study-controls": StudyControlsComponent,
        "end-screen": EndScreenComponent,
    },
    /**
    * Hold reactive data for the component.
    * Utilizing Vues built in reactivity the component will re-render if this data changes, see link below.
    * @see https://vuejs.org/v2/guide/reactivity.html
    * 
    */
    data: {
        agreementsOpen: false,
        allowExit: false,
        allowExitCountdown: 300000,

        studyCompleted: false,
        demographicsSurveyCompleted: false,
        isFinalSurvey: false,
        currentTask: {
            id: null,
            name: "unknown",
            description: "unknown",
            isFinished: false,
            surveyCompleted: false,
        },
        taskList: null,
        tasks: studyTasks,
    },
    /** Hold computed properties for the component.
    * @property {Boolean} isTaskSurvey - 
    */
    computed: {
        isTaskSurvey() {
            return this.currentTask.isFinished && !this.currentTask.surveyCompleted;
        },
        isFirstTask() {
            return this.currentTask.id === null;
        },
        numTasksCompleted() {
            return this.tasks.length - this.taskList.length;
        },
    },
    created() {
        this.agreementsOpen = (localStorage.getItem("agreementIsGiven") !== "true");
        this.studyCompleted = (localStorage.getItem("studyCompleted") === "true");
        this.isFinalSurvey = (localStorage.getItem("isFinalSurvey") === "true");
        this.demographicsSurveyCompleted = (localStorage.getItem("demographicsSurveyCompleted") === "true");

        this.currentTask = localStorage.getItem("currentTask") !== null ? JSON.parse(localStorage.getItem("currentTask")) : this.currentTask;
        // get or create taskList from tasks data
        if (localStorage.getItem("taskList") !== null) {
            this.taskList = JSON.parse(localStorage.getItem("taskList"));
        } else {
            this.taskList = this.tasks.map(task => task.id);
        }
    },
    /**
    * Hold methods for this component.
    * 
    */
    methods: {
        onStartTaskButtonClicked() {
            // update current task and task list. this is a saveguard in case multiple tabs are used
            this.currentTask = localStorage.getItem("currentTask") !== null ? JSON.parse(localStorage.getItem("currentTask")) : this.currentTask;
            this.taskList = localStorage.getItem("taskList") !== null ? JSON.parse(localStorage.getItem("taskList")) : this.tasks.map(task => task.id);
            
            if (this.taskList.length === 0) {
                location.reload();
            } else if (this.isFirstTask) {
                this.startTask("exploration");
            } else if (this.isTaskSurvey) {
                location.reload();
            } else if (!this.currentTask.isFinished) {
                this.startReviewEditor(this.currentTask.id);
            } else {
                this.startTask("taskwritecomment");
            }
        },
        startTask(taskId) {
            // eslint-disable-next-line no-param-reassign
            taskId = taskId || this.taskList[Math.floor(Math.random() * this.taskList.length)];
            this.updateCurrentTask(taskId);
            this.startReviewEditor(taskId);
        },
        updateCurrentTask(taskId) {
            let newTask = this.tasks.find(task => task.id === taskId);
            newTask.isFinished = false;
            newTask.surveyCompleted = false;
            localStorage.setItem("currentTask", JSON.stringify(newTask));
        },
        startReviewEditor(taskId) {
            fetch(`../../data/state_${taskId}.json`)
                .then(response => response.text())
                .then(stateString => {
                    localStorage.setItem("state", stateString);
                    location.href = "./review-editor";
            });
        },
        finishCurrentTask() {
            this.currentTask.surveyCompleted = true;
            localStorage.setItem("currentTask", JSON.stringify(this.currentTask));
            
            this.taskList.splice(this.taskList.indexOf(this.currentTask.id), 1);
            localStorage.setItem("taskList", JSON.stringify(this.taskList));
            
            this.allowExit = true;
            setTimeout(() => { this.allowExit = false; }, this.allowExitCountdown);
        },
        showFinalSurvey() {
            localStorage.setItem("isFinalSurvey", "true");
            this.isFinalSurvey = true;
        },
        showFinalScreen() {
            localStorage.clear();
            localStorage.setItem("studyCompleted", "true");
            localStorage.setItem("agreementIsGiven", "true");
            localStorage.setItem("lTid", this.numTasksCompleted.toString());
            this.studyCompleted = true;
        },
        hideDemographicsSurvey() {
            localStorage.setItem("demographicsSurveyCompleted", "true");
            this.demographicsSurveyCompleted = true;
        },
    },
    /**
    * Code to execute when component is mounted, reference Vue Lifecycle below.
    * Add Comment Marker Components as LineWidgets. Listen for events from codemirror to handle rerender and content changes.
    * @see https://vuejs.org/v2/guide/instance.html
    */
    mounted() {
        let isMobile = window.matchMedia("only screen and (max-width: 1049px)").matches;

        if (isMobile) {
            document.querySelector("#spinner").style.display = "none";
            document.querySelector("#mobile-sorry").style.display = "block";
        } else {
            document.querySelector("#startup").style.display = "none";
            document.querySelector("#app").style.display = "block";
        } 
    },
});