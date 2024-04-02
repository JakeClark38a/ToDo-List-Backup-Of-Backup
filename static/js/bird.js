// Get bird element
var bird = document.getElementById("bird");
var birdContainer = document.getElementById("bird-container");

// Array of animation GIFs
var animations = [
  "../static/images/bird/flying.gif",
  "../static/images/bird/stop_flying.gif",
  "../static/images/bird/start_flying.gif",
  "../static/images/bird/idle.gif",
  "../static/images/bird/walking-forward.gif",
];

// Function to fly the bird to a random location
function flyToRandomLocation() {
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
    setTimeout(flyToRandomLocation, 2000); // Change location every 2 seconds
  }, 2000); // Wait for 2 seconds before changing animation to idle
}

// Function to start flying
function startFlying() {
  bird.src = animations[0]; // "flying.gif"
  flyToRandomLocation();
}

// Start the animation
startFlying();


// Function to handle the click event on bird container
birdContainer.addEventListener("click", function() {
  // Change bird animation to hit.gif
  bird.src = "../static/images/bird/hit.gif";

  // After 2000ms, hide the bird container
  setTimeout(function() {
    birdContainer.hidden = true;
  }, 400);
});