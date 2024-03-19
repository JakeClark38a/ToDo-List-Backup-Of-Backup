//Update: js
const el1 = document.getElementById("dropMenu");
const el1_trig = document.getElementById("dropMenuClick");
el1_trig.addEventListener("click", () => {
  if (el1.classList.contains("h-0")) {
    el1.classList.remove("h-0");
    el1.classList.add("h-full");
  } else if (el1.classList.contains("h-full")) {
    el1.classList.remove("h-full");
    el1.classList.add("h-0");
  }
});

const el2 = document.getElementById("dropSubMenuInfo");
const el2_trig = document.getElementById("dropSubMenuInfoClick");
el2_trig.addEventListener("click", () => {
  if (el2.classList.contains("h-0")) {
    el2.classList.remove("h-0");
    el2.classList.add("h-full");
  } else if (el2.classList.contains("h-full")) {
    el2.classList.remove("h-full");
    el2.classList.add("h-0");
  }
});

const el3 = document.getElementById("dropPersonal");
const el3_trig = document.getElementById("dropPersonalClick");
el3_trig.addEventListener("click", () => {
  if (el3.classList.contains("h-0")) {
    el3.classList.remove("h-0");
    el3.classList.add("h-full");
  } else if (el3.classList.contains("h-full")) {
    el3.classList.remove("h-full");
    el3.classList.add("h-0");
  }
});

/*
// This is the main file for the app
// using jQuery
// Toggle cogwheel icon on click
$(document).ready(function () {
  $("#dropMenuTrig").click(function () {});

  $(".cogwheel").click(function () {
    // A popup will appear with the settings
  });
  // Hide the settings popup when the user clicks outside of it
  // Later...

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
*/
