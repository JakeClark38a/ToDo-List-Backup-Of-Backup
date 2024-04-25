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
const $avatarModalEl = document.getElementById("avatar-modal");

// Options for the avatar modal
const avatarModalOptions = {
  backdrop: "dynamic",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
  closable: true,
  onHide: () => {
    console.log("Avatar modal is hidden");
    // delete, clear the image if the moal is close, hidden
    if (cropper) {
      cropper.destroy();
      cropper = null;
    }
  },
  onShow: () => {
    console.log("Avatar modal is shown");
  },
  onToggle: () => {
    console.log("Avatar modal has been toggled");
  },
};

// Create a new instance of the modal for the avatar modal
const avatarModal = new Modal($avatarModalEl, avatarModalOptions);

// Function to handle closing the avatar modal when the close button is clicked
document.getElementById("btn-close-avatar-modal").addEventListener("click", () => {
  avatarModal.hide();
});


// Function to unhide the avatar options when the edit button or the avatar is clicked
document.getElementById("Avatar-Menu-Profile").addEventListener("click", () => {
  const dropdownmenu = document.getElementById("Drop-Down-Options-Profile");
  dropdownmenu.classList.toggle("hidden");
});


// Function to center the avatar modal
function centerAvatarModal() {
  $avatarModalEl.style.top = "50%";
  $avatarModalEl.style.left = "50%";
  $avatarModalEl.style.transform = "translate(-50%, -50%)";
}

// Call the centerAvatarModal function when the window is resized
window.addEventListener("resize", centerAvatarModal);

// Call the centerAvatarModal function initially to center the modal
centerAvatarModal();


// Declare cropper variable outside the event listener
let cropper;

document
  .getElementById("upload-photo")
  .addEventListener("change", function (e) {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function () {
        var img = new Image();
        img.src = reader.result;
        img.onload = function () {
          if (img.width < 200 || img.height < 200) {
            alert(
              "Image is too small. Please upload an image with minimum dimensions of 200x200."
            );
            return;
          }
          if (img.width > 800 || img.height > 800) {
            alert(
              "Image is too large. Please upload an image with maximum dimensions of 800x800."
            );
            return;
          }
          // Display cropper modal
          cropper = new Cropper(document.getElementById("cropperImage"), {
            aspectRatio: 1,
            viewMode: 2,
            movable: false,
            zoomable: false,
            scalable: false,
            rotatable: false,
            crop: function (event) {
              // Output cropped area data
              // console.log(event.detail.x);
              // console.log(event.detail.y);
              // console.log(event.detail.width);
              // console.log(event.detail.height);
            },
          });
          cropper.replace(reader.result);
          avatarModal.show();
        };
      };
      reader.readAsDataURL(file);
    }
  });

document.getElementById("change-avatar-btn").addEventListener("click", () => {
  if (cropper) {
    const croppedCanvas = cropper.getCroppedCanvas();
    const croppedDataURL = croppedCanvas.toDataURL("image/jpeg"); // Change format if needed

    // Log cropped image data
    console.log("Cropped Image Data:", croppedDataURL);

    // Send cropped image data to the server
    fetch("your-server-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: croppedDataURL }),
    })
      .then((response) => {
        if (response.ok) {
          // Success, handle accordingly (e.g., close modal)
          $("#avatar-modal").hide();
        } else {
          // Handle error
          console.error("Error sending cropped image data to the server");
        }
      })
      .catch((error) => {
        console.error("Error sending cropped image data:", error);
      });
  }
});
/////////////////////////////////////// change avatar modal code end

/////////////////////////////////////// update user info 
var userInfo ={
  username: "John Doe",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  timeZone: "UTC",
  displayTimeZone: true,
  localTimeZoneName: "UTC",
};
function displayUserInfo()
{
  $('#Username-Section').find('#user_profile_name').val(userInfo.username);
  $('#Bio-Section').find('#user_profile_bio').text(userInfo.bio);
  $('#Time-Zone-Section').find('#user_location_name').val(userInfo.timeZone);
  $('#Time-Zone-Section').find('#user_profile_display_local_time_zone').prop('checked', userInfo.displayTimeZone);
  toggleSelectBoxState();
  $('#Time-Zone-Section').find('#user_profile_local_time_zone_name').val(userInfo.localTimeZoneName);
}
displayUserInfo();
function updateUserInfo(){
  userInfo.username = $('#Username-Section').find('#user_profile_name').val();
  userInfo.bio = $('#Bio-Section').find('#user_profile_bio').text();
  userInfo.timeZone = $('#Time-Zone-Section').find('#user_location_name').val();
  userInfo.displayTimeZone = $('#Time-Zone-Section').find('#user_profile_display_local_time_zone').prop('checked');
  userInfo.localTimeZoneName = $('#Time-Zone-Section').find('#user_profile_local_time_zone_name').val();
  displayUserInfo();
  console.log('bruh');
}
$('#Apply-Change-Button').click(updateUserInfo);

function AJAXgetUserInfo(){

}
function AJAXsetUserInfo(){

}
/////////////////////////////////////// update user info end
