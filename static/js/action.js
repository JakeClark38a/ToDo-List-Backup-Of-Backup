$(document).ready(function () {
    //================================================================\\
    //=========================== Avatar Menu ========================\\
    //================================================================\\
    $("#Avatar-Menu-Click").click(function () {
        $("#Avatar-Menu").toggleClass("h-32 lg:h-44");
        $("#Avatar-Menu-Click").toggleClass("bg-primary-200");
    });


    //================================================================\\
    //=========================== Mode Menu ==========================\\
    //================================================================\\

    $("#Mode-Menu-Click").click(function () {
        $("#Mode-Menu").toggleClass("h-32 lg:h-44");
        $("#Mode-Menu-Click").toggleClass("bg-main/35");

    });

    $("#PMenu-DarkMode").find("#Toggle-DarkMode").click(function () {
        $("html").toggleClass("dark", $("#Toggle-DarkMode").prop('checked'));
    });
    //================================================================\\
    //=========================== Main Menu ==========================\\
    //================================================================\\



    $("#Main-Menu-Click").click(function () {
        $("#Main-Menu").toggleClass("h-[86vh]");
        $("#Main-Menu-Click").toggleClass("-rotate-90")
    });

    $("#MMenu-Group-Section").on("click", ".MMenu-Toggle-Hidden", function () {
        MainMenu.toggleHiddenGroup($(this).parent().parent());
    });

    $('#Main-Menu').on('click', '.MMenu-Primary-Section', function (e) {
        MainMenu.updateTabIndicator($(this));
    });

    $("#MMenu-Group-Add").click(function () {
        isMakeChangeGroup = true;
        CRUDModalHandler.addGroup();
    });

    /// Add tag
    $("#MMenu-Group-Section").on("click", ".MMenu-Tag-Add", function () {
        isMakeChangeGroup = false;
        /// add tag
        var gid = $(this).closest(".MMenu-Group").attr("id")
        //console.log(groupDict);
        //addTag(groupDict)
        Initialize.LoadGroups();

        CRUDModalHandler.addTag();
    });

    /// Edit Group
    $("#MMenu-Group-Section").on("click", ".MMenu-Group-Edit", function () {
        console.log($(this).closest(".MMenu-Group").attr("id"));
        var gid = $(this).closest(".MMenu-Group").attr("id");
        console.log("Edit Group", Dict);
        var gInfo = Dict.readGroup(gid);
        console.log(gInfo);
        isMakeChangeGroup = true;
        CRUDModalHandler.editGroup(gInfo, gid);
    });

    /// Edit Tag
    $("#MMenu-Group-Section").on("click", ".MMenu-Tag-Edit", function () {
        console.log($(this).closest(".MMenu-Tag").attr("id"));
        var tid = $(this).closest(".MMenu-Tag").attr("id")
        var tagInfo = Dict.tags[tid];

        if (tagInfo.editable == false) return;

        isMakeChangeGroup = false;
        CRUDModalHandler.editTag(tagInfo);
    });

    $('#btn-close-modal').click(function () {
        CRUDModalHandler.closeAllModal()
    });
});