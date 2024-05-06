let treeStage = 30; // Initial stage of the tree
let treeCount = 100; // Initial count of trees planted
let lastAction = "fertilize"; // Variable to store the last action (water or fertilize)
let wateringsLeft = 50; // Variable to store the number of remaining waterings
let fertilizationsLeft = 50; // Variable to store the number of remaining fertilizations
let autoOption = false; // Variable to store the auto option state
let audioOption = true; // Variable to store the audio option state
let coins = 2414; // Variable to store the number of coins

// DONT STORE THIS IN THE DATABASE !!!!!!!!!!!!!!!!
let animationInProgress = false;
let prevSrc;
let autoInterval; // Variable to store the interval for auto watering and fertilizing
var autoButtontag = document.getElementById('autoButton');
var audioButtontag = document.getElementById('audioButton');
var backgroundAudio = document.getElementById('backgroundAudio');

document.addEventListener('DOMContentLoaded', function() {
  // Execute the functions when the DOM content is loaded
  updateWaterCount();
  updateFertilizerCount();
  updateButtonStates();
  updateTree();
  updateProgressBar();
  updateButtonStates();
  updateNumberofTrees(); 
  updateAutoOption();
  updateAudioOption();
  updateCoinsDisplay();
});

document.body.addEventListener('click', function ()  {backgroundAudio.play()});

function updateCoinsDisplay(){
  document.getElementById('CoinsOwnNumber').innerText = coins;
}

function updateAudioOption(click = false) {
  var audioButton = document.getElementById("audioButton");
  var audioElements = document.querySelectorAll('audio');
  if(click){
    audioOption = !audioOption;
  }
  if(audioOption){
    audioElements.forEach(function(audio) {
      // console.log(audio.muted);
      audio.muted = false;
      backgroundAudio.play();
    });
    audioButtontag.src = "../static/images/tree_game/AudioButton.png";
    // audioButton.innerText = "Pause Audio";
  } else { 
    audioElements.forEach(function(audio) {
      // console.log(audio.muted);
      audio.muted = true;
    });
    // backgroundAudio.pause();
    audioButtontag.src = "../static/images/tree_game/AudioButtonPressed.png";
    // audioButton.innerText = "Play Audio";
  }
}


function updateAutoOption(click = false) {
  if(click){
    autoOption = !autoOption;
  }
  if(autoOption){
    startAuto();
  } else { 
    stopAuto();
  }
}


function startAuto() {
  console.log(autoButtontag.src)
  autoInterval = setInterval(autoWaterAndFertilize, 500); // Call autoWaterAndFertilize every second
  autoButtontag.src = '../static/images/tree_game/AutoButtonLooping.gif';
}

function stopAuto() {
  clearInterval(autoInterval); // Stop the interval
  autoButtontag.src = "../static/images/tree_game/AutoButton.png";
}



function updateNumberofTrees() {
  document.getElementById(
    "treeCount"
  ).innerText = `${treeCount}`
}

function waterTree() {
  if (wateringsLeft > 0 && treeStage < 220) {
    if (lastAction === "fertilize") {
      treeStage += 3; // Increment tree stage by 3 if the last action was fertilization
    } else {
      treeStage++; // Increment tree stage by watering
    }
    lastAction = "water"; // Update last action
    updateTree();
    updateProgressBar();
    animate("water"); // Call the animation function for watering
    wateringsLeft--; // Decrease the number of remaining waterings
    updateButtonStates(); // Update button states
    updateWaterCount(); // Update water count display
    wiggleImage("waterbutton"); // Add wiggle animation to water button

    // Play watering audio
    var fertilizingAudio = document.getElementById("wateringAudio");
    fertilizingAudio.play();
  }
}

