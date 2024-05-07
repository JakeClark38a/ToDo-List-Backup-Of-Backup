//=====================================================================\\
/* 
NOTICE:
This file handles all the actions that are related to the main content of the page
This file handle:
    - Rendering of the main menu

*/
//=====================================================================\\

import { MainMenu } from "./hmtlComponent.js";

function toggleHiddenMMenuGroup(group) {
    group.find("#MMenu-Tag-Section").toggle("hidden");
    group.find(".MMenu-Dropdown-Arrow").toggleClass("-rotate-90");
}

function addNewTagMainMenu(group_html, id, tag) {
    group_html.append(MainMenu.TagTempplate(id, tag));
}

function addNewGroupMainMenu(unique_id, group) {
    $("#MMenu-Group-Section").append(
        MainMenu.GroupTemplates(unique_id, group)
    );
    return $("#" + unique_id);
}

function LoadMainMenu(Dict) {
    //empty all
    $("#MMenu-Group-Section").empty();
    // Iterate over each group in Dict.groups
    for (var groupId in Dict.groups) {
        if (Dict.groups.hasOwnProperty(groupId)) {
            var group = Dict.groups[groupId];
            var g = addNewGroupMainMenu(groupId, group);
            // console.log("Group: " + group.title);
            // Iterate over tags in the current group
            for (var j = 0; j < group.tags.length; j++) {
                let tag_ = Dict.tags[group.tags[j]]
                // console.log(tag_);
                if (!tag_ && tag_.display == false) continue;
                addNewTagMainMenu(g.find("#MMenu-Tag-Section"), tag_.tagID, tag_);
            }
            toggleHiddenMMenuGroup(g);
        }
    }
    console.log("[8] Loaded Main Menu");
}

export { LoadMainMenu, toggleHiddenMMenuGroup, addNewGroupMainMenu, addNewTagMainMenu };
