/* Sample data
var Dict = {
    // sample dict
    username: "JakeClark",
    userid: "User ID",
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
        deadline: 62783,
        points: 4,
      },
      id002: {
        title: "Crying",
        description: "About making a website",
        tag: "tag3",
        deadline: 62783,
        points: 4,
      },
      id004: {
        title: "Laughing",
        description: "About making a website",
        tag: "tag5",
        deadline: 62783,
        points: 4,
      },
    },
    completed: {
      id003: {
        title: "Journaling",
        description: "About making a website",
        tag: "tag1",
        deadline: 62783,
        points: 5,
      },
    },
    tags: {

      do:{
        title: "Do",
        color: "#7aa5cf",
        groupId: "gid001",
        deleteable: false,
        editable: false,
        display: false,
      },
      delegate: {
        title: "Delegate",
        color: "#63c074",
        groupId: "gid002",
        deleteable: false,
        editable: false,
        display: false,
      },
      schedule: {
        title: "Schedule",
        color: "#ac7acf",
        groupId: "gid003",
        deleteable: false,
        editable: false,
        display: false,
      },
      later: {
        title: "Later",
        color: "#c5e875",
        groupId: "gid004",
        deleteable: false,
        editable: false,
        display: false,
      },
      tag1: {
          title: "tag1",
          color: "#7aa5cf",
          groupId: "gid001",
          deleteable: true,
          editable: true,
          display: true,

      },
      tag2: {
          title: "tag2",
          color: "#63c074",

          groupId: "gid002",
          deleteable: true,
          editable: true,
          display: true,

      },
      tag3: {
          title: "tag3",
          color: "#ac7acf",

          groupId: "gid003",
          deleteable: true,
          editable: true,
          display: true,

      },
      tag4: {
          title: "tag4",
          color: "#c5e875",

          groupId: "gid004",
          deleteable: true,
          editable: true,
          display: true,

      },
      tag5: {
          title: "tag5",
          color: "#f7d38c",

          groupId: "gid003",
          deleteable: true,
          editable: true,
          display: true,

      },
      none: {
          title: "none",
          color: "#ffffff",

          deleteable: false,
          editable: false,
          display: false,

      }
  }
  
  };
*/

