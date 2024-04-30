$(document).ready(function () {
    var Dict = {  // sample dict
        username: "JakeClark",
        userid: "User ID",
        bio: "hmm...",
        timeZone: "Asia/Tokyo",
        displayLocalTimeZone: false,
        localTimeZoneName: "UTC",

        groups: {
            gid001: {
                title: "Do",
                tags: ["tag1"],
                def_tag: "do",
                color: "#7aa5cf",
                current_html: "",
            },
            gid002: {
                title: "Delegate",
                tags: ["tag2"],
                def_tag: "delegate",
                color: "#63c074",
                current_html: "",
            },
            gid003: {
                title: "Schedule",
                tags: ["tag3", "tag5"],
                def_tag: "schedule",
                color: "#ac7acf",
                current_html: "",
            },
            gid004: {
                title: "Later",
                tags: ["tag4"],
                def_tag: "later",
                color: "#c5e875",
                current_html: "",
            },
        },
        tasks: {
            id001: {
                title: "Meeting",
                description: "About making a website",
                tag: "tag1",
                deadline: "2024-04-22T12:00",
                points: 4,
            },
        },
        completed: {
            id003: {
                title: "Journaling",
                description: "About making a website",
                tag: "tag1",
                deadline: "2024-04-22T12:00",
                points: 5,
            },
        },
        tags: {

            do: {
                title: "Do",
                color: "#7aa5cf",
                groupId: "gid001",
                deleteable: false,
                editable: false,
                display: false,
            },
            delegate: {
                title: "Delegate",
                color: "#63c074",
                groupId: "gid002",
                deleteable: false,
                editable: false,
                display: false,
            },
            schedule: {
                title: "Schedule",
                color: "#ac7acf",
                groupId: "gid003",
                deleteable: false,
                editable: false,
                display: false,
            },
            later: {
                title: "Later",
                color: "#c5e875",
                groupId: "gid004",
                deleteable: false,
                editable: false,
                display: false,
            },
            tag1: {
                title: "tag1",
                color: "#7aa5cf",
                groupId: "gid001",
                deleteable: true,
                editable: true,
                display: true,

            },
            tag2: {
                title: "tag2",
                color: "#63c074",

                groupId: "gid002",
                deleteable: true,
                editable: true,
                display: true,

            },
            tag3: {
                title: "tag3",
                color: "#ac7acf",

                groupId: "gid003",
                deleteable: true,
                editable: true,
                display: true,

            },
            tag4: {
                title: "tag4",
                color: "#c5e875",

                groupId: "gid004",
                deleteable: true,
                editable: true,
                display: true,

            },
            tag5: {
                title: "tag5",
                color: "#f7d38c",

                groupId: "gid003",
                deleteable: true,
                editable: true,
                display: true,

            },
            none: {
                title: "none",
                color: "#ffffff",

                deleteable: false,
                editable: false,
                display: false,

            }
        }
    };
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
        date.html(months[month] + " " + year);
        daysContainer.html("");
        let days = new Date(year, month + 1, 0).getDate();
        let firstDayIndex = new Date(year, month).getDay();
        let prevLastDay = new Date(year, month, 0).getDate();
        let lastDayIndex = new Date(year, month, days).getDay();
        let nextDays = 7 - lastDayIndex - 1;

        let prevDays = "";
        for (let x = firstDayIndex+2; x > 0; x--) {
            prevDays += `<div class="day prev-date">${prevLastDay - x + 1}</div>`;
        }

        let currentDays = "";
        for (let i = 1; i <= days; i++) {
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                currentDays += `<div class="day active">${i}</div>`;
            } else {
                currentDays += `<div class="day">${i}</div>`;
            }
        }

        let nextDaysStr = "";
        for (let j = 1; j <= nextDays; j++) {
            nextDaysStr += `<div class="day next-date">${j}</div>`;
        }

        // Add empty placeholders for previous month's days if necessary
        if (firstDayIndex === 0) {
            prevDays += `<div class="day prev-date">${prevLastDay}</div>`;
        }

        // Add empty placeholders for next month's days if necessary
        if (lastDayIndex === 6) {
            nextDaysStr += `<div class="day next-date">${nextDays + 1}</div>`;
        }

        daysContainer.html(prevDays + currentDays + nextDaysStr);
        addListner();
        updateEvents(today.getDate());
    }


    function prevMonth() {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        initCalendar();
    }

    initCalendar();

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
        $(".day").on("click", function (e) {
            getActiveDay($(this).html());
            updateEvents(Number($(this).html()));
            activeDay = Number($(this).html());
            $(".day").removeClass("active");
            if ($(this).hasClass("prev-date")) {
                prevMonth();
                setTimeout(() => {
                    $(".day").each(function () {
                        if (!$(this).hasClass("prev-date") && $(this).html() === e.target.innerHTML) {
                            $(this).addClass("active");
                        }
                    });
                }, 100);
            } else if ($(this).hasClass("next-date")) {
                nextMonth();
                setTimeout(() => {
                    $(".day").each(function () {
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

    dateInput.on("input", function (e) {
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

    tasksContainer.on("click", function (e) {
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

    function convertObjectToArr(tasks) {
        // Convert tasks to eventsArr
        const eventsArr = [];

        // Iterate through each task
        for (const taskId in tasks) {
            if (tasks.hasOwnProperty(taskId)) {
                const task = tasks[taskId];

                // Extract deadline information
                const deadline = new Date(task.deadline);
                const day = deadline.getDate();
                const month = deadline.getMonth();
                const year = deadline.getFullYear();

                // Check if an event object already exists for this day, month, and year
                let eventObj = eventsArr.find(
                    (event) => event.day === day && event.month === month + 1 && event.year === year
                );

                // If no event object exists, create a new one
                if (!eventObj) {
                    eventObj = {
                        day: day,
                        month: month + 1, // Adjust month to start from 1
                        year: year,
                        events: [],
                    };
                    eventsArr.push(eventObj);
                }

                // Add the task as an event to the event object
                eventObj.events.push({
                    title: task.title,
                    time: deadline.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    description: task.description,
                    tag: task.tag, // Assuming the tag is relevant for the event
                });
            }
        }
        return eventsArr;
    }
    // Use AJAX to load dict from server to client
    function AJAXLoadGroup() {
        // Send AJAX request to backend at /todo/update to update task
        $.ajax({
            type: "GET",
            url: "/todo/group/get",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log("Loading userdata");
                let tempDict = {};
                data.forEach((dt) => {
                    let tmp = {
                        title: dt[1],
                        tags: [dt[2]],
                        def_tag: dt[0],
                        color: dt[3],
                        current_html: "",
                    };

                    if (!Dict.tags.hasOwnProperty(tmp.def_tag)) { // add def_tag
                        Dict.tags[tmp.def_tag] = {
                            title: "Default",
                            color: "#000000",
                            display: false,
                            editable: false,
                            deletable: false,
                        }
                    }

                    tmp.tags.forEach((t, i) => { // add other tags
                        if (!Dict.tags.hasOwnProperty(t)) {
                            Dict.tags[t] = {
                                title: "no_name_" + tmp.title + "_" + i, // Adding index to title
                                color: "#ffffff",
                                display: true,
                                editable: true,
                                deletable: true,
                            };
                        }
                    });


                    Dict.groups[dt[0]] = tmp;
                    //tempDict.groups[dt[0]] = tmp;
                });

                console.log("AJAX Load Group", Dict);
                console.log("Load data complete")

            },
            error: function (data) {
                console.log("Error");
            }
        });
    }
    // Change getEvents function to get dict from server, convert dict object to eventsArr
    function getEvents() {
        if (localStorage.getItem("events") === null) {
            return;
        }
        AJAXLoadGroup();
        eventsArr.push(...convertObjectToArr(Dict.tasks));

        // eventsArr.push(...JSON.parse(localStorage.getItem("events")));
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