//=====================================================================\\
/* 
NOTICE:
This file handles all the actions that are related to the main content of the page
This file handle:
    - Main Screen HTML Element
    - Main Menu HTML Element

*/
//=====================================================================\\
//================================================================\\
//=========================== Main Screen ========================\\
//================================================================\\
import { Utils } from "./userData.js";

const MainScreen = {};
MainScreen.TagTemplate = function (id, tag, mode = 0) {
    if (mode == 0) {
        return (
            `
        <div id="` +
            id +
            `" class="rounded-md text-center min-w-12 font-base text-xs border-none dark:text-white shadow-lg cursor-pointer">` +
            tag.title +
            `</div>                
        `
        );
    }
};

function convertTime(ms) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
}

MainScreen.TaskTemplate = function (id, task, mode = 0) {

    let timeLeftMs = new Date(task.deadline).getTime() - Date.now();
    const timeLeft = convertTime(timeLeftMs);
    let timeLeftStr = `${timeLeft.days}d: ${timeLeft.hours}h: ${timeLeft.minutes}m left`
    if (timeLeftMs <= 0) timeLeftStr = "Due now!";

    if (mode == 0) {
        return (
            ` 

        <div id="` +
            id +
            `" class="task-outer bg-main dark:bg-dark/50 rounded-xl cursor-default">
        <div class=" rounded-lg shadow-lg">

            <div class=" px-2 py-1 flex justify-between items-center border-b-[2px]">

                <div class="font-semibold text-lg lg:text-xl truncate w-full dark:text-white ">` +
            task.title +
            `</div>


                <div class="flex items-center gap-2">
                    <div class="Task-Edit mx-1 cursor-pointer">
                        <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5"
                                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                        </svg>
                    </div>


                    <div id="Task-Cancel"
                        class="bg-red-500 rounded-full shadow-lg h-4 w-4 lg:h-6 lg:w-6 font-bold cursor-pointer"></div>
                </div>
            </div>

            <div class="p-2 flex items-center h-fit">

                <p class="h-full w-full text-left p-2 font-base truncate lg:text-xl dark:text-white">` +
            task.description +
            `</p>

                <input id="Task-Destroyer" type="checkbox"
                    class="bg-primary-200 rounded-xl shadow-lg h-4 w-4 font-bold border-none cursor-pointer"></input>
            </div>
            
            <div id="Task-Tag" class=" p-2 flex gap-2 overflow-hidden font-medium">
                <div class="flex justify-end">
                    <span class="text-sm font-medium text-blue-700 dark:text-white">`+ timeLeftStr + `</span>
                </div>
            </div>
        </div>

    </div>
`
        );
    } else if (mode == 1) {
        return (
            `
            <div id="` +
            id +
            `" class="task-outer">
                <div class=" rounded-lg h-20 lg:h-32 border-2 border-slate-700 ">
                    <div class=" px-2 flex justify-between items-center border-b-2 border-slate-700">
                        <div class="font-bold text-xl lg:text-2xl">` +
            task.title +
            `</div>
                        <div id="Task-Cancel" class="bg-red-500 rounded-full h-4 w-4 font-bold cursor-pointer"></div>
                    </div>
                    <div class="p-2 flex justify-between items-center lg:h-24">
                        <div class="text-center lg:text-xl">` +
            task.description +
            `</div>
                        <input id="Task-Destroyer" type="checkbox" class="bg-primary-200 rounded-xl h-4 w-4 font-bold border-none cursor-pointer"></input>
                    </div>

                </div>

            </div>
            `
        );
    }
};

MainScreen.GroupTemplate = function (id, group, mode = 0) {
    if (mode == 0) {
        return (
            `
    <div id="` +
            id +
            `" class="group-outer">
        <div class="flex justify-between items-center px-3 ">
        <div id="Task-Group-Title" class="todobox-title lg:text-2xl dark:text-white">` +
            group.title +
            `</div>
        <div class="Group-Task-Add ">
                <svg class="w-6 lg:w-7 h-6 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7 7V5" />
                </svg>
            </div>
        </div>
        <div id="Task-Section-Outer" class= "bg-main/55 dark:bg-gray-700/80 transition-all duration-300 ease-in-out border-t-8 pt-4 p-2 overflow-hidden shadow-xl hover:shadow-2xl rounded-xl ">
            <div id="Task-Section" class="relative px-2 pb-9 flex flex-col gap-3 overflow-y-auto overflow-x-hidden rounded-xl w-72 h-72 lg:w-96 lg:h-96">
            <!--task here-->
            </div>
        </div>
    </div>
    
    `
        );
    } else if (mode == 1) {
        return (
            `
    <!-- Item  -->

    <div id="` +
            id +
            `" data-carousel-item class="flex flex-col items-center overflow-x-hidden ease-in-out duration-700 z-0">
        <div id="Task-Group-Title" class="text-center">` +
            group.title +
            `</div>
        <div id="" class="Task-Section border-primary-100 w-80 h-96 border-2" >
        <!-- Contents -->
        
        </div>
    </div>
    `
        );
    }
};

