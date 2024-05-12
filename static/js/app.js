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
import { MainMenu, MainScreen, chatBox } from "./hmtlComponent.js";
import { Utils } from "./userData.js";
import { modalMainScreen } from "./CRUDmodal_handler.js";
import { ajaxHandler } from "./ajaxHandler.js";
import { LoadMainMenu, toggleHiddenMMenuGroup, addNewTagMainMenu } from "./mainMenuRenderer.js";
import { LoadMainScreen, renderGroupMainScreen } from "./mainScreenRenderer.js";
import { Alert } from "./alertMsg.js";
import { chadBot } from "./chadbot.js";
import { updateMMenuTabIndicator } from "./updateMMenu.js";
import { RefreshAllCalendar } from "./calendarNew.js";
//================================================================\\
//=========================== Variables ==========================\\
//================================================================\\
var Dict = Utils.getSampleData();
let isDebugMode = false;
var currentMode = 0; // 0-grid 1-any
var suggestTasks = {};

function getData() {
  return new Promise(function (resolve) {
    $.when(ajaxHandler.LoadUserData()).done(function (data) {
      Dict = data;
      console.log("[5] Data is loaded to app.js: ");
      console.log(Dict);

      if (isDebugMode) {
        let g1 = Dict.createGroup("Group 1", [], "red", "");
        let g2 = Dict.createGroup("Group 2", [], "blue", "");
        let g3 = Dict.createGroup("Group 3", [], "green", "");
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

        console.log("[6-s] Debug mode enabled: ");

      };
      //Alert.Success("Data loaded successfully!");
      $("#Toggle-DarkMode").prop('checked', Dict.darkmode);
      $("html").toggleClass("dark", Dict.darkmode);

      resolve(Dict);
    });
  });
}


function RefreshAll() {
  RefreshAllCalendar();

  $.when(getData()).done(function (data) {
    Dict = data;
    console.log("[7] Refresh the mainscreen");
    console.log(Dict);
    $("#Main-Screen").empty();
    $("#MMenu-Group-Section").empty();

    $("#PMenu-Display-Coin").text("Coins: " + Dict.points);

    LoadMainMenu(Dict);
    LoadMainScreen(Dict, currentMode);

    modalMainScreen.LoadTags(Dict);
    modalMainScreen.LoadGroups(Dict);
  });
}

