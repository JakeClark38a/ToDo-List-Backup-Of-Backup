document.addEventListener("DOMContentLoaded", function () {
  var treesContainer = document.getElementById("Trees");
  var treeCounter = 0; // Counter for trees surpassing tree11
  var treeCountDisplay = document.getElementById("treeCount");
  // Add a click event listener to the trees container
  treesContainer.addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("currTree")) {
      var currentSrc = target.src;
      var match = currentSrc.match(/tree(\d+)\.gif/);
      if (match && match[1]) {
        var currentNumber = parseInt(match[1], 10);
        var nextNumber = (currentNumber % 11) + 1; // Ensure cycling from 1 to 11
        
        // Construct the new source URL with the next number
        var newSrc = "../static/images/tree" + nextNumber + ".gif";

        // If the current number is 11, meaning the tree is fully grown
        if (currentNumber === 11) {
          treeCounter++; // Increment the counter when surpassing tree11
          var newTree = document.createElement("img");
          treeCountDisplay.innerHTML = "Number of Trees: " + treeCounter;
          newTree.src = newSrc;
          newTree.alt = "myTree";
          newTree.className = "m-auto tree new-tree currTree"; // Add the new-tree class and currTree class
          target.src = newSrc;
        } else {
          // If not fully grown, simply change the source of the clicked tree image
          target.src = newSrc;
        }
      }
    }
  });
});
