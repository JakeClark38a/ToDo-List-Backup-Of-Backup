// This is the main file for the app
// using jQuery
// Toggle cogwheel icon on click
$(document).ready(function () {
  /// HTML templates

  var tagSectionTemplate = `
  <div id="MMenu-Tag" class="MMenu-Tag flex items-center ml-3">
            <div class="h-full">
                <svg class="w-full h-full text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z" />
                </svg>
            </div>

            <div class="text-lg px-1 my-1 center">Tag name</div>

        </div>
  
  `;

  var groupSectionTemplate = `
  
  <div id="MMenu-Team-Proj-Group" class=""><!--block-->
    <!-- Greeting div, status centered -->
    <div class="flex justify-between items-center mx-2 *:mx-2">
        <div class="text-xl">Group name</div>

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

  
  `;

  var tagSelection = ` <div id="Tag-item" class="w-20 h-8 border-2 border-gray-400 rounded-lg text-center">Sample</div>`;

  // eo HTML templates
  // Variables
  var Dict = {
    // sample dict
    username: "User Name",
    userid: "User ID",
    groups: {
      gid001: {
        title: "Group Name",
        tag: ["tag1"],
      },
      gid002: {
        title: "Group Name",
        tag: ["tag2"],
      },
      gid003: {
        title: "Group Name",
        tag: ["tag3"],
      },
    },
    task: {
      id001: {
        title: "Meeting",
        description: "about making a website",
        tags: ["tag1", "tag2"],
        deadline: 62783,
        points: 4,
      },
      id002: {
        title: "Meeting",
        description: "about making a website",
        tags: ["tag1", "tag2"],
        deadline: 62783,
        points: 4,
      },
    },
    completed: {
      id003: {
        title: "Journaling",
        description: "about making a website",
        tags: ["tag1"],
        deadline: 62783,
        points: 5,
      },
    },
  };

  const el1 = $("#dropMenu");
  const el1_trig = $("#dropMenuClick");
  // eo Variables

  // website events

  el1_trig.click(function () {
    if (el1.hasClass("h-0")) {
      el1.removeClass("h-0").addClass("h-full");
    } else if (el1.hasClass("h-full")) {
      el1.removeClass("h-full").addClass("h-0");
    }
  });

  $("#MMenu-Group-Add").click(function () {
    $("#MMenu-Group-Section").append(groupSectionTemplate);
  });

  $("#MMenu-Group-Section").on("click", ".MMenu-Tag-Add", function () {
    $(this)
      .parent()
      .parent()
      .find("#MMenu-Tag-Section")
      .append(tagSectionTemplate);
  });

  function displayTask(task) {}

  // Import jQuery library
  function addNewTag(group_item, tag) {
    group_item.append(tagSectionTemplate);
  }

  function addNewGroup(group) {
    $("#MMenu-Group-Section").append(groupSectionTemplate);
  }

  function LoadGroups_Tag() {
    // Iterate over each group in Dict.groups
    for (var groupId in Dict.groups) {
      if (Dict.groups.hasOwnProperty(groupId)) {
        var group = Dict.groups[groupId];
        addNewGroup(group);
        console.log("Group: " + group.title);
        // Iterate over tags in the current group
        for (var j = 0; j < group.tag.length; j++) {
          addNewTag($("#MMenu-Tag-Section"), group.tag[j]);
        }
      }
    }
  }

  function LoadUser() {
    $("#Usernamedp").text(Dict.username);
    LoadGroups_Tag();
  }

  function initUser() {
    LoadUser();
  }
  initUser();

  // website events
});
// End of app.js

const close_button = document.getElementById("close-bt");
const cancle_button = document.getElementById("cancle-bt");
const modal_container = document.getElementById("modal-container");
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
  modal_container.classList.remove("opacity-0", "pointer-events-none");
  modal_container.classList.add("bg-opacity-50", "pointer-events-auto");
});
close_button.addEventListener("click", function () {
  modal_container.classList.remove("bg-opacity-50", "pointer-events-auto");
  modal_container.classList.add("opacity-0", "pointer-events-none");
});
cancle_button.addEventListener("click", function () {
  modal_container.classList.remove("bg-opacity-50", "pointer-events-auto");
  modal_container.classList.add("opacity-0", "pointer-events-none");
});
