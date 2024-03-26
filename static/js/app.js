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
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z" />
        </svg>
    </div>

    <div class="text-lg px-1 my-1 center">` + tagName +`</div>

</div>

`
    );
  }

  function MainMenuGroupTemplates(id, group) {
    return (
      `
  
  <div id="` +id +`" class="MMenu-Group"><!--block-->
    <!-- Greeting div, status centered -->
    <div class="flex justify-between items-center px-3">
        <div class="MMenu-Toggle-Hidden flex items-center w-full">
            <div class="MMenu-Dropdown-Arrow">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
          </svg>          
            </div>

                <div class="text-xl  ml-2">` + group.title + `</div>
        </div>
        <div class="MMenu-Tag-Add">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
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
        <div id="Task-Group-Title" class="todobox-title">` + group.title +`</div>
        <div id="Task-Section" class=" p-3 flex flex-col gap-3 overflow-y-auto overflow-x-hidden border-t-8 border-b-4 border-l-2 border-r-2 w-64 h-64 rounded-xl md:w-72 md:h-72 lg:w-96 lg:h-96">
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
                          stroke-width="2" d="M5 1 1 5l4 4" />
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
                          stroke-width="2" d="m1 9 4-4-4-4" />
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
    return (
      "id_" +
      Math.random().toString(36).substring(2, 6) +
      Math.random().toString(36).substring(2, 6)
    );
  }

  function randHexColor() {
    return "#" + ((Math.random() * 0xF0F0F0 << 0).toString(16).padStart(6, '0'));
  }

  //================================================================\\
  //=========================== Main Menu ==========================\\
  //================================================================\\

  $("#Main-Menu-Click").click(function () {
    $("#Main-Menu").toggleClass("h-[90vh]");
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
  $("#Main-Screen").on("click", "#Task-Cancel", function () {
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

  // website events

  const close_button = document.getElementById("close-bt");
  const cancle_button = document.getElementById("cancle-bt");
  const modal_container = document.getElementById("modal-container");
  const addtask_btn = document.getElementById("add-task-bt");
  const addtag_btn = document.getElementById("add-tag-bt");
  //  thiết lập chiều dài bằng chiều rộng khi chiều rộng là biến thiên
  // đặt id-a0001 là biến x

  const m = document.getElementById("a0002");
  const n = m.clientHeight;
  document.getElementById("a0002").style.width = n + "px";
  document.getElementById("a0002").style.height = n + "px";
  var button = document.getElementById("moveButton");

  // Biến lưu trữ vị trí chuột khi bắt đầu di chuyển
  var startX, startY;

  // Biến lưu trữ vị trí ban đầu của nút
  var startLeft, startTop;

  function close() {
    modal_container.classList.remove("bg-opacity-50", "pointer-events-auto");
    modal_container.classList.add("opacity-0", "pointer-events-none");
  }

  function open() {
    modal_container.classList.remove("opacity-0", "pointer-events-none");
    modal_container.classList.add("bg-opacity-50", "pointer-events-auto");
  }

  addtask_btn.addEventListener("click", function () {
    var title = document.getElementById("Add-Task-Title");
    var desc = document.getElementById("Add-Task-Desc");
    var tag_ = document.getElementById("add-tag-bt").innerText;
    if (title.value == "" || tag_ == "") {
      console.log("Empty task is not valid");
      return;
    }
    console.log(title.value, desc.value, tag_);
    // Adding a new task to the tasks object within Dict
    Dict.tasks[getUuid()] = {
      title: title.value,
      description: desc.value,
      tag: tag_,
      deadline: 62783,
      points: 4,
    };
    console.log(Dict.tasks);
    // Assuming RefreshMainScreen function is properly defined and accessible
    RefreshMainScreen();
    close();
  });

  // Bắt sự kiện khi chuột được nhấn xuống trên nút
  button.addEventListener("mousedown", function (e) {
    // Lưu trữ vị trí chuột khi bắt đầu di chuyển
    startX = e.clientX;
    startY = e.clientY;

    // Lưu trữ vị trí ban đầu của nút
    startLeft = button.offsetLeft;
    startTop = button.offsetTop;

    // Bắt sự kiện khi di chuyển chuột
    document.addEventListener("mousemove", onMouseMove);
  });

  // Bắt sự kiện khi chuột được nhả ra
  document.addEventListener("mouseup", function () {
    // Hủy bỏ sự kiện di chuyển chuột
    document.removeEventListener("mousemove", onMouseMove);
  });

  // Hàm xử lý sự kiện di chuyển chuột
  function onMouseMove(e) {
    // Tính toán khoảng cách di chuyển
    var deltaX = e.clientX - startX;
    var deltaY = e.clientY - startY;

    // Cập nhật vị trí mới của nút
    button.style.left = startLeft + deltaX + "px";
    button.style.top = startTop + deltaY + "px";
  }

  // Bắt sự kiện khi nút được nhấn
  button.addEventListener("click", function (e) {
    // Kiểm tra xem nút có đang di chuyển hay không
    if (Math.abs(startX - e.clientX) > 5 || Math.abs(startY - e.clientY) > 5) {
      return; // Nếu nút đang di chuyển, không thực hiện hành động click
    }
    open(e);
  });
  close_button.addEventListener("click", close);
  cancle_button.addEventListener("click", close);

  // My work at adding tags
  // When user click at the add tag button, dropdown will change content
  $("#add-tag-bt").click(function () {
    // Empty ul
    $("#dropdown ul").empty();
    // With each tag in nav bar
    $(".text-lg.px-1.my-1.center").each(function () {
      // Append list into ul
      $("#dropdown ul").append(`
    <li>
    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">${$(
        this
      ).text()}</a>
    </li>
    `);
    });
  });

  // When user clicked at list item, it will add tag to the task and also close dropdown
  $("#dropdown ul").on("click", "li", function () {
    // Add tag to the task
    $("#add-tag-bt").text($(this).text());
    // Close dropdown
    $("#dropdown").removeClass("block");
    $("#dropdown").addClass("hidden");
  });

  $("#Calendar-Container").hide();
  $("#Main-Screen").show();
  $("#MMenu-Calendar").click(function () {
    $("#Calendar-Container").show();
    $("#Main-Screen").hide();
  });
  $("#MMenu-Today").click(function () {
    $("#Calendar-Container").hide();
    $("#Main-Screen").show();
  });
});
// End of app.js