function fertilizeTree() {
  if (fertilizationsLeft > 0 && treeStage < 220) {
    treeStage += 2; // Increment tree stage by fertilizing
    lastAction = "fertilize"; // Update last action
    updateTree();
    updateProgressBar();
    animate("fertilize"); // Call the animation function for fertilizing
    fertilizationsLeft--; // Decrease the number of remaining fertilizations
    updateButtonStates(); // Update button states
    updateFertilizerCount(); // Update fertilizer count display
    wiggleImage("fertilizebutton"); // Add wiggle animation to fertilizer button

    // Play watering audio
    var fertilizingAudio = document.getElementById("fertilizingAudio");
    fertilizingAudio.play();
  }
}

function wiggleImage(buttonId) {
  const button = document.getElementById(buttonId);
  button.classList.add("animate-wiggle");
  setTimeout(() => {
    button.classList.remove("animate-wiggle");
  }, 500); // Remove wiggle class after 0.5 seconds
}

function updateProgressBar() {
  const progressBar = document.getElementById("progressBar");
  const percentage = document.getElementById("percentage");
  const progress = (treeStage / 220) * 100; // Calculate the percentage progress
  progressBar.style.width = `${progress}%`; // Set the width of the progress bar
  percentage.innerText = `${Math.round(progress)}%`; // Update the percentage display
}


function updateTree() {
  // Calculate the current stage of the tree
  let stage = Math.floor(treeStage / 20) + 1;
  if (stage === 12) stage = 1;

  // Set the tree image based on the current stage
  let newSrc = `../static/images/tree_game/tree${stage}.png`;

  if (prevSrc !== newSrc && !animationInProgress) {
    // Set flag to indicate animation is in progress
    animationInProgress = true;

    // Determine which audio to play based on the stage
    if (stage === 1) {
      document.getElementById("treeResetAudio").play();
    } else {
      document.getElementById("treeGrowthAudio").play();
    }

    setTimeout(() => {
      // Change tree image source after 1 second
      // console.log(
      //   `../static/images/tree_game/grown${stage - 1}.gif`
      // );
      document.getElementById("tree").src = `../static/images/tree_game/grown${stage - 1}.gif`;

      // Change tree image to the new source
      setTimeout(
        () => {
          document.getElementById("tree").src = newSrc;
          prevSrc = newSrc;
          // Reset flag after animation is complete
          animationInProgress = false;
        },
        stage === 1 ? 1200 : 500
      ); // 1500 milliseconds = 1.5 seconds, 500 milliseconds = 0.5 second
    }, 500); // 500 milliseconds = 0.5 second
  }

  // Check if treeStage reaches maximum
  if (treeStage >= 220) {
    treeStage = 0; // Reset tree stage
    treeCount++; // Increment tree count
    document.getElementById(
      "treeCount"
    ).innerText = `${treeCount}`; // Update tree count
    updateTree();
  }
}

function animate(action) {
  // Create a new image element for the animation
  const animation = document.createElement("img");
  // Set the source of the animation based on the action
  animation.src =
    action === "water"
      ? "../static/images/tree_game/watercan-full-watering.gif"
      : "../static/images/tree_game/fertilizer-anim-loop.gif";
  // Set its position and styling
  animation.style.position = "absolute";
  animation.style.cursor = "pointer"; // Adding cursor pointer
  animation.style.pointerEvents = "none"; // Adding pointer events none

  
  // Get the position and size of the tree image
  const treeImg = document.getElementById("tree");
  const treeRect = treeImg.getBoundingClientRect();
  const treeWidth = treeRect.width;
  const treeHeight = treeRect.height;
  const treeLeft = treeRect.left + window.scrollX;
  const treeTop = treeRect.top + window.scrollY;

  // Calculate random offsets around the tree image within the visible area of the screen
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const animationWidth = 100; // Adjust based on the width of your animation
  const animationHeight = 100; // Adjust based on the height of your animation
  const maxLeft = screenWidth - animationWidth;
  const maxTop = screenHeight - animationHeight;
  const randomLeft = Math.max(
    treeLeft,
    Math.min(
      treeLeft + treeWidth - animationWidth,
      Math.floor(Math.random() * maxLeft)
    )
  );
  const randomTop = Math.max(
    treeTop,
    Math.min(
      treeTop + treeHeight - animationHeight,
      Math.floor(Math.random() * maxTop)
    )
  );
  animation.style.left = `${randomLeft}px`;
  animation.style.top = `${randomTop}px`;
  animation.style.transform = "translate(-50%, -50%)";
  // Append it to the body
  document.body.appendChild(animation);

  // Start fading and flying animation
  let opacity = 1;
  let yOffset = 0;
  const animationInterval = setInterval(() => {
    // Reduce opacity
    opacity -= 0.05;
    animation.style.opacity = opacity;
    // Move slightly upwards
    yOffset -= 2;
    animation.style.top = `calc(${randomTop}px + ${yOffset}px)`;
    // If animation duration is reached or animation goes out of bounds, clear interval and remove animation
    if (opacity <= 0 || randomTop + yOffset < 0) {
      clearInterval(animationInterval);
      animation.remove();
    }
  }, 100); // Adjust the animation speed here
}

