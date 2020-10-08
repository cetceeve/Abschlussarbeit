var state = {
    meta: {
        debug: true,
        id: "0000",
    },
    user: {
        id: 123,
        name: "Seoulbear",
        avatarUrl: "https://pbs.twimg.com/profile_images/964204609186222081/I7Mc16_z.jpg",
    },
    code: {
        currentFile: "fileSha-0000",
    },
    comments: {},
    setComments(fileSha, data) {
        this.comments[fileSha] = data;
        this.debug();
    },
    debug() {
        if (this.meta.debug) {
            console.log(state);
        }
    },
};

export default state;