class Utils {
    static getUuid() {
        // old uuid
        // return (
        //   "generateId" +
        //   Math.random().toString(36).substring(2, 6) +
        //   Math.random().toString(36).substring(2, 6)
        // );
        // use uuidv4
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
    }
    static randHexColor() {
        return "#" + ((Math.random() * 0xF0F0F0 << 0).toString(16).padStart(6, '0'));
    }
    static toJSON(classObj, template = []) {
        // If template is empty, return all in JavaScript Object
        if (template.length == 0) {
            return obj;
        }
        let newObj = {};
        template.forEach((key) => {
            newObj[key] = classObj[key];
        });
        return newObj;
    }
    static fromJSON(classObj, obj) {
        for (const key in obj) {
            classObj[key] = obj[key];
        }
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
    constructor(title, color, groupId, deleteable, editable, display, tagID = null) {
        this.title = title; // title of the tag
        this.color = color; // color of the tag
        this.groupId = groupId; // group id of the tag
        this.deleteable = deleteable; // deleteable status of the tag
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
                deleteable: this.deleteable,
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
    constructor(username = "", userid = "", groups = {}, tasks = {}, completed = {}, tags = {}) {
        this.username = username; // username of the user
        this.userid = userid; // user id of the user
        this.groups = groups; // groups of the user (group id: group object)
        this.tasks = tasks; // tasks of the user (task id: task object)
        this.completed = completed; // completed tasks of the user 
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
    getCompleted() {
        return this.completed;
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

    // Adders
    addGroup(group) {
        this.groups.push(group);
    }
    addTask(task) {
        this.tasks.push(task);
    }
    addCompleted(completed) {
        this.completed.push(completed);
    }
    addTag(tag) {
        this.tags.push(tag);
    }
    // Removers
    removeGroup(group) {
        this.groups = this.groups.filter((g) => g !== group);
    }
    removeTask(task) {
        this.tasks = this.tasks.filter((t) => t !== task);
    }
    removeCompleted(completed) {
        this.completed = this.completed.filter((c) => c !== completed);
    }
    removeTag(tag) {
        this.tags = this.tags.filter((t) => t !== tag);
    }
    // Updaters
    updateGroup(group, newGroup) {
        this.groups = this.groups.map((g) => (g === group ? newGroup : g));
    }
    updateTask(task, newTask) {
        this.tasks = this.tasks.map((t) => (t === task ? newTask : t));
    }
    updateCompleted(completed, newCompleted) {
        this.completed = this.completed.map((c) => (c === completed ? newCompleted : c));
    }
    updateTag(tag, newTag) {
        this.tags = this.tags.map((t) => (t === tag ? newTag : t));
    }
}

class DictCRUD extends Dict {
    constructor(username = "", userid = "", groups = {}, tasks = {}, completed = {}, tags = {}) {
        // Generate Dict object and assign to this
        super(username = "", userid = "", groups = {}, tasks = {}, completed = {}, tags = {});
    }
    // Add methods to create, read, update, delete Dict
    // Create
    createGroup(title, tags, def_tag, color, current_html) {
        let group = new Group(title, tags, def_tag, color, current_html);
        group.generateID();
        this.groups[group.groupID] = group;
        // return this
        return this;
    }
    createTask(title, description, tag, deadline, points, taskID = null, isCompleted = false) {
        let task = new Task(title, description, tag, deadline, points, taskID, isCompleted);
        task.generateID();
        this.tasks[task.taskID] = task;
        // return this
        return this;
    }
    createTag(title, color, groupId, deleteable, editable, display, tagID = null) {
        let tag = new Tag(title, color, groupId, deleteable, editable, display, tagID);
        tag.generateID();
        this.tags[tag.tagID] = tag;
        // return this
        return this;
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
    // Update   
    updateGroup(groupID, newGroup) {
        this.groups[groupID] = newGroup;
        return this;
    }
    updateTask(taskID, newTask) {
        this.tasks[taskID] = newTask;
        return this;
    }
    updateTag(tagID, newTag) {
        this.tags[tagID] = newTag;
        return this
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
        this.groups = obj.groups;
        this.tasks = obj.tasks;
        this.completed = obj.completed;
        this.tags = obj.tags;
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

class DictAJAX extends DictCRUD {
    constructor(username = "", userid = "", groups = {}, tasks = {}, completed = {}, tags = {}) {
        // Generate Dict object and assign to this
        super(username = "", userid = "", groups = {}, tasks = {}, completed = {}, tags = {});
    }
    // Add methods to interact with the server by AJAX
    // Add methods to get Dict from server
    getDict(fromServer = true) {
        let dict = this;
        // Get the dict from the server
        if (fromServer) {
            $.ajax({
                type: "GET",
                url: "/getDict",
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    // Import the dict from the server
                    dict.importDict(data);
                    console.log("Dict imported from server");
                    // console.log(dict);
                }
            })
        }
        // return the dict
        return dict;
    }
    setDict(toServer = true) {
        // Set the dict to the server
        if (toServer) {
            $.ajax({
                type: "POST",
                url: "/setDict",
                contentType: "application/json",
                dataType: "json",
                data: this.exportDict(),
                success: function (data) {
                    console.log("Dict set to server");
                }
            })
        }
        // return the dict
        return this;
    }
    addGroup() {
        let dict = this;
        console.log(dict);
        // Add group to the server
        $.ajax({
            type: "POST",
            url: "/addGroup",
            contentType: "application/json",
            dataType: "json",
            data: { groupID: dict.groupID, title: dict.title, color: dict.color },
            success: function (data) {
                console.log("Group added to server");
            }
        })
    }
}


// Caution: This code is copied from app.js!
class Templates {
    // Add methods to create html templates
    static MainMenuTag(id, tag) {
        return (
            `
            <div id="${id}" class="MMenu-Tag flex items-center pl-8 cursor-pointer">
            <div class="h-full">
                <svg class="w-full h-full text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z" />
                </svg>
            </div>

            <div id="MMenu-Tag-Title" class="text-lg px-1 my-1 center">${tag.title}</div>
            <div class="MMenu-Tag-Edit mx-1">
                <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                </svg>
            </div>
            </div>
            `
        );
    }

    static MainMenuGroup(id, group) {
        return (
            `
        <div id="${id}" class="MMenu-Group"><!--block-->
        <!-- Greeting div, status centered -->
        <div class="flex justify-between items-center pl-3 pr-1">
            <div class="MMenu-Toggle-Hidden flex items-center w-full">
            <div class="MMenu-Dropdown-Arrow">
                <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19 9-7 7-7-7"/>
                </svg>
            </div>

            <div id="MMenu-Group-Title" class="text-xl ml-2">${group.title}</div>
            </div>

            <div class="MMenu-Group-Edit mx-1">
            <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
            </svg>
            </div>

            <div class="MMenu-Tag-Add">
            <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14m-7 7V5" />
            </svg>
            </div>
        </div>
        <div id="MMenu-Tag-Section" class="">
            <!--tag-->
        </div>
        </div><!--eoblock-->
        `
        );
    }

    // For main screen
    static MainScreenTag(id, tag, mode = 0) {
        if (mode == 0) {
            return `
            <div id="${id}" class="rounded-md text-center min-w-12 font-base text-xs border-none shadow-lg cursor-pointer">${tag.title}</div>                
            `;
        }
    }

    static MainScreenTask(id, task, mode = 0) {
        if (mode == 0) {
            return `
            <div id="${id}" class="task-outer bg-main rounded-xl cursor-default">
            <div class="rounded-lg shadow-lg">
                <div class="px-2 py-1 flex justify-between items-center border-b-[2px]">
                <div class="font-semibold text-lg lg:text-xl truncate w-full">${task.title}</div>
                <div class="flex items-center gap-2">
                    <div class="Task-Edit mx-1 cursor-pointer">
                    <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                    </svg>
                    </div>
                    <div id="Task-Cancel" class="bg-red-500 rounded-full shadow-lg h-4 w-4 lg:h-6 lg:w-6 font-bold cursor-pointer"></div>
                </div>
                </div>
                <div class="p-2 flex items-center h-fit">
                <p class="h-full w-full text-left p-2 font-base truncate lg:text-xl">${task.description}</p>
                <input id="Task-Destroyer" type="checkbox" class="bg-primary-200 rounded-xl shadow-lg h-4 w-4 font-bold border-none cursor-pointer"></input>
                </div>
                <div id="Task-Tag" class="p-2 flex gap-2 overflow-hidden">
                </div>
            </div>
            </div>
            `;
        } else if (mode == 1) {
            return `
            <div id="${id}" class="task-outer">
            <div class="rounded-lg h-20 lg:h-32 border-2 border-slate-700">
                <div class="px-2 flex justify-between items-center border-b-2 border-slate-700">
                <div class="font-bold text-xl lg:text-2xl">${task.title}</div>
                <div id="Task-Cancel" class="bg-red-500 rounded-full h-4 w-4 font-bold cursor-pointer"></div>
                </div>
                <div class="p-2 flex justify-between items-center lg:h-24">
                <div class="text-center lg:text-xl">${task.description}</div>
                <input id="Task-Destroyer" type="checkbox" class="bg-primary-200 rounded-xl h-4 w-4 font-bold border-none cursor-pointer"></input>
                </div>
            </div>
            </div>
            `;
        }
    }

    static MainScreenGroup(id, group, mode = 0) {
        if (mode == 0) {
            return `
            <div id="${id}" class="group-outer">
            <div class="flex justify-between items-center px-3">
                <div id="Task-Group-Title" class="todobox-title lg:text-2xl">${group.title}</div>
                <div class="Group-Task-Add">
                <svg class="w-6 lg:w-7 h-6 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                </svg>
                </div>
            </div>
            <div id="Task-Section-Outer" class="bg-main/35 transition-all duration-300 ease-in-out border-t-8 pt-4 p-2 overflow-hidden shadow-xl hover:shadow-2xl rounded-xl">
                <div id="Task-Section" class="relative px-2 pb-9 flex flex-col gap-3 overflow-y-auto overflow-x-hidden rounded-xl w-72 h-72 lg:w-96 lg:h-96">
                <!--task here-->
                </div>
            </div>
            </div>
            `;
        } else if (mode == 1) {
            return `
            <div id="${id}" data-carousel-item class="flex flex-col items-center overflow-x-hidden ease-in-out duration-700 z-0">
            <div id="Task-Group-Title" class="text-center">${group.title}</div>
            <div id="" class="Task-Section border-primary-100 w-80 h-96 border-2"></div>
            </div>
            `;
        }
    }

    static MainScreenFormatter(mode = 0) {
        if (mode == 0) {
            return `
            <div id="Main-Formatter" class="relative w-full">
            <div id="Wrapper" class="relative flex flex-wrap justify-center items-center gap-8 py-10 lg:px-36">
                <!--Group-->
            </div>
            </div>
            `;
        } else if (mode == 1) {
            return `
            <div id="Main-Formatter" class="relative w-full bg-red-300" data-carousel="static">
            <div id="Wrapper" class="relative h-96 mt-[3vh] overflow-hidden"></div>
            </div>
            `;
        }
    }

    static FormatterAddons(mode = 0) {
        if (mode == 1) {
            return `
            <div class="slider z-10">
            <button type="button" class="absolute top-1/2 z-30 flex items-start justify-center h-auto px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 1 1 5l4 4" />
                </svg>
                <span class="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" class="absolute top-1/2 right-0 z-30 flex items-start justify-center h-auto px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 9 4-4-4-4" />
                </svg>
                <span class="sr-only">Next</span>
                </span>
            </button>
            </div>
            `;
        }
    }

    static floatingButton(isActive = true) {
        if (!isActive) return;
        return (`
        <!-- add question action button here-->
        <div id="add-draggable"  class="z-40 absolute">
            <div  class="touch-none select-none">
                <div id="moveButton" 
                    class="hover:w-12 hover:h-12 border-2 border-gray-300 absolute rounded-full w-12 h-12 bg-main/55 backdrop-blur-sm shadow-xl p-2">
                    <svg class="w-full h-full text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M5 12h14m-7 7V5" />
                    </svg>
                </div>
            </div>
        </div>
        <!-- kết thúc phần nút -->
        `);
    }
}

class MainMenu {
    static updateTabIndicator(tab = null) {
        var $tab = tab ? tab : $("#Main-Menu").find("#MMenu-Today");
        var currId = $tab.attr('id');
        const indiModeCSS = 'border-r-4 border-primary-200 bg-gradient-to-l from-primary-200/35 to-transparent';

        // clear all previous tab border 
        $('#Main-Menu').find('.MMenu-Primary-Section').removeClass(indiModeCSS);
        //console.log(currId);
        const indicatTab = ['MMenu-Today', 'MMenu-Calendar', 'MMenu-Garden'];
        if (indicatTab.indexOf(currId) !== -1) {
            $tab.toggleClass(indiModeCSS);
        }
    }
    static toggleHiddenGroup(group) {
        group.find("#MMenu-Tag-Section").toggle("hidden");
        group.find(".MMenu-Dropdown-Arrow").toggleClass("-rotate-90");
    }
    static addNewTag(group_html, id, tag) {
        //console.log(group_html);
        group_html.append(Templates.MainMenuTag(id, tag));
        // LoadTags();
    }
    static addNewGroup(unique_id, group) {
        $("#MMenu-Group-Section").append(
            Templates.MainMenuGroup(unique_id, group)
        );
        return $("#" + unique_id);
    }
    // TODO: Need to implement new Dict class
    static LoadGroups_Tag() {
        // Iterate over each group in Dict.groups
        for (var groupId in Dict.groups) {
            if (Dict.groups.hasOwnProperty(groupId)) {
                var group = Dict.groups[groupId];
                var g = this.addNewGroup(groupId, group);
                // console.log("Group: " + group.title);
                // Iterate over tags in the current group
                for (var j = 0; j < group.tags.length; j++) {

                    if (Dict.tags[group.tags[j]].display == false) continue;

                    this.addNewTag(g.find("#MMenu-Tag-Section"), group.tags[j], Dict.tags[group.tags[j]]);
                }
                this.toggleHiddenGroup(g);
            }
        }
    }
}
class CRUDModalHandler {
    static addGroup() {
        // Customize modal appearance
        $('#crud-modal label[for="name"]').text("Title");

        $('#crud-modal h3').text("Create Group");
        $('#crud-modal #name').attr('placeholder', 'Group name');;
        $('#crud-modal #name').val('');

        $('#crud-modal #desc-sec').hide();
        $('#crud-modal #tags-sec').hide();
        $('#crud-modal #todo-expired-sec').hide();


        $('#crud-modal button[type="submit"]').html(`
        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
        Create`);
        $('#crud-modal input[type="checkbox"]').attr("id", `task_`);
        // Show modal
        addGroupnTagModal.show();
    }
    static addTag() {
        // Customize modal appearance
        $('#crud-modal label[for="name"]').text("Name");

        $('#crud-modal h3').text("Create Tag");
        $('#crud-modal #name').attr('placeholder', 'Tag name');
        $('#crud-modal #name').val('');

        $('#crud-modal #desc-sec').hide();
        $('#crud-modal #todo-expired-sec').hide();
        $('#crud-modal #tags-sec').hide();
        $('#crud-modal #groups-sec').show();

        $('#crud-modal button[type="submit"]').html(`
        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
        Create`);
        $('#crud-modal input[type="checkbox"]').attr("id", `task_`);
        // Show modal
        addGroupnTagModal.show();
    }
    static editGroup() {
        $('#crud-modal label[for="name"]').text("Title");

        $('#crud-modal h3').text("Edit Group");
        $('#crud-modal #name').attr('placeholder', 'Group name');;
        $('#crud-modal #name').val(gInfo.title);

        $('#crud-modal #desc-sec').hide();
        $('#crud-modal #tags-sec').hide();
        $('#crud-modal #groups-sec').hide();
        $('#crud-modal #todo-expired-sec').hide();

        $('#crud-modal #colors').val(gInfo.color);

        $('#crud-modal button[type="submit"]').html(`
        <svg class="w-5 lg:w-7 h-5 lg:h-7 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
    </svg> Edit
        `);

        $('#crud-modal #delete-sec').show();

        $('#crud-modal input[type="checkbox"]').attr("id", `group_${gid}`);

        // Show modal
        addGroupnTagModal.show();
    }
    static editTag() {
        // Customize modal appearance
        $('#crud-modal label[for="name"]').text("Name");

        $('#crud-modal h3').text("Edit Tag");
        $('#crud-modal #name').attr('placeholder', 'Tag name');
        $('#crud-modal #name').val(tagInfo.title);

        $('#crud-modal #desc-sec').hide();
        $('#crud-modal #todo-expired-sec').hide();
        $('#crud-modal #tags-sec').hide();
        $('#crud-modal #groups-sec').hide();


        if (tagInfo.deletable == true) {
            $('#crud-modal #delete-sec').show();
        };

        $('#crud-modal button[type="submit"]').html(`
        <svg class="w-5 lg:w-7 h-5 lg:h-7 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
    </svg> Edit
        `);

        $('#crud-modal input[type="checkbox"]').attr("id", `tag_${tid}`);
        // Show modal
        addGroupnTagModal.show();
    }
    static addTask(preset_tag) {
        // Clean modal first
        // Change modal state
        $("#crud-modal select#tags").append(`<option value="${preset_tag}">${Dict.groups[gid].title}</option>`);

        $('#crud-modal #colors-sec').hide();
        $('#crud-modal label[for="name"]').text("Title");
        $('#crud-modal label[for="description"]').text("Task Description");

        $('#crud-modal h3').text("Create Task");
        $('#crud-modal #name').val("");
        $('#crud-modal #description').val("");
        $('#crud-modal #tags option').removeAttr("selected");
        $('#crud-modal #tags').val(preset_tag);
        $('#crud-modal #todo-expired').val("");
        $('#crud-modal button[type="submit"]').html(`
        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
        Create`);
        $('#crud-modal input[type="checkbox"]').attr("id", `task_`);

        // Show modal
        modal.show();
    }
    static editTask(title, desc, tag, expired, id) {
        // Clean up
        // Clean modal first
        $('#crud-modal #colors-sec').hide();
        $('#crud-modal #delete-sec').show();

        $('#crud-modal label[for="name"]').text("Title");
        $('#crud-modal label[for="description"]').text("Task Description");
        // Change task header
        $('#crud-modal h3').text("Edit Task");
        // Change input to task details
        $('#crud-modal #name').val(title);
        $('#crud-modal #description').val(desc);
        $('#crud-modal').find(`#tags option[value="${tag}"]`).attr("selected", title);
        $('#crud-modal #todo-expired').val(expired);
        $('#crud-modal button[type="submit"]').text("Edit");
        // Change honeypot to id
        $('#crud-modal input[type="checkbox"]').attr("id", `task_${id}`);
        // Get current date
        let current_date = new Date();
        // Get date input
        let date_element = $('#crud-modal #todo-expired');
        // Get input date
        let input_date = new Date(date_element.val());
        // If input date is less than current date, show alert
        if (input_date < current_date) {
            date_element.css("border", "2px solid red");
        }
        else {
            date_element.css("border", "2px solid green");
        }
        // Show modal
        modal.show();
    }
}

class MainScreen {
    static updateTime() {
        const now = new Date();
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        let hours = now.getHours().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
        document.getElementById('clock').textContent = formattedTime;
    }
    static renderTag(tag_html, tag, id, mode = 0) {
        //console.log(tag.display);
        if (tag.display == false) return;
        tag_html.append(Templates.MainScreenTag(id, tag, mode));
        tag_html.find("#" + id).css({ "background-color": tag.color });
    }
    static renderFormatterAddons(formatter_html, mode = 0) {
        formatter_html.append(Templates.FormatterAddons(mode));
    }
    static renderTask(task_html, task, id, mode = 0) {
        task_html.append(Templates.MainScreenTask(id, task, mode));
        MainScreen.renderTag(task_html.find("#" + id).find("#Task-Tag"), Dict.tags[task.tag], task.tag);
    }
    static renderGroup(group_html, group, unique_id, mode = 0) {
        // var unique_id = getUuid();
        group_html.append(Templates.MainScreenGroup(unique_id, group, mode));
        group_html.find("#" + unique_id).find("#Task-Section-Outer").css({ "border-color": group.color });
        return group_html.find("#" + unique_id);
    }
    static Load() {
        // Also add Draggable button again
        $("#Main-Screen").append(Templates.floatingButton(true));
        var formatter_html = $("#Main-Screen").append(
            Templates.MainScreenFormatter()
        );
        // TODO: Need to implement new Dict class
        // Iterate over groups
        for (var groupId in Dict.groups) {
            if (Dict.groups.hasOwnProperty(groupId)) {
                var group = Dict.groups[groupId];
                var g = this.renderGroup(
                    $(formatter_html).find("#Main-Formatter").find("#Wrapper"),
                    group,
                    groupId,
                    // currentMode
                    0
                );
                //console.log(groupId);
                var task_html = $(g).find("#Task-Section");
                // Iterate over tasks
                for (var taskId in Dict.tasks) {
                    if (
                        Dict.tasks.hasOwnProperty(taskId) && (
                            group.tags.includes(Dict.tasks[taskId].tag) || group.def_tag == Dict.tasks[taskId].tag)
                    ) {
                        // Pass task details to renderTaskMainScreen
                        this.renderTask(
                            task_html,
                            Dict.tasks[taskId],
                            taskId,
                            currentMode
                        );
                    }
                }
            }
        }
        this.renderFormatterAddons(formatter_html, 
            //currentMode
        );
    }
}


class Initialize {
    static RefreshMainScreen() {
        $("#Main-Screen").empty();
        // $("#MMenu-Group-Section").empty();
        MainScreen.Load();
        // LoadGroups_Tag();
    }
    static LoadUser() {
        MainMenu.LoadGroups_Tag();
        this.RefreshMainScreen();
    }
    static LoadTags() {
        console.log("Loading tags");

        // console.log(Dict.groups);
        var tagArray = Object.keys(Dict.tags).filter(key => Dict.tags[key].display === true);

        $("#crud-modal select#tags").empty();
        tagArray.forEach(element => {
            let options = `<option value="${element}">${Dict.tags[element].title}</option>`
            $("#crud-modal select#tags").append(options)
        });


        //$("#crud-modal select#tags").append(`<option value="None">None</option>`);

    };
    static LoadGroups() {
        console.log("Loading groups");

        var groupArray = Object.keys(Dict.groups);

        $("#crud-modal select#groups").empty();
        groupArray.forEach(element => {
            let options = `<option value="${element}">${Dict.groups[element].title}</option>`
            $("#crud-modal select#groups").append(options)
        });

        //$("#crud-modal select#groups").append(`<option value="None">None</option>`);
    };
    static initUser() {
        // currentMMenuTab = 0; // 0-today 2-calendar 3-garden
        // currentMode = 0;
        this.LoadUser();
        MainMenu.updateTabIndicator();
    }
    // Main function to load everything
    static initApp() {
        this.LoadTags();
        this.LoadGroups();
        this.initUser();
    }
}
// End caution 1

// -------------Test zone (from this line to end)----------------
// Place to test Group, Tag, Task classes
// Create a new DictCRUD object
Dict = new DictCRUD();
// Create a new Group
Dict.createGroup("Group 1", [], null, "red", "");
Dict.createGroup("Group 2", [], null, "blue", "");
Dict.createGroup("Group 3", [], null, "green", "");
// Create a new Tag
Dict.createTag("Tag 1", "red", "1", false, true, true);
Dict.createTag("Tag 2", "blue", "1", false, true, true);
Dict.createTag("Tag 3", "green", "1", false, true, true);
// Create a new Task
Dict.createTask("Task 1", "Description 1", "1", "2023-12-12", 10);
Dict.createTask("Task 2", "Description 2", "1", "2023-12-12", 10);
Dict.createTask("Task 3", "Description 3", "1", "2023-12-12", 10);
// End place to test Group, Tag, Task classes

Initialize.initApp();
// Print Dict


console.log(Dict);

let DictString = {
    // sample dict
    username: "JakeClark",
    userid: "User ID",
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
        deadline: 62783,
        points: 4,
      },
      id002: {
        title: "Crying",
        description: "About making a website",
        tag: "tag3",
        deadline: 62783,
        points: 4,
      },
      id004: {
        title: "Laughing",
        description: "About making a website",
        tag: "tag5",
        deadline: 62783,
        points: 4,
      },
    },
    completed: {
      id003: {
        title: "Journaling",
        description: "About making a website",
        tag: "tag1",
        deadline: 62783,
        points: 5,
      },
    },
    tags: {

      do:{
        title: "Do",
        color: "#7aa5cf",
        groupId: "gid001",
        deleteable: false,
        editable: false,
        display: false,
      },
      delegate: {
        title: "Delegate",
        color: "#63c074",
        groupId: "gid002",
        deleteable: false,
        editable: false,
        display: false,
      },
      schedule: {
        title: "Schedule",
        color: "#ac7acf",
        groupId: "gid003",
        deleteable: false,
        editable: false,
        display: false,
      },
      later: {
        title: "Later",
        color: "#c5e875",
        groupId: "gid004",
        deleteable: false,
        editable: false,
        display: false,
      },
      tag1: {
          title: "tag1",
          color: "#7aa5cf",
          groupId: "gid001",
          deleteable: true,
          editable: true,
          display: true,

      },
      tag2: {
          title: "tag2",
          color: "#63c074",

          groupId: "gid002",
          deleteable: true,
          editable: true,
          display: true,

      },
      tag3: {
          title: "tag3",
          color: "#ac7acf",

          groupId: "gid003",
          deleteable: true,
          editable: true,
          display: true,

      },
      tag4: {
          title: "tag4",
          color: "#c5e875",

          groupId: "gid004",
          deleteable: true,
          editable: true,
          display: true,

      },
      tag5: {
          title: "tag5",
          color: "#f7d38c",

          groupId: "gid003",
          deleteable: true,
          editable: true,
          display: true,

      },
      none: {
          title: "none",
          color: "#ffffff",

          deleteable: false,
          editable: false,
          display: false,

      }
  }
  
  };

Dict2 = new DictAJAX();
Dict2.importDict(DictString);
console.log(Dict2);
console.log(Dict2.exportDict()); 
console.log(Dict2.getDict());
console.log(Dict2.addGroup())

// Caution 2: These classes inherited from above classes and have additional methods
// to load to frontend