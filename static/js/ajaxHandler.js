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

ajaxHandler.addGroup = function (groupId, title, color, def_tag) {
    // Send AJAX request to backend at /todo/group/create to add group
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/todo/group/create",
            data: JSON.stringify({ groupId: groupId, title: title, color: color, def_tag: def_tag }),
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

ajaxHandler.updateGroup = function (groupId, title, color, def_tag) {
    // Send AJAX request to backend at /todo/group/update to edit group
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/todo/group/update",
            data: JSON.stringify({ groupId: groupId, title: title, color: color, def_tag: def_tag }),
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
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/profile/get/image",
            success: function (data) {
                $("#Avatar-Image").attr("src", data);
                $("#User-Current-Avatar").attr("src", data);
                
                resolve(data);
            },
            error: function (data) {

                console.log("Error");
                reject(data);
            }
        });
    });
}

ajaxHandler.setUserInfo = function (username, bio, country) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/profile/update",
            type: "POST",
            data: JSON.stringify({
                username: username,
                bio: bio,
                country: country,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log('Success');
                resolve(data);
            },
            error: function (data) {
                console.log('Error');
                reject(data);
            },
        });
    });
}


ajaxHandler.ChangeEmail = function (curr_email, new_email, opt) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/profile/update/email",
            type: "POST",
            data: JSON.stringify({
                curr_email: curr_email,
                new_email: new_email,
                otp: opt,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log('Success');
                resolve(data);
            },
            error: function (data) {
                console.log('Error');
                reject(data);
            },
        });
    });
}



ajaxHandler.SendConfirmation = function (curr_email) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/profile/update/email_confirmation",
            type: "POST",
            data: JSON.stringify({
                curr_email: curr_email,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log('Success');
                resolve(data);
            },
            error: function (data) {
                console.log('Error');
                reject(data);
            },
        });
    });
}

ajaxHandler.resetpassword = function (curr_password, new_password, confirm_password) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/profile/update/password",
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                curr_password: curr_password,
                new_password: new_password,
                confirm_password: confirm_password,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log('Success');
                resolve(data);
            },
            error: function (data) {
                console.log('Error');
                reject(data);
            },
        });
    });
}

ajaxHandler.getDarkmode = function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/profile/get/dark_mode",
            type: "GET",
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

ajaxHandler.updateDarkmode = function (dark_mode = false) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/profile/update/dark_mode",
            type: "POST",
            data: JSON.stringify({
                dark_mode: dark_mode,
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

//================================================================\\
//========================== Game Data  ==========================\\
//================================================================\\



ajaxHandler.LoadTreeData = function (tree_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/profile/update/password",
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                curr_password: curr_password,
                new_password: new_password,
                confirm_password: confirm_password,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log('Success');
                resolve(data);
            },
            error: function (data) {
                console.log('Error');
                reject(data);
            },
        });
    });
}

