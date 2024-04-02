let treeStage = 0; // Initial stage of the tree
let treeCount = 0; // Initial count of trees planted
let lastAction = ''; // Variable to store the last action (water or fertilize)
let wateringsLeft = 100; // Variable to store the number of remaining waterings
let fertilizationsLeft = 200; // Variable to store the number of remaining fertilizations



function waterTree() {
    if (wateringsLeft > 0 && treeStage < 220) {
        if (lastAction === 'fertilize') {
            treeStage += 3; // Increment tree stage by 3 if the last action was fertilization
        } else {
            treeStage++; // Increment tree stage by watering
        }
        lastAction = 'water'; // Update last action
        updateTree();
        updateProgressBar();
        animate('water'); // Call the animation function for watering
        wateringsLeft--; // Decrease the number of remaining waterings
        updateButtonStates(); // Update button states
        updateWaterCount(); // Update water count display
        wiggleImage('waterbutton'); // Add wiggle animation to water button

        // Play watering audio
        const wateringAudio = new Audio('../static/sounds/audio_watering.wav');
        wateringAudio.play();

    }
}


function fertilizeTree() {
    if (fertilizationsLeft > 0 && treeStage < 220) {
        treeStage += 2; // Increment tree stage by fertilizing
        lastAction = 'fertilize'; // Update last action
        updateTree();
        updateProgressBar();
        animate('fertilize'); // Call the animation function for fertilizing
        fertilizationsLeft--; // Decrease the number of remaining fertilizations
        updateButtonStates(); // Update button states
        updateFertilizerCount(); // Update fertilizer count display
        wiggleImage('fertilizebutton'); // Add wiggle animation to fertilizer button

        // Play watering audio
        const wateringAudio = new Audio('../static/sounds/dirt_fertilize.wav');
        wateringAudio.play();
    }
}

function wiggleImage(buttonId) {
    const button = document.getElementById(buttonId);
    button.classList.add('animate-wiggle');
    setTimeout(() => {
        button.classList.remove('animate-wiggle');
    }, 500); // Remove wiggle class after 0.5 seconds
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const percentage = document.getElementById('percentage');
    const progress = (treeStage / 220) * 100; // Calculate the percentage progress
    progressBar.style.width = `${progress}%`; // Set the width of the progress bar
    percentage.innerText = `${Math.round(progress)}%`; // Update the percentage display
}


function updateTree() {
    // Calculate the current stage of the tree
    let stage = Math.floor(treeStage / 20) + 1;
    if (stage === 12) stage = 11;
    // Set the tree image based on the current stage
    document.getElementById('tree').src = `../static/images/tree_game/tree${stage}.gif`;

    // Check if treeStage reaches maximum
    if (treeStage >= 220) {
        treeStage = 0; // Reset tree stage
        treeCount++; // Increment tree count
        document.getElementById('treeCount').innerText = `Number of Trees: ${treeCount}`; // Update tree count
    }
}

function animate(action) {
    // Create a new image element for the animation
    const animation = document.createElement('img');
    // Set the source of the animation based on the action
    animation.src = action === 'water' ? '../static/images/tree_game/watercan-full-watering.gif' : '../static/images/tree_game/fertilizer-anim-loop.gif';
    // Set its position and styling
    animation.style.position = 'absolute';

    // Get the position and size of the tree image
    const treeImg = document.getElementById('tree');
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
    const randomLeft = Math.max(treeLeft, Math.min(treeLeft + treeWidth - animationWidth, Math.floor(Math.random() * maxLeft)));
    const randomTop = Math.max(treeTop, Math.min(treeTop + treeHeight - animationHeight, Math.floor(Math.random() * maxTop)));
    animation.style.left = `${randomLeft}px`;
    animation.style.top = `${randomTop}px`;
    animation.style.transform = 'translate(-50%, -50%)';
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
    document.getElementById('waterbutton').disabled = wateringsLeft === 0;
    document.getElementById('fertilizebutton').disabled = fertilizationsLeft === 0;
}

function updateWaterCount() {
    // Update water count display
    document.getElementById('waterCount').innerText = wateringsLeft;
    if (wateringsLeft === 0) {
        document.getElementById('waterbutton').querySelector('img').src = '../static/images/tree_game/watercan-empty.png';
    }
}

function updateFertilizerCount() {
    // Update fertilizer count display
    document.getElementById('fertilizerCount').innerText = fertilizationsLeft;
    if (fertilizationsLeft === 0) {
        document.getElementById('fertilizebutton').querySelector('img').src = '../static/images/tree_game/fertilizer-notopen.png';
    }
}


var audio = document.getElementById("backgroundAudio");
var toggleButton = document.getElementById("toggleButton");

function toggleAudio() {
    if (audio.paused) {
        audio.play();
        toggleButton.textContent = "Pause Audio";
    } else {
        audio.pause();
        toggleButton.textContent = "Play Audio";
    }
}

