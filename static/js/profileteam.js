
import { ajaxHandler } from "./ajaxHandler.js";
import { Alert } from "./alertMsg.js";

var userInfo = {}//Utils.getSampleData();

function getData() {
  return new Promise(function (resolve) {
    $.when(ajaxHandler.LoadUserData()).done(function (data) {
      userInfo = data
     // $("#Toggle-DarkMode").prop('checked', Dict.darkmode);
      $("html").toggleClass("dark", userInfo.darkmode);   
      resolve(userInfo);
    });
  });
}


function init() {
  $.when(getData()).done(function (data) {
    userInfo = data;
    displayUserInfo();
  });
}
init();

// Set the password modal element
const $passwordModalEl = document.getElementById("password-modal");

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



$("#submit-password").click(function (e) {
  e.preventDefault();
  var current_password = $("#current-password-sec").find("#current-password").val();
  var new_password = $("#new-password-sec").find("#new-password").val();
  var confirm_password = $("#confirm-password-sec").find("#confirm-password").val();
  $.when(ajaxHandler.resetpassword(current_password, new_password, confirm_password)).done(() => { Alert.Success("Password changed successfully!") }).fail(() => { Alert.Danger("Password change failed!") });
  passwordModal.hide();

});

// document.getElementById("#submit-password").addEventListener("click", function(){
//   //e.preventDefault();
//   var current_password = $("#current-password-sec").find("#current-password").val();
//   var new_password = $("#new-password-sec").find("#new-password").val();
//   var confirm_password = $("#confirm-password-sec").find("#confirm-password").val();
//   AJAXresetpassword(current_password, new_password, confirm_password);
// });

// Call the centerPasswordModal function when the window is resized
window.addEventListener("resize", centerPasswordModal);

// Call the centerPasswordModal function initially to center the modal
centerPasswordModal();

/////////////////////////////////////// password modal code end

/////////////////////////////////////// username modal code begin

// Set the username modal element
const $emailModalEl = document.getElementById("email-modal");

// Options for the email modal
const emailModalOptions = {
  backdrop: "dynamic",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
  closable: true,
  onHide: () => {
    console.log("email modal is hidden");
  },
  onShow: () => {
    console.log("email modal is shown");
  },
  onToggle: () => {
    console.log("email modal has been toggled");
  },
};

// Create a new instance of the modal for the email modal
const emailModal = new Modal($emailModalEl, emailModalOptions);

// Function to handle closing the email modal when the close button is clicked
document
  .getElementById("btn-close-email-modal")
  .addEventListener("click", () => {
    emailModal.hide();
  });

// Function to unhide the email modal when the change email button is clicked
document.getElementById("Change-Email-Button").addEventListener("click", () => {
  emailModal.show();
});

// Function to center the email modal
function centeremailModal() {
  $emailModalEl.style.top = "50%";
  $emailModalEl.style.left = "50%";
  $emailModalEl.style.transform = "translate(-50%, -50%)";
}

// Call the centeremailModal function when the window is resized
window.addEventListener("resize", centeremailModal);

// Call the centeremailModal function initially to center the modal
centeremailModal();

/////////////////////////////////////// email modal code end

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
document
  .getElementById("btn-close-avatar-modal")
  .addEventListener("click", () => {
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
            /* alert(
              "Image is too small. Please upload an image with minimum dimensions of 200x200."
            );*/
            Alert.Warning("Image is too small. Please upload an image with minimum dimensions of 200x200.");
            return;
          }
          if (img.width > 800 || img.height > 800) {
            /* alert(
                "Image is too large. Please upload an image with maximum dimensions of 800x800."
              );*/
            Alert.Warning("Image is too large. Please upload an image with maximum dimensions of 800x800.");
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
    console.log("Cropped Image Data:", croppedDataURL);
    $.ajax({
      url: "/profile/update/image",
      type: "POST",
      dataType: "json",
      data: JSON.stringify({ avatar: croppedDataURL }),
      enctype: "multipart/form-data",
      contentType: "application/json; charset=utf-8",
      processData: false,
      cache: false,
      success: function (data) {
        console.log(data);
        $("#avatar-modal").hide();
        Alert.Success("Image Uploaded Successfully");
        location.reload();
      },
      error: function (data) {
        console.log(data);
        Alert.Danger("Error Uploading Image");
      },
    });
  }
});
/////////////////////////////////////// change avatar modal code end

/////////////////////////////////////// update user info
function displayUserInfo() {
  $("#Username-Section").find("#user_profile_name").val(userInfo.username);
  $("#Bio-Section").find("#user_profile_bio").text(userInfo.bio);
  $("#Time-Zone-Section").find("#country").val(userInfo.country);
}


function updateUserInfo() {
  userInfo.username = $("#Username-Section").find("#user_profile_name").val();
  userInfo.bio = $("#Bio-Section").find("#user_profile_bio").val();
  userInfo.country = $("#Time-Zone-Section").find("#country").val();
  displayUserInfo();
  $.when(ajaxHandler.setUserInfo(userInfo.username, userInfo.bio, userInfo.country)).done(()=>{Alert.Success("User info updated successfully!")}).fail(()=>{Alert.Danger("User info update failed!")});
}
$("#Apply-Change-Button").click(updateUserInfo);

$("#change-email").click(function () {
  e.preventDefault()
  let curr_email = $("#current-email-sec").find("#current-email").val();
  let new_email = $("#new-email-sec").find("#new-email").val();
  let otp = $("#authenticate-code-sec").find("#authenticate-code").val();
  $.when(ajaxHandler.ChangeEmail(curr_email, new_email, otp)).done(()=>{Alert.Success("Email changed successfully!")}).fail(()=>{Alert.Danger("Email change failed!")});
  location.reload();
});

$("#send-mail").click(function () {
  let curr_mail = $("#current-email-sec").find("#current-email").val();
  $.when(ajaxHandler.SendConfirmation(curr_mail)).done(()=>{Alert.Success("Email sent, please check you mailbox.")}).fail(()=>{Alert.Danger("Email sending failed! Please check your email address.")});
});

ajaxHandler.getUserProfileImage();

/////////////////////////////////////// update user info end