$(document).ready(function () {
  //================================================================\\
  //========================== Initialize ==========================\\
  //================================================================\\

  function init() {
    currentMode = 0;
    RefreshAll();
  }
  init();


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
  //============================= Chat =============================\\
  //================================================================\\

  function convertToDateFormat(input) {
    if (!input || typeof input !== 'string') {
      console.error("Invalid input. Please provide a valid string.");
      return null;
    }

    let t = input.toLowerCase().replace(" ", "");; // format
    let ampm = t.substring(t.length - 2, t.length);
    let t2 = t.split(":");
    var currentDate = new Date();

    if (t2[0] === 'tomorrow') {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (t2.length <= 2) {
      if (ampm === "am") {
        //  console.log(parseInt(t2[1].substring(0, t2[1].length - 2)))
        currentDate.setHours(parseInt(t2[1].substring(0, t2[1].length - 2)), 0);
      } else {
        console.log("AI: ", t2, t2[1]);
        // console.log(parseInt(t2[1].substring(0, t2[1].length - 2)) + 12)
        currentDate.setHours(parseInt(t2[1].substring(0, t2[1].length - 2)) + 12, 0);
      }
    } else {
      if (ampm === "am") {
        // console.log(parseInt(t2[0].substring(0, t2[0].length - 2)))
        currentDate.setHours(parseInt(t2[0].substring(0, t2[0].length - 2)));
      } else {
        // console.log(parseInt(t2[0].substring(0, t2[0].length - 2)) + 12)
        currentDate.setHours(parseInt(t2[0].substring(0, t2[0].length - 2)) + 12);
      }
      // console.log(parseInt(t2[1]))
      currentDate.setMinutes(parseInt(t2[1]));
    }

    console.log(currentDate);
    var formattedDate = currentDate.toISOString().substring(0, 16);
    return formattedDate;
  }

  function createChatTask(str) {
    // Check if the string is null or empty
    if (str == null || str == "") return;
    // Split the string into task segments
    let taskSegments = str.split("[TSEPT]");
    console.log(taskSegments);
    // Extracting data

    const taskRegex = /\[Task\] (.*?) \[\/Task\]/;
    const dueRegex = /\[Due\] (.*?) \[\/Due\]/;
    const groupRegex = /\[Group\] (.*?) \[\/Group\]/;
    const tagRegex = /\[Tag\] (.*?) \[\/Tag\]/;
    const desRegex = /\[Des\] (.*?) \[\/Des\]/;
    let suggestTasksSession = {};
    for (let i = 0; i < taskSegments.length; i++) {
      const taskSegment = taskSegments[i];
      const task = {};
      let id = Utils.getUuid();
      // Extract task title
      const taskMatch = taskSegment.match(taskRegex);
      if (taskMatch) {
        task.title = taskMatch[1];
      }

      // Extract due date
      const dueMatch = taskSegment.match(dueRegex);
      if (dueMatch) {
        task.deadline = convertToDateFormat(dueMatch[1]);
      }

      // Extract group
      const groupMatch = taskSegment.match(groupRegex);
      if (groupMatch) {
        task.group = groupMatch[1];
      }

      // Extract tag
      const tagMatch = taskSegment.match(tagRegex);
      if (tagMatch) {
        task.tag = tagMatch[1];
      }

      // Extract tag
      const desMatch = taskSegment.match(desRegex);
      if (desMatch) {
        task.description = desMatch[1];
      }
      task.taskID = id;
      if (Object.keys(task).length <= 3) continue;
      suggestTasks[id] = task;
      suggestTasksSession[id] = task;
    }

    // Outputting the extracted data
    console.log(suggestTasksSession);

    for (let idx in suggestTasksSession) {
      let dueStr = suggestTasksSession[idx].deadline;
      $('#Chat-Section #chat-content').append(chatBox.chatSuggestTask(idx, suggestTasksSession[idx].title, suggestTasksSession[idx].description, dueStr)); // ai chat suggestion task
      let c = $('#Chat-Section #chat-content #' + idx)
      c.find('#Task-Tag').append(MainScreen.TagTemplate('tg' + idx, { title: suggestTasksSession[idx].tag }));
      c.find('#Task-Group').append(MainScreen.TagTemplate('gp' + idx, { title: suggestTasksSession[idx].group }));
      c.find('#Task-Tag').find("#tg" + idx).css({ "background-color": Utils.randHexColor() })
      c.find('#Task-Group').find("#gp" + idx).css({ "background-color": Utils.randHexColor() })
    }
  }

  async function runChat() {
    if (!chadBot.isReady) { return };
    let input = $('#Chat-Section #chat-message').val();  // get user input
    $('#Chat-Section #chat-message').val('');  // empty input box

    let id = Utils.getUuid(); // random uuid for chat message send by AI in order to add effects

    $('#Chat-Section #chat-content').append(chatBox.MessageDisplay(input, 'none').send); // user chat message


    $('#Chat-Section #chat-content').append(chatBox.MessageDisplay('', id).reply); // ai chat message 
    let c = $('#Chat-Section #chat-content #' + id)

    c.find('#chat-response').empty(); // empty the chat message box
    c.find('#chat-response').append(chatBox.waitingResponse().waiting_reply); // add waiting animation

    $('#Chat-Section #chat-send-button').empty(); // empty the send button
    $('#Chat-Section #chat-send-button').append(chatBox.waitingResponse().wating_sendbtn); // add waiting animation

    let text = await chadBot.chat(input, 'main'); // get response from AI, the code define if the ai is in the landing or main page
    let procTask = text.substring(text.indexOf("[BeginTask]"), text.indexOf("[EndTask]") != -1 ? text.indexOf("[EndTask]") + 9 : text.length); //th); //

    createChatTask(procTask); // create task from the chat
    let chatText = text.substring(0, text.indexOf("[BeginTask]") != -1 ? text.indexOf("[BeginTask]") : text.length);
    console.log(text, chatText);
    // remove the task from the response
    c.find('#chat-response').empty(); // empty the chat message box , remove the loading effect
    c.find('#chat-response').append(chatBox.MessageDisplay(chatText, 'none').textcontent); // add the response from AI

    $('#Chat-Section #chat-send-button').empty(); // empty the send button
    $('#Chat-Section #chat-send-button').append(chatBox.waitingResponse().sendbtn); // add the send button svg
    chadBot.isReady = true;
  }

  $('#Chat-Section #chat-send-button').on('click', runChat);
  $('#Chat-Section #clear-chat-box').on('click', () => { suggestTasks = {}; $('#Chat-Section #chat-content').empty() });

  $("#chat-message").on('keydown', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      runChat();
    }
  });
  // e.key is the modern way of detecting keys
  // e.keyCode is deprecated (left here for for legacy browsers support)

  let isOpenChat = false;
  $('#NavBar #ChatBox-Toggle').on('click', () => {
    $('#Main-Screen').toggleClass("hidden xl:inline-block", !isOpenChat);
    $('#Chat-Section').toggleClass("hidden", isOpenChat);
    isOpenChat = !isOpenChat;
  });


  $('#Chat-Section #chat-content').on('click', '.suggest-task-accept', (e) => {
    let task_id = $(e.currentTarget).attr('id');
    let task_info = suggestTasks[task_id];
    if (task_info == null) return;
    modalMainScreen.AddEditTask(task_info, null, true);
  })

  //================================================================\\
  //=========================== Avatar Menu ========================\\
  //================================================================\\
  $("#Avatar-Menu-Click").click(function () {
    $("#Avatar-Menu").toggleClass("h-32 lg:h-44");
    $("#Avatar-Menu-Click").toggleClass("bg-primary-200");
  });

  $("#PMenu-DarkMode").find("#Toggle-DarkMode").click(function () {
    $.when(ajaxHandler.updateDarkmode($("#Toggle-DarkMode").prop('checked'))).done(function () {
      $("html").toggleClass("dark", ajaxHandler.getDarkmode().dark_mode)
    });
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

  updateMMenuTabIndicator();

  //Add group
  $("#MMenu-Group-Add").click(function () {
    modalMainScreen.AddEditGroup();
  });

  /// Add tag
  $("#MMenu-Group-Section").on("click", ".MMenu-Tag-Add", function () {
    modalMainScreen.LoadGroups(Dict);
    let gid = $(this).parent().parent().closest('.MMenu-Group').attr('id');
    modalMainScreen.AddEditTag(null, Dict.groups[gid]);
  });

  /// Edit Group
  $("#MMenu-Group-Section").on("click", ".MMenu-Group-Edit", function () {
    console.log($(this).closest(".MMenu-Group").attr("id"));
    var gid = $(this).closest(".MMenu-Group").attr("id");
    var gInfo = Dict.groups[gid];
    modalMainScreen.AddEditGroup(gInfo);
  });

  /// Edit Tag
  $("#MMenu-Group-Section").on("click", ".MMenu-Tag-Edit", function () {
    console.log($(this).closest(".MMenu-Tag").attr("id"));
    var tid = $(this).closest(".MMenu-Tag").attr("id")
    var tagInfo = Dict.tags[tid];
    if (tagInfo.editable == false) return;
    modalMainScreen.AddEditTag(tagInfo);
  });



  $("#MMenu-Group-Section").on("click", ".MMenu-Toggle-Hidden", function () {
    toggleHiddenMMenuGroup($(this).parent().parent());
  });


  //================================================================\\
  //========================== Main Screen =========================\\
  //================================================================\\

  function clockTick() {
    const now = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dayOfWeek = daysOfWeek[now.getDay()];
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, so we add 1
    const year = now.getFullYear();
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}, ${dayOfWeek}, ${monthsOfYear[month - 1]} ${day}, ${year}`;
    document.getElementById('clock').textContent = formattedTime;
  }
  clockTick();
  setInterval(clockTick, 1000);

  //Remove task
  $("#Main-Screen").on("click", "#Task-Cancel", function (e) {
    var task_ = $(this).closest(".task-outer");
    var taskId = task_.attr("id");

    // Send ajaxHandler. request to backend at /todo/delete to delete task
    $.when(ajaxHandler.deleteTask(taskId)).done(() => {
      Alert.Success("Task deleted successfully!");
      RefreshAll();
    });

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
    Dict.tasks[taskId].isCompleted = true;

    // Also send to backend at /todo/completed/<id>
    $.when(ajaxHandler.completeTask(taskId)).done(() => {
      Alert.Success("Task completed!");
      RefreshAll();
    }).fail(() => {
      Alert.Danger("Error!");
    });

    task_.toggleClass(" transform transition-all duration-350 delay-500 ease-in-out scale-150 blur-xl -translate-y-20");
    setTimeout(() => {
      task_.remove();
    }, 800);
  });



  $("#crud-modal").on('change', '#groups', function () {
    modalMainScreen.LoadTags(Dict, $(this).val());
  });


  //================================================================\\
  //========================= CRUD modal ===========================\\
  //================================================================\\

  // Create a new Task
  $('#Main-Screen').on("click", ".Group-Task-Add", function (e) {
    e.preventDefault();
    var gid = $(this).closest(".group-outer").attr("id");
    modalMainScreen.LoadGroups(Dict);
    modalMainScreen.LoadTags(Dict, gid);
    modalMainScreen.AddEditTask(null, Dict.groups[gid]);

    e.stopPropagation();
  });

  // My work at U in CRUD modal // Edit task  /// NULL -change the activate condition to prevent conflict with cancel button 
  $('#Main-Screen').on("click", ".Task-Edit", function (e) {
    e.preventDefault();
    modalMainScreen.LoadGroups(Dict);
    modalMainScreen.LoadTags(Dict);
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
  $('#crud-modal #submit-sec').on("click", function (e) {
    e.preventDefault();
    // Get id from honeypot, if id is empty string, it means it's a new task
    let submitValues = modalMainScreen.getSubmitValues();
    let groupId = submitValues["groupId"];
    let id = submitValues["id"];
    let title = submitValues["title"];
    let desc = submitValues["desc"];
    let tag = submitValues["tag"];
    let expired = submitValues["expired"];
    let color = submitValues["color"];
    let mode = submitValues["mode"];
    if (expired == null || expired == 0 || expired == "") expired = Date.now() - 100;
    console.log(mode, id, title, desc, tag, expired, color);
    // Before updatind Dict, check if tag is empty
    if (mode == "task") {
      if (id == "none") {
        if (new Date(expired).getTime() - Date.now() <= 0) { Alert.Danger("Cannot set due time in the past!"); return; }
        // Adding a new task to the tasks object within Dict
        let t = Dict.createTask(title, desc, tag, expired, 4);
        // Call ajaxHandler. at /todo/create with JSON data
        $.when(ajaxHandler.createTask(t.taskID, t.title, t.description, t.tag, t.deadline, t.points, t.isCompleted)).done(() => { RefreshAll(); Alert.Success("Task added successfully"); });
      }
      else {
        // Update Dict
        let t_old = Dict.tasks[id];
        if (new Date(expired).getTime() - Date.now() <= 0) { Alert.Danger("Cannot set due time in the past!"); return; }
        let t_new = Dict.createTask(title, desc, tag, expired, 4, id, t_old.isCompleted);
        Dict.updateTask(t_new.taskID, t_new);
        // Call ajaxHandler. at /todo/create with JSON data
        $.when(ajaxHandler.updateTask(t_new.taskID, t_new.title, t_new.description, t_new.tag, t_new.deadline, t_new.points, t_new.isCompleted)).done(() => { RefreshAll(); Alert.Success("Task updated successfully"); });
      }
    }


    if (mode == "group") {
      if (id == "none") {  /// Create a new group
        let g = Dict.createGroup(title, [], null, color, "", null);
        let dft = Dict.tags[g.def_tag]
        console.log(dft);
        $("#MMenu-Group-Section").append(MainMenu.GroupTemplates(g.groupID, g));
        /// Main Screen Add 
        renderGroupMainScreen($("#Main-Formatter").find("#Wrapper"), g, currentMode);
        $.when(
          ajaxHandler.addGroup(g.groupID, g.title, g.color, g.def_tag)).done( // add Group
            ajaxHandler.addTag(dft.tagID, dft.groupId, dft.title, dft.color) // add def_tag
          ).done(() => { RefreshAll(); Alert.Success("Group added successfully"); });
      }
      else { // Edit groups
        let g_old = Dict.groups[id];
        let g_new = Dict.createGroup(title, g_old.tags, g_old.def_tag, color, "", id);
        Dict.updateGroup(g_new.groupID, g_new);
        $("#MMenu-Group-Section").find("#" + g_new.groupID).find("#MMenu-Group-Title").text(g_new.title);
        $.when(ajaxHandler.updateGroup(g_new.groupID, g_new.title, g_new.color, g_new.def_tag)).done(() => { RefreshAll(); Alert.Success("Group updated successfully"); });
      }
    }


    if (mode == "tag") {
      if (id == "none") {  /// Create a new tags
        let t = Dict.createTag(title, color, groupId, true, true, true);
        Dict.groups[groupId].tags.push(t.tagID);
        addNewTagMainMenu($("#" + groupId).find("#MMenu-Tag-Section"), t.tagID, t);
        $.when(ajaxHandler.addTag(t.tagID, t.groupId, t.title, t.color)).done(() => { RefreshAll(); Alert.Success("Tag added successfully"); });
      }
      else { //Edit tags     
        let t_old = Dict.tags[id];
        let t_new = Dict.createTag(title, color, groupId, t_old.deletable, t_old.editable, t_old.display, id);
        Dict.updateTag(t_new.tagID, t_new);
        $("#MMenu-Group-Section").find("#" + id).find("#MMenu-Tag-Title").text(t_new.title);


        $.when(ajaxHandler.updateTag(t_new.tagID, t_new.groupId, t_new.title, t_new.color)).done(() => { RefreshAll(); Alert.Success("Tag updated successfully"); });

      }
    }

    console.log(Dict);
    //  RefreshAll();
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
        // Call ajaxHandler. at /todo/delete with JSON data
        $.when(ajaxHandler.deleteTask(id)).done(() => { RefreshAll(); Alert.Success("Task deleted successfully"); });
      }
    }

    if (mode == "group") {
      if (id != "none") {  /// Delete a new group
        Dict.removeGroup(id);
        $.when(ajaxHandler.deleteGroup(id)).done(() => { RefreshAll(); Alert.Success("Group deleted successfully"); });
      }
    }

    if (mode == "tag") {   ///  Delete a tag
      if (id != "none") {
        Dict.removeTag(id);
        $.when(ajaxHandler.deleteTag(id)).done(() => { RefreshAll(); Alert.Success("Tag deleted successfully"); });
      }
    }

    console.log("Deleted: " + id);
    modalMainScreen.hide();
  });




  // Add event click for redirect calendar
  $("#MMenu-Calendar").click(function () {
    window.location.href = "/calendar";
  })

  function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }


  // target elements with the "draggable" class
  interact('#add-draggable')
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrict({
          restriction: "#Main-Screen",
          elementRect: { top: 0, left: 0, bottom: 0.1, right: 0.1 },
          endOnly: true
        })
      ],
      // disable autoScroll
      autoScroll: false,

      listeners: {
        // call this function on every dragmove event
        move: dragMoveListener,
      }
    })
    .on('tap', function (event) {
      event.preventDefault();
      modalMainScreen.AddEditTask();
    })

  //$("#Calendar").load("calendar.html");

  // Secret place: Search algorithm: Use fuzzy search
  $('#MMenu-Search textarea').on('input', function () {
    let search = $(this).val();
    if (search.length == 0) {
      for (let task in Dict.tasks) {
        $(`#${task}`).show();
      }
      return;
    };
    // Populate Dict into list of strings
    let searchList = [];
    for (let task in Dict.tasks) {
      // Collect all the information of the task
      let tagId = Dict.tasks[task].tag;
      let groupId = Dict.tags[tagId].groupId;
      // Replace -, T, : with space on deadline
      let deadline = Dict.tasks[task].deadline.replace(/[-T:]/g, " ");
      searchList.push(Dict.tasks[task].title + " " + Dict.tasks[task].description + " " + Dict.tags[tagId].title + " " + Dict.groups[groupId].title + " " + deadline);
      // Init fuzzy search
      let uf = new uFuzzy({});
      let idxs = uf.filter(searchList, search);
      // If the search is found, show the task
      if (idxs.length > 0) {
        $(`#${task}`).show();
      }
      // If the search is not found, hide the task
      else {
        $(`#${task}`).hide();
      }
      searchList = [];
    }
  });
  // End of app.js
})
