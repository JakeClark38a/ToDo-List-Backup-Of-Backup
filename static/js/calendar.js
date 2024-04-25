$(document).ready(function() {
  const calendar = $(".calendar"),
      date = $(".date"),
      daysContainer = $(".days"),
      prev = $(".prev"),
      next = $(".next"),
      todayBtn = $(".today-btn"),
      gotoBtn = $(".goto-btn"),
      dateInput = $(".date-input"),
      eventDay = $(".event-day"),
      eventDate = $(".event-date"),
      tasksContainer = $(".events"),
      addEventBtn = $(".add-event"),
      addEventWrapper = $(".add-event-wrapper"),
      addEventCloseBtn = $(".close"),
      addEventTitle = $(".event-name"),
      addEventFrom = $(".event-time-from"),
      addEventTo = $(".event-time-to"),
      addEventDescription = $(".event-description"),
      addEventSubmit = $(".add-event-btn");

  let today = new Date();
  let activeDay;
  let month = today.getMonth();
  let year = today.getFullYear();

  const months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  const eventsArr = [];
  getEvents();
  console.log(eventsArr);

  function initCalendar() {
      console.log("initCalendar");
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const prevLastDay = new Date(year, month, 0);
      const prevDays = prevLastDay.getDate();
      const lastDate = lastDay.getDate();
      const day = firstDay.getDay();
      const nextDays = 7 - lastDay.getDay() - 1;

      date.html(months[month] + " " + year);

      let days = "";

      for (let x = day; x > 0; x--) {
          days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
      }

      for (let i = 1; i <= lastDate; i++) {
          let event = false;
          eventsArr.forEach((eventObj) => {
              if (
                  eventObj.day === i &&
                  eventObj.month === month + 1 &&
                  eventObj.year === year
              ) {
                  event = true;
              }
          });
          if (
              i === new Date().getDate() &&
              year === new Date().getFullYear() &&
              month === new Date().getMonth()
          ) {
              activeDay = i;
              getActiveDay(i);
              updateEvents(i);
              if (event) {
                  days += `<div class="day today active event">${i}</div>`;
              } else {
                  days += `<div class="day today active">${i}</div>`;
              }
          } else {
              if (event) {
                  days += `<div class="day event">${i}</div>`;
              } else {
                  days += `<div class="day ">${i}</div>`;
              }
          }
      }

      for (let j = 1; j <= nextDays; j++) {
          days += `<div class="day next-date">${j}</div>`;
      }
      daysContainer.html(days);
      addListner();
  }

  function prevMonth() {
      month--;
      if (month < 0) {
          month = 11;
          year--;
      }
      initCalendar();
  }

  function nextMonth() {
      month++;
      if (month > 11) {
          month = 0;
          year++;
      }
      initCalendar();
  }

  prev.on("click", prevMonth);
  next.on("click", nextMonth);

  initCalendar();

  function addListner() {
      $(".day").on("click", function(e) {
          getActiveDay($(this).html());
          updateEvents(Number($(this).html()));
          activeDay = Number($(this).html());
          $(".day").removeClass("active");
          if ($(this).hasClass("prev-date")) {
              prevMonth();
              setTimeout(() => {
                  $(".day").each(function() {
                      if (!$(this).hasClass("prev-date") && $(this).html() === e.target.innerHTML) {
                          $(this).addClass("active");
                      }
                  });
              }, 100);
          } else if ($(this).hasClass("next-date")) {
              nextMonth();
              setTimeout(() => {
                  $(".day").each(function() {
                      if (!$(this).hasClass("next-date") && $(this).html() === e.target.innerHTML) {
                          $(this).addClass("active");
                      }
                  });
              }, 100);
          } else {
              $(this).addClass("active");
          }
      });
  }

  todayBtn.on("click", () => {
      today = new Date();
      month = today.getMonth();
      year = today.getFullYear();
      initCalendar();
  });

  dateInput.on("input", function(e) {
      $(this).val($(this).val().replace(/[^0-9/]/g, ""));
      if ($(this).val().length === 2) {
          $(this).val($(this).val() + "/");
      }
      if ($(this).val().length > 7) {
          $(this).val($(this).val().slice(0, 7));
      }
      if (e.inputType === "deleteContentBackward") {
          if ($(this).val().length === 3) {
              $(this).val($(this).val().slice(0, 2));
          }
      }
  });

  gotoBtn.on("click", gotoDate);

  function gotoDate() {
      const dateArr = dateInput.val().split("/");
      if (dateArr.length === 2) {
          if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
              month = dateArr[0] - 1;
              year = dateArr[1];
              initCalendar();
              return;
          }
      }
      alert("Invalid Date");
  }

  function getActiveDay(date) {
      const day = new Date(year, month, date);
      const dayName = day.toString().split(" ")[0];
      eventDay.html(dayName);
      eventDate.html(date + " " + months[month] + " " + year);
  }

  function updateEvents(date) {
      let events = "";
      eventsArr.forEach((event) => {
          if (
              date === event.day &&
              month + 1 === event.month &&
              year === event.year
          ) {
              event.events.forEach((event) => {
                  events +=
                      `<div class="event task-container-calendar">
                      <div class="time-display">${event.time}</div>
                      <div class="task-information">
                          <div class="task-title">${event.title}</div>
                          <div class="task-description">${event.description}</div> 
                          <div class="tags-display">
                              <div class="tag-important">important</div>
                              <div class="tag-urgent">urgent</div>
                          </div>
                      </div>
                  </div>`;
              });
          }
      });
      if (events === "") {
          events = `<div class="no-event">
                  <h3>No Events</h3>
              </div>`;
      }
      tasksContainer.html(events);
      saveEvents();
  }

  tasksContainer.on("click", function(e) {
      if ($(e.target).hasClass("event")) {
          if (confirm("Are you sure you want to delete this event?")) {
              const eventTitle = $(e.target).find(".task-title").html();
              eventsArr.forEach((event) => {
                  if (
                      event.day === activeDay &&
                      event.month === month + 1 &&
                      event.year === year
                  ) {
                      event.events.forEach((item, index) => {
                          if (item.title === eventTitle) {
                              event.events.splice(index, 1);
                          }
                      });
                      if (event.events.length === 0) {
                          eventsArr.splice(eventsArr.indexOf(event), 1);
                          const activeDayEl = $(".day.active");
                          if (activeDayEl.hasClass("event")) {
                              activeDayEl.removeClass("event");
                          }
                      }
                  }
              });
              updateEvents(activeDay);
          }
      }
  });

  function saveEvents() {
      localStorage.setItem("events", JSON.stringify(eventsArr));
  }

  function getEvents() {
      if (localStorage.getItem("events") === null) {
          return;
      }
      eventsArr.push(...JSON.parse(localStorage.getItem("events")));
  }

  function convertTime(time) {
      let timeArr = time.split(":");
      let timeHour = timeArr[0];
      let timeMin = timeArr[1];
      let timeFormat = timeHour >= 12 ? "PM" : "AM";
      timeHour = timeHour % 12 || 12;
      time = timeHour + ":" + timeMin + " " + timeFormat;
      return time;
  }
});
