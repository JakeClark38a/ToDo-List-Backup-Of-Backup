//=====================================================================\\
/* 
NOTICE:
This file handles all the actions that are related to the main content of the page
This file handle:
  - Main content include : group, task, tags for team
  - CRUD content for team
  - Render out mainPage content for Team tab

*/
//=====================================================================\\

// Templates 
import { MainMenu, MainScreen } from "./hmtlComponent.js";
import { Utils } from "./userData.js";
import { modalMainScreen } from "./CRUDmodal_handler.js";
import { ajaxHandler } from "./ajaxHandler.js";
import { LoadMainMenu, toggleHiddenMMenuGroup, addNewTagMainMenu } from "./mainMenuRenderer.js";
import { LoadMainScreen, renderGroupMainScreen } from "./mainScreenRenderer.js";
import { Alert } from "./alertMsg.js";
import { lastVisitedTeam } from "./list.js";
import { updateMMenuTabIndicator } from "./updateMMenu.js";

//================================================================\\
//=========================== Variables ==========================\\
//================================================================\\
var Dict = Utils.getSampleData();
let isDebugMode = false;
var currentMode = 0; // 0-grid 1-any
var currentMMenuTab = 0;  // 0-today 1-cal 2-garden
var team_id = "tid001"; // Default team id

var UsersList = {
  id10458: {
    name: "Âm",
    img: "https://source.unsplash.com/random/1920x1080?nature",
    user_id: "id10458",

  },
  id10459: {
    name: "Binh",
    img: "https://source.unsplash.com/random/1920x1080?nature",
    user_id: "id10459",
  },
}


function getData(team_id) {
  return new Promise(function (resolve) {
    $.when(ajaxHandler.LoadTeamData(team_id),
      ajaxHandler.team_LoadUserList(team_id),
      ajaxHandler.LoadUser(),
    ).done(function (data, userslist, userdata) {
      Dict = data;
      var temp = {};
      for (let idx in userslist) {
        temp[userslist[idx].userid] = {};
        temp[userslist[idx].userid].user_id = userslist[idx].userid
        temp[userslist[idx].userid].name = userslist[idx].name;
        temp[userslist[idx].userid].img = userslist[idx].image ? userslist[idx].image : "../static/images/profile.jpg";
      }
      UsersList = temp;
      Dict.points = userdata.points;

      console.log("[5] Data is loaded to appTeam.js: ");
      console.log(Dict);
      console.log(UsersList);
      //Alert.Success("Data loaded successfully!");
      $("#Toggle-DarkMode").prop('checked', Dict.darkmode);
      $("html").toggleClass("dark", Dict.darkmode);

      resolve(Dict, UsersList);
    }).fail(() => {
      $("#CreateAndJoinTeam").show();
      $("#Main-Section").hide();

      $("#Team-Code-Dis").hide();
      $('#MMenu-Group-Section').hide();
      $('#MMenu-Group-Add').hide();
      $("#UserList-Toggle").hide();
      $('#Team-Menu-Click').hide();
      Alert.Danger("Team not exist or you have been banned!", 7000);
    });
  });
}

function onVisitTeam() {
  $("#CreateAndJoinTeam").hide();
  $("#Main-Section").show();

  $("#Team-Code-Dis").text(Dict.team_code);
  $("#Team-Code-Dis").show();
  $('#MMenu-Group-Section').show();
  $('#MMenu-Group-Add').show();
  $("#UserList-Toggle").show();
  $('#Team-Menu-Click').show();

  $("#Main-Screen").empty();
  $("#MMenu-Group-Section").empty();

  init();
}


function RefreshAll(team_id) {
  $.when(getData(team_id)).done(function (data) {
    Dict = data;
    console.log("[7] Refresh the mainscreen");
    console.log(Dict);

    $("#Team-Code-Dis").text(Dict.team_code);
    $("#Team-Code-Dis").show();
    $('#MMenu-Group-Section').show();
    $('#MMenu-Group-Add').show();
    $("#UserList-Toggle").show();
    $('#Team-Menu-Click').show();

    $("#Main-Screen").empty();
    $("#MMenu-Group-Section").empty();
    $("#PMenu-Display-Coin").text("Coins: " + Dict.points);

    LoadMainMenu(Dict);
    LoadMainScreen(Dict, currentMode);
    refreshUserList();
    modalMainScreen.LoadTags(Dict);
    modalMainScreen.LoadGroups(Dict);

  });
}

function init() {
  currentMMenuTab = 0; // 0-today 2-calendar 3-garden
  currentMode = 0;
  if (!lastVisitedTeam) return;
  team_id = lastVisitedTeam;
  RefreshAll(team_id); // Refresh
}


function userlist(name, img, user_id) {
  return (
    `
    <div id="`+ user_id + `" class="user_list_create p-2 flex h-12 w-full md:w-4/6 lg:w-full bg-gray-300/50  my-1  border-2 rounded-lg gap-3">
    <div class="flex-none self-center w-8 h-8 ">
        <img class=" w-full h-full  rounded-full" src="`+ img + `" alt="avtr">
    </div>
    <div class="flex-1 self-center  mr-2 overflow-hidden truncate w-20">
        <p id="" class="dark:text-gray-500 text-black text-lg text-nowrap">`+ name + `</p>
    </div>
    <div class=" flex-none  justify-end self-center  ">
    <button id="ban-user"  
    class="banuser hidden bg-white inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-900 rounded-lg
          hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">        
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
      </svg>                                                      
    </button>                                                                                                                                                                                    
    </div>
</div>
    `
  )
};

