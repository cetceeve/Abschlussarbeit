import {
    Event,
    Observable,
} from "./Observable.js";

class EditorDataConnection extends Observable {
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

export default EditorDataConnection;