//=====================================================================\\
/* 
NOTICE:
This file handles all the actions that are related to the main content of the page
This file handle:
  - Main content include : group, task, tags
  - CRUD content
  - Render out mainPage content for Today tab

*/
//=====================================================================\\

// Templates 
import { MainScreen, MainMenu } from "./hmtlComponent.js";
import { DictWithAJAX, Utils } from "./userData.js";
import { modalMainScreen } from "./CRUDmodal_handler.js";
$(document).ready(function () {
  //================================================================\\
  //=========================== Sample var =========================\\
  //================================================================\\
  let isDebugMode = true;
  let Dict = Utils.getSampleData();
  if (isDebugMode) {

    let g1 = Dict.createGroup("Group 1", [], null, "red", "");
    let g2 = Dict.createGroup("Group 2", [], null, "blue", "");
    let g3 = Dict.createGroup("Group 3", [], null, "green", "");
    console.log(g3);
    // Create a new Tag
    let tag1 = Dict.createTag("Tag 1", "red", g1.groupID, false, true, true);
    let tag2 = Dict.createTag("Tag 2", "blue", g2.groupID, false, true, true);
    let tag3 = Dict.createTag("Tag 3", "green", g3.groupID, false, true, true);
    let tag4 = Dict.createTag("Tag 4", "yellow", g1.groupID, false, true, true);
    console.log(tag4);

    g1.tags.push(tag1.tagID);
    g1.tags.push(tag4.tagID);
    g2.tags.push(tag2.tagID);
    g3.tags.push(tag3.tagID);

    // Create a new Task
    let t1 = Dict.createTask("Task 1", "Description 1", tag1.tagID, "2023-12-12", 10);
    let t2 = Dict.createTask("Task 2", "Description 2", tag2.tagID, "2024-12-12", 10);
    let t3 = Dict.createTask("Task 3", "Description 3", tag3.tagID, "2025-12-12", 10);
    console.log(t3);

    console.log(Dict);
  };

  //================================================================\\
  //=========================== Variables ==========================\\
  //================================================================\\
  if (!isDebugMode) Dict = DictWithAJAX.LoadData();
  if (isDebugMode) { console.log(Dict); };
  let currentMode = 0;
  let isMakeChangeGroup = false;
  let currentMMenuTab = 0;  // 0-today 1-cal 2-garden


  /* Main Display rule

        |_MainScreen
        |____Formatter
        |     | id 
        |     |_____title
        |     |
        |     |_____section (Task-Section , Group-Section)
        |     |
        |     |_____tag(Tag-Section)
        |______Addons

  */
  //################################################### Fuctions #########################################################

  //================================================================\\
  //=========================== General ============================\\
  //================================================================\\

  //================================================================\\
  //=========================== Avatar Menu ========================\\
  //================================================================\\
  $("#Avatar-Menu-Click").click(function () {
    $("#Avatar-Menu").toggleClass("h-32 lg:h-44");
    $("#Avatar-Menu-Click").toggleClass("bg-primary-200");
  });

  function toggleProfilePage(Open = false) {
    if (Open) {
      $('#test').load('../static/html/profilePage.html', function () {
        // This callback function will be executed after the content is loaded
        //AJAXLoadUserProfile(); this will be in profile js
        $('#Main-Screen').toggleClass('hidden', Open);
      });
    } else {
      $('#test').empty();
      $('#Main-Screen').toggleClass('hidden', Open);
    }
  }
  let isShowProfile = false;
  $('#PMenu-Profile').click(() => {
    isShowProfile = !isShowProfile;
    toggleProfilePage(isShowProfile);
  });

  $("#PMenu-DarkMode").find("#Toggle-DarkMode").click(function () {
    $("html").toggleClass("dark", $("#Toggle-DarkMode").prop('checked'));
  });

  //================================================================\\
  //=========================== Mode Menu ==========================\\
  //================================================================\\

  $("#Mode-Menu-Click").click(function () {
    $("#Mode-Menu").toggleClass("h-32 lg:h-44");
    $("#Mode-Menu-Click").toggleClass("bg-main/35");

  });

  //================================================================\\
  //=========================== Main Menu ==========================\\
  //================================================================\\

  $("#Main-Menu-Click").click(function () {
    $("#Main-Menu").toggleClass("h-[86vh]");
    $("#Main-Menu-Click").toggleClass("-rotate-90")
  });

  function updateMMenuTabIndicator(tab = null) {
    var $tab = tab ? tab : $("#Main-Menu").find("#MMenu-Today");
    var currId = $tab.attr('id');
    const indiModeCSS = 'border-r-4 border-primary-200 bg-gradient-to-l from-primary-200/35 to-transparent';

    // clear all previous tab border 
    $('#Main-Menu').find('.MMenu-Primary-Section').removeClass(indiModeCSS);
    //console.log(currId);
    const indicatTab = ['MMenu-Today', 'MMenu-Calendar', 'MMenu-Garden'];
    if (indicatTab.indexOf(currId) !== -1) {
      $tab.toggleClass(indiModeCSS);
      if (indicatTab.indexOf(currId) == 0) {
        currentMMenuTab = 0;
        console.log("Today");
        isShowProfile = false;
        toggleProfilePage(isShowProfile);
      }
    }
  }

  $('#Main-Menu').on('click', '.MMenu-Primary-Section', function (e) {
    updateMMenuTabIndicator($(this));
  });

  //Add group
  $("#MMenu-Group-Add").click(function () {
    isMakeChangeGroup = true;
    // Customize modal appearance
    modalMainScreen.AddEditGroup();
  });

  /// Add tag
  $("#MMenu-Group-Section").on("click", ".MMenu-Tag-Add", function () {
    isMakeChangeGroup = false;
    /// add tag
    var gid = $(this).closest(".MMenu-Group").attr("id")
    //console.log(groupDict);
    //addTag(groupDict)
    LoadGroups();
    modalMainScreen.AddEditTag();

  });


  /// Edit Group
  $("#MMenu-Group-Section").on("click", ".MMenu-Group-Edit", function () {
    console.log($(this).closest(".MMenu-Group").attr("id"));
    var gid = $(this).closest(".MMenu-Group").attr("id");
    var gInfo = Dict.groups[gid];
    isMakeChangeGroup = true;
    modalMainScreen.AddEditGroup(gInfo);
  });

  /// Edit Tag
  $("#MMenu-Group-Section").on("click", ".MMenu-Tag-Edit", function () {
    console.log($(this).closest(".MMenu-Tag").attr("id"));
    var tid = $(this).closest(".MMenu-Tag").attr("id")
    var tagInfo = Dict.tags[tid];

    if (tagInfo.editable == false) return;

    isMakeChangeGroup = false;
    modalMainScreen.AddEditTag(tagInfo);
  });

  function toggleHiddenMMenuGroup(group) {
    group.find("#MMenu-Tag-Section").toggle("hidden");
    group.find(".MMenu-Dropdown-Arrow").toggleClass("-rotate-90");
  }



  function addNewTagMainMenu(group_html, id, tag) {
    //console.log(group_html);
    group_html.append(MainMenu.TagTempplate(id, tag));
    // LoadTags();
  }

  function addNewGroupMainMenu(unique_id, group) {
    $("#MMenu-Group-Section").append(
      MainMenu.GroupTemplates(unique_id, group)
    );

    return $("#" + unique_id);
  }

  function LoadGroups_Tag() {
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

          if (Dict.tags[group.tags[j]].display == false) continue;

          addNewTagMainMenu(g.find("#MMenu-Tag-Section"), group.tags[j], Dict.tags[group.tags[j]]);
        }
        toggleHiddenMMenuGroup(g);
      }
    }
  }

  //================================================================\\
  //========================== AJAX Zone  ==========================\\
  //================================================================\\

  function AJAXaddGroup(groupId, title, color) {
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

  function AJAXaddTag(tagId, groupId, title, color) {
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

  function AJAXupdateGroup(groupId, title, color) {
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

  function AJAXupdateTag(tagId, groupId, title, color) {
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

  function AJAXdeleteGroup(groupId) {
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

  function AJAXdeleteTag(tagId) {
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

  function AJAXcreateTask(taskId, title, description, tag, deadline, points, isCompleted = false) {
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

  function AJAXdeleteTask(taskId) {
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

  function AJAXcompleteTask(taskId) {
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

  function AJAXupdateTask(taskId, title, description, tag, deadline, points, isCompleted = false) {
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
  function AJAXLoadGroup() {
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

          if (!Dict.tags.hasOwnProperty(tmp.def_tag)) { // add def_tag
            Dict.tags[tmp.def_tag] = {
              title: "Default",
              color: "#000000",
              display: false,
              editable: false,
              deletable: false,
            }
          }

          tmp.tags.forEach((t, i) => { // add other tags
            if (!Dict.tags.hasOwnProperty(t)) {
              Dict.tags[t] = {
                title: "no_name_" + tmp.title + "_" + i, // Adding index to title
                color: randHexColor(),
                display: true,
                editable: true,
                deletable: true,
              };
            }
          });


          Dict.groups[dt[0]] = tmp;
          //tempDict.groups[dt[0]] = tmp;
        });

        console.log(Dict);
        console.log("Load data complete")
        RefreshMainScreen();
        LoadGroups_Tag();
      },
      error: function (data) {
        console.log("Error");
      }
    });
  }

  //================================================================\\
  //========================== Main Screen =========================\\
  //================================================================\\

  function updateTime() {
    const now = new Date();
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    let hours = now.getHours().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('clock').textContent = formattedTime;
  }

  setInterval(updateTime, 1000);

  function renderTagMainScreen(tag_html, tagID, mode = 0) {
    let tag = Dict.tags[tagID];
    console.log(tag.title);
    if (tag.display == false) return;
    tag_html.append(MainScreen.TagTemplate(tag.tagID, tag, mode));
    tag_html.find("#" + tag.tagID).css({ "background-color": tag.color });
  }


  function renderFormatterAddons(formatter_html, mode = 0) {
    formatter_html.append(MainScreen.FormmatterAddons(mode));
  }

  function renderTaskMainScreen(task_html, taskID, mode = 0) {
    let task = Dict.tasks[taskID];
    console.log(task.title + " " + taskID + " " + task.tag);
    task_html.append(MainScreen.TaskTemplate(task.taskID, task, mode));
    renderTagMainScreen(task_html.find("#" + task.taskID).find("#Task-Tag"), task.tag, mode);
  }

  //Remove task
  $("#Main-Screen").on("click", "#Task-Cancel", function (e) {
    var task_ = $(this).closest(".task-outer");
    var taskId = task_.attr("id");

    // Send AJAX request to backend at /todo/delete to delete task
    AJAXdeleteTask(taskId);

    delete Dict.tasks[taskId];
    console.log("Cancelled: " + taskId);
    //console.log(Dict.tasks);

    task_.toggleClass("transform transition-all duration-350 delay-75 ease-in-out scale-0 blur-md translate-y-20");

    setTimeout(() => {
      task_.remove();
    }, 400);
  });

  // Complete task
  $("#Main-Screen").on("click", "#Task-Destroyer", function () {
    var task_ = $(this).closest(".task-outer");
    var taskId = task_.attr("id");

    // Disable the checkbox
    $(this).prop("disabled", true);

    console.log("Completed: " + taskId);

    Dict.completed[taskId] = Dict.tasks[taskId];
    delete Dict.tasks[taskId];

    // Also send to backend at /todo/completed/<id>
    AJAXcompleteTask(taskId);

    //console.log(Dict.completed);
    //console.log(Dict.tasks);

    task_.toggleClass(" transform transition-all duration-350 delay-500 ease-in-out scale-150 blur-xl -translate-y-20");
    setTimeout(() => {
      task_.remove();
    }, 800);
  });


  function renderGroupMainScreen(group_html, group, unique_id, mode = 0) {
    // var unique_id = getUuid();
    group_html.append(MainScreen.GroupTemplate(unique_id, group, mode));
    group_html.find("#" + unique_id).find("#Task-Section-Outer").css({ "border-color": group.color });
    return group_html.find("#" + unique_id);
  }

  function LoadMainScreen() {
    console.log("Loading Main Screen");
    // Also add Draggable button again
    $("#Main-Screen").append($(`
    <!-- add question action button here-->
    <div id="add-draggable"  class="z-40 absolute">
        <div  class="touch-none select-none">
            <div id="moveButton" 
                class="hover:w-12 hover:h-12 border-2 border-gray-300 absolute rounded-full w-12 h-12 bg-main/55 dark:bg-gray-700/60 backdrop-blur-sm shadow-xl p-2">
                <svg class="w-full h-full text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7 7V5" />
                </svg>
            </div>
        </div>
    </div>
    <!-- kết thúc phần nút -->
    `))
    var formatter_html = $("#Main-Screen").append(
      MainScreen.FormatterTemplate()
    );

    // Iterate over groups
    for (var groupId in Dict.groups) {
      if (Dict.groups.hasOwnProperty(groupId)) {
        var group = Dict.groups[groupId];
        console.log(group);
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
          ) {
            // Pass task details to renderTaskMainScreen
            renderTaskMainScreen(
              task_html,
              taskId,
              currentMode
            );
          }
        }
      }
    }
    renderFormatterAddons(formatter_html, currentMode);
  }

  //================================================================\\
  //========================== Initialize ==========================\\
  //================================================================\\

  function RefreshMainScreen() {
    console.log("Refresh the mainscreen");
    $("#Main-Screen").empty();
    // $("#MMenu-Group-Section").empty();
    LoadMainScreen();
    LoadGroups();
    LoadTags();
  }

  function LoadUser() {
    AJAXLoadGroup(); // load data
    LoadGroups_Tag();
    RefreshMainScreen();
  }

  // Take all tags on Dict and put them in the "Select tag" dropdown
  function LoadTags() {
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
  LoadTags();

  function LoadGroups() {
    console.log("Loading groups");
    var groupArray = Object.keys(Dict.groups);
    $("#crud-modal select#groups").empty();

    groupArray.forEach(element => {
      let options = `<option value="${element}">${Dict.groups[element].title}</option>`
      $("#crud-modal select#groups").append(options)
    });
  };
  LoadGroups();


  function initUser() {
    currentMMenuTab = 0; // 0-today 2-calendar 3-garden
    currentMode = 0;
    LoadUser();
    updateMMenuTabIndicator();
  }
  initUser();


  //================================================================\\
  //========================= CRUD modal ===========================\\
  //================================================================\\
  // Create 

  $('#Main-Screen').on("click", ".Group-Task-Add", function (e) {
    e.preventDefault();
    var gid = $(this).closest(".group-outer").attr("id")
    var preset_tag = Dict.groups[gid].def_tag;
    modalMainScreen.AddEditTask();
    e.stopPropagation();
  });

  // My work at U in CRUD modal  /// NULL -change the activate condition to prevent conflict with cancel button 
  $('#Main-Screen').on("click", ".Task-Edit", function (e) {
    e.preventDefault();
    modalMainScreen.AddEditTask(Dict.tasks[$(this).closest(".task-outer").attr("id")]);
    e.stopPropagation();
  })

  // My work at adding limitation on typing Create - Edit modal
  $("#crud-modal").on("input", "#name, #description", function () {
    // Take current input length
    let input_length = $(this).val().length;
    // Take input limitation
    let input_limit = $(this).attr("maxlength");
    // If length > 0, show this length and limitation at the same place in label
    if (input_length > 0) {
      // Update length and limit
      $(this).prev().text(function (e, text) {
        let label_content = text.split(" ");
        // Remove old length and limit (element that starts with "(" and ends with ")")
        label_content = label_content.filter(e => !e.startsWith("(") && !e.endsWith(")"));
        // Join new length and limit
        label_content.push(`(${input_length}/${input_limit})`);
        return label_content.join(" ");
      })
    }
    else {
      // Update length and limit
      $(this).prev().text(function (e, text) {
        let label_content = text.split(" ");
        // Remove old length and limit (element that starts with "(" and ends with ")")
        label_content = label_content.filter(e => !e.startsWith("(") && !e.endsWith(")"));
        // Join just title
        return label_content.join(" ");
      })
    }
  })
  // And also checking for expired date
  $("#crud-modal").on("input", "#todo-expired", function () {
    // Get current date
    let current_date = new Date();
    // Get input date
    let input_date = new Date($(this).val());
    // If input date is less than current date, show alert
    if (input_date < current_date) {
      $(this).css("border", "2px solid red");
    }
    else {
      $(this).css("border", "2px solid green");
    }
  })

  // Submit button
  $('#crud-modal form').on("submit", function (e) {
    e.preventDefault();
    let generateId = Utils.getUuid();
    // Get all input
    // Get id from honeypot, if id is empty string, it means it's a new task
    let submitValues = modalMainScreen.getSubmitValues();
    let id = submitValues["id"];
    let title = submitValues["title"];
    let desc = submitValues["desc"];
    let tag = submitValues["tag"];
    let expired = submitValues["expired"];
    let color = submitValues["color"];
    let mode = submitValues["mode"];

    console.log(mode, id, title, desc, tag, expired, color);
    // Before updatind Dict, check if tag is empty
    if (mode == "task") {
      if (id == "none") {
        // Adding a new task to the tasks object within Dict
        let t = Dict.createTask(title, desc, tag, expired, 4);
        // Call AJAX at /todo/create with JSON data
        AJAXcreateTask(t.taskID, t.title, t.desc, t.tag, t.expired, t.points);
      }
      else {
        // Update Dict
        let t = Dict.createTask(title, desc, tag, expired, 4, id);
        Dict.updateTask(t.taskID, t);
        // Call AJAX at /todo/create with JSON data
        AJAXupdateTask(t.taskID, t.title, t.desc, t.tag, t.expired, t.points);
      }
    }


    if (mode == "group") {
      if (id == "none") {  /// Create a new group
        let g = Dict.createGroup(title, desc, null, color, "");
        $("#MMenu-Group-Section").append(MainMenu.GroupTemplates(d.groupID, g));
        /// Main Screen Add 
        renderGroupMainScreen($("#Main-Formatter").find("#Wrapper"), g, currentMode);
        AJAXaddGroup(g.groupID, g.title, g.color);
      }
      else { // Edit groups
        let g = Dict.createGroup(title, desc, null, color, "", id);
        Dict.updateGroup(g.groupID, g);
        $("#MMenu-Group-Section").find("#" + g.groupID).find("#MMenu-Group-Title").text(g.title);
        AJAXupdateGroup(g.groupID, g.title, g.color);
      }
    }


    if (mode == "tag") {
      if (id == "none") {  /// Create a new tags
        let t = Dict.createTag(title, color, groupId, true, true, true);
        Dict.groups[groupId].tags.push(t.tagID);
        addNewTagMainMenu($("#" + groupId).find("#MMenu-Tag-Section"), t.tagID, t);
        AJAXaddTag(t.tagID, t.groupId, t.title, t.color);
      }
      else { //Edit tags
        let t = Dict.createTag(title, color, groupId, null, null, null, id);
        Dict.updateTag(t.tagID, t);
        $("#MMenu-Group-Section").find("#" + id).find("#MMenu-Tag-Title").text(t.title);
        AJAXupdateTag(t.tagID, t.groupId, t.title, t.color);
      }
    }

    console.log(Dict);
    RefreshMainScreen();
    modalMainScreen.hide();
  })

  //Delete button
  $('#crud-modal #delete-sec').on("click", function (e) {
    e.preventDefault();

    let submitValues = modalMainScreen.getSubmitValues();
    let id = submitValues["id"];
    let mode = submitValues["mode"];
    // Before updatind Dict, check if tag is empty
    if (mode == "task") {
      if (id != "none") {
        // Deleting task
        Dict.removeTask(id);
        // Call AJAX at /todo/delete with JSON data
        AJAXdeleteTask(id);
      }
    }

    if (mode == "group") {
      if (id != "none") {  /// Delete a new group
        Dict.removeGroup(id);
        AJAXdeleteGroup(id);
      }
    }

    if (mode == "tag") {   ///  Delete a tag
      if (id != "none") {
        Dict.removeTag(id);
        AJAXdeleteTag(id);
      }
    }

    alert("Deleted: " + id);
    RefreshMainScreen();
    LoadGroups_Tag();
    console.log(Dict);
    modalMainScreen.hide();
  });


})
//Function to render image of user profile
function AJAXgetUserProfileImage() {
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
AJAXgetUserProfileImage();
// End of app.js