// Function to toggle the disable state and apply gray out styles to the select box
function toggleSelectBoxState() {
  // Get the select element
  var selectBox = document.getElementById("user_profile_local_time_zone_name");
  // Get the checkbox element
  var checkbox = document.getElementById(
    "user_profile_display_local_time_zone"
  );

  // Set the disabled attribute of the select box based on the checkbox state
  selectBox.disabled = !checkbox.checked;

  // If the select box is disabled, add a CSS class to gray it out; otherwise, remove the class
  if (selectBox.disabled) {
    selectBox.classList.add("disabled-select");
  } else {
    selectBox.classList.remove("disabled-select");
  }
}

// Add an event listener to the checkbox to call the toggleSelectBoxState function when it changes
document
  .getElementById("user_profile_display_local_time_zone")
  .addEventListener("change", toggleSelectBoxState);

// Call the toggleSelectBoxState function initially to set the initial state
toggleSelectBoxState();

/////////////////////////////////////// password modal code begin

// Set the password modal element
const $passwordModalEl = document.getElementById("password-modal");
const changePasswordButton = document.getElementById("Change-Password-Button");

// Options for the password modal
const passwordModalOptions = {
  backdrop: "dynamic",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
  closable: true,
  onHide: () => {
    console.log("Password modal is hidden");
  },
  onShow: () => {
    console.log("Password modal is shown");
  },
  onToggle: () => {
    console.log("Password modal has been toggled");
  },
};

// Create a new instance of the modal for the password modal
const passwordModal = new Modal($passwordModalEl, passwordModalOptions);

// Function to handle closing the password modal when the close button is clicked
document
  .getElementById("btn-close-password-modal")
  .addEventListener("click", () => {
    passwordModal.hide();
  });

// Function to unhide the password modal when the change password button is clicked
document
  .getElementById("Change-Password-Button")
  .addEventListener("click", () => {
    passwordModal.show();
  });

// Function to center the password modal
function centerPasswordModal() {
  $passwordModalEl.style.top = "50%";
  $passwordModalEl.style.left = "50%";
  $passwordModalEl.style.transform = "translate(-50%, -50%)";
}

// Call the centerPasswordModal function when the window is resized
window.addEventListener("resize", centerPasswordModal);

// Call the centerPasswordModal function initially to center the modal
centerPasswordModal();

/////////////////////////////////////// password modal code end

/////////////////////////////////////// username modal code begin

// Set the username modal element
const $usernameModalEl = document.getElementById("username-modal");

// Options for the username modal
const usernameModalOptions = {
  backdrop: "dynamic",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
  closable: true,
  onHide: () => {
    console.log("Username modal is hidden");
  },
  onShow: () => {
    console.log("Username modal is shown");
  },
  onToggle: () => {
    console.log("Username modal has been toggled");
  },
};

// Create a new instance of the modal for the username modal
const usernameModal = new Modal($usernameModalEl, usernameModalOptions);

// Function to handle closing the username modal when the close button is clicked
document
  .getElementById("btn-close-username-modal")
  .addEventListener("click", () => {
    usernameModal.hide();
  });

// Function to unhide the username modal when the change username button is clicked
document
  .getElementById("Change-Username-Button")
  .addEventListener("click", () => {
    usernameModal.show();
  });

// Function to center the username modal
function centerUsernameModal() {
  $usernameModalEl.style.top = "50%";
  $usernameModalEl.style.left = "50%";
  $usernameModalEl.style.transform = "translate(-50%, -50%)";
}

// Call the centerUsernameModal function when the window is resized
window.addEventListener("resize", centerUsernameModal);

// Call the centerUsernameModal function initially to center the modal
centerUsernameModal();

/////////////////////////////////////// username modal code end




/////////////////////////////////////// change avatar modal code begin

// Set the avatar modal element
const $avatarModalEl = document.getElementById('avatar-modal');

// Options for the avatar modal
const avatarModalOptions = {
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        console.log('Avatar modal is hidden');
    },
    onShow: () => {
        console.log('Avatar modal is shown');
    },
    onToggle: () => {
        console.log('Avatar modal has been toggled');
    },
};

// Create a new instance of the modal for the avatar modal
const avatarModal = new Modal($avatarModalEl, avatarModalOptions);

// Function to handle closing the avatar modal when the close button is clicked
document.getElementById('btn-close-avatar-modal').addEventListener('click', () => {
    avatarModal.hide();
});

// Function to handle dropping files onto the drop area
function handleDrop(e) {
    e.preventDefault();
    const dt = e.dataTransfer;
    const files = dt.files;

    // Handle each dropped file
    handleFiles(files);
}

// Function to handle files after dropping or selecting
function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Check if it's an image file
        if (!file.type.startsWith('image/')) {
            continue;
        }

        const reader = new FileReader();

        // Read the image file as a data URL
        reader.onload = function () {
            const img = new Image();
            img.src = reader.result;

            // Display the image in the drop area
            const dropArea = document.getElementById('drop-area');
            dropArea.innerHTML = '';
            dropArea.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
}

// Function to handle file selection from the file input
function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
    avatarModal.show();
}

// Add event listeners for drag and drop
const dropArea = document.getElementById('drop-area');
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('border-blue-500');
});
dropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropArea.classList.remove('border-blue-500');
});
dropArea.addEventListener('drop', handleDrop);

// Add event listener for file input change
document.getElementById('fileElem').addEventListener('change', handleFileSelect);

// Function to handle changing the avatar when the change avatar button is clicked
document.getElementById('change-avatar-btn').addEventListener('click', () => {
    if (cropper) {
        const croppedCanvas = cropper.getCroppedCanvas();
        const croppedDataURL = croppedCanvas.toDataURL('image/jpeg'); // Change format if needed
        // TODO: Send croppedDataURL to server or use it as profile picture
        avatarModal.hide();
    }
});

// Function to unhide the avatar modal when the edit button is clicked
document.getElementById('Avatar-Menu-Profile').addEventListener('click', () => {
  const dropdownmenu = document.getElementById("Drop-Down-Options-Profile");
  dropdownmenu.classList.toggle("hidden");
});

/////////////////////////////////////// change avatar modal code end
