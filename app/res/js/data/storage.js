class Storage {
    constructor() {
        this.state = {
            meta: {
                debug: true,
                id: "0000",
                repositoryUrl: "undefined",
                status: "wip",
                activeStage: "undefined",
            },
            user: {
                id: 123,
                name: "Seoulbear",
                avatarUrl: "https://pbs.twimg.com/profile_images/964204609186222081/I7Mc16_z.jpg",
            },
            faq: {
                url: "undefined",
            },
            checklist: [],
            database: {
                revisionId: "undefined",
                databaseUrl: "undefined",
                saved: false,
            },
            task: {
                title: "undefined",
                description: "undefined",
                owner: "undefined",
            },
            code: {
                currentFile: "fileSha-0000",
                files: {},
                filetree: {
                    name: "undefined",
                    children: [],
                },
            },
            comments: {
                "fileSha-0000": [{
                        sectionId: 1,
                        authorAvatarUrl: "https://www.ansoko.info/wp-content/uploads/2020/01/Kim-Hyunjin.jpg",
                        authorName: "Hyunjini",
                        comment: "AERYONG",
                    },
                    {
                        sectionId: 1,
                        authorAvatarUrl: "https://1.bp.blogspot.com/-OJSNqG09K88/XEF7y8RzQHI/AAAAAAAAAUs/tuyOX-EgK4gLnvy1-Yc5iYu0W6rqzt1kgCLcBGAs/s500-c/yeri.jpg",
                        authorName: "Yerimi",
                        comment: "I am gonna write a super long and not at all helpful comment because i am a dick and i want to destroy this holes tool career.",
                    },
                    {
                        sectionId: 3,
                        authorAvatarUrl: "https://1.bp.blogspot.com/-OJSNqG09K88/XEF7y8RzQHI/AAAAAAAAAUs/tuyOX-EgK4gLnvy1-Yc5iYu0W6rqzt1kgCLcBGAs/s500-c/yeri.jpg",
                        authorName: "Yerimi",
                        comment: "Coding is not hard.",
                    },
                ],
            },
        };
        this.debug();
    }

    setComment(fileSha, comment) {
        this.state.comments[fileSha].push(comment);
        this.debug();
    }

    debug() {
        if (this.state.meta.debug) {
            console.log(this.state);
        }
    }

    getStateString() {
        return JSON.stringify(this.state);
    }

    getStateCopy() {
        return JSON.parse(this.getStateString());
    }
}

export default new Storage();