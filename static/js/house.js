// Set the House modal element
const $houseModalEl = document.getElementById("HouseModal");

// Options for the House modal
const houseModalOptions = {
  backdrop: "dynamic",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
  closable: true,
  onHide: () => {
    console.log("House modal is hidden");
  },
  onShow: () => {
    console.log("House modal is shown");
  },
  onToggle: () => {
    console.log("House modal has been toggled");
  },
};

// Create a new instance of the modal for the House modal
const houseModal = new Modal($houseModalEl, houseModalOptions);

// Function to handle closing the House modal when the close button is clicked
document
  .getElementById("btn-close-house-modal")
  .addEventListener("click", () => {
    houseModal.hide();
  });

// Function to unhide the House modal when the House button is clicked
document.getElementById("house").addEventListener("click", () => {
  houseModal.show();
});

// Function to center the House modal
function centerHouseModal() {
  $houseModalEl.style.top = "50%";
  $houseModalEl.style.left = "50%";
  $houseModalEl.style.transform = "translate(-50%, -50%)";
}

// Call the centerHouseModal function when the window is resized
window.addEventListener("resize", centerHouseModal);

// Call the centerHouseModal function initially to center the modal
centerHouseModal();