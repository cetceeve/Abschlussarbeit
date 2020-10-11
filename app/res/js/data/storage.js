import api from "./api.js";

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
                currentFile: "fileSha0000",
                files: {
                    "fileSha0000": {
                        sha: "fileSha000",
                        value: "/* eslint-env node */\r\n" +
                        "\r\n" +
                        "const path = require(\"path\"),\r\n" +
                        "  express = require(\"express\");\r\n" +
                        "\r\n" +
                        "/**\r\n" +
                        " * AppServer\r\n" +
                        " *\r\n" +
                        " * Creates a simple web server by using express to static serve files from a given directory.\r\n" +
                        " *\r\n" +
                        " * @author: Alexander Bazo\r\n" +
                        " * @version: 1.0\r\n" +
                        " */\r\n" +
                        "\r\n" +
                        "class AppServer {\r\n" +
                        "\r\n" +
                        "  /**\r\n" +
                        "   * Creates full path to given appDir and constructors express application with\r\n" +
                        "   * static \"/app\" route to serve files from app directory.\r\n" +
                        "   * \r\n" +
                        "   * @constructor\r\n" +
                        "   * @param  {String} appDir Relative path to application dir (from parent)\r\n" +
                        "   */\r\n" +
                        "  constructor(appDir) {\r\n" +
                        "    this.appDir = path.join(__dirname, \"../\", appDir);\r\n" +
                        "    this.app = express();\r\n" +
                        "    this.app.use(express.json());\r\n" +
                        "    this.app.use(\"/app\", express.static(this.appDir));\r\n" +
                        "  }\r\n" +
                        "\r\n" +
                        "  /**\r\n" +
                        "   * Starts server on given port\r\n" +
                        "   * \r\n" +
                        "   * @param  {Number} port Port to use for serving static files\r\n" +
                        "   */\r\n" +
                        "  start(port) {\r\n" +
                        "    this.server = this.app.listen(port, function () {\r\n" +
                        "      console.log(\r\n" +
                        "        `AppServer started. Client available at http://localhost:${port}/app`\r\n" +
                        "      );\r\n" +
                        "    });\r\n" +
                        "  }\r\n" +
                        "\r\n" +
                        "  /**\r\n" +
                        "   * Stops running express server\r\n" +
                        "   */\r\n" +
                        "  stop() {\r\n" +
                        "    if (this.server === undefined) {\r\n" +
                        "      return;\r\n" +
                        "    }\r\n" +
                        "    this.server.close();\r\n" +
                        "  }\r\n" +
                        "\r\n" +
                        "}\r\n" +
                        "\r\n" +
                        "module.exports = AppServer;",
                    },
                },
                filetree: {
                    name: "undefined",
                    children: [],
                },
            },
            comments: {
                "fileSha0000": [{
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

    setFile() {
        api.fetchFile().then(data => {
            this.state.code.files[data.sha].sha = data.sha;
            this.state.code.files[data.sha].value = data.value;
        });
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