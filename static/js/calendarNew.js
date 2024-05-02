import { ajaxHandler } from './ajaxHandler.js';
import { MainScreen } from './hmtlComponent.js';

var sampleDict = {  // sample dict
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
const combineMonth = function(day, month, year){
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

const pickDate = function(){
    var day = undefined;
    // Get day from focused datepicker-cell
    $("#calendar .datepicker-cell").each(function() {
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

const getTask = function(day, month, year){
    // Get all tasks that have deadline on focused day (in args)
    // Return as array of tasks ID
    var tasks = [];
    for (var task in sampleDict.tasks) {
        var deadline = new Date(sampleDict.tasks[task].deadline);
        console.log(deadline, deadline.getDate(), deadline.getMonth(), deadline.getFullYear());
        if (deadline.getDate() == day && deadline.getMonth() + 1 == month && deadline.getFullYear() == year) {
            tasks.push(task);
            console.log("Task", task);
        }
    }
    return tasks;
}

const getExpiredDays = function(month, year){
    // Get all days that have deadline in month and year
    // Steps: Get deadline of each task, if it is in month and year, add its day to array
    // Return as array of days
    var days = {};
    for (var task in sampleDict.tasks) {
        var deadline = new Date(sampleDict.tasks[task].deadline);
        if (deadline.getMonth() + 1 == month && deadline.getFullYear() == year) {
            days[deadline.getDate()] = true;
        }
    }
    console.log("Days", days);
    return days;
}

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
    $("#calendar span.datepicker-cell").each(function() {
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
                $(this).css("color", "black");
            } else if (day <= 13 && countCell > 28) {
                $(this).css("color", "black");
            } else {
                $(this).css("color", "red");
            }
        } else {
            $(this).css("color", "black");
        }
        countCell++;
    });
    
} // Calendar: Saturday evening

// All steps:
// Step 1: Load Dict using AJAX - todo - done
// Step 2: Get date from focused datepicker-cell using pickDate() - done
// Step 3: Take Dict.tasks and use getTask() to get all taskID need to be displayed - done
// Step 4: Show all tasks taken in step 3 using appendTask() - todo
// Step 5: Handle click on tasks - including edit, complete and delete - todo
// Use jQuery

// Step 1 in here
// u sure? yes
var Dict = {};
const loadDict = function(){
    return new Promise(function (resolve) {
        $.when(ajaxHandler.LoadUserData()).done(function (data) {
            Dict = data;
            console.log(Dict);
            resolve(Dict);
        })
    });
}

const appendTask = function(tasks, day, month, year){
    // Append task to Task-Section-Outer
    // Steps: Get task info, create task element, append to Task-Section-Outer
    // hey, any templates? Take template from your code, about how to load task into a group, but calendar just has 1 group
    $('#Task-Section-Outer').append(MainScreen.TaskTemplate(tasks.taskID,tasks));
    /// is it correct?

    // 
    
}



$(document).ready(function() {
    // Load dict
    loadDict()
    // set initial date for #calendar is today
    // format: MM/DD/YYYY
    let date = pickDate();
    console.log(date);
    changeExpiredColor(getExpiredDays(date[1], date[2]));
    console.log(getTask(...date));
    // with each div with class datepicker-cell, find "focused" class
    // if found, console log text content of the element
    // refresh each time user click datepicker-cell
    $("#Task-Group-Title").text(combineMonth(...pickDate()));
    $("#calendar .datepicker-cell, #calendar button.prev-btn, #calendar button.next-btn").click(function() {
        date = pickDate();
        // set timeout to wait for focused class to be added
        changeExpiredColor(getExpiredDays(date[1], date[2]));
        setTimeout(function() {
            $("#Task-Group-Title").text(combineMonth(...pickDate()));
        }, 50);
    });
});