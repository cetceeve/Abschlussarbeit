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
};

export default serverConnection;