ajaxHandler.updateTreeData = function () {
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


//================================================================\\
//========================== Team Data  ==========================\\
//================================================================\\


ajaxHandler.team_addGroup = function (team_id, groupId, title, color, def_tag) {
    // Send AJAX request to backend at /todo/group/create to add group
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/team/" + team_id + "/todo/group/create",
            data: JSON.stringify({ team_id: team_id, groupId: groupId, title: title, color: color, def_tag: def_tag }),
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

ajaxHandler.team_addTag = function (team_id, tagId, groupId, title, color) {
    // Send AJAX request to backend at /todo/tag/create to add tag
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/team/" + team_id + "/todo/tag/create",
            data: JSON.stringify({ team_id: team_id, tagId: tagId, groupId: groupId, title: title, color: color }),
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

ajaxHandler.team_updateGroup = function (team_id, groupId, title, color, def_tag) {
    // Send AJAX request to backend at /team/"+ team_id +"/todo/group/update to edit group
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/team/" + team_id + "/todo/group/update",
            data: JSON.stringify({ team_id: team_id, groupId: groupId, title: title, color: color, def_tag: def_tag }),
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

ajaxHandler.team_updateTag = function (team_id, tagId, groupId, title, color) {
    // Send AJAX request to backend at /team/"+ team_id +"/todo/tag/update to edit tag
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/team/" + team_id + "/todo/tag/update",
            data: JSON.stringify({ team_id: team_id, tagId: tagId, groupId: groupId, title: title, color: color }),
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

ajaxHandler.team_deleteGroup = function (team_id, groupId) {
    // Send AJAX request to backend at /team/"+ team_id +"/todo/group/delete to delete group
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/team/" + team_id + "/todo/group/delete",
            data: JSON.stringify({ team_id: team_id, groupId: groupId }),
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

ajaxHandler.team_deleteTag = function (team_id, tagId) {
    // Send AJAX request to backend at /team/"+ team_id +"/todo/tag/delete to delete tag
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/team/" + team_id + "/todo/tag/delete",
            data: JSON.stringify({ team_id: team_id, tagId: tagId }),
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

ajaxHandler.team_createTask = function (team_id, taskId, title, description, tag, deadline, points, isCompleted = false) {
    // Send AJAX request to backend at /team/"+ team_id +"/todo/create to create task
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/team/" + team_id + "/todo/create",
            data: JSON.stringify({
                team_id: team_id, taskId: taskId, title: title, description: description, tag: tag, deadline: deadline, points: points, isCompleted: isCompleted
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

ajaxHandler.team_deleteTask = function (team_id, taskId) {
    // Send AJAX request to backend at /team/"+ team_id +"/todo/delete to delete task  
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/team/" + team_id + "/todo/delete",
            data: JSON.stringify({ team_id: team_id, taskId: taskId }),
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

ajaxHandler.team_completeTask = function (team_id, taskId) {
    // Send AJAX request to backend at /team/"+ team_id +"/todo/completed/<id> to mark task as completed
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/team/" + team_id + "/todo/completed/" + taskId,
            data: JSON.stringify({ team_id: team_id, taskId: taskId, isCompleted: true }),
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

ajaxHandler.team_updateTask = function (team_id, taskId, title, description, tag, deadline, points, isCompleted = false) {
    // Send AJAX request to backend at /team/"+ team_id +"/todo/update to update task
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/team/" + team_id + "/todo/update",
            data: JSON.stringify({
                team_id: team_id, taskId: taskId, title: title, description: description, tag: tag, deadline: deadline, points: points, isCompleted: isCompleted
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
ajaxHandler.team_LoadGroup = function (team_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/team/" + team_id + "/todo/group/get",
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

ajaxHandler.team_LoadTag = function (team_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/team/" + team_id + "/todo/tag/get",
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

ajaxHandler.team_LoadTask = function (team_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/team/" + team_id + "/todo/get",
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

ajaxHandler.team_LoadInfo = function (team_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/team/" + team_id + "/get_info",
            type: "GET",
            success: function (data) {
                resolve(data); // Resolve the promise with user info when AJAX call succeeds
            },
            error: function (error) {
                reject(error); // Reject the promise if there is an error
            }
        });
    });
};

ajaxHandler.team_LoadUserList = function (team_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/team/" + team_id + "/user_list",
            type: "GET",
            success: function (data) {
                resolve(data); // Resolve the promise with user info when AJAX call succeeds
            },
            error: function (error) {
                reject(error); // Reject the promise if there is an error
            }
        });
    });
};

ajaxHandler.team_LoadCreatedList = function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/team/create/get",
            type: "GET",
            success: function (data) {
                resolve(data); // Resolve the promise with user info when AJAX call succeeds
            },
            error: function (error) {
                reject(error); // Reject the promise if there is an error
            }
        });
    });
};

ajaxHandler.team_LoadJoinedList = function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/team/join/get",
            type: "GET",
            success: function (data) {
                resolve(data); // Resolve the promise with user info when AJAX call succeeds
            },
            error: function (error) {
                reject(error); // Reject the promise if there is an error
            }
        });
    });
};

