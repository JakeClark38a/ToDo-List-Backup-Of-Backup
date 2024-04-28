
//=====================================================================\\
/* 
NOTICE:
This file handles all the actions that are not related to the main content of the page
This file handles navigation bar / menu  / single-purpose /toggles buttons 

*/
//=====================================================================\\


$(document).ready(function () {
    //================================================================\\
    //=========================== Avatar Menu ========================\\
    //================================================================\\
    $("#Avatar-Menu-Click").click(function () {  //Toggle avatar menu
        $("#Avatar-Menu").toggleClass("h-32 lg:h-44");
        $("#Avatar-Menu-Click").toggleClass("bg-primary-200");
    });


    //================================================================\\
    //=========================== Mode Menu ==========================\\
    //================================================================\\

    $("#Mode-Menu-Click").click(function () { // Toggle mode menu
        $("#Mode-Menu").toggleClass("h-32 lg:h-44");
        $("#Mode-Menu-Click").toggleClass("bg-main/35");

    });

    $("#PMenu-DarkMode").find("#Toggle-DarkMode").click(function () { // Toggle dark mode
        $("html").toggleClass("dark", $("#Toggle-DarkMode").prop('checked'));
    });
    //================================================================\\
    //=========================== Main Menu ==========================\\
    //================================================================\\


    $("#Main-Menu-Click").click(function () { // Toggle main menu
        $("#Main-Menu").toggleClass("h-[86vh]");
        $("#Main-Menu-Click").toggleClass("-rotate-90");
    });
});