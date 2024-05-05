$(document).ready(function () {
  // Constants
  const MAX_TREE_LEVEL = 11;
  const XP_PER_CLICK = 5;
  const FERTILIZER_COST = 1;
  const WATER_COST = 1;

  // Variables
  let treeCounter = 0;
  let xp = 0;
  let food = 999;
  let water = 999;

  // DOM elements
  const treesContainer = $("#Trees");
  const treeCountDisplay = $("#treeCount");
  const fertilizerDisplay = $('#fertilizerCount');
  const waterDisplay = $('#waterCount');
  const xpDisplay = $('#xpCount');

  // Initialize UI
  fertilizerDisplay.text(food);
  waterDisplay.text(water);
  xpDisplay.text(`Xp: ${xp}/${xpForNextTree()}`);

  // Event listener
  treesContainer.on("click", ".currTree", function (event) {
    if (food < FERTILIZER_COST || water < WATER_COST) return;

    const $target = $(event.target);

    if ($target.hasClass("currTree")) {
      const currentSrc = $target.attr("src");
      const match = currentSrc.match(/tree(\d+)\.gif/);

      if (match && match[1]) {
        const currentNumber = parseInt(match[1], 10);
        const nextNumber = (currentNumber % MAX_TREE_LEVEL) + 1;

        // Update resources
        food -= FERTILIZER_COST;
        water -= WATER_COST;
        xp += 1;

        // Update UI
        fertilizerDisplay.text(food);
        waterDisplay.text(water);
        xpDisplay.text(`Xp: ${xp}/${xpForNextTree()}`);

        // Grow tree
        if (xp >= xpForNextTree()) {
          xp -= xpForNextTree();
          treeCounter++;
          treeCountDisplay.text(`Number of Trees: ${treeCounter}`);
          const newTree = $("<img />", {
            src: `../static/images/tree${nextNumber}.gif`,
            alt: "myTree",
            class: "m-auto tree new-tree currTree"
          });
          $target.attr("src", `../static/images/tree${nextNumber}.gif`).after(newTree);
        } else {
          $target.attr("src", `../static/images/tree${nextNumber}.gif`);
        }
      }
    }
  });

  // Function to calculate XP required for the next tree
  function xpForNextTree() {
    return treeCounter * 10 + 10;
  }
});