ajaxHandler.team_AddTeam = function (teamid, teamname, teamdes, teamcode) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/team/create",
            type: "POST",
            data: JSON.stringify({
                team_id: teamid,
                team_name: teamname,
                team_description: teamdes,
                team_code: teamcode,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log('Success');
                resolve(data);
            },
            error: function (data) {
                console.log('Error');
                reject(data);
            },
        });
    });
}
ajaxHandler.team_JoinTeam = function (teamcode) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/team/join",
            type: "POST",
            data: JSON.stringify({
                team_code: teamcode,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log('Success');
                resolve(data);
            },
            error: function (data) {
                console.log('Error');
                reject(data);
            },
        });
    });

}
ajaxHandler.team_LeaveTeam = function (team_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/team/" + team_id + "/leave",
            type: "POST",
            data: JSON.stringify({
                team_id: team_id,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log('Success');
                resolve(data);
            },
            error: function (data) {
                console.log('Error');
                reject(data);
            },
        });
    });


}
ajaxHandler.team_DeleteTeam = function (team_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/team/" + team_id + "/delete",
            type: "POST",
            data: JSON.stringify({
                team_id: team_id,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log('Success');
                resolve(data);
            },
            error: function (data) {
                console.log('Error');
                reject(data);
            },
        });
    });

}
ajaxHandler.team_TeamkickUser = function (team_id, user_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/team/" + team_id + "/kick",
            type: "POST",
            data: JSON.stringify({
                team_id: team_id,
                user_id: user_id,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log('Success');
                resolve(data);
            },
            error: function (data) {
                console.log('Error');
                reject(data);
            },
        });
    });

}

ajaxHandler.team_setLastVisitedTeam = function (team_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/team/lastvisit",
            type: "POST",
            data: JSON.stringify({
                last_team: team_id,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log('Success');
                resolve(data); // Resolve the promise with user info when AJAX call succeeds
            },
            error: function (error) {
                console.log(error);
                reject(error); // Reject the promise if there is an error
            }
        });
    });
};

ajaxHandler.team_getLastVisitedTeam = function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/team/lastvisit",
            type: "GET",
            success: function (data) {
                resolve(data); // Resolve the promise with user info when AJAX call succeeds
            },
            error: function (error) {
                reject(error); // Reject the promise if there is an error
            }
        });
    });
};
ajaxHandler.Team_EditTeam = function (team_id, teamname, teamdes, teamcode) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/team/" + team_id + "/edit",
            type: "POST",
            data: JSON.stringify({
                team_id: team_id,
                team_name: teamname,
                team_description: teamdes,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log('Success');
                resolve(data);
            },
            error: function (data) {
                console.log('Error');
                reject(data);
            },
        });
    });
}

//================================================================\\
//======================  Load User Data  ========================\\
//================================================================\\


