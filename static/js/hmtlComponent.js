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
            `" class="rounded-md text-center min-w-12 px-2 font-base text-xs border-none dark:text-main shadow-lg cursor-pointer">` +
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

                <div class="font-semibold text-lg lg:text-xl truncate w-max-64 dark:text-main ">` +
            task.title +
            `</div>


                <div class="flex items-center gap-2">
                    <div class="Task-Edit mx-1 cursor-pointer">
                        <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-main" aria-hidden="true"
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

                <p class="h-full w-full text-left p-2 font-base truncate lg:text-xl dark:text-main">` +
            task.description +
            `</p>

                <input id="Task-Destroyer" type="checkbox"
                    class="bg-primary-200 rounded-xl shadow-lg h-4 w-4 font-bold border-none cursor-pointer"></input>
            </div>
            
            <div id="Task-Tag" class=" p-2 flex gap-2 overflow-hidden font-medium">
                <div class="flex justify-end">
                    <span class="text-sm font-medium text-blue-700 dark:text-main">`+ timeLeftStr + `</span>
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
        <div id="Task-Group-Title" class="todobox-title lg:text-2xl text-gray-700 px-4 p-2 dark:text-main bg-white/80 dark:bg-gray-500 rounded-t-xl">` +
            group.title +
            `</div>
        <div class="Group-Task-Add">
                <svg class="w-6 lg:w-7 h-6 lg:h-7 text-gray-800 dark:text-main" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7 7V5" />
                </svg>
            </div>
        </div>
        <div id="Task-Section-Outer" class= "bg-white/80 dark:bg-gray-500 transition-all duration-300 ease-in-out border-t-8 pt-4 p-2 overflow-hidden shadow-xl hover:shadow-2xl rounded-b-xl rounded-t-lg">
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
    <div id="add-draggable"  class="z-30 left-[60%] absolute">
        <div  class="touch-none select-none">
            <div id="moveButton" 
                class="hover:w-12 hover:h-12 border-2 border-gray-300 absolute rounded-full w-12 h-12 bg-main/55 dark:bg-gray-700/60 backdrop-blur-sm shadow-xl p-2">
                <svg class="w-full h-full text-gray-800 dark:text-main" aria-hidden="true"
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
        <svg class="w-full h-full text-gray-800 dark:text-main" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z" />
        </svg>
    </div>

    <div id="MMenu-Tag-Title" class="text-lg px-1 my-1 center dark:text-main">` +
        tag.title +
        `</div>
    <div class="MMenu-Tag-Edit mx-1">
    <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-main" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
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
            <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-main" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19 9-7 7-7-7"/>
            </svg>          
            </div>

                <div id="MMenu-Group-Title" class="text-xl ml-2 dark:text-main">` +
        group.title +
        `</div>
        </div>

        <div class="MMenu-Group-Edit mx-1">
        <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-main" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
        </svg>

        </div>
        <div class="MMenu-Tag-Add">
            <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-main" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
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
    let uuid = Utils.getUuid();
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
//=========================== Chat  ==============================\\
//================================================================\\
let chatBox = {};
chatBox.waitingResponse = function () {
    return {
        sendbtn: (`
        <svg class="w-full h-full text-main rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5" />
        </svg>
        `),
        wating_sendbtn: (`
        <svg aria-hidden="true" class="w-3/4 h-3/4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor" />
            <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>

        `),
        waiting_reply: (`
    <svg fill="#c2c2c2" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-bounce"
    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 342.382 342.382" xml:space="preserve"
    stroke="#c2c2c2">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
        <g>
            <g>
            <g>
                <path
                d="M45.225,125.972C20.284,125.972,0,146.256,0,171.191c0,24.94,20.284,45.219,45.225,45.219 c24.926,0,45.219-20.278,45.219-45.219C90.444,146.256,70.151,125.972,45.225,125.972z">
                </path>
            </g>
            <g>
                <path
                d="M173.409,125.972c-24.938,0-45.225,20.284-45.225,45.219c0,24.94,20.287,45.219,45.225,45.219 c24.936,0,45.226-20.278,45.226-45.219C218.635,146.256,198.345,125.972,173.409,125.972z">
                </path>
            </g>
            <g>
                <path
                d="M297.165,125.972c-24.932,0-45.222,20.284-45.222,45.219c0,24.94,20.29,45.219,45.222,45.219 c24.926,0,45.217-20.278,45.217-45.219C342.382,146.256,322.091,125.972,297.165,125.972z">
                </path>
            </g>
            </g>
        </g>
        </g>
    </svg>
    `)
    };
};

chatBox.MessageDisplay = function (message, id = Utils.getUuid()) {
    return {
        textcontent: (`
        <p class="text-xs font-normal lg:text-base text-gray-900 dark:text-main">`+ message + `</p>
        `),
        reply: (`
        <div id='`+ id + `' class="flex items-start gap-2.5 my-2">
        <img class="w-8 h-8 rounded-full" src="../static/images/gigachad.jpg" alt="Jese image">
        <div class="flex flex-col gap-1">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <span class="text-sm font-semibold text-gray-900 dark:text-main">Chad</span>
            </div>
            <div id="chat-response"
            class="flex flex-col leading-1.5  p-4 w-full border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <p class="text-xs font-normal lg:text-base text-gray-900 dark:text-main">`+ message + `</p>
            </div>
        </div>
    </div>
        `),
        send: (`
    <div class="flex items-start justify-end gap-2.5 my-2">
        <div class="flex flex-col gap-1">
            <div class="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-semibold text-gray-900 dark:text-main">You</span>
            </div>
            <div id="chat-response"
                class="flex flex-col leading-1.5 p-4 w-full border-gray-200 bg-gray-100 rounded-s-xl rounded-br-xl dark:bg-gray-700">
                <p class="text-xs font-normal lg:text-base text-gray-900 dark:text-main">`+ message + `</p>
            </div>
        </div>
        <image class="w-8 h-8 rounded-full" src="../static/images/gigachad.jpg" alt="Jese image">
        </div>
`)
    };
}

chatBox.chatSuggestTask = function (id = Utils.getUuid(), Title, Desc, Due) {
    return (`
    <div id="` +
        id +
        `" class="suggest-task-outer mb-2 bg-main dark:bg-dark/50 rounded-xl cursor-default">
        <div class=" rounded-lg shadow-lg">

            <div class=" px-2 py-1 flex justify-between items-center border-b-[2px]">
                <div class="font-semibold text-lg lg:text-xl truncate w-full dark:text-main ">`
        +
        Title +
        `</div>
                <div id='Task-Group' class="font-semibold text-lg lg:text-xl truncate w-full dark:text-main ">
                    
                </div>
            </div>

            <div class="p-2 flex items-center h-fit">
                <p
                    class="h-full w-full text-left p-2 font-base truncate lg:text-xl dark:text-main">
                    ` +
        Desc +
        `</p>
                    <button id="`+ id + `" type="button"
                    class="suggest-task-accept bg-accent-300 rounded-xl shadow-lg h-8 w-8 font-bold border-none cursor-pointer">

                    <svg class="w-8 h-8 text-gray-800 dark:text-main" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                        </svg>

                    </button>
            </div>

            <div id="Task-Tag" class=" p-2 flex gap-2 overflow-hidden font-medium">
                <div class="flex justify-end">
                    <span class="text-sm font-medium text-blue-700 dark:text-main">`+
        Due + `</span>
                </div>
            </div>
        </div>

    </div>
    `)
}

//================================================================\\
//=========================== Export  ============================\\
//================================================================\\

export { MainScreen, MainMenu, alert, chatBox };
