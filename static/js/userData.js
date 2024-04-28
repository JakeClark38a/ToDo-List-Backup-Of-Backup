//=====================================================================\\
/* 
NOTICE:
This file handles all the actions that are related to the main content of the page.
This file handles:
    - Tasks
    - Tags
    - Groups
    - UserData
*/
//=====================================================================\\

var SampleData = {  // Sample dictionary
    username: "JakeClark",
    userid: "User ID",
    bio: "hmm...",
    timeZone: "Asia/Tokyo",
    displayLocalTimeZone: false,
    localTimeZoneName: "UTC",
    email: "email@example.com",
    groups: {
        gid001: {
            title: "Do",
            tags: ["tag1"],
            def_tag: "do",
            color: "#7aa5cf",
            current_html: "",
        },
        gid002: {
            title: "Delegate",
            tags: ["tag2"],
            def_tag: "delegate",
            color: "#63c074",
            current_html: "",
        },
        gid003: {
            title: "Schedule",
            tags: ["tag3", "tag5"],
            def_tag: "schedule",
            color: "#ac7acf",
            current_html: "",
        },
        gid004: {
            title: "Later",
            tags: ["tag4"],
            def_tag: "later",
            color: "#c5e875",
            current_html: "",
        },
    },
    tasks: {
        id001: {
            title: "Meeting",
            description: "About making a website",
            tag: "tag1",
            deadline: "2024-04-22T12:00",
            points: 4,
        },
        id002: {
            title: "Crying",
            description: "About making a website",
            tag: "tag3",
            deadline: "2024-04-22T12:00",
            points: 4,
        },
        id004: {
            title: "Laughing",
            description: "About making a website",
            tag: "tag5",
            deadline: "2024-04-22T12:00",
            points: 4,
        },
    },
    completed: {
        id003: {
            title: "Journaling",
            description: "About making a website",
            tag: "tag1",
            deadline: "2024-04-22T12:00",
            points: 5,
        },
    },
    tags: {
        do: {
            title: "Do",
            color: "#7aa5cf",
            groupId: "gid001",
            deletable: false,
            editable: false,
            display: false,
        },
        delegate: {
            title: "Delegate",
            color: "#63c074",
            groupId: "gid002",
            deletable: false,
            editable: false,
            display: false,
        },
        schedule: {
            title: "Schedule",
            color: "#ac7acf",
            groupId: "gid003",
            deletable: false,
            editable: false,
            display: false,
        },
        later: {
            title: "Later",
            color: "#c5e875",
            groupId: "gid004",
            deletable: false,
            editable: false,
            display: false,
        },
        tag1: {
            title: "tag1",
            color: "#7aa5cf",
            groupId: "gid001",
            deletable: true,
            editable: true,
            display: true,
        },
        tag2: {
            title: "tag2",
            color: "#63c074",
            groupId: "gid002",
            deletable: true,
            editable: true,
            display: true,
        },
        tag3: {
            title: "tag3",
            color: "#ac7acf",
            groupId: "gid003",
            deletable: true,
            editable: true,
            display: true,
        },
        tag4: {
            title: "tag4",
            color: "#c5e875",
            groupId: "gid004",
            deletable: true,
            editable: true,
            display: true,
        },
        tag5: {
            title: "tag5",
            color: "#f7d38c",
            groupId: "gid003",
            deletable: true,
            editable: true,
            display: true,
        },
        none: {
            title: "none",
            color: "#ffffff",
            deletable: false,
            editable: false,
            display: false,
        }
    }
};

class Utils {
    static getUuid() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
    }

    static randHexColor() {
        return "#" + ((Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));
    }

    static Dict2UserData(data) {
        let userData = {};
        for (const key in data) {
            if (key === "groups" || key === "tasks" || key === "completed" || key === "tags") {
                userData[key] = {};
                for (const id in data[key]) {
                    userData[key][id] = Utils.fromJSON(new (key === "tags" ? Tag : Task)(), data[key][id]);
                }
            } else {
                userData[key] = data[key];
            }
        }
        return userData;
    }

    static fromJSON(obj, json) {
        for (const key in json) {
            obj[key] = json[key];
        }
        return obj;
    }

    static getSampleData() {
        return this.Dict2UserData(SampleData);
    }
}

class Task {
    constructor(id, title, description, tag, deadline, points, isCompleted = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.tag = tag;
        this.deadline = deadline;
        this.points = points;
        this.isCompleted = isCompleted;
    }
}

class Tag {
    constructor(id, title, color, groupId, deletable = true, editable = true, display = true) {
        this.id = id;
        this.title = title;
        this.color = color;
        this.groupId = groupId;
        this.deletable = deletable;
        this.editable = editable;
        this.display = display;
    }
}

class Group {
    constructor(id, title, tags , color = Utils.randHexColor()) {
        this.id = id;
        this.title = title;
        this.tags = tags;
        this.color = color;
    }
}

function newTask(title, description, tag, deadline, points, isCompleted = false) {
    return new Task(Utils.getUuid(), title, description, tag, deadline, points, isCompleted);
}

function newTag(title, color = Utils.randHexColor(), groupId, deletable = true, editable = true, display = true) {
    return new Tag(Utils.getUuid(), title, color, groupId, deletable, editable, display);
}

function newGroup(title, tags = [], color = Utils.randHexColor()) {
    return new Group(Utils.getUuid(), title, tags, color);
}


function newUser(username, userid, bio, timeZone, displayLocalTimeZone, localTimeZoneName, email, groups = {}, tasks={}, completed={}, tags={}) {
    let UserData = {
        username: username,
        userid: userid,
        bio: bio,
        timeZone: timeZone,
        displayLocalTimeZone: displayLocalTimeZone,
        localTimeZoneName: localTimeZoneName,
        email: email,
        groups: groups,
        tasks: tasks,
        completed: completed,
        tags: tags,
    };
    return UserData;
}

function LoadData() {
    let loaded_data = {};
    ///ajax here
    let userData = Dict2UserData(loaded_data);
    return userData;
}

export {LoadData, Utils, newGroup, newTask, newTag};
