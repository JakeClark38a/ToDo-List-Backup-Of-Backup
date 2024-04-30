//=====================================================================\\
/* 
NOTICE:
This file handles all the actions that are related to the main content of the page
This file handle:
    -  AJAX requests to the backend

*/
//=====================================================================\\
import { DictWithAJAX, Utils } from "./userData.js";
let userData = new DictWithAJAX();

let ajaxHandler = {}

ajaxHandler.addGroup = function (groupId, title, color) {
    // Send AJAX request to backend at /todo/group/create to add group
    $.ajax({
        type: "POST",
        url: "/todo/group/create",
        data: JSON.stringify({ groupId: groupId, title: title, color: color }),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log("Success");
        },
        error: function (data) {
            console.log("Error");
        }
    });
}

ajaxHandler.addTag = function (tagId, groupId, title, color) {
    // Send AJAX request to backend at /todo/tag/create to add tag
    $.ajax({
        type: "POST",
        url: "/todo/tag/create",
        data: JSON.stringify({ tagId: tagId, groupId: groupId, title: title, color: color }),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log("Success");
        },
        error: function (data) {
            console.log("Error");
        }
    });
}

ajaxHandler.updateGroup = function (groupId, title, color) {
    // Send AJAX request to backend at /todo/group/update to edit group
    $.ajax({
        type: "POST",
        url: "/todo/group/update",
        data: JSON.stringify({ groupId: groupId, title: title, color: color }),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log("Success");
        },
        error: function (data) {
            console.log("Error");
        }
    });
}

ajaxHandler.updateTag = function (tagId, groupId, title, color) {
    // Send AJAX request to backend at /todo/tag/update to edit tag
    $.ajax({
        type: "POST",
        url: "/todo/tag/update",
        data: JSON.stringify({ tagId: tagId, groupId: groupId, title: title, color: color }),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log("Success");
        },
        error: function (data) {
            console.log("Error");
        }
    });
}

ajaxHandler.deleteGroup = function (groupId) {
    // Send AJAX request to backend at /todo/group/delete to delete group
    $.ajax({
        type: "POST",
        url: "/todo/group/delete",
        data: JSON.stringify({ groupId: groupId }),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log("Success");
        },
        error: function (data) {
            console.log("Error");
        }
    });
}

ajaxHandler.deleteTag = function (tagId) {
    // Send AJAX request to backend at /todo/tag/delete to delete tag
    $.ajax({
        type: "POST",
        url: "/todo/tag/delete",
        data: JSON.stringify({ tagId: tagId }),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log("Success");
        },
        error: function (data) {
            console.log("Error");
        }
    });
}

ajaxHandler.createTask = function (taskId, title, description, tag, deadline, points, isCompleted = false) {
    // Send AJAX request to backend at /todo/create to create task
    $.ajax({
        type: "POST",
        url: "/todo/create",
        data: JSON.stringify({
            taskId: taskId, title: title, description: description, tag: tag, deadline: deadline, points: points, isCompleted: isCompleted
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log("Success");
        },
        error: function (data) {
            console.log("Error");
        }
    });
}

ajaxHandler.deleteTask = function (taskId) {
    // Send AJAX request to backend at /todo/delete to delete task  
    $.ajax({
        type: "POST",
        url: "/todo/delete",
        data: JSON.stringify({ taskId: taskId }),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log("Success");
        },
        error: function (data) {
            console.log("Error");
        }
    });
}

ajaxHandler.completeTask = function (taskId) {
    // Send AJAX request to backend at /todo/completed/<id> to mark task as completed
    $.ajax({
        type: "POST",
        url: "/todo/completed/" + taskId,
        data: JSON.stringify({ taskId: taskId, isCompleted: true }),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log("Success");
        },
        error: function (data) {
            console.log("Error");
        }
    });
}

ajaxHandler.updateTask = function (taskId, title, description, tag, deadline, points, isCompleted = false) {
    // Send AJAX request to backend at /todo/update to update task
    $.ajax({
        type: "POST",
        url: "/todo/update",
        data: JSON.stringify({
            taskId: taskId, title: title, description: description, tag: tag, deadline: deadline, points: points, isCompleted: isCompleted
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log("Success");
        },
        error: function (data) {
            console.log("Error");
        }
    });
}
ajaxHandler.LoadGroup = function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/todo/group/get",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                data.forEach(function (dt) {
                    userData.createGroup(dt.title, [], null, dt.color, "", dt.groupId);
                });
                console.log("Group loaded successfully");
                resolve(); // Resolve the promise when AJAX call succeeds
            },
            error: function (error) {
                console.log("Error loading group:", error);
                reject(error); // Reject the promise if there is an error
            }
        });
    });
};

ajaxHandler.LoadTag = function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/todo/tag/get",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                data.forEach(function (dt) {
                    userData.createTag(dt.title, dt.color, dt.groupId, true, true, true, dt.tagId);
                });
                console.log("Tag loaded successfully");
                resolve(); // Resolve the promise when AJAX call succeeds
            },
            error: function (error) {
                console.log("Error loading tag:", error);
                reject(error); // Reject the promise if there is an error
            }
        });
    });
};

ajaxHandler.LoadTask = function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/todo/get",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                data.forEach(function (dt) {
                    userData.createTask(dt.title, dt.description, dt.tag, dt.deadline, dt.points, dt.taskId, dt.isCompleted);
                });
                console.log("Task loaded successfully");
                resolve(); // Resolve the promise when AJAX call succeeds
            },
            error: function (error) {
                console.log("Error loading task:", error);
                reject(error); // Reject the promise if there is an error
            }
        });
    });
};

ajaxHandler.LoadUser = function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/profile/get",
            type: "GET",
            success: function (data) {          
                    userData.username= data.username,
                    userData.bio= data.bio,
                    userData.country= data.country
                resolve(); // Resolve the promise with user info when AJAX call succeeds
            },
            error: function (error) {
                console.log("Error loading user:", error);
                reject(error); // Reject the promise if there is an error
            }
        });
    });
};

//Function to render image of user profile
ajaxHandler.getUserProfileImage = function () {
    $.ajax({
        type: "GET",
        url: "/profile/get/image",
        success: function (data) {
            $("#Avatar-Image").attr("src", data);
        },
        error: function (data) {
            console.log("Error");
        }
    });
}

ajaxHandler.LoadUserData = function () {
    function loadAllData() {
        return Promise.all([
            ajaxHandler.LoadGroup(),
            ajaxHandler.LoadTag(),
            ajaxHandler.LoadTask(),
            ajaxHandler.LoadUser()
        ]);
    }

    loadAllData().then(function () {
        // All AJAX calls are completed
        console.log("All userData loaded successfully.");

        // filter all un-grouped tag
        for (let tagId in userData.tags) {
            let t = userData.tags[tagId];
            // if group have tag does not exist
            if (!userData.groups[t.groupId]) {
                userData.removeTag(t.tagID);
                continue;
            }
            // if tag === def_tag 
            if (userData.groups[t.groupId].def_tag === t.tagID) {
                continue;
            }
            userData.groups[t.groupId].tags.push(t.tagID);
        }

        // filter all task that have group and tags no longer exist

        console.log(userData);


        ajaxHandler.getUserProfileImage();
    }).catch(function (error) {
        // Handle errors if any AJAX call fails
        console.error("Error loading data:", error);
    });

    return userData;
};


export { ajaxHandler };