ajaxHandler.LoadUserData = function () {
    return new Promise(function (resolve) {
        let Dict = new DictCRUD();

        $.when(
            ajaxHandler.LoadGroup(),
            ajaxHandler.LoadTag(),
            ajaxHandler.LoadTask(),
            ajaxHandler.LoadUser(),
            ajaxHandler.getDarkmode(),
        ).done(function (groupData, tagData, taskData, userData, darkmode) {
            // All AJAX calls are completed
            console.log("[1] All data loaded successfully.");
            console.log(groupData);
            console.log(tagData);
            console.log(taskData);
            console.log(userData);

            Dict.username = userData.username;
            Dict.bio = userData.bio;
            Dict.country = userData.country;
            Dict.email = userData.email;
            Dict.points = userData.points;
            Dict.isFirstTime = userData.isFirstTime;
            Dict.darkmode = darkmode.dark_mode;

            if (!Dict.username) {
                Dict.username = "User-" + Utils.getUuid().substring(0, 6);
                Dict.country = "Global";
                ajaxHandler.setUserInfo(Dict.username, Dict.bio, Dict.country);
            }

            groupData.forEach(function (dt) {
                if (dt.def_tag == "") {
                    dt.def_tag = null;
                }
                let gr = Dict.createGroup(dt.title, [], dt.def_tag, dt.color, "", dt.groupId);
                //somehow the def_tag is null on database creation
                if (!dt.def_tag) {
                    let dft = Dict.tags[gr.def_tag];
                    console.log("[" + dt.title + "] Def tag not found, creating new tag");
                    $.when(ajaxHandler.addTag(dft.tagID, dft.groupId, dft.title, dft.color)).done(
                        ajaxHandler.updateGroup(gr.groupID, gr.title, gr.color, gr.def_tag) // update the group for def_tag
                    );
                }
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

            // somehow the def_tag is not in tags dict yet
            for (let groupId in Dict.groups) {
                if (Dict.groups[groupId].def_tag && !Dict.tags.hasOwnProperty(Dict.groups[groupId].def_tag)) {
                    let group = Dict.groups[groupId]
                    let dft = Dict.createTag(group.title, group.color, group.groupID, false, false, false, group.def_tag);
                    console.log("Not found def_tag: " + group.def_tag + " in tags dict, adding new one!");
                    ajaxHandler.addTag(dft.tagID, dft.groupId, dft.title, dft.color);
                };
            };

            // filter all task that have group and tags no longer exist
            for (let taskId in Dict.tasks) {
                let t = Dict.tasks[taskId];
                if (!Dict.groups[t.groupId] || !Dict.tags[t.tag]) {
                    console.log(t.taskID + " Task error: No group or tag assigned!");
                    // impletment later
                    continue;
                }
            }

            console.log(Dict);
            ajaxHandler.getUserProfileImage();
            resolve(Dict);
        })
    });
};

//================================================================\\
//======================  Load Team Data  ========================\\
//================================================================\\


ajaxHandler.LoadTeamData = function (team_id) {
    return new Promise(function (resolve) {
        let Dict = new DictCRUD();
        $.when(
            ajaxHandler.team_LoadGroup(team_id),
            ajaxHandler.team_LoadTag(team_id),
            ajaxHandler.team_LoadTask(team_id),
            ajaxHandler.team_LoadInfo(team_id),
            ajaxHandler.getDarkmode(),
        ).done(function (groupData, tagData, taskData, teamData, darkmode) {
            // All AJAX calls are completed
            console.log("[1] All data loaded successfully.");
            console.log(groupData);
            console.log(tagData);
            console.log(taskData);
            console.log(teamData);

            Dict.name = teamData.team_name;
            Dict.bio = teamData.team_description;
            Dict.team_id = teamData.team_id;
            Dict.team_code = teamData.team_code;
            Dict.darkmode = darkmode.dark_mode;
            Dict.admin = teamData.admin;

            if (!Dict.name) {
                Dict.name = "Team-" + Utils.getUuid().substring(0, 6);
            }

            groupData.forEach(function (dt) {
                if (dt.def_tag == "") {
                    dt.def_tag = null;
                }
                let gr = Dict.createGroup(dt.title, [], dt.def_tag, dt.color, "", dt.groupId);
                //somehow the def_tag is null on database creation
                if (!dt.def_tag) {
                    let dft = Dict.tags[gr.def_tag];
                    console.log("[" + dt.title + "] Def tag not found, creating new tag");
                    $.when(ajaxHandler.team_addTag(team_id, dft.tagID, dft.groupId, dft.title, dft.color)).done(
                        ajaxHandler.team_updateGroup(team_id, gr.groupID, gr.title, gr.color, gr.def_tag) // update the group for def_tag
                    );
                }
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

            // somehow the def_tag is not in tags dict yet
            for (let groupId in Dict.groups) {
                if (Dict.groups[groupId].def_tag && !Dict.tags.hasOwnProperty(Dict.groups[groupId].def_tag)) {
                    let group = Dict.groups[groupId]
                    let dft = Dict.createTag(group.title, group.color, group.groupID, false, false, false, group.def_tag);
                    console.log("Not found def_tag: " + group.def_tag + " in tags dict, adding new one!");
                    ajaxHandler.team_addTag(team_id, dft.tagID, dft.groupId, dft.title, dft.color);
                };
            };

            // filter all task that have group and tags no longer exist
            for (let taskId in Dict.tasks) {
                let t = Dict.tasks[taskId];
                if (!Dict.groups[t.groupId] || !Dict.tags[t.tag]) {
                    console.log(t.taskID + " Task error: No group or tag assigned!");
                    // impletment later
                    continue;
                }
            }

            console.log(Dict);
            ajaxHandler.getUserProfileImage();
            resolve(Dict);
        })
    });
};


export { ajaxHandler };