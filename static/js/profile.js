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
function AJAXresetpassword(curr_password, new_password, confirm_password) {
  $.ajax({
    url: "/profile/update/password",
    type: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      curr_password: curr_password,
      new_password: new_password,
      confirm_password: confirm_password,
    }),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      alert(data);
    },
    error: function (data) {
      alert(data);
    },
  });
}


$("#submit-password").click(function (e) {
  e.preventDefault();
  var current_password = $("#current-password-sec").find("#current-password").val();
  var new_password = $("#new-password-sec").find("#new-password").val();
  var confirm_password = $("#confirm-password-sec").find("#confirm-password").val();
  console.log(current_password, new_password, confirm_password);
  AJAXresetpassword(current_password, new_password, confirm_password);
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
        location.reload();
      },
      error: function (data) {
        console.log(data);
      },
    });
  }
});
/////////////////////////////////////// change avatar modal code end

/////////////////////////////////////// update user info
var userInfo = {
  username: "John Doe",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  Location: "UTC",
};
function displayUserInfo() {
  $("#Username-Section").find("#user_profile_name").val(userInfo.username);
  $("#Bio-Section").find("#user_profile_bio").text(userInfo.bio);
  $("#Time-Zone-Section").find("#user_location_name").val(userInfo.Location);
}
displayUserInfo();
function updateUserInfo() {
  userInfo.username = $("#Username-Section").find("#user_profile_name").val();
  userInfo.bio = $("#Bio-Section").find("#user_profile_bio").val();
  userInfo.Location = $("#Time-Zone-Section").find("#user_location_name").val();
  displayUserInfo();
  AJAXsetUserInfo(userInfo.username, userInfo.bio, userInfo.Location);
  console.log("bruh");
}
$("#Apply-Change-Button").click(updateUserInfo);

function AJAXgetUserInfo() {
  $.ajax({
    url: "/profile/get",
    type: "GET",
    success: function (data) {
      console.log(data);
      userInfo.username = data.username;
      userInfo.bio = data.bio;
      userInfo.Location = data.Location;
      console.log(userInfo);
      displayUserInfo();
    },
    error: function (data) {
      console.log(data);
    },
  });
}
AJAXgetUserInfo();
function AJAXsetUserInfo(username, bio, Location) {
  $.ajax({
    url: "/profile/update",
    type: "POST",
    data: JSON.stringify({
      username: userInfo.username,
      bio: userInfo.bio,
      Location: userInfo.Location,
    }),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      console.log(data);
    },
  });
}

function AJAXSendConfirmation() {
  $.ajax({
    url: "/profile/update/email_confirmation",
    type: "POST",
    data: JSON.stringify({
      curr_email: $("#current-email-sec").find("#current-email").val(),
    }),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      console.log(data);
    },
  });
}

function AJAXChangeEmail() {
  $.ajax({
    url: "/profile/update/email",
    type: "POST",
    data: JSON.stringify({
      curr_email: $("#current-email-sec").find("#current-email").val(),
      new_email: $("#new-email-sec").find("#new-email").val(),
      otp: $("#authenticate-code-sec").find("#authenticate-code").val(),
    }),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      console.log(data);
    },
  });
}

function AJAXgetUserProfileImage() {
  $.ajax({
    url: "/profile/get/image",
    type: "GET",
    success: function (data) {
      $("#User-Current-Avatar").attr("src",data);
    },
    error: function (data) {
      console.log(data);
    },
  });

}
AJAXgetUserProfileImage();

$("#change-email").click(function () {
  AJAXChangeEmail();
  location.reload();
});

$("#send-mail").click(function () {
  AJAXSendConfirmation();
});


/////////////////////////////////////// update user info end
