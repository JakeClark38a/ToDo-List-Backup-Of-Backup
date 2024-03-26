$(document).ready(function () {
  //
  //
  //

  //================================================================\\
  //=========================== Sample var =========================\\
  //================================================================\\
  var Dict = {
    // sample dict
    username: "JakeClark",
    userid: "User ID",
    groups: {
      gid001: {
        title: "Do",
        tags: ["tag1"],
        color: "#7aa5cf",
        current_html: "",
      },
      gid002: {
        title: "Delegate",
        tags: ["tag2"],
        color: "#63c074",
        current_html: "",
      },
      gid003: {
        title: "Schedule",
        tags: ["tag3", "tag5"],
        color: "#ac7acf",
        current_html: "",
      },
      gid004: {
        title: "Later",
        tags: ["tag4"],
        color: "#c5e875",
        current_html: "",
      },
    },
    tasks: {
      id001: {
        title: "Meeting",
        description: "about making a website",
        tag: "tag1",
        deadline: 62783,
        points: 4,
      },
      id002: {
        title: "Crying",
        description: "about making a website",
        tag: "tag3",
        deadline: 62783,
        points: 4,
      },
      id004: {
        title: "Laughing",
        description: "about making a website",
        tag: "tag5",
        deadline: 62783,
        points: 4,
      },
    },
    completed: {
      id003: {
        title: "Journaling",
        description: "about making a website",
        tag: "tag1",
        deadline: 62783,
        points: 5,
      },
    },
  };

  var currentMode = 0;

  //
  //
  //

  //################################################### Templates #########################################################

  //================================================================\\
  //=========================== Main Menu ==========================\\
  //================================================================\\

  function MainMenuTagTempplate(id, tagName) {
    return (
      `
    
    <div id="` +id +`" class="MMenu-Tag flex items-center pl-8 cursor-pointer">
    <div class="h-full">
        <svg class="w-full h-full text-gray-800 dark:text-white" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z" />
        </svg>
    </div>

    <div class="text-lg px-1 my-1 center">` + tagName +`</div>
    <div class="MMenu-Tag-Edit mx-1">
    <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
</svg>
</div>
</div>

`
    );
  }

  function MainMenuGroupTemplates(id, group) {
    return (
      `
  
  <div id="` +id +`" class="MMenu-Group"><!--block-->
    <!-- Greeting div, status centered -->
        <div class="flex justify-between items-center pl-3 pr-1">

          <div class="MMenu-Toggle-Hidden flex items-center w-full">
            <div class="MMenu-Dropdown-Arrow">
            <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19 9-7 7-7-7"/>
          </svg>          
            </div>

                <div class="text-xl ml-2">` + group.title + `</div>
        </div>

        <div class="MMenu-Group-Edit mx-1">
        <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
      </svg>
      
      
        </div>
        <div class="MMenu-Tag-Add">
            <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M5 12h14m-7 7V5" />
            </svg>
        </div>


    </div>
    <div id="MMenu-Tag-Section" class="">
        <!--tag-->

    </div>
</div><!--eoblock-->

  
  `
    );
  }

  //================================================================\\
  //=========================== Main Screen ========================\\
  //================================================================\\

  function MainScreenTaskTemplate(id, task, mode = 0) {
    if (mode == 0) {
      return (
        ` 
    <div id="`+ id + `" class="task-outer">
      <div class=" rounded-lg h-20 lg:h-32 border-2 border-slate-700">

        <div class=" px-2 flex justify-between items-center border-b-2 border-slate-700">
              <div class="font-bold lg:text-2xl">` + task.title + `</div>

              <div class="flex items-center gap-2">
                      <div class="Task-Edit mx-1">
                      <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                    </svg>
                    </div>

              
              <div id="Task-Cancel" class="bg-red-500 rounded-full h-4 w-4 font-bold cursor-pointer"></div>
              </div>
        </div>

          <div class="p-2 flex justify-between items-center lg:h-24">
              <div class="text-center lg:text-xl">`+ task.description + `</div>
              <input id="Task-Destroyer" type="checkbox" class="bg-green-300 rounded-xl h-4 w-4 font-bold border-none cursor-pointer"></input>
          </div>
      </div>
  </div>

  `
      );
    } else if (mode == 1) {
      return (
        `
      <div id="`+ id + `" class="task-outer">
        <div class=" rounded-lg h-20 lg:h-32 border-2 border-slate-700">
  
            <div class=" px-2 flex justify-between items-center border-b-2 border-slate-700">
                <div class="font-bold lg:text-2xl">` + task.title + `</div>
                <div id="Task-Cancel" class="bg-red-500 rounded-full h-4 w-4 font-bold cursor-pointer"></div>
            </div>
  
            <div class="p-2 flex justify-between items-center lg:h-24">
                <div class="text-center lg:text-xl">`+ task.description + `</div>
                <input id="Task-Destroyer" type="checkbox" class="bg-green-300 rounded-xl h-4 w-4 font-bold border-none cursor-pointer"></input>
            </div>
          </div>
      </div>
  
      `
      );
    }
  }

  function MainScreenGroupTemplate(id, group, mode = 0) {
    if (mode == 0) {
      return (
        `
    <div id="` +id +`" class="">
      <div class="flex justify-between items-center px-3 ">
        <div id="Task-Group-Title" class="todobox-title">` + group.title +`</div>
        <div class="Group-Task-Add">
                <svg class="w-6 lg:w-7 h-6 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7 7V5" />
                </svg>
            </div>
        </div>
        <div id="Task-Section" class=" p-3 flex flex-col gap-3 overflow-y-auto overflow-x-hidden border-2 backdrop-blur-sm  w-64 h-64 rounded-xl md:w-72 md:h-72 lg:w-96 lg:h-96">
            <!--task here-->
        </div>
    </div>
    
    `
      );
    } else if (mode == 1) {
      return (
        `
      <!-- Item  -->

      <div id="` +id +`" data-carousel-item class="flex flex-col items-center overflow-x-hidden ease-in-out duration-700 z-0">
        <div id="Task-Group-Title" class="text-center">` + group.title +`</div>
          <div id="" class="Task-Section border-primary-100 w-80 h-96 border-2" >
          <!-- Contents -->
        
          </div>
      </div>
      `
      );
    }
  }

  function MainScreenFormatterTemplate(mode = 0) {
    if (mode == 0) {
      return `
    <div id="Main-Formatter" class="relative w-full">
      
        <div id="Wrapper" class="relative flex flex-wrap justify-center items-center gap-8 py-10 lg:px-36">
        <!--Group-->
        </div>
    </div>
    `;
    } else if (mode == 1) {
      return `
      <!-- Main List -->
      <div id="Main-Formatter" class="relative w-full bg-red-300" data-carousel="static">
          <!-- Carousel wrapper -->
          <div id="Wrapper" class="relative h-96 mt-[3vh] overflow-hidden">


          </div>
      </div>

      `;
    }
  }

  function FormmatterAddons(mode = 0) {
    if (mode == 0) {
    } else if (mode == 1) {
      return `
      
      <!-- Slider controls -->
      <div class="slider z-10">
          <button type="button"
              class="absolute top-1/2 z-30 flex items-start justify-center h-auto px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev>
              <span
                  class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="1.5" d="M5 1 1 5l4 4" />
                  </svg>
                  <span class="sr-only">Previous</span>
              </span>
          </button>
          <button type="button"
              class="absolute top-1/2 right-0 z-30 flex items-start justify-center h-auto px-4 cursor-pointer group focus:outline-none"
              data-carousel-next>
              <span
                  class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="1.5" d="m1 9 4-4-4-4" />
                  </svg>
                  <span class="sr-only">Next</span>
              </span>
          </button>
      </div>

      `;
    }
  }

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
  function getUuid() {
    // old uuid
    // return (
    //   "id_" +
    //   Math.random().toString(36).substring(2, 6) +
    //   Math.random().toString(36).substring(2, 6)
    // );
    // use uuidv4
    return "id_" + "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

  function randHexColor() {
    return "#" + ((Math.random() * 0xF0F0F0 << 0).toString(16).padStart(6, '0'));
  }

  //================================================================\\
  //=========================== Main Menu ==========================\\
  //================================================================\\

  $("#Main-Menu-Click").click(function () {
    $("#Main-Menu").toggleClass("h-[86vh]");
  });

  $("#MMenu-Group-Add").click(function () {
    var x = Dict.groups[getUuid()] = {
      title: "New Group",
      tags: [],
      color: randHexColor(),
    };
    /// Main Menu Add 
    $("#MMenu-Group-Section").append(MainMenuGroupTemplates(getUuid(), x));
    /// Main Screen Add 
    renderGroupMainScreen($("#Main-Formatter").find("#Wrapper"),x, currentMode);
  });

  $("#MMenu-Group-Section").on("click", ".MMenu-Tag-Add", function () {
    addNewTagMainMenu(
      $(this).parent().parent().find("#MMenu-Tag-Section"),
      "New tag"
    );
  });

  /// Edit Group
  $("#MMenu-Group-Section").on("click", ".MMenu-Group-Edit", function () {
    console.log($(this).closest(".MMenu-Group").attr("id"));
  });

  /// Edit Tag
  $("#MMenu-Group-Section").on("click", ".MMenu-Tag-Edit", function () {
    console.log($(this).closest(".MMenu-Tag").attr("id"));
  });

  function toggleHiddenMMenuGroup(group) {
    group.find("#MMenu-Tag-Section").toggle("hidden");
    group.find(".MMenu-Dropdown-Arrow").toggleClass("-rotate-90");
  }

  $("#MMenu-Group-Section").on("click", ".MMenu-Toggle-Hidden", function () {
    toggleHiddenMMenuGroup($(this).parent().parent());
  });

  function addNewTagMainMenu(group_html, tag) {
    //console.log(group_html);
    group_html.append(MainMenuTagTempplate(getUuid(), tag));
  }

  function addNewGroupMainMenu(unique_id, group) {
    $("#MMenu-Group-Section").append(
      MainMenuGroupTemplates(unique_id, group)
    );
    return $("#" + unique_id);
  }

  function LoadGroups_Tag() {
    // Iterate over each group in Dict.groups
    for (var groupId in Dict.groups) {
      if (Dict.groups.hasOwnProperty(groupId)) {
        var group = Dict.groups[groupId];
        var g = addNewGroupMainMenu(groupId, group);
        // console.log("Group: " + group.title);
        // Iterate over tags in the current group
        for (var j = 0; j < group.tags.length; j++) {
          addNewTagMainMenu(g.find("#MMenu-Tag-Section"), group.tags[j]);
        }
        toggleHiddenMMenuGroup(g);
      }
    }
  }

  //================================================================\\
  //========================== Main Screen =========================\\
  //================================================================\\

  function renderFormatterAddons(formatter_html, mode = 0) {
    formatter_html.append(FormmatterAddons(mode));
  }

  function renderTaskMainScreen(task_html, task, id, mode = 0) {
    task_html.append(MainScreenTaskTemplate(id, task, mode));
  }

  //Remove task
  $("#Main-Screen").on("click", "#Task-Cancel", function (e) {
    var task_ = $(this).closest(".task-outer");
    var taskId = task_.attr("id");
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

    //console.log(Dict.completed);
    //console.log(Dict.tasks);

    task_.toggleClass(" transform transition-all duration-350 delay-500 ease-in-out scale-150 blur-xl -translate-y-20");
    setTimeout(() => {
      task_.remove();
    }, 800);
  });
  

  function renderGroupMainScreen(group_html, group,unique_id, mode = 0) {
    var unique_id = getUuid();
    group_html.append(MainScreenGroupTemplate(unique_id, group, mode));
    $("#" + unique_id).find("#Task-Section").css({"background-color": randHexColor()});
    return $("#" + unique_id);
  }

  function LoadMainScreen() {
    // Also add Draggable button again
    $("#Main-Screen").append($(`
    <!-- add question action button here-->
    <div id="add-draggable"  class="z-40 absolute">
        <div  class="touch-none select-none">
            <div id="moveButton" 
                class="hover:w-12 hover:h-12 border-2 border-primary-100 absolute rounded-full w-12 h-12 bg-primary-200/35 backdrop-blur-sm p-2">
                <svg class="w-full h-full text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M5 12h14m-7 7V5" />
                </svg>
            </div>
        </div>
    </div>
    <!-- kết thúc phần nút -->
    `))
    var formatter_html = $("#Main-Screen").append(
      MainScreenFormatterTemplate()
    );
    // Assuming MainScreenGroupTemplate and MainScreenTaskTemplate functions are defined elsewhere
    var isFirst = false; 
    // Iterate over groups
    for (var groupId in Dict.groups) {
      if (Dict.groups.hasOwnProperty(groupId)) {
        var group = Dict.groups[groupId];
        var g = renderGroupMainScreen(
          $(formatter_html).find("#Main-Formatter").find("#Wrapper"),
          group,
          groupId,
          currentMode
        );
        var task_html = $(g).find("#Task-Section");
        // Iterate over tasks
        for (var taskId in Dict.tasks) {
          if (
            Dict.tasks.hasOwnProperty(taskId) &&
            group.tags.includes(Dict.tasks[taskId].tag)
          ) {
            // Pass task details to renderTaskMainScreen
            renderTaskMainScreen(
              task_html,
              Dict.tasks[taskId],
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
    $("#Main-Screen").empty();
    LoadMainScreen();
  }

  function LoadUser() {
    LoadGroups_Tag();
    RefreshMainScreen();
  }

  // Take all tags on Dict and put them in the "Select tag" dropdown
  (function LoadTags() {
    var tagArray = [];
    // Iterate over each group in Dict.groups
    for (var groupId in Dict.groups) {
        if (Dict.groups.hasOwnProperty(groupId)) {
            if (Dict.groups[groupId].hasOwnProperty("tags")){
                tagArray = [...tagArray, ...Dict.groups[groupId].tags]
            }
        }
    }
    tagArray.forEach(element => {
        let options = `<option value="${element}">${element}</option>`
        $("#crud-modal select#tags").append(options)
    });
  })();

  function initUser() {
    currentMode = 0;
    LoadUser();
  }
  initUser();

  function initweb() {
    document
      .querySelector("#Main-Menu")
      .style.setProperty("--paddingMainMen", "5");
  }
  initweb();

  //================================================================\\
  //================================================================\\
  //================================================================\\

  //================================================================\\
  //========================= CRUD modal ===========================\\
  //================================================================\\
    // Create 
    $('#Main-Screen').on("click", ".Group-Task-Add", function(e){
        e.preventDefault();
        // Clean modal first
        $('#crud-modal label[for="name"]').text("Title");
        $('#crud-modal label[for="description"]').text("Task Description");

        $('#crud-modal h3').text("Create Task");
        $('#crud-modal #name').val("");
        $('#crud-modal #description').val("");
        $('#crud-modal #tags option').removeAttr("selected");
        $('#crud-modal #todo-expired').val("");
        $('#crud-modal button[type="submit"]').html(`
        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
        Create`);
        $('#crud-modal input[type="checkbox"]').attr("id", `task_`);

        // Show modal
        modal.show();
        e.stopPropagation();
    });

    // My work at U in CRUD modal  /// NULL -change the activate condition to prevent conflict with cancel button 
    $('#Main-Screen').on("click", ".Task-Edit", function(e){

      let id = $(this).closest(".task-outer").attr("id");
      let title = Dict.tasks[id].title;
      let desc = Dict.tasks[id].description;
      let tag = Dict.tasks[id].tag;
      let expired = Dict.tasks[id].deadline;
      console.log(id, desc);
      // Clean up
      // Clean modal first
      $('#crud-modal label[for="name"]').text("Title");
      $('#crud-modal label[for="description"]').text("Task Description");
      // Change task header
      $('#crud-modal h3').text("Edit Task");
      // Change input to task details
      $('#crud-modal #name').val(title);
      $('#crud-modal #description').val(desc);
      $('#crud-modal').find(`#tags option[value="${tag}"]`).attr("selected", title);
      $('#crud-modal #todo-expired').val(expired);
      $('#crud-modal button[type="submit"]').text("Edit");
      // Change honeypot to id
      $('#crud-modal input[type="checkbox"]').attr("id", `task_${id}`);
      // Get current date
      let current_date = new Date();
      // Get date input
      let date_element = $('#crud-modal #todo-expired');
      // Get input date
      let input_date = new Date(date_element.val());
      // If input date is less than current date, show alert
      if (input_date < current_date){
          date_element.css("border", "2px solid red");
      }
      else {
          date_element.css("border", "2px solid green");
      }
      // Show modal
      modal.show();
      e.stopPropagation();
  })

  // My work at adding limitation on typing Create - Edit modal
  $("#crud-modal").on("input", "#name, #description", function(){
      // Take current input length
      let input_length = $(this).val().length;
      // Take input limitation
      let input_limit = $(this).attr("maxlength");
      // If length > 0, show this length and limitation at the same place in label
      if (input_length > 0){
          // Update length and limit
          $(this).prev().text(function(e, text){
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
          $(this).prev().text(function(e, text){
              let label_content = text.split(" ");
              // Remove old length and limit (element that starts with "(" and ends with ")")
              label_content = label_content.filter(e => !e.startsWith("(") && !e.endsWith(")"));
              // Join just title
              return label_content.join(" ");
          })
      }
  })
  // And also checking for expired date
  $("#crud-modal").on("input", "#todo-expired", function(){
      // Get current date
      let current_date = new Date();
      // Get input date
      let input_date = new Date($(this).val());
      // If input date is less than current date, show alert
      if (input_date < current_date){
          $(this).css("border", "2px solid red");
      }
      else {
          $(this).css("border", "2px solid green");
      }
  })

  // Submit button
  $('#crud-modal form').on("submit", function(e){
      e.preventDefault();
      // Get id from honeypot, if id is empty string, it means it's a new task
      let id = $('#crud-modal input[type="checkbox"]').attr("id").split("_")[1];
      // Get all input
      let title = $('#crud-modal #name').val();
      let desc = $('#crud-modal #description').val();
      let tag = $('#crud-modal #tags').val();
      let expired = $('#crud-modal #todo-expired').val();
      console.log(id, title, desc, tag, expired);
      // Before updatind Dict, check if tag is empty
      if (id == ""){
          // Adding a new task to the tasks object within Dict
          Dict.tasks[getUuid()] = {
              title: title,
              description: desc,
              tag: tag,
              deadline: expired,
              points: 4,
          };
      }
      else {
          // Update Dict
          Dict.tasks[id].title = title;
          Dict.tasks[id].description = desc;
          Dict.tasks[id].tag = tag;
          Dict.tasks[id].deadline = expired;
      }
      alert("Submitted");
      RefreshMainScreen();
      modal.hide();
      // window.location = window.location;
  })

  // When user clicked at list item, it will add tag to the task and also close dropdown
})
// End of app.js