MainScreen.FormatterTemplate = function (mode = 0) {
    if (mode == 0) {
        return `
    <div id="Main-Formatter" class="relative w-full">
        <div id="Wrapper" class="relative flex flex-wrap justify-center items-center gap-8 py-10 lg:px-36">
        <!--Group-->
        </div>
    </div>
    `;
    } else if (mode == 1) {
        return `
        <!-- Main List -->
        <div id="Main-Formatter" class="relative w-full bg-red-300" data-carousel="static">
        <!-- Carousel wrapper -->
        <div id="Wrapper" class="relative h-96 mt-[3vh] overflow-hidden">


        </div>
    </div>`;
    }
};

MainScreen.FormmatterAddons = function (mode = 0) {
    if (mode == 0) {
    } else if (mode == 1) {
        return `
        
        <!-- Slider controls -->
        <div class="slider z-10">
            <button type="button"
                class="absolute top-1/2 z-30 flex items-start justify-center h-auto px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev>
                <span
                    class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="1.5" d="M5 1 1 5l4 4" />
                    </svg>
                    <span class="sr-only">Previous</span>
                </span>
            </button>
            <button type="button"
                class="absolute top-1/2 right-0 z-30 flex items-start justify-center h-auto px-4 cursor-pointer group focus:outline-none"
                data-carousel-next>
                <span
                    class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="1.5" d="m1 9 4-4-4-4" />
                    </svg>
                    <span class="sr-only">Next</span>
                </span>
            </button>
        </div>
        `;
    }
}


MainScreen.AddFloatButton = function (isActive = true) {
    return isActive ? (`
    <!-- add question action button here-->
    <div id="add-draggable"  class="z-30 absolute">
        <div  class="touch-none select-none">
            <div id="moveButton" 
                class="hover:w-12 hover:h-12 border-2 border-gray-300 absolute rounded-full w-12 h-12 bg-main/55 dark:bg-gray-700/60 backdrop-blur-sm shadow-xl p-2">
                <svg class="w-full h-full text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7 7V5" />
                </svg>
            </div>
        </div>
    </div>
    <!-- kết thúc phần nút -->
    `) : null;
}

//================================================================\\
//=========================== Main Menu ==========================\\
//================================================================\\

const MainMenu = {};
MainMenu.TagTempplate = function (id, tag) {
    return (
        `
    
    <div id="` +
        id +
        `" class="MMenu-Tag flex items-center pl-8 cursor-pointer">
    <div class="h-full">
        <svg class="w-full h-full text-gray-800 dark:text-white" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z" />
        </svg>
    </div>

    <div id="MMenu-Tag-Title" class="text-lg px-1 my-1 center dark:text-white">` +
        tag.title +
        `</div>
    <div class="MMenu-Tag-Edit mx-1">
    <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
</svg>
</div>
</div>

`
    );
};

MainMenu.GroupTemplates = function (id, group) {
    return (
        `
    <div id="` +
        id +
        `" class="MMenu-Group"><!--block-->
    <!-- Greeting div, status centered -->
        <div class="flex justify-between items-center pl-3 pr-1">

            <div class="MMenu-Toggle-Hidden flex items-center w-full">
            <div class="MMenu-Dropdown-Arrow">
            <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19 9-7 7-7-7"/>
            </svg>          
            </div>

                <div id="MMenu-Group-Title" class="text-xl ml-2 dark:text-white">` +
        group.title +
        `</div>
        </div>

        <div class="MMenu-Group-Edit mx-1">
        <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
        </svg>

        </div>
        <div class="MMenu-Tag-Add">
            <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M5 12h14m-7 7V5" />
            </svg>
        </div>
    </div>
    <div id="MMenu-Tag-Section" class="">
        <!--tag-->
    </div>
</div><!--eoblock-->`
    );
};

//================================================================\\
//=========================== Alert  =============================\\
//================================================================\\
let alert = {};
alert.Success = function (msg) {
    let uuid = Utils.getUuid();
    return {
        html: (`
    <div id="`+ uuid + `"
                class="flex items-center z-50 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert">
                <div
                    class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span class="sr-only">Check icon</span>
                </div>
                <div class="ms-3 text-sm font-normal">`+ msg + `</div>
                <button type="button" class="alert-exit ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
    `), uuid: uuid
    };
};

alert.Danger = function (msg) {
    let uuid = Utils.getUuid();
    return (`
    <div id="`+ uuid + `" class="flex items-center z-50 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
        <span class="sr-only">Error icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">`+ msg + `</div>
    <button type="button"  class="alert-exit ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
</div>
    `);
};

alert.Warning = function (msg) {
    return (`
    <div id="`+ uuid + `" class="flex items-center z-50 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
        </svg>
        <span class="sr-only">Warning icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">`+ msg + `</div>
    <button type="button"  class="alert-exit ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
</div>
    `);
};


//================================================================\\
//=========================== Export  ============================\\
//================================================================\\

export { MainScreen, MainMenu, alert };
