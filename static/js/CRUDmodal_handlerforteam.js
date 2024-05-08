
const $targetEl2 = document.getElementById('crud-modal2');
const options = {
  // placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    modalteampage.resetState();
    console.log('modal is hidden');
  },

  onToggle: () => {
    console.log('modal has been toggled');
  },
};
if (window.innerWidth < 768) {
  options.backdrop = 'static';
}
const modalteampage = new Modal($targetEl2, options);

modalteampage.resetState = function () {
  $('#crud-modal2 h3').text("Create");
  $('#crud-modal2 h3').show();

  $('#crud-modal2 label[for="teamname"]').text("Team's Name");
  $('#crud-modal2 #name').attr("placeholder", "Team's Name");
  $('#crud-modal2 #name').val("");
  $('#crud-modal2 #name-sec').show();



  $('#crud-modal2 label[for="teamdescription"]').text("Team Description");
  $('#crud-modal2 #description').val("");
  $('#crud-modal2 #description').attr("placeholder", "Team Description");
  $('#crud-modal2 #desc-sec').show();
}

modalteampage.CreateTeam = function () {
  let h3 = "Create Team";
  let teamname = "";
  let teamdescription = "";
  $("#crud-modal2 #code-sec").hide();
  $('#crud-modal2 #teamname-sec').show();
  $('#crud-modal2 #teamdesc-sec').show();
  $('#crud-modal2 #Create-sec').show();
  $('#crud-modal2 #Join-sec').hide();
  $('#crud-modal2 #save-sec').hide();
  $('#crud-modal2 #delete-sec').hide();
  $('#crud-modal2 label[for="teamname"]').text("Team's Name");
  $('#crud-modal2 label[for="teamdescription"]').text("Team Description");
  $('#crud-modal2 h3').text(h3);
  $('#crud-modal2 #teamname').val(teamname);
  $('#crud-modal2 #teamdescription').val(teamdescription);

  modalteampage.show();
}
modalteampage.editTeam = function (teamid,teamname,teamdes) {
  let h3 = "Edit Team";
  let teamdescription = teamdes;
  let id = teamid;
  console.log("asdasd :", id);
  $("#crud-modal2 #code-sec").hide();
  $('#crud-modal2 #teamname-sec').show();
  $('#crud-modal2 #teamdesc-sec').show();
  $('#crud-modal2 #Create-sec').hide();
  $('#crud-modal2 #Join-sec').hide();
  $('#crud-modal2 #save-sec').show();
  $('#crud-modal2 #delete-sec').show();
  $('#crud-modal2 label[for="teamname"]').text("Team's Name");
  $('#crud-modal2 label[for="teamdescription"]').text("Team Description");
  $('#crud-modal2 h3').text(h3);
  $('#crud-modal2 input[type="checkbox"]').attr("id", id);
  $('#crud-modal2 #teamname').val(teamname);
  $('#crud-modal2 #teamdescription').val(teamdescription);

  modalteampage.show();
}
modalteampage.JoinTeam = function () {
  let h3 = "Join Team";
  let teamcode = "";
  $("#crud-modal2 #teamname-sec").hide();
  $('#crud-modal2 #teamdesc-sec').hide();
  $('#crud-modal2 #code-sec').show();
  $('#crud-modal2 #Create-sec').hide();
  $('#crud-modal2 #Join-sec').show();
  $('#crud-modal2 #save-sec').hide();
  $('#crud-modal2 #delete-sec').hide();
  $('#crud-modal2 label[for="teamcode"]').text("Team's Code");
  $('#crud-modal2 h3').text(h3);
  $('#crud-modal2 #teamcode').val(teamcode);
  modalteampage.show();
}

$('#crud-modal2 #btn-close-modal').click(function () {
  modalteampage.hide();
});


export { modalteampage };

