class Autosave {
    constructor(store) {
        this.store = store;
        this.autosaveInterval = 5000;
        this.autosaveActive = false;
        this.autosave();
    }

    get latestSave() {
        if (localStorage.getItem("autosave_state")) {
            return localStorage.getItem("autosave_state");
        }
        return null;
    }

    save() {
        localStorage.setItem("autosave_state", this.store.getStateString());
        console.log("autosaved");
    }

    autosave() {
        setInterval(() => {
            if (this.autosaveActive) {
                this.save();
            }
        }, this.autosaveInterval);
    }

    enableAutosave() {
        this.autosaveActive = true;
    }

    disableAutosave() {
        this.autosaveActive = false;
    }
}

export default Autosave;