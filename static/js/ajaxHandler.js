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
/// load user group
ajaxHandler.LoadGroup = function () {
    // Send AJAX request to backend at /todo/update to update task
    $.ajax({
        type: "GET",
        url: "/todo/group/get",
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            data.forEach((dt) => {
                console.log(dt);
                userData.createGroup(dt["title"], [], null, dt["color"],"", dt["groupId"]);
            });
        },
        error: function (data) {
            console.log("Error");
        }
    });
}

/// load user group
ajaxHandler.LoadTag = function () {
    // Send AJAX request to backend at /todo/update to update task
    $.ajax({
        type: "GET",
        url: "/todo/tag/get",
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            data.forEach((dt) => {
                console.log(dt);
                userData.createTag(dt["title"], dt["color"], dt["groupId"],true ,true,true , dt["tagId"]); 
            });
        },
        error: function (data) {
            console.log("Error");
        }
    });
}
ajaxHandler.LoadTask = function () {
    // Send AJAX request to backend at /todo/update to update task
    $.ajax({
        type: "GET",
        url: "/todo/get",
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            data.forEach((dt) => {
                userData.createTask(dt["title"], dt["description"], dt["tag"], dt["deadline"], dt["points"], dt["taskId"] , dt["isCompleted"]);
                console.log(dt);
            });
        },
        error: function (data) {
            console.log("Error");
        }
    });
}

ajaxHandler.LoadUser = function () {
    $.ajax({
        url: "/profile/get",
        type: "GET",
        success: function (data) {
            let userInfo = {};
            userInfo.username = data.username;
            userInfo.bio = data.bio;
            userInfo.Location = data.Location;
            return userInfo;
        },
        error: function (data) {
            console.log(data);
        },
    });
}

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


ajaxHandler.LoadUserData = function() {
    ajaxHandler.LoadGroup();
    ajaxHandler.LoadTag();
    ajaxHandler.LoadTask();
    ajaxHandler.LoadUser();
    console.log(userData);
    return userData;
}

export { ajaxHandler , userData };