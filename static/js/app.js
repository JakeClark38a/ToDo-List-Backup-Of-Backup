// This is the main file for the app
// using jQuery
// Toggle cogwheel icon on click
$(document).ready(function () {
  const el1 = $("#dropMenu");
  const el1_trig = $("#dropMenuClick");

  el1_trig.click(function () {
    if (el1.hasClass("h-0")) {
      el1.removeClass("h-0").addClass("h-full");
    } else if (el1.hasClass("h-full")) {
      el1.removeClass("h-full").addClass("h-0");
    }
  });

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
  
  <div id="MMenu-Team-Proj-Group" class="MMenu-Team-Proj-Group"><!--block-->
    <!-- Greeting div, status centered -->
    <div class="flex justify-between items-center mx-2 *:mx-2">
        <div class="text-xl">Group name</div>

        <div id="MMenu-Team-Proj-AddTag" class="MMenu-Team-Proj-Add">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 12h14m-7 7V5" />
            </svg>
        </div>


    </div>
    <div id="MMenu-Tag-Section" class="MMenu-Team-Proj-GroupTag-List">
        <!--tag-->

    </div>
</div><!--eoblock-->

  
  `;

  $("#MMenu-Group-Add").click(function () {
    $("#MMenu-Group-Section").append(groupSectionTemplate);
  });

  $("#MMenu-Group-Section").on("click", "#MMenu-Team-Proj-AddTag", function () {
    var gr = $(this).closest("#MMenu-Group-Section");
    //console.log(index);
    gr.find("#MMenu-Tag-Section").append(tagSectionTemplate);
  });

  // Slide list of item left
  $("img.left").click(function () {
    // Set task container to the left
    // Create a new left div element
    var newDiv = $(
      '<div class="green task-container border-green">New Left Div Content</div>'
    );

    // Add the new div before the "nav" div
    $(".nav").after(newDiv);

    // Remove the last div that is not the "nav" div
    $(".lists > div:not(.nav):last").remove();
  });
  // Slide list of item right
  $("img.right").click(function () {
    // Set task container to the right
    // Create a new right div element
    var newDiv = $(
      '<div class="pink task-container border-pink">New Right Div Content</div>'
    );

    // Add the new div after the "nav" div
    $(".lists").append(newDiv);

    // Remove the first div that is not the "nav" div
    $(".lists > div:not(.nav):first").remove();
  });
});
// End of app.js
