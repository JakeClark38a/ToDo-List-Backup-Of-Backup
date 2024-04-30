//=====================================================================\\
/* 
NOTICE:
This file handles all the actions that are related to the main content of the page
This file handle:
    -  AJAX requests to the backend

*/
//=====================================================================\\

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
            console.log("Loading userdata");
            let tempDict = {};
            data.forEach((dt) => {
                let tmp = {
                    title: dt[1],
                    tags: [dt[2]],
                    def_tag: dt[0],
                    color: dt[3],
                    current_html: "",
                };

                if (!tempDict.tags.hasOwnProperty(tmp.def_tag)) { // add def_tag
                    tempDict.tags[tmp.def_tag] = {
                        title: "Default",
                        color: "#000000",
                        display: false,
                        editable: false,
                        deletable: false,
                    }
                }

                tmp.tags.forEach((t, i) => { // add other tags
                    if (!tempDict.tags.hasOwnProperty(t)) {
                        tempDict.tags[t] = {
                            title: "no_name_" + tmp.title + "_" + i, // Adding index to title
                            color: randHexColor(),
                            display: true,
                            editable: true,
                            deletable: true,
                        };
                    }
                });


                tempDict.groups[dt[0]] = tmp;
                //tempDict.groups[dt[0]] = tmp;
            });

            console.log(tempDict);
            console.log("Load data complete")
        },
        error: function (data) {
            console.log("Error");
        }
    });
}

ajaxHandler.LoadUserData = function (){
    ajaxHandler.LoadGroup();

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
export { ajaxHandler };