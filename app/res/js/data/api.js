var api = {
    fetchFileComments: async function (fileSha) {
        let serverRes = await fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileSha: fileSha,
            }),
        });
        return await serverRes.json();
    },
    fetchFile: async function() {
        let serverRes = await fetch("/editor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await serverRes.json();
    },
};

export default api;