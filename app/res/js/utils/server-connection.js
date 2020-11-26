let serverConnection = {
    fetchState: async function (taskId) {
        let serverRes = await fetch("/state", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                taskId: taskId,
            }),
        });
        return await serverRes.json();
    },
    
    sendSurveyResults: async function (urlEndpoint, inputData) {
        let serverRes = await fetch(urlEndpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputData),
        });
        return await serverRes.json();
    },

    sendLog: async function (logData) {
        let serverRes = await fetch("/log", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(logData),
        });
        console.log(serverRes.status);
    },
};

export default serverConnection;