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
import { ajaxHandler } from "./ajaxHandler.js";

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
            groupID: "gid001",
        },
        gid002: {
            title: "Delegate",
            tags: ["tag2"],
            def_tag: "delegate",
            color: "#63c074",
            current_html: "",
            groupID: "gid002",
        },
        gid003: {
            title: "Schedule",
            tags: ["tag3", "tag5"],
            def_tag: "schedule",
            color: "#ac7acf",
            current_html: "",
            groupID: "gid003",
        },
        gid004: {
            title: "Later",
            tags: ["tag4"],
            def_tag: "later",
            color: "#c5e875",
            current_html: "",
            groupID: "gid004",
        },
    },
    tasks: {
        id001: {
            title: "Meeting",
            description: "About making a website",
            tag: "tag1",
            deadline: "2024-04-22T12:00",
            points: 4,
            taskID: "id001",
        },
        id002: {
            title: "Crying",
            description: "About making a website",
            tag: "tag3",
            deadline: "2024-04-22T12:00",
            points: 4,
            taskID: "id002",
        },
        id004: {
            title: "Laughing",
            description: "About making a website",
            tag: "tag5",
            deadline: "2024-04-22T12:00",
            points: 4,
            taskID: "id004",
        },
    },
    completed: {
        id003: {
            title: "Journaling",
            description: "About making a website",
            tag: "tag1",
            deadline: "2024-04-22T12:00",
            points: 5,
            taskID: "id003",
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
            tagID: "do",
        },
        delegate: {
            title: "Delegate",
            color: "#63c074",
            groupId: "gid002",
            deletable: false,
            editable: false,
            display: false,
            tagID: "delegate",
        },
        schedule: {
            title: "Schedule",
            color: "#ac7acf",
            groupId: "gid003",
            deletable: false,
            editable: false,
            display: false,
            tagID: "schedule",
        },
        later: {
            title: "Later",
            color: "#c5e875",
            groupId: "gid004",
            deletable: false,
            editable: false,
            display: false,
            tagID: "later",
        },
        tag1: {
            title: "tag1",
            color: "#7aa5cf",
            groupId: "gid001",
            deletable: true,
            editable: true,
            display: true,
            tagID: "tag1",
        },
        tag2: {
            title: "tag2",
            color: "#63c074",
            groupId: "gid002",
            deletable: true,
            editable: true,
            display: true,
            tagID: "tag2",
        },
        tag3: {
            title: "tag3",
            color: "#ac7acf",
            groupId: "gid003",
            deletable: true,
            editable: true,
            display: true,
            tagID: "tag3",
        },
        tag4: {
            title: "tag4",
            color: "#c5e875",
            groupId: "gid004",
            deletable: true,
            editable: true,
            display: true,
            tagID: "tag4",
        },
        tag5: {
            title: "tag5",
            color: "#4b3b1d",
            groupId: "gid003",
            deletable: true,
            editable: true,
            display: true,
            tagID: "tag5",
        },
        none: {
            title: "none",
            color: "#ffffff",
            deletable: false,
            editable: false,
            display: false,
            tagID: "none",
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
        // make sure the hex color not too bright or dark
        return "#" + (Math.floor((Math.random() * 222) + 40).toString(16)) + (Math.floor((Math.random() * 222) + 40).toString(16)) + (Math.floor((Math.random() * 222) + 40).toString(16));
    }

    static fromJSON(obj, json) {
        for (const key in json) {
            obj[key] = json[key];
        }
        return obj;
    }

    static getSampleData() {
        return new DictCRUD().importDict(SampleData);
    }
}

class Task {
    constructor(title, description, tag, deadline, points, taskID = null, isCompleted = false) {
        this.title = title; // title of the task
        this.description = description; // description of the task
        this.tag = tag; // tag of the task
        this.deadline = deadline; // deadline of the task (in datetime format: YYYY-MM-DDTHH:MM)
        this.points = points; // points of the task
        this.taskID = taskID;
        this.isCompleted = isCompleted; // completion status of the task
    }
    generateID() {
        this.taskID = Utils.getUuid();
    }
    // Convert to JavaScript Object
    // Template like ["title", "description"]
    toJSON(template = []) {
        // If template is empty, return all in JavaScript Object
        if (template.length == 0) {
            return {
                title: this.title,
                description: this.description,
                tag: this.tag,
                deadline: this.deadline,
                points: this.points,
                taskID: this.taskID,
                isCompleted: this.isCompleted
            };
        }
        return Utils.toJSON(this, template);
    }
    // From JavaScript Object like {title: "title", description: "description"}
    fromJSON(obj) {
        return Utils.fromJSON(this, obj);
    }
}

