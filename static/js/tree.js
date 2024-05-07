let treeStage = 30; // Initial stage of the tree
let treeCount = 100; // Initial count of trees planted
let wateringsLeft = 50; // Variable to store the number of remaining waterings
let fertilizationsLeft = 50; // Variable to store the number of remaining fertilizations
let autoOption = false; // Variable to store the auto option state
let audioOption = true; // Variable to store the audio option state
let coins = 241400; // Variable to store the number of coins

// DONT STORE THIS IN THE DATABASE !!!!!!!!!!!!!!!!
let animationInProgress = false;
let lastAction = "water"; // Variable to store the last action (water or fertilize) default is "water"
let prevSrc;
let autoInterval; // Variable to store the interval for auto watering and fertilizing
var autoButtontag = document.getElementById('autoButton');
var audioButtontag = document.getElementById('audioButton');
var backgroundAudio = document.getElementById('backgroundAudio');

// Function to load data from the server
function loadData() {
  return new Promise(function (resolve, reject) {
    fetch('/tree/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // You can add any additional headers if required
      }
    })
      .then(response => response.json())
      .then(data => {
        // Update variables with data received from the server
        resolve(data);

        // Now, you can use the updated variables as needed
        // For example, update UI elements with the new data
      })
      .catch(error => {
        console.error('Error loading data:', error);
        // Handle error loading data
        reject(error);
      });
  });
}

// Function to send data to the server
function sendData() {
  console.log("test")
  const data = {
    treeStage: treeStage,
    treeCount: treeCount,
    wateringsLeft: wateringsLeft,
    fertilizationsLeft: fertilizationsLeft,
    autoOption: autoOption,
    audioOption: audioOption,
    coins: coins
  };
  fetch('/tree/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // You can add any additional headers if required
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(responseData => {
      // Handle response from the server if needed
    })
    .catch(error => {
      console.error('Error sending data:', error);
      // Handle error sending data
    });
}

function RefreshAll() {
  $.when(loadData()).done((data) => {

    treeStage = data["treeStage"];
    treeCount = data["treeCount"];
    wateringsLeft = data["wateringsLeft"];
    fertilizationsLeft = data["fertilizationsLeft"];
    autoOption = data["autoOption"];
    audioOption = data["audioOption"];
    coins = data["coins"];
    // console.log(treeStage);
    // console.log(treeCount);
    // console.log(wateringsLeft);
    // console.log(fertilizationsLeft);

    updateWaterCount();
    updateFertilizerCount();
    updateButtonStates();
    updateTree(load = true);
    updateProgressBar();
    updateButtonStates();
    updateNumberofTrees();
    updateAutoOption();
    updateAudioOption();
    updateCoinsDisplay();
    updateModal();
  });
}

$(document).ready(function () {
  //document.addEventListener('DOMContentLoaded', function() {
  // Execute the functions when the DOM content is loaded
  RefreshAll();
});

//// Refresh fuction 

document.body.addEventListener('click', sendData);

function updateCoinsDisplay() {
  document.getElementById('CoinsOwnNumber').innerText = coins;
}

function updateAudioOption(click = false) {
  var audioButton = document.getElementById("audioButton");
  var audioElements = document.querySelectorAll('audio');
  if (click) {
    audioOption = !audioOption;
  }
  if (audioOption) {
    audioElements.forEach(function (audio) {
      // console.log(audio.muted);
      audio.muted = false;
      backgroundAudio.play();
    });
    audioButtontag.src = "../static/images/tree_game/AudioButton.png";
    // audioButton.innerText = "Pause Audio";
  } else {
    audioElements.forEach(function (audio) {
      // console.log(audio.muted);
      audio.muted = true;
    });
    // backgroundAudio.pause();
    audioButtontag.src = "../static/images/tree_game/AudioButtonPressed.png";
    // audioButton.innerText = "Play Audio";
  }
}


function updateAutoOption(click = false) {
  if (click) {
    autoOption = !autoOption;
  }
  if (autoOption) {
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


function updateTree(load = false) {
  // Calculate the current stage of the tree
  let stage = Math.floor(treeStage / 20) + 1;
  if (stage === 12) stage = 1;

  // Set the tree image based on the current stage
  let newSrc = `../static/images/tree_game/tree${stage}.png`;

  // If loading the tree, there will be no weird thing
  if (load) {
    prevSrc = newSrc;
    document.getElementById("tree").src = `../static/images/tree_game/tree${stage}.png`
  }

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
    document.getElementById("helpButton").src = "../static/images/tree_game/HelpButton.png";
  },
  onShow: () => {
    console.log("Help modal is shown");
    document.getElementById("helpButton").src = "../static/images/tree_game/HelpButtonPressed.png";
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