function updateButtonStates() {
  // Update button states based on remaining actions
  document.getElementById("waterbutton").disabled = wateringsLeft === 0;
  document.getElementById("fertilizebutton").disabled =
    fertilizationsLeft === 0;
}

function updateWaterCount() {
  // Update water count display
  document.getElementById("waterCount").innerText = wateringsLeft;
  if (wateringsLeft === 0) {
    document.getElementById("waterbutton").querySelector("img").src =
      "../static/images/tree_game/watercan-empty.png";
  }
}

function updateFertilizerCount() {
  // Update fertilizer count display
  document.getElementById("fertilizerCount").innerText = fertilizationsLeft;
  if (fertilizationsLeft === 0) {
    document.getElementById("fertilizebutton").querySelector("img").src =
      "../static/images/tree_game/fertilizer-notopen.png";
  }
}


function autoWaterAndFertilize() {
  console.log(wateringsLeft, lastAction);
  if (
    (wateringsLeft > 0 && lastAction === "fertilize") ||
    (wateringsLeft > 0 && fertilizationsLeft === 0)
  ) {
    waterTree(); // Water the tree if water is available
  } else if (
    (fertilizationsLeft > 0 && lastAction === "water") ||
    (fertilizationsLeft > 0 && wateringsLeft === 0)
  ) {
    fertilizeTree(); // Fertilize the tree if fertilizer is available
  } else {
    autoOption = false; // Update auto option state if ran out of resource
    stopAuto(); // Stop auto watering and fertilizing if both water and fertilizer are depleted
  }
}




/////////////////////////////////////// End Modal for the shop items ///////////////////////////////////////
// Set the shop modal element
const $shopModalEl = document.getElementById("ShopModal");

// Options for the shop modal
const shopModalOptions = {
  backdrop: "dynamic",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
  closable: true,
  onHide: () => {
    console.log("Shop modal is hidden");
  },
  onShow: () => {
    console.log("Shop modal is shown");
    document.getElementById("storebellAudio").play();
  },
  onToggle: () => {
    console.log("Shop modal has been toggled");
  },
};

// Create a new instance of the modal for the shop modal
const shopModal = new Modal($shopModalEl, shopModalOptions);

// Function to handle closing the shop modal when the close button is clicked
document
  .getElementById("btn-close-shop-modal")
  .addEventListener("click", () => {
    shopModal.hide();
  });

// Function to unhide the shop modal when the shop button is clicked
document.getElementById("shop").addEventListener("click", () => {
  shopModal.show();
});

// Function to center the shop modal
function centerShopModal() {
  $shopModalEl.style.top = "50%";
  $shopModalEl.style.left = "50%";
  $shopModalEl.style.transform = "translate(-50%, -50%)";
}

// Call the centerShopModal function when the window is resized
window.addEventListener("resize", centerShopModal);

// Call the centerShopModal function initially to center the modal
centerShopModal();

/////////////////////////////////////// End Modal for the shop items ///////////////////////////////////////



