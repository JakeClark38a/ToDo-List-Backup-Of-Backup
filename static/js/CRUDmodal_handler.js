import { Utils } from "./userData.js";

// set the modal menu element
const $targetEl = document.getElementById('crud-modal');

// options with default values
const options = {
  // placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    modalMainScreen.resetState();
    console.log('modal is hidden');
  },
  onShow: () => {
    // Limit the date picker to today and future dates
    // Get the current date and time
    const now = new Date();

    // Format the date and time as required by the min attribute
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');

    // Construct the string for the min attribute
    const minDatetime = `${year}-${month}-${day}T${hour}:${minute}`;

    // Set the min attribute of the input element
    document.getElementById('todo-expired').setAttribute('min', minDatetime);
    // Set value to current date and time
    document.getElementById('todo-expired').value = minDatetime;

    console.log('modal is shown');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

if (window.innerWidth < 768) {
  options.backdrop = 'static';
}

const modalMainScreen = new Modal($targetEl, options);

modalMainScreen.resetState = function () {

  //Reset modal appearance
  $('#crud-modal h3').text("Create");
  $('#crud-modal h3').show();

  $('#crud-modal label[for="name"]').text("Name");
  $('#crud-modal #name').attr("placeholder", "Name");
  $('#crud-modal #name').val("");
  $('#crud-modal #name-sec').show();

  $('#crud-modal label[for="description"]').text("Description");
  $('#crud-modal #description').val("");
  $('#crud-modal #description').attr("placeholder", "Description");
  $('#crud-modal #desc-sec').show();

  $('#crud-modal label[for="todo-expired"]').text("Deadline");
  $('#crud-modal #todo-expired').val("");
  $('#crud-modal #todo-expired-sec').show();

  $('#crud-modal label[for="tags"]').text("Tag");
  $('#crud-modal #tags option').removeAttr("selected");
  $('#crud-modal #tags-sec').show();

  $('#crud-modal label[for="groups"]').text("Group");
  $('#crud-modal #groups option').removeAttr("selected");
  $('#crud-modal #groups-sec').hide();

  $('#crud-modal label[for="colors"]').text("Color");
  $('#crud-modal #colors').val("#" + ((Math.random() * 0xF0F0F0 << 0).toString(16).padStart(6, '0')));
  $('#crud-modal #colors-sec').show();


  $('#crud-modal button[type="submit"]').html(`
          <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
          Create`);
  $('#crud-modal #submit-sec').show();

  $('#crud-modal #delete-sec button').html(`
      <svg class="me-1 -ms-1 w-5 h-5 text-white dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                  viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
              </svg>

              Delete

      `);
  $('#crud-modal #delete-sec').hide();

  $('#crud-modal input[type="checkbox"]').attr("id", `none_none`);
}

modalMainScreen.AddEditTask = function (task) {
  let h3 = task ? "Edit Task" : "Add Task";
  let id = task ? task.taskID : "none";
  let title = task ? task.title : '';
  let desc = task ? task.description : '';
  let tag = task ? task.tag : '';
  let expired = task ? task.deadline : '';

  // Customize modal appearance
  $('#crud-modal #colors-sec').hide();
  $('#crud-modal #delete-sec').show();

  $('#crud-modal label[for="name"]').text("Title");
  $('#crud-modal label[for="description"]').text("Task Description");
  // Change task header
  $('#crud-modal h3').text(h3);
  // Change input to task details
  $('#crud-modal #name').val(title);
  $('#crud-modal #description').val(desc);
  $('#crud-modal').find(`#tags option[value="${tag}"]`).attr("selected", title);
  $('#crud-modal #todo-expired').val(expired);
  $('#crud-modal button[type="submit"]').text(h3);
  // Change honeypot to id
  $('#crud-modal input[type="checkbox"]').attr("id", `task_${id}`);
  // Get current date
  let current_date = new Date();
  // Get date input
  let date_element = $('#crud-modal #todo-expired');
  // Get input date
  let input_date = new Date(date_element.val());
  // If input date is less than current date, show alert
  if (input_date < current_date) {
    date_element.css("border", "2px solid red");
  }
  else {
    date_element.css("border", "2px solid green");
  }
  modalMainScreen.show();
}

modalMainScreen.AddEditTag = function (tag) {
  let h3 = tag ? "Edit Tag" : "Add Tag";
  let title = tag ? tag.title : '';
  let id = tag ? tag.tagID : "none";

  // Customize modal appearance
  $('#crud-modal label[for="name"]').text("Name");

  $('#crud-modal h3').text(h3);
  $('#crud-modal #name').attr('placeholder', 'Tag name');
  $('#crud-modal #name').val(title);

  $('#crud-modal #desc-sec').hide();
  $('#crud-modal #todo-expired-sec').hide();
  $('#crud-modal #tags-sec').hide();
  $('#crud-modal #groups-sec').hide();


  if (tag && tag.deletable == true) {
    $('#crud-modal #delete-sec').show();
  };

  $('#crud-modal button[type="submit"]').html(`
    <svg class="w-5 lg:w-7 h-5 lg:h-7 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
  </svg> Edit
    `);
  $('#crud-modal button[type="submit"]').text(h3);
  $('#crud-modal input[type="checkbox"]').attr("id", `tag_${id}`);
  modalMainScreen.show();
}

modalMainScreen.AddEditGroup = function (group) {
  let h3 = group ? "Edit Group" : "Add Group";
  let title = group ? group.title : '';
  let color = group ? group.color : Utils.randHexColor();
  let id = group ? group.groupID : "none";

  // Customize modal appearance
  $('#crud-modal label[for="name"]').text("Title");

  $('#crud-modal h3').text(h3);
  $('#crud-modal #name').attr('placeholder', 'Group name');;
  $('#crud-modal #name').val(title);

  $('#crud-modal #desc-sec').hide();
  $('#crud-modal #tags-sec').hide();
  $('#crud-modal #groups-sec').hide();
  $('#crud-modal #todo-expired-sec').hide();

  $('#crud-modal #colors').val(color);

  $('#crud-modal button[type="submit"]').html(`
    <svg class="w-5 lg:w-7 h-5 lg:h-7 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
  </svg> Edit
    `);
  $('#crud-modal button[type="submit"]').text(h3);
  $('#crud-modal #delete-sec').hide();
  if (group) {
    $('#crud-modal #delete-sec').show();
  }

  $('#crud-modal input[type="checkbox"]').attr("id", `group_${id}`);
  modalMainScreen.show();
}

modalMainScreen.getSubmitValues = function () {
  let id = $('#crud-modal input[type="checkbox"]').attr("id").split("_")[1];
  // Get all input
  let mode = $('#crud-modal input[type="checkbox"]').attr("id").split("_")[0];
  let title = $('#crud-modal #name').val();
  let desc = $('#crud-modal #description').val();
  let tag = $('#crud-modal #tags').val();
  let group = $('#crud-modal #groups').val();
  let expired = $('#crud-modal #todo-expired').val();
  let color = $('#crud-modal #colors').val();
  console.log(mode, id, title, desc, tag, expired, color);
  return { mode, id, title, desc, tag, group, expired, color };
}

// Close modal manually
$('#btn-close-modal').click(function () {
  modalMainScreen.hide();
});

//================================================================\\
//=========================== Export  ============================\\
//================================================================\\
export { modalMainScreen };