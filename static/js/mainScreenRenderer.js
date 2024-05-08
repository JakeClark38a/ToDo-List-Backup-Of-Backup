//=====================================================================\\
/* 
NOTICE:
This file handles all the actions that are related to the main content of the page
This file handle:
    - Rendering of the main screen

*/
//=====================================================================\\

import { MainScreen } from "./hmtlComponent.js";

function renderTagMainScreen(tag_html, tag, mode = 0) {
    console.log(tag.title);
    if (tag.display == false) return;
    tag_html.append(MainScreen.TagTemplate(tag.tagID, tag, mode));
    tag_html.find("#" + tag.tagID).css({ "background-color": tag.color });
}


function renderFormatterAddons(formatter_html, mode = 0) {
    formatter_html.append(MainScreen.FormmatterAddons(mode));
}

function renderTaskMainScreen(task_html, task, tag, mode = 0) {
    console.log(task.title + " " + task.taskID + " " + task.tag);
    task_html.append(MainScreen.TaskTemplate(task.taskID, task, mode));
    renderTagMainScreen(task_html.find("#" + task.taskID).find("#Task-Tag"), tag, mode);
    // if Due
    if (new Date(task.deadline) - new Date() <= 0) {
        task_html.find("#" + task.taskID).closest(".task-outer").addClass("bg-red-300");
    }
}

function renderGroupMainScreen(group_html, group, unique_id, mode = 0) {
    group_html.append(MainScreen.GroupTemplate(unique_id, group, mode));
    group_html.find("#" + unique_id).find("#Task-Section-Outer").css({ "border-color": group.color });
    return group_html.find("#" + unique_id);
}

function LoadMainScreen(Dict, currentMode = 0) {
    // Also add Draggable button again
    $("#Main-Screen").append(MainScreen.AddFloatButton(true));
    var formatter_html = $("#Main-Screen").append(
        MainScreen.FormatterTemplate()
    );
    //console.log(Dict.groups);
    // Iterate over groups
    for (var groupId in Dict.groups) {
        console.log(groupId);
        if (Dict.groups.hasOwnProperty(groupId)) {
            var group = Dict.groups[groupId];
            var g = renderGroupMainScreen(
                $(formatter_html).find("#Main-Formatter").find("#Wrapper"),
                group,
                groupId,
                currentMode
            );

            //console.log(groupId);
            var task_html = $(g).find("#Task-Section");
            // Iterate over tasks
            for (var taskId in Dict.tasks) {
                if (
                    Dict.tasks.hasOwnProperty(taskId) && (
                        group.tags.includes(Dict.tasks[taskId].tag) || group.def_tag == Dict.tasks[taskId].tag)
                        && Dict.tasks[taskId].isCompleted == false
                ) {
                    // Pass task details to renderTaskMainScreen
                    renderTaskMainScreen(
                        task_html,
                        Dict.tasks[taskId],
                        Dict.tags[Dict.tasks[taskId].tag],
                        currentMode
                    );
                }
            }
        }
    }
    renderFormatterAddons(formatter_html, currentMode);
    console.log("[9] Loaded Main Screen");
}

export { LoadMainScreen, renderFormatterAddons, renderGroupMainScreen, renderTagMainScreen, renderTaskMainScreen };