// This is the main file for the app
// using jQuery
// Toggle cogwheel icon on click
$(document).ready(function() {
  $('.cogwheel').click(function() {
    // A popup will appear with the settings
  });
  // Hide the settings popup when the user clicks outside of it
  // Later...

  // Scroll event when user scroll in the list => Load more items horizontally
  $('.lists').scroll(function() {
    // Load more items
    console.log('Loading more items...');
  });
});

