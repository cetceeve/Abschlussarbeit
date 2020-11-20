let serverConnection = {
    fetchState: async function () {
        let serverRes = await fetch("/state", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                taskId: "12345",
            }),
        });
        return await serverRes.json();
    },
};

export default serverConnection;