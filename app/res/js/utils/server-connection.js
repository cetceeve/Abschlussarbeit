let serverConnection = {
    
    sendSurveyResults: async function (urlEndpoint, inputData) {
        let serverRes = await fetch(urlEndpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputData),
        });
        return serverRes;
    },

    sendLog: async function(logData) {
        let serverRes = await fetch("/log", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(logData),
        });
        console.log(serverRes.status);
    },

    sendFeedback: async function(message) {
        let serverRes = await fetch("/feedback", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: message }),
        });
        return serverRes;
    },
};

export default serverConnection;