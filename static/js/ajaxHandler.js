//=====================================================================\\
/* 
NOTICE:
This file handles all the actions that are related to the main content of the page
This file handle:
    -  AJAX requests to the backend

*/
//=====================================================================\\
import { DictCRUD, Utils } from "./userData.js";

let ajaxHandler = {}

ajaxHandler.addGroup = function (groupId, title, color , def_tag) {
    // Send AJAX request to backend at /todo/group/create to add group
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/todo/group/create",
            data: JSON.stringify({ groupId: groupId, title: title, color: color , def_tag: def_tag}),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log("Success");
                resolve(data);
            },
            error: function (data) {
                console.log("Error");
                reject(data);
            }
        });
    });
}

ajaxHandler.addTag = function (tagId, groupId, title, color) {
    // Send AJAX request to backend at /todo/tag/create to add tag
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/todo/tag/create",
            data: JSON.stringify({ tagId: tagId, groupId: groupId, title: title, color: color }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log("Success");
                resolve(data);
            },
            error: function (data) {
                console.log("Error");
                reject(data);
            }
        });
    });
}

ajaxHandler.updateGroup = function (groupId, title, color) {
    // Send AJAX request to backend at /todo/group/update to edit group
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/todo/group/update",
            data: JSON.stringify({ groupId: groupId, title: title, color: color }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log("Success");
                resolve(data);
            },
            error: function (data) {
                console.log("Error");
                reject(data);
            }
        });
    });
}

ajaxHandler.updateTag = function (tagId, groupId, title, color) {
    // Send AJAX request to backend at /todo/tag/update to edit tag
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/todo/tag/update",
            data: JSON.stringify({ tagId: tagId, groupId: groupId, title: title, color: color }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log("Success");
                resolve(data);
            },
            error: function (data) {
                console.log("Error");
                reject(data);
            }
        });
    });
}

ajaxHandler.deleteGroup = function (groupId) {
    // Send AJAX request to backend at /todo/group/delete to delete group
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/todo/group/delete",
            data: JSON.stringify({ groupId: groupId }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log("Success");
                resolve(data);
            },
            error: function (data) {
                console.log("Error");
                reject(data);
            }
        });
    });
}

ajaxHandler.deleteTag = function (tagId) {
    // Send AJAX request to backend at /todo/tag/delete to delete tag
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/todo/tag/delete",
            data: JSON.stringify({ tagId: tagId }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log("Success");
                resolve(data);
            },
            error: function (data) {
                console.log("Error");
                reject(data);
            }
        });
    });
}

ajaxHandler.createTask = function (taskId, title, description, tag, deadline, points, isCompleted = false) {
    // Send AJAX request to backend at /todo/create to create task
    return new Promise(function (resolve, reject) {
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
                resolve(data);
            },
            error: function (data) {
                console.log("Error");
                reject(data);
            }
        });
    });
}

ajaxHandler.deleteTask = function (taskId) {
    // Send AJAX request to backend at /todo/delete to delete task  
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/todo/delete",
            data: JSON.stringify({ taskId: taskId }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log("Success");
                resolve(data);
            },
            error: function (data) {
                console.log("Error");
                reject(data);
            }
        });
    });
}

ajaxHandler.completeTask = function (taskId) {
    // Send AJAX request to backend at /todo/completed/<id> to mark task as completed
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/todo/completed/" + taskId,
            data: JSON.stringify({ taskId: taskId, isCompleted: true }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log("Success");
                resolve(data);
            },
            error: function (data) {
                console.log("Error");
                reject(data);
            }
        });
    });
}

ajaxHandler.updateTask = function (taskId, title, description, tag, deadline, points, isCompleted = false) {
    // Send AJAX request to backend at /todo/update to update task
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/todo/update",
            data: JSON.stringify({
                taskId: taskId, title: title, description: description, tag: tag, deadline: deadline, points: points, isCompleted: isCompleted
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                resolve(data);
            },
            error: function (data) {
                console.log("Error");
                reject(data);
            }
        });
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
                resolve(data); // Resolve the promise when AJAX call succeeds
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
                resolve(data); // Resolve the promise when AJAX call succeeds
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
                resolve(data); // Resolve the promise when AJAX call succeeds
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
                resolve(data); // Resolve the promise with user info when AJAX call succeeds
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
    return new Promise(function (resolve) {
        let Dict = new DictCRUD();

        $.when(
            ajaxHandler.LoadGroup(),
            ajaxHandler.LoadTag(),
            ajaxHandler.LoadTask(),
            ajaxHandler.LoadUser()
        ).done(function (groupData, tagData, taskData, userData) {
            // All AJAX calls are completed
            console.log("[1] All data loaded successfully.");
            console.log(groupData);
            console.log(tagData);
            // console.log(taskData);
            // console.log(userData);

            Dict.username = userData.username;
            Dict.bio = userData.bio;
            Dict.country = userData.country;

            groupData.forEach(function (dt) {
                if (dt.def_tag == "") {
                    dt.def_tag = null;
                }
                Dict.createGroup(dt.title, [], dt.def_tag, dt.color, "", dt.groupId,true);
            });

            console.log("[2] Group loaded successfully");
            tagData.forEach(function (dt) {
                Dict.createTag(dt.title, dt.color, dt.groupId, true, true, true, dt.tagId);
            });
            console.log("[3] Tag loaded successfully");
            taskData.forEach(function (dt) {
                Dict.createTask(dt.title, dt.description, dt.tag, dt.deadline, dt.points, dt.taskId, dt.isCompleted);
            });
            console.log("[4] Task loaded successfully");

            // filter all un-grouped tag
            for (let tagId in Dict.tags) {
                let t = Dict.tags[tagId];
                // if group have tag does not exist
                if (!Dict.groups[t.groupId]) {
                    Dict.removeTag(t.tagID);
                    console.log(t.tagID + " Tag error: No group assigned!");
                    continue;
                }
                // if tag === def_tag 
                if (Dict.groups[t.groupId].def_tag === t.tagID) {
                    continue;
                }
                Dict.groups[t.groupId].tags.push(t.tagID);
            }

            // filter all task that have group and tags no longer exist
            // implement later

            console.log(Dict);
            ajaxHandler.getUserProfileImage();
            resolve(Dict);
        })
    });
};


export { ajaxHandler };