class Group {
    constructor(title, tags, def_tag, color, current_html, groupID = null) {
        this.title = title; // title of the group
        this.tags = tags; // tags in the group - list of tag ids
        this.def_tag = def_tag; // default tag
        this.color = color; // color of the group
        this.current_html = current_html; // current html of the group
        this.groupID = groupID;
    }
    generateID() {
        this.groupID = Utils.getUuid();
    }
    // Convert to JavaScript Object
    // Template like ["title", "tags"]
    toJSON(template = []) {
        // If template is empty, return all in JavaScript Object
        if (template.length == 0) {
            return {
                title: this.title,
                tags: this.tags,
                def_tag: this.def_tag,
                color: this.color,
                current_html: this.current_html,
                groupID: this.groupID
            };
        }
        return Utils.toJSON(this, template);
    }
    // From JavaScript Object like {title: "title", tags: ["tag1", "tag2"]}
    fromJSON(obj) {
        return Utils.fromJSON(this, obj);
    }
}
class Tag {
    constructor(title, color, groupId, deletable, editable, display, tagID = null) {
        this.title = title; // title of the tag
        this.color = color; // color of the tag
        this.groupId = groupId; // group id of the tag
        this.deletable = deletable; // deleteable status of the tag
        this.editable = editable; // editable status of the tag
        this.display = display; // display status of the tag
        this.tagID = tagID;
    }
    generateID() {
        this.tagID = Utils.getUuid();
    }
    // Convert to JavaScript Object
    // Template like ["title", "color"]
    toJSON(template = []) {
        // If template is empty, return all in JavaScript Object
        if (template.length == 0) {
            return {
                title: this.title,
                color: this.color,
                groupId: this.groupId,
                deletable: this.deletable,
                editable: this.editable,
                display: this.display,
                tagID: this.tagID
            };
        }
        return Utils.toJSON(this, template);
    }
    // From JavaScript Object like {title: "title", color: "#FFFFFF"}
    fromJSON(obj) {
        return Utils.fromJSON(this, obj);
    }
}
class Dict {
    constructor(username = "", userid = "", groups = {}, tasks = {},tags = {}) {
        this.username = username; // username of the user
        this.userid = userid; // user id of the user
        this.groups = groups; // groups of the user (group id: group object)
        this.tasks = tasks; // tasks of the user (task id: task object)
        this.tags = tags; // tags of the user (tag id: tag object)
    }
    // Getters
    getUsername() {
        return this.username;
    }
    getUserid() {
        return this.userid;
    }
    getGroups() {
        return this.groups;
    }
    getTasks() {
        return this.tasks;
    }
    getTags() {
        return this.tags;
    }
    // Setters
    setUsername(username) {
        this.username = username;
    }
    setUserid(userid) {
        this.userid = userid;
    }
    setGroups(groups) {
        this.groups = groups;
    }
    setTasks(tasks) {
        this.tasks = tasks;
    }
}

class DictCRUD extends Dict {
    constructor(username = "", userid = "", groups = {}, tasks = {}, tags = {}) {
        // Generate Dict object and assign to this
        super(username, userid, groups, tasks, tags);
    }
    // Add methods to create, read, update, delete Dict
    // Create
    createGroup(title, tags, def_tag, color, current_html, groupID = null) {
        let group = new Group(title, tags, def_tag, color, current_html, groupID); // def_tag still null through normal create
        // Todo:
        // 1. Create group in the Dict 
        // 2. if no def_tag defined create def_tag for the group
        // 3. add def_tag to the database server
        // 4. add def_tag to group 

        if (!groupID) { group.generateID(); }
        console.log(title + " have def_tag is: " + def_tag);
        // Create def_tag if not defined
        if (!def_tag) {
            console.log("No def_tag detected , making new one for " + title);
            let tg = this.createTag(title, color, group.groupID);
            group.def_tag = tg.tagID;
        }
        this.groups[group.groupID] = group;
        // return this
        return this.groups[group.groupID];
    }

