import {
    Event,
    Observable,
} from "../utils/Observable.js";

class EditorDataService extends Observable {
    constructor() {
        super();
    }

    async getContent() {
        let serverRes = await fetch("/editor", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
            },
        });
        return await serverRes.text();
    }
}

export default EditorDataService;