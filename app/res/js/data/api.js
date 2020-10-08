let fetchFileComments = async function (fileSha) {
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
};

var api = {
    fetchFileComments: fetchFileComments,
};

export default api;