/////////////////////////////////////// Start Modal for the helps ///////////////////////////////////////
// Set the help modal element
const $helpModalEl = document.getElementById("HelpModal");

// Options for the help modal
const helpModalOptions = {
  backdrop: "dynamic",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
  closable: true,
  onHide: () => {
    console.log("Help modal is hidden");
    document.getElementById("helpButton").src="../static/images/tree_game/HelpButton.png";
  },
  onShow: () => {
    console.log("Help modal is shown");
    document.getElementById("helpButton").src="../static/images/tree_game/HelpButtonPressed.png";
  },
  onToggle: () => {
    console.log("Help modal has been toggled");
  },
};

// Create a new instance of the modal for the help modal
const helpModal = new Modal($helpModalEl, helpModalOptions);

// Function to handle closing the help modal when the close button is clicked
document
  .getElementById("btn-close-help-modal")
  .addEventListener("click", () => {
    helpModal.hide();
  });

// Function to unhide the help modal when the help button is clicked
document.getElementById("helpButton").addEventListener("click", () => {
  helpModal.show();
});

// Function to center the help modal
function centerHelpModal() {
  $helpModalEl.style.top = "50%";
  $helpModalEl.style.left = "50%";
  $helpModalEl.style.transform = "translate(-50%, -50%)";
}

// Call the centerHelpModal function when the window is resized
window.addEventListener("resize", centerHelpModal);

// Call the centerHelpModal function initially to center the modal
centerHelpModal();
/////////////////////////////////////// End Modal for the help ///////////////////////////////////////


// $(document).ready(function () {
//   // Constants
//   const MAX_TREE_LEVEL = 11;
//   const XP_PER_CLICK = 5;
//   const FERTILIZER_COST = 1;
//   const WATER_COST = 1;

//   // Variables
//   let treeCounter = 0;
//   let xp = 0;
//   let food = 999;
//   let water = 999;

//   // DOM elements
//   const treesContainer = $("#Trees");
//   const treeCountDisplay = $("#treeCount");
//   const fertilizerDisplay = $('#fertilizerCount');
//   const waterDisplay = $('#waterCount');
//   const xpDisplay = $('#xpCount');

//   // Initialize UI
//   fertilizerDisplay.text(food);
//   waterDisplay.text(water);
//   xpDisplay.text(`Xp: ${xp}/${xpForNextTree()}`);

//   // Event listener
//   treesContainer.on("click", ".currTree", function (event) {
//     if (food < FERTILIZER_COST || water < WATER_COST) return;

//     const $target = $(event.target);

//     if ($target.hasClass("currTree")) {
//       const currentSrc = $target.attr("src");
//       const match = currentSrc.match(/tree(\d+)\.gif/);

//       if (match && match[1]) {
//         const currentNumber = parseInt(match[1], 10);
//         const nextNumber = (currentNumber % MAX_TREE_LEVEL) + 1;

//         // Update resources
//         food -= FERTILIZER_COST;
//         water -= WATER_COST;
//         xp += 1;

//         // Update UI
//         fertilizerDisplay.text(food);
//         waterDisplay.text(water);
//         xpDisplay.text(`Xp: ${xp}/${xpForNextTree()}`);

//         // Grow tree
//         if (xp >= xpForNextTree()) {
//           xp -= xpForNextTree();
//           treeCounter++;
//           treeCountDisplay.text(`Number of Trees: ${treeCounter}`);
//           const newTree = $("<img />", {
//             src: `../static/images/tree${nextNumber}.gif`,
//             alt: "myTree",
//             class: "m-auto tree new-tree currTree"
//           });
//           $target.attr("src", `../static/images/tree${nextNumber}.gif`).after(newTree);
//         } else {
//           $target.attr("src", `../static/images/tree${nextNumber}.gif`);
//         }
//       }
//     }
//   });

//   // Function to calculate XP required for the next tree
//   function xpForNextTree() {
//     return treeCounter * 10 + 10;
//   }
// });