    createTask(title, description, tag, deadline, points, taskID = null, isCompleted = false) {
        let task = new Task(title, description, tag, deadline, points, taskID, isCompleted);
        if (!taskID) { task.generateID(); }
        this.tasks[task.taskID] = task;
        // return this
        return this.tasks[task.taskID];
    }
    createTag(title, color, groupId, deletable = false, editable = false, display = false, tagID = null) {
        let tag = new Tag(title, color, groupId, deletable, editable, display, tagID);
        if (!tagID) { tag.generateID(); }
        this.tags[tag.tagID] = tag;
        // return this
        return this.tags[tag.tagID];
    }
    // Read
    readGroup(groupID) {
        return this.groups[groupID];
    }
    readTask(taskID) {
        return this.tasks[taskID];
    }
    readTagList(groupID) {
        return Object.values(this.tags).filter(tag => tag.groupId === groupID);
    }
    readAllGroups() {
        // Return all groups ID
        return Object.values(this.groups);
    }
    // find
    findTasksByGroup(groupID) {
        return Object.values(this.tasks).filter(task => task.tag == this.groups[groupID].def_tag
            || this.groups[groupID].tags.includes(task.tag));
    }
    findGroupByTag(tagID) {
        return Object.values(this.groups).filter(group => group.def_tag == tagID
            || group.tags.includes(tagID));
    }
    // Update   
    updateGroup(groupID, newGroup) {
        this.groups[groupID] = newGroup;
        return this.groups[groupID];
    }
    updateTask(taskID, newTask) {
        this.tasks[taskID] = newTask;
        return this.tasks[taskID];
    }
    updateTag(tagID, newTag) {
        this.tags[tagID] = newTag;
        return this.tags[tagID];
    }
    //Remove
    removeGroup(groupID) {
        // remove all task dependence
        for (let taskID in this.tasks) {
            if (this.tasks[taskID].tag == this.groups[groupID].def_tag
                || this.groups[groupID].tags.includes(this.tasks[taskID].tag)) {
                this.removeTask(taskID);
            }
        }
        //remove all tags dependences
        this.removeTag(this.groups[groupID].def_tag); // remove def_tag
        this.removeTag(this.groups[groupID].tags); // remove tags
        // remove the group
        delete this.groups[groupID]
    }
    removeTask(taskID) {
        delete this.tasks[taskID]
    }
    removeCompleted(completedID) {
        delete this.completed[completedID]
    }
    removeTag(tagID) {
        if (typeof tagID == 'string')
            delete this.tags[tagID]
        else if (Array.isArray(tagID))
            tagID.forEach((t) => delete this.tags[t])
        else console.log("Invalid tagID only array or string")
    }

    // Export to JSON object
    exportDict() {
        return {
            username: this.username,
            userid: this.userid,
            groups: this.groups,
            tasks: this.tasks,
            completed: this.completed,
            tags: this.tags
        };
    }
    // Import from JSON object
    importDict(obj) {
        this.username = obj.username;
        this.userid = obj.userid;
        this.email = obj.email;

        // Import groups
        for (const groupID in obj.groups) {
            let group = new Group();
            group.fromJSON(obj.groups[groupID]);
            this.groups[groupID] = group;
        }
        // Import tasks
        for (const taskID in obj.tasks) {
            let task = new Task();
            task.fromJSON(obj.tasks[taskID]);
            this.tasks[taskID] = task;
        }
        // Import tags
        for (const tagID in obj.tags) {
            let tag = new Tag();
            tag.fromJSON(obj.tags[tagID]);
            this.tags[tagID] = tag;
        }
        return this;
    }
    // Get list of tags in a group
    // If no argument is passed, return all tags
    getTags(groupID = null) {
        if (groupID == null) {
            return this.tags;
        }
        return Object.values(this.tags).filter(tag => tag.groupId === groupID);
    }
}


export { DictCRUD, Utils };
