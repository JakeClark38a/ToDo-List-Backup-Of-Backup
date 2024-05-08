// Set the house modal element
const $houseModalEl = document.getElementById("HouseModal");

// Options for the house modal
const houseModalOptions = {
  backdrop: "dynamic",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
  closable: true,
  onHide: () => {
    console.log("House modal is hidden");
    // Add any specific actions you want to perform when the modal is hidden
    // For example, reset any changes made when the modal was open
    // Example: document.getElementById("houseButton").src = "../static/images/tree_game/HouseButton.png";
  },
  onShow: () => {
    console.log("House modal is shown");
    // Add any specific actions you want to perform when the modal is shown
    // For example, change the appearance of a button indicating the modal is open
    // Example: document.getElementById("houseButton").src = "../static/images/tree_game/HouseButtonPressed.png";
  },
  onToggle: () => {
    console.log("House modal has been toggled");
    // Add any specific actions you want to perform when the modal is toggled
  },
};

// Create a new instance of the modal for the house modal
const houseModal = new Modal($houseModalEl, houseModalOptions);

// Function to handle closing the house modal when the close button is clicked
document
  .getElementById("btn-close-house-modal")
  .addEventListener("click", () => {
    houseModal.hide();
  });

// Function to unhide the house modal when the house button is clicked
document.getElementById("house").addEventListener("click", () => {
  houseModal.show();
});

// Function to center the house modal
function centerHouseModal() {
  $houseModalEl.style.top = "50%";
  $houseModalEl.style.left = "50%";
  $houseModalEl.style.transform = "translate(-50%, -50%)";
}

// Call the centerHouseModal function when the window is resized
window.addEventListener("resize", centerHouseModal);

// Call the centerHouseModal function initially to center the modal
centerHouseModal();

