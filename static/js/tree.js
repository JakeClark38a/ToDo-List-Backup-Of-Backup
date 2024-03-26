document.addEventListener("DOMContentLoaded", function() {
  var treesContainer = document.getElementById("Trees");
  
  // Add a click event listener to the trees container
  treesContainer.addEventListener("click", function(event) {
    var target = event.target;
    if (target.tagName === "IMG") {
      var currentSrc = target.src;
      var match = currentSrc.match(/tree(\d+)\.gif/);
      
      if (match && match[1]) {
        var currentNumber = parseInt(match[1], 10);
        var nextNumber = (currentNumber % 11) + 1; // Ensure cycling from 1 to 11
        
        // Construct the new source URL with the next number
        var newSrc = "../static/images/tree" + nextNumber + ".gif";
        
        // Change the source of the clicked tree image
        target.src = newSrc;
        
        // Remove click event listener from the clicked tree image
        target.removeEventListener("click", clickHandler);
        
        // If the current number is 11, add another tree image
        if (currentNumber === 11) {
          var newTree = document.createElement("img");
          newTree.src = "../static/images/tree1.gif";
          newTree.alt = "myTree";
          newTree.className = "m-auto";
          
          // Add click event listener to the new tree image
          newTree.addEventListener("click", clickHandler);
          
          // Append the new tree image to the trees container
          treesContainer.appendChild(newTree);
        }
      }
    }
  });
  
  // Initial click event handler for the first tree image
  function clickHandler(event) {
    var target = event.target;
    var currentSrc = target.src;
    var match = currentSrc.match(/tree(\d+)\.gif/);
    
    if (match && match[1]) {
      var currentNumber = parseInt(match[1], 10);
      var nextNumber = (currentNumber % 11) + 1; // Ensure cycling from 1 to 11
      
      // Construct the new source URL with the next number
      var newSrc = "../static/images/tree" + nextNumber + ".gif";
      
      // Change the source of the clicked tree image
      target.src = newSrc;
      
      // Remove click event listener from the clicked tree image
      target.removeEventListener("click", clickHandler);
    }
  }
  
  // Add click event listener to the initial tree image
  var initialTree = document.getElementById("currTree");
  initialTree.addEventListener("click", clickHandler);
});