function refreshUserList() {
  let userList = $(' #ListUser');
  userList.empty();
  for (let key in UsersList) {
    userList.append(userlist(UsersList[key].name + ((Dict.admin == UsersList[key].user_id) ? " (Leader)" : ""), UsersList[key].img, UsersList[key].user_id));
  }
}


$("#Team-Menu-Click").on('click', () => {
  $("#CreateAndJoinTeam").show();
  $("#Main-Section").hide();

  $("#Team-Code-Dis").hide();
  $('#MMenu-Group-Section').hide();
  $('#MMenu-Group-Add').hide();
  $("#UserList-Toggle").hide();
  $('#Team-Menu-Click').hide();
});

$(document).ready(function () {
  //================================================================\\
  //========================== Initialize ==========================\\
  //================================================================\\

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
  $("#Team-Code-Dis").on("click", function () {
    let code = $(this).text();
    navigator.clipboard.writeText(code);
    Alert.Success("Code copied successfully!", 1500);
  });
  //================================================================\\
  //=========================== User list ========================\\
  //================================================================\\
  $('#NavBar #UserList-Toggle').on('click', () => {
    $('#Main-Screen').toggleClass("hidden xl:inline-block");
    $('#UserList-Section').toggleClass("hidden",);
  });

  function banUser(user_id) {
    console.log(user_id);
    delete UsersList[user_id];
    refreshUserList();
  }
  refreshUserList();
  $('#UserList-Section').on('click', '.banuser', function () {
    let user_id = $(this).closest(".user_list_create").attr('id');
    console.log(user_id);
    banUser(user_id);
  });

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
    $.when(ajaxHandler.team_deleteTask(team_id, taskId)).done(()=>{
      Alert.Success("Task deleted successfully!");
      RefreshAll(team_id);
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
    $.when(ajaxHandler.team_completeTask(team_id, taskId)).done(()=>{
      Alert.Success("Task Completed!");
      RefreshAll(team_id);
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
        $.when(ajaxHandler.team_createTask(team_id, t.taskID, t.title, t.description, t.tag, t.deadline, t.points, t.isCompleted)).done(() => { RefreshAll(team_id); Alert.Success("Task added successfully"); });
      }
      else {
        // Update Dict
        let t_old = Dict.tasks[id];
        if (new Date(expired).getTime() - Date.now() <= 0) { Alert.Danger("Cannot set due time in the past!"); return; }
        let t_new = Dict.createTask(title, desc, tag, expired, 4, id, t_old.isCompleted);
        Dict.updateTask(t_new.taskID, t_new);
        // Call ajaxHandler. at /todo/create with JSON data
        $.when(ajaxHandler.team_updateTask(team_id, t_new.taskID, t_new.title, t_new.description, t_new.tag, t_new.deadline, t_new.points, t_new.isCompleted)).done(() => { RefreshAll(team_id); Alert.Success("Task updated successfully"); });
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
          ajaxHandler.team_addGroup(team_id, g.groupID, g.title, g.color, g.def_tag)).done( // add Group
            ajaxHandler.team_addTag(team_id, dft.tagID, dft.groupId, dft.title, dft.color) // add def_tag
          ).done(() => { RefreshAll(team_id); Alert.Success("Group added successfully"); });
      }
      else { // Edit groups
        let g_old = Dict.groups[id];
        let g_new = Dict.createGroup(title, g_old.tags, g_old.def_tag, color, "", id);
        Dict.updateGroup(g_new.groupID, g_new);
        $("#MMenu-Group-Section").find("#" + g_new.groupID).find("#MMenu-Group-Title").text(g_new.title);
        $.when(ajaxHandler.team_updateGroup(team_id, g_new.groupID, g_new.title, g_new.color, g_new.def_tag)).done(() => { RefreshAll(team_id); Alert.Success("Group updated successfully"); });
      }
    }


    if (mode == "tag") {
      if (id == "none") {  /// Create a new tags
        let t = Dict.createTag(title, color, groupId, true, true, true);
        Dict.groups[groupId].tags.push(t.tagID);
        addNewTagMainMenu($("#" + groupId).find("#MMenu-Tag-Section"), t.tagID, t);
        $.when(ajaxHandler.team_addTag(team_id, t.tagID, t.groupId, t.title, t.color)).done(() => { RefreshAll(team_id); Alert.Success("Tag added successfully"); });
      }
      else { //Edit tags     
        let t_old = Dict.tags[id];
        let t_new = Dict.createTag(title, color, groupId, t_old.deletable, t_old.editable, t_old.display, id);
        Dict.updateTag(t_new.tagID, t_new);
        $("#MMenu-Group-Section").find("#" + id).find("#MMenu-Tag-Title").text(t_new.title);

        $.when(ajaxHandler.team_updateTag(team_id, t_new.tagID, t_new.groupId, t_new.title, t_new.color)).done(() => { RefreshAll(team_id); Alert.Success("Tag updated successfully"); });

      }
    }

    console.log(Dict);
    // RefreshAll(team_id);
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
        $.when(ajaxHandler.team_deleteTask(team_id, id)).done(() => { RefreshAll(team_id); Alert.Success("Task deleted successfully"); });
      }
    }

    if (mode == "group") {
      if (id != "none") {  /// Delete a new group
        Dict.removeGroup(id);
        $.when(ajaxHandler.team_deleteGroup(team_id, id)).done(() => { RefreshAll(team_id); Alert.Success("Group deleted successfully"); });
      }
    }

    if (mode == "tag") {   ///  Delete a tag
      if (id != "none") {
        Dict.removeTag(id);
        $.when(ajaxHandler.team_deleteTag(team_id, id)).done(() => { RefreshAll(team_id); Alert.Success("Tag deleted successfully"); });
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

export { onVisitTeam };