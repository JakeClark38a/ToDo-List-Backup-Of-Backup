import { ajaxHandler } from './ajaxHandler.js';
import { MainScreen } from './hmtlComponent.js';
import { modalMainScreen } from './CRUDmodal_handler.js';
import { updateMMenuTabIndicator } from "./updateMMenu.js";

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
            deadline: "2024-05-07T11:17",
            points: 4,
        },
        id002: {
            title: "Crying",
            description: "About making a website",
            tag: "tag3",
            deadline: "2024-06-17T11:17",
            points: 4,
        },
        id004: {
            title: "Laughing",
            description: "About making a website",
            tag: "tag5",
            deadline: "2024-04-04T11:17",
            points: 4,
        },
    },
    completed: {
        id003: {
            title: "Journaling",
            description: "About making a website",
            tag: "tag1",
            deadline: 62783,
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
// Convert month to number
let monthDict = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12,
};
// Function to combine day, month, year to format: March 7th, 2024
const combineMonth = function (day, month, year) {
    // Add st, nd, rd, th to day
    if (day == 1 || day == 21 || day == 31) {
        day += "st";
    } else if (day == 2 || day == 22) {
        day += "nd";
    } else if (day == 3 || day == 23) {
        day += "rd";
    } else {
        day += "th";
    }
    // Convert back month number to month name
    for (var key in monthDict) {
        if (monthDict[key] == month) {
            month = key;
            break;
        }
    }
    // Return as: March 7th, 2024
    return month + " " + day + ", " + year;
}
// Function to get day, month, year from focused datepicker-cell
const pickDate = function () {
    var day = undefined;
    // Get day from focused datepicker-cell
    $("#calendar .datepicker-cell").each(function () {
        if ($(this).hasClass("focused")) {
            day = $(this).text();
        }
    });

    // depends on textContent of button with class "text-sm" to get month and year
    // if it contains both text and number (<month> <year>), output month and year
    // if it contains only number (<year>), output year
    // if it contains range of number (<year>-<year>), output range of year
    var text = $("button.view-switch").text();
    var month = text.split(" ")[0];
    var year = text.split(" ")[1];

    // Convert month to number
    month = monthDict[month];

    return [day, month, year];
}
// Function to get all tasks that have deadline on focused day
const getTask = function (day, month, year) {
    // Get all tasks that have deadline on focused day (in args)
    // Return as array of tasks ID
    var tasks = [];
    for (var task in Dict.tasks) {
        var deadline = new Date(Dict.tasks[task].deadline);
        // console.log(deadline, deadline.getDate(), deadline.getMonth(), deadline.getFullYear());
        if (deadline.getDate() == day && deadline.getMonth() + 1 == month && deadline.getFullYear() == year) {
            tasks.push(task);
            // console.log("Task", task);
        }
    }
    return tasks;
}
// Function to get all days that have deadline before today
const getExpiredDays = function (month, year) {
    // Get all days that have deadline in month and year
    // Steps: Get deadline of each task, if it is in month and year, add its day to array
    // Return as array of days
    var days = {};
    for (var task in Dict.tasks) {
        var deadline = new Date(Dict.tasks[task].deadline);
        if (deadline.getMonth() + 1 == month && deadline.getFullYear() == year && Dict.tasks[task].isCompleted == false) {
            days[deadline.getDate()] = true;
        }
    }
    console.log("Days", days);
    return days;
}
// Function to change color of days that have deadline before today
const changeExpiredColor = (days) => {
    // Change color of days that have deadline before today
    // to red

    // Because Flowbite datepicker design calendar with 6 rows,
    // if colored days from 22 to 31 and in first row, don't change color
    // if colored days from 1 to 13 and in 5th and 6th row, don't change color
    // else, change color to red

    // Get all div with class datepicker-cell
    // if day is in days, change color to red
    // else, change color to default
    let countCell = 0;
    $("#calendar span.datepicker-cell").each(function () {
        // Take day from text content of div
        var day = parseInt($(this).text());
        // Make outside days gray
        // if (day >= 22 && countCell < 7) {
        //     $(this).css("color", "gray");
        // } else if (day <= 13 && countCell > 28) {
        //     $(this).css("color", "gray");
        // }
        // Change color of days that have deadline
        if (days[day]) {
            if (day >= 22 && countCell < 7) {
                $(this).css("color", "");
            } else if (day <= 13 && countCell > 28) {
                $(this).css("color", "");
            } else {
                $(this).css("color", "red");
            }
        } else {
            $(this).css("color", "");
        }
        countCell++;
    });

}

// All steps:
// Step 1: Load Dict using AJAX - todo - done
// Step 2: Get date from focused datepicker-cell using pickDate() - done
// Step 3: Take Dict.tasks and use getTask() to get all taskID need to be displayed - done
// Step 4: Show all tasks taken in step 3 using appendTask() - todo
// Step 5: Handle click on tasks - including edit, complete and delete - todo

// Use jQuery

// Function to load data from server
var Dict = {};
const loadDict = function () {
    return new Promise(function (resolve) {
        $.when(ajaxHandler.LoadUserData()).done(function (data) {
            console.log("Dict: ", data);
            Dict = data;
            resolve(Dict);
        })
    });
}

// Function to append tasks to Task-Section
const appendTask = function (Dict, day, month, year) {
    $("#Task-Section").empty();

    for (let taskId in Dict.tasks) {
        var deadline = new Date(Dict.tasks[taskId].deadline);
        if (deadline.getDate() == day && deadline.getMonth() + 1 == month && deadline.getFullYear() == year && Dict.tasks[taskId].isCompleted == false) {
            console.log("append task: ", taskId, Dict.tasks[taskId]);
            $("#Task-Section").append(MainScreen.TaskTemplate(taskId, Dict.tasks[taskId]));
        }
    }

    // Also remove all task edit, delete and complete button
    // $(".Task-Edit").hide();
    // $("#Task-Cancel").hide();
    // $("#Task-Destroyer").hide();
}

// Function to map datepicker to table
const mapDatepickerToTable = function () {
    // Map datepicker #calendar to #CalendarTable
    // Get all div with class dow
    $('#calendar span.dow').each(function () {
        // Clone the cell
        var clonedCell = $(this).clone();

        // Find the index of the current cell in the total 42 cells
        var index = $("#calendar span.dow").index($(this));

        // Find the corresponding cell in the calendar table and fill it with the cloned cell
        $('#CalendarTable #Weekday td:eq(' + index + ')').html(clonedCell);
    })
    // Get all div with class datepicker-cell
    let countCell = 0;
    $("#calendar span.datepicker-cell").each(function () {
        // Clone the cell
        var clonedCell = $(this).clone();
        // Clear all classes and color
        clonedCell.attr('class', '');
        clonedCell.css('color', '');
        clonedCell.addClass('text-left datepicker-cell dark:text-white text-gray-800');
        // Find the index of the current cell in the total 42 cells
        var index = $("#calendar span.datepicker-cell").index($(this));

        // Calculate the row and column index in the calendar table
        var rowIndex = Math.floor(index / 7); // Add 1 because index starts from 0
        var colIndex = index % 7;

        // console.log("Index", index, "Row", rowIndex, "Col", colIndex);

        // Find the corresponding cell in the calendar table and fill it with the cloned cell
        $('#CalendarTable tr.week:eq(' + rowIndex + ') td:eq(' + colIndex + ')').html(clonedCell);

        // Add tooltip into #CalendarTable 
        // With each day in #CalendarTable, find all tasks that have deadline on that day, then show its title in tooltip truncated

        // Get day, month, year from current datepicker-cell 
        let day = clonedCell.text();
        let month = $("button.view-switch").text().split(" ")[0];
        month = monthDict[month];
        if (day >= 22 && countCell < 7) {
            month--;
        } else if (day <= 13 && countCell > 28) {
            month++;
        } else {
            // nope
        }
        let year = parseInt($("button.view-switch").text().split(" ")[1]);
        // console.log("Tooltip", day, month, year, getTask(day, month, year));
        if (getTask(day, month, year).length > 0) {
            for (let taskId of getTask(day, month, year)) {
                if (Dict.tasks[taskId].isCompleted == false)
                    showTooltipInTable(Dict, taskId, rowIndex, colIndex);
            }
        }
        countCell++;
    });

    // Clone $("button.view-switch").text()
    var clonedText = $("button.view-switch").clone();
    // Disable clock by hiding it
    $('#clock').hide();
    // If #month already exists, don't create new one
    if (!$('#month').length) {
        $('#clock').after('<div id="month"></div>');
    }
    // Clone the text, also change class from text-sm to text-xl
    $('#month').html(clonedText).children().first().removeClass("text-sm view-switch").addClass("text-xl");
}

/*
Sample bottom tooltip:
<button data-tooltip-target="tooltip-bottom" data-tooltip-trigger="click" data-tooltip-placement="bottom" type="button" class="ms-3 mb-2 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Task title</button>

<div id="tooltip-bottom" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
    <h3>Task title</h3>
    <p>
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        Deadline: 2024-05-07T11:17
    </p>
    <p>
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/>
        </svg>
        Description: About making a website
    </p>
    <p>
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"/>
        </svg>
        Tags: tag1
    </p>
    <p>
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"/>
        </svg>
        Group: Do
    </p>
    <div class="tooltip-arrow" data-popper-arrow></div>
</div>
*/

const tooltipTemplate = function (taskId, task) {
    const date = new Date(task.deadline);
    const localDate = date.toLocaleString();
    
    return (`
    <button data-tooltip-target="tooltip-bottom-${taskId}" data-tooltip-placement="bottom" type="button" class="truncate text-left mb-2 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full">${task.title}</button>
    <div id="tooltip-bottom-${taskId}" role="tooltip" class="max-w-[50vw] absolute z-50 inline-block invisible px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        <p class="text-xl">${task.title}</p>
        <p>
            <svg class="w-6 h-6 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            Deadline: ${localDate}
        </p>
        <p>
            <svg class="w-6 h-6 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/>
            </svg>
            Description: ${task.description}
        </p>
        <p>
            <svg class="w-6 h-6 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"/>
            </svg>
            Tags: ${Dict.tags[task.tag].title}
        </p>
        <p>
            <svg class="w-6 h-6 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"/>
            </svg>
            Group: ${Dict.groups[Dict.tags[task.tag].groupId].title}
        </p>
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    `);
}
// Function to refresh tooltip table by removing all tooltips and buttons
const refreshTooltipTable = function () {
    $('#CalendarTable button[data-tooltip-placement="bottom"]').remove();
    $('#CalendarTable div[role="tooltip"]').remove();
}
// Function to refresh task section by use .load() to reload #Task-Section
const refreshTaskSection = function () {
    $("#Task-Section").empty();
}
// Function to show tooltip in table with taskId and Dict at row, col
const showTooltipInTable = function (Dict, taskId, row, col) {
    // With each day in #CalendarTable, find all tasks that have deadline on that day, then show its title in tooltip truncated
    // When click on that tooltip, show full description of the task
    // Tooltip will show deadline, description, tags, group of the task

    // Append tooltip to #CalendarTable at row, col with Dict and taskId
    $(`#CalendarTable tr.week:eq(${row}) td:eq(${col})`).append(tooltipTemplate(taskId, Dict.tasks[taskId]));
    // Add event listener to show tooltip when click on button (because Flowbite tooltip is very LỎD)
    $(`#CalendarTable button[data-tooltip-target="tooltip-bottom-${taskId}"]`).click(function () { });
    const $targetEl = document.querySelector(`#CalendarTable #tooltip-bottom-${taskId}`);
    const $triggerEl = document.querySelector(`#CalendarTable button[data-tooltip-target="tooltip-bottom-${taskId}"]`);
    console.log("Target", $targetEl, "Trigger", $triggerEl);
    const tooltip = new Tooltip($targetEl, $triggerEl, {
        triggerType: "click",
    });
}

const refreshOnDelay = function () {
    // remove all tooltips and button
    refreshTooltipTable();
    refreshTaskSection();
    // update calendar table
    mapDatepickerToTable();

    let date = pickDate();
    // set timeout to wait for focused class to be added
    changeExpiredColor(getExpiredDays(date[1], date[2]));
    $("#Task-Group-Title").text(combineMonth(...pickDate()));
    appendTask(Dict, date[0], date[1], date[2]);
}
// Event handler for clicking on submit button in crud-modal
$("#crud-modal #submit-sec").on("click", function (e) {
    // Just use location.reload() on calendar page
    if ($("#calendar").length > 0) {
        //location.reload();
    }
});
// Event handler for resizing window: If screen width is greater than 768px, show calendar table, else hide it
$(window).resize(function () {
    if ($(window).width() > 768) {
        $("#CalendarTable").parent().removeClass("hidden");
    } else {
        $("#CalendarTable").parent().addClass("hidden");
    }
})



function RefreshAllCalendar() {
    updateMMenuTabIndicator();
    refreshOnDelay();

    $.when(loadDict()).done(function (data) {
        // set initial date for #calendar is today
        // format: MM/DD/YYYY'
        Dict = data;
        console.log('[6] Load data to calendar successfully!');
        console.log(Dict);
        // remove all tooltips and button
        // refreshTooltipTable();
        // refreshTaskSection();
        // Get date from focused datepicker-cell
        refreshOnDelay();
        // console.log(getTask(...date));

        // mapDatepickerToTable(); // reset all?
        // with each div with class datepicker-cell, find "focused" class
        // if found, console log text content of the element
        // refresh each time user click datepicker-cell
        $("#Task-Group-Title").text(combineMonth(...pickDate()));
        $("#calendar .datepicker-cell, #calendar button.prev-btn, #calendar button.next-btn").click(function () {
            // remove all tooltips and button after 50ms to make sure Flowbite datepicker has updated
            setTimeout(refreshOnDelay, 50);
        });

    });
}

$(document).ready(function () {
    // If screen width is greater than 768px, show calendar table
    // else hide it
    if ($(window).width() > 768) {
        $("#CalendarTable").parent().removeClass("hidden");
    } else {
        $("#CalendarTable").parent().addClass("hidden");
    }
    //$("#CalendarTable").parent().addClass("hidden");
    // refreshTooltipTable();

    //Remove task
    $("#Task-Section").on("click", "#Task-Cancel", function (e) {
        var task_ = $(this).closest(".task-outer");
        var taskId = task_.attr("id");

        // Send ajaxHandler. request to backend at /todo/delete to delete task
        ajaxHandler.deleteTask(taskId);

        delete Dict.tasks[taskId];
        console.log("Cancelled: " + taskId);
        //console.log(Dict.tasks);

        task_.toggleClass("transform transition-all duration-350 delay-75 ease-in-out scale-0 blur-md translate-y-20");
        RefreshAllCalendar();
        setTimeout(() => {
            task_.remove();
        }, 400);
    });

    // Complete task
    $("#Task-Section").on("click", "#Task-Destroyer", function () {
        var task_ = $(this).closest(".task-outer");
        var taskId = task_.attr("id");

        // Disable the checkbox
        $(this).prop("disabled", true);

        console.log("Completed: " + taskId);
        Dict.tasks[taskId].isCompleted = true;

        // Also send to backend at /todo/completed/<id>
        ajaxHandler.completeTask(taskId);
        RefreshAllCalendar();
        task_.toggleClass(" transform transition-all duration-350 delay-500 ease-in-out scale-150 blur-xl -translate-y-20");
        setTimeout(() => {
            task_.remove();
        }, 800);
    });

    $('#Task-Section').on("click", ".Task-Edit", function (e) {
        e.preventDefault();
        modalMainScreen.LoadGroups(Dict);
        modalMainScreen.LoadTags(Dict);
        modalMainScreen.AddEditTask(Dict.tasks[$(this).closest(".task-outer").attr("id")]);

        e.stopPropagation();
    })

    RefreshAllCalendar();

});
export { RefreshAllCalendar };