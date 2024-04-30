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
import { MainMenu } from "./hmtlComponent.js";
import { Utils } from "./userData.js";
import { modalMainScreen } from "./CRUDmodal_handler.js";
import { ajaxHandler } from "./ajaxHandler.js";
import { LoadMainMenu, toggleHiddenMMenuGroup, addNewTagMainMenu } from "./mainMenuRenderer.js";
import { LoadMainScreen, renderGroupMainScreen } from "./mainScreenRenderer.js";


//================================================================\\
//=========================== Sample var =========================\\
//================================================================\\

var Dict = {}//Utils.getSampleData();

async function getData() {
  try {
    const loadedData = await ajaxHandler.LoadUserData();
    console.log('Data loaded successfully:', loadedData);
    Dict = loadedData;

  } catch (error) {
    console.log("Error loading data:", error);
  }
}

// Call getData
getData();



$(document).ready(function () {
  if (Dict == {}) console.log("Loading data from backend failed");
  let isDebugMode = false;
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
  //========================== Initialize ==========================\\
  //================================================================\\

  function RefreshMainScreen() {
    console.log("Refresh the mainscreen");
    $("#Main-Screen").empty();
    $("#MMenu-Group-Section").empty();
    console.log(Dict);
    LoadMainMenu(Dict);
    LoadMainScreen(Dict, currentMode);

  }

  function init() {
    currentMMenuTab = 0; // 0-today 2-calendar 3-garden
    currentMode = 0;
    RefreshMainScreen();
    updateMMenuTabIndicator();
    modalMainScreen.LoadTags(Dict);
    modalMainScreen.LoadGroups(Dict);
  }
  setTimeout(init, 300);

  //================================================================\\
  //=========================== Variables ==========================\\
  //================================================================\\
  if (isDebugMode) { console.log(Dict); };
  var currentMode = 0;
  var currentMMenuTab = 0;  // 0-today 1-cal 2-garden





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
  //=========================== Avatar Menu ========================\\
  //================================================================\\
  $("#Avatar-Menu-Click").click(function () {
    $("#Avatar-Menu").toggleClass("h-32 lg:h-44");
    $("#Avatar-Menu-Click").toggleClass("bg-primary-200");
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
      }
    }
  }

  $('#Main-Menu').on('click', '.MMenu-Primary-Section', function (e) {
    updateMMenuTabIndicator($(this));
  });

  //Add group
  $("#MMenu-Group-Add").click(function () {
    modalMainScreen.AddEditGroup();
  });

  /// Add tag
  $("#MMenu-Group-Section").on("click", ".MMenu-Tag-Add", function () {
    modalMainScreen.LoadGroups(Dict);
    modalMainScreen.AddEditTag();
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

  setInterval(clockTick, 1000);


  //Remove task
  $("#Main-Screen").on("click", "#Task-Cancel", function (e) {
    var task_ = $(this).closest(".task-outer");
    var taskId = task_.attr("id");

    // Send ajaxHandler. request to backend at /todo/delete to delete task
    ajaxHandler.deleteTask(taskId);

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
    ajaxHandler.completeTask(taskId);

    //console.log(Dict.completed);
    //console.log(Dict.tasks);

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
  // Create 

  $('#Main-Screen').on("click", ".Group-Task-Add", function (e) {
    e.preventDefault();
    var gid = $(this).closest(".group-outer").attr("id");
    modalMainScreen.LoadTags(Dict, gid);
    modalMainScreen.LoadGroups(Dict);
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

    console.log(mode, id, title, desc, tag, expired, color);
    // Before updatind Dict, check if tag is empty
    if (mode == "task") {
      if (id == "none") {
        // Adding a new task to the tasks object within Dict
        let t = Dict.createTask(title, desc, tag, expired, 4);
        // Call ajaxHandler. at /todo/create with JSON data
        ajaxHandler.createTask(t.taskID, t.title, t.desc, t.tag, t.expired, t.points);
      }
      else {
        // Update Dict
        let t = Dict.createTask(title, desc, tag, expired, 4, id);
        Dict.updateTask(t.taskID, t);
        // Call ajaxHandler. at /todo/create with JSON data
        ajaxHandler.updateTask(t.taskID, t.title, t.desc, t.tag, t.expired, t.points);
      }
    }


    if (mode == "group") {
      if (id == "none") {  /// Create a new group
        let g = Dict.createGroup(title, [], null, color, "");
        $("#MMenu-Group-Section").append(MainMenu.GroupTemplates(g.groupID, g));
        /// Main Screen Add 
        renderGroupMainScreen($("#Main-Formatter").find("#Wrapper"), g, currentMode);
        ajaxHandler.addGroup(g.groupID, g.title, g.color);
      }
      else { // Edit groups
        let g = Dict.createGroup(title, [], null, color, "", id);
        Dict.updateGroup(g.groupID, g);
        $("#MMenu-Group-Section").find("#" + g.groupID).find("#MMenu-Group-Title").text(g.title);
        ajaxHandler.updateGroup(g.groupID, g.title, g.color);
      }
    }


    if (mode == "tag") {
      if (id == "none") {  /// Create a new tags
        let t = Dict.createTag(title, color, groupId, true, true, true);
        Dict.groups[groupId].tags.push(t.tagID);
        addNewTagMainMenu($("#" + groupId).find("#MMenu-Tag-Section"), t.tagID, t);
        ajaxHandler.addTag(t.tagID, t.groupId, t.title, t.color);
      }
      else { //Edit tags
        let t = Dict.createTag(title, color, groupId, null, null, null, id);
        Dict.updateTag(t.tagID, t);
        $("#MMenu-Group-Section").find("#" + id).find("#MMenu-Tag-Title").text(t.title);
        ajaxHandler.updateTag(t.tagID, t.groupId, t.title, t.color);
        
      }
    }

    console.log(Dict);
    setTimeout( getData, 300);
    RefreshMainScreen();
    setTimeout(LoadMainMenu(Dict), 300);
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
        ajaxHandler.deleteTask(id);
      }
    }

    if (mode == "group") {
      if (id != "none") {  /// Delete a new group
        Dict.removeGroup(id);
        ajaxHandler.deleteGroup(id);
      }
    }

    if (mode == "tag") {   ///  Delete a tag
      if (id != "none") {
        Dict.removeTag(id);
        ajaxHandler.deleteTag(id);
      }
    }

    alert("Deleted: " + id);
    RefreshMainScreen();
    console.log(Dict);
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

  // End of app.js
})
