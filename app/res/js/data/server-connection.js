let serverConnection = {
    fetchState: async function (url) {
        let serverRes = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "hi",
            }),
        });
        return await serverRes.json();
    },
};

export default serverConnection;