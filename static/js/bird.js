var birdCount = 0; // Initial number of birds

// Array of animation GIFs
var animations = [
  "../static/images/bird/flying.gif",
  "../static/images/bird/stop_flying.gif",
  "../static/images/bird/start_flying.gif",
  "../static/images/bird/idle.gif",
  "../static/images/bird/walking-forward.gif",
];

document.addEventListener('DOMContentLoaded', function () {
  // Call addBirdContainers initially
  addBirdContainers();
});

// Function to fly the bird to a random location
function flyToRandomLocation(bird, birdContainer) {
  // Set new random position
  var newX = Math.random() * (window.innerWidth - bird.offsetWidth);
  var newY = Math.random() * (window.innerHeight - bird.offsetHeight);

  // Check if the new x-coordinate is lower than the current one
  var isFlipped = newX < parseFloat(birdContainer.style.left);

  // Apply new position
  birdContainer.style.transition = "top 2s linear, left 2s linear"; // Smooth animation over 2 seconds
  birdContainer.style.left = newX + "px";
  birdContainer.style.top = newY + "px";

  // Change bird animation to flying and flip if necessary
  bird.src = isFlipped ? "../static/images/bird/flying-flipped.gif" : "../static/images/bird/flying.gif";

  // After animation completes, change animation to idle
  setTimeout(function () {
    bird.src = isFlipped ? "../static/images/bird/idle-flipped.gif" : "../static/images/bird/idle.gif";

    // Wait for a while and then fly to another random location
    setTimeout(function () {
      flyToRandomLocation(bird, birdContainer);
    }, 2000); // Change location every 2 seconds
  }, 2000); // Wait for 2 seconds before changing animation to idle
}

// Function to start flying
function startFlying(bird) {
  bird.src = animations[0]; // "flying.gif"
}



// Function to add bird containers
function addBirdContainers() {
  // Load bird containers based on the initial birdCount
  for (let i = 0; i < birdCount; i++) {
    // console.log("Adding bird container");
    addBirdContainer();
  }
}


function addBirdContainer() {
  if (birdCount >= 5) return;
  var treeContainer = document.querySelector('.tree-container');
  var birdContainer = document.createElement('div');
  birdContainer.id = 'bird-container';
  treeContainer.appendChild(birdContainer);

  var bird = document.createElement('img');
  bird.id = 'bird';
  bird.src = '../static/images/bird/idle.gif';
  birdContainer.appendChild(bird);

  // Function to handle the click event on bird container
  function handleClickOnBird() {
    // Change bird animation to hit.gif
    bird.src = "../static/images/bird/hit.gif";
    numberOfBirdHaveEliminated++;
    document.getElementById("birdHitAudio").play(); // Play the bird hit sound
    wateringsLeft += 10;
    fertilizationsLeft += 10;
    updateWaterCount();
    updateFertilizerCount();

    // After a delay, remove the bird container from the DOM
    setTimeout(function () {
      birdContainer.parentNode.removeChild(birdContainer);
      birdCount--;
    }, 200); // Adjust the delay as needed to match the duration of the hit animation
  }

  // Add click event listener to the bird
  bird.addEventListener("click", handleClickOnBird);

  // Start the animation for the newly added bird container
  startFlying(bird);
  flyToRandomLocation(bird, birdContainer);
}


// Set interval to add bird container every hours
setInterval(function () {
  addBirdContainer();
  birdCount++; // Increment birdCount
}, Math.random() * 1000 * 60 * 10);



