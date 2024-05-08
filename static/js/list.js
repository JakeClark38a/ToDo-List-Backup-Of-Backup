
import { modalteampage } from "./CRUDmodal_handlerforteam.js";
import { ajaxHandler } from "./ajaxHandler.js";
import { Utils } from "./userData.js";
import { onVisitTeam } from "./appteam.js";

let user = {
    user_id: "ddeffdsdfgsd",
};

let team = {
    id00acv: {
        name: "Team 1",
        des: "About",
        code: "213-abc",
        members: ["user1", "user2"],
        admin: "user3",
        id: "id00acv",
    },

    id000001: {
        name: "Team 1",
        des: "Team 1 description",
        code: "code1",
        members: [],
        admin: "ddeffdsdfgsd",
        id: "id000001",
    },
    id000002: {
        name: "Team 2",
        des: "Team 2 description",
        code: "code2",
        members: [],
        admin: "ddeffdsdfgs",
        team_id: "id000002",
    },
    id000003: {
        name: "Team 3",
        des: "Team 3 description",
        code: "code3",
        members: [],
        admin: "ddeffdsdfg",
        team_id: "id000003",
    },
}
var temp = {

};

var lastVisitedTeam = "";
// show team list 
// based on user id and admin id to separate the team list to join and create
function teamlist(id, name, code) {
    if (user.user_id == team[id].admin) {
        // create list generate team here
        return (`
            <div id="` + id + `" class="bg-blue-50 dark:bg-gray-700 shadow-md p-3 team_createlist flex flex-wrap sm:w-11/12 md:w-3/4 lg:w-4/5 sm:max-w-md md:max-w-xl lg:max-w-screen-xl h-fit my-3 md:ml-8 lg:ml-0 border-2 rounded-lg">
            
            <div class="hidden md:inline-block self-center border-2 rounded-full mx-2">
                <img class="w-10 h-10 rounded-full" src="/static/images/profile.jpg" alt="avtr">
            </div>

            <div class="flex grow md:px-3">
                <div class="flex  flex-col">
                    <p id="` + name + `" class="dark:text-white truncate w-24 md:w-32">` + name + `</p>
                    <div class="flex items-center">

                        <button id="` + code + `" class="copy_btn1 hover:bg-white flex items-center p-1 px-2 text-sm font-medium text-center text-gray-900 rounded-lg focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-500 dark:focus:ring-gray-600">
                        ` + code + `
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"/>
                            </svg>
                        </button>

                    </div>
                </div>
            </div>

            <div class="self-center m-1">
                <button class="goteambtn1 hover:bg-white flex items-center p-1 text-sm font-medium text-center text-gray-900 rounded-lg  focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-500 dark:focus:ring-gray-600">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                    </svg>
                </button>
            </div>

            <div class="self-center">
                <button id="dropdownMenuIconButton ` + id + `" class="dropdown_btn_tc hover:bg-white flex items-center p-1 text-sm font-medium text-center text-gray-900 rounded-lg  focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-500 dark:focus:ring-gray-600" type="button">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"/>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>
                </button>
                    
                <!-- Dropdown menu -->
                <div id="dropdown" class="absolute z-10 mt-3 hidden border-2 border-white bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul class="py-2 text-sm text-gray-700 dark:text-white" aria-labelledby="dropdownMenuIconButton">
                        <li>
                            <button class="editteam block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full rounded-lg text-left">Edit</button>
                        </li>
                        <li>
                            <button class="removecreateteam flex self-start px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg text-left">Delete team</button>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

    `)
    }
    else {
        // join list generate team here
        return (`
        <div id="` + id + `" class="bg-blue-50 dark:bg-gray-700 shadow-md team_joinlist p-3 flex flex-row flex-wrap sm:w-11/12 md:w-3/4 lg:w-4/5 sm:max-w-md md:max-w-xl lg:max-w-screen-xl h-fit my-3 md:ml-8 lg:ml-0 border-2 rounded-lg">
            <div class="hidden md:inline-block self-center border-2 rounded-full  mx-2">
                <img class="w-10 h-10 rounded-full" src="/static/images/profile.jpg" alt="avtr">
            </div>
            <div class="flex grow   md:px-3">
                <div class="flex  flex-col">
                    <p id="` + name + `" class="dark:text-white truncate w-24 md:w-32">` + name + `</p>
                    <div class="flex items-center">           
                        <button id="` + code + `" class="copy_btn2 hover:bg-white flex items-center p-1 px-2 text-sm font-medium text-center text-gray-900 rounded-lg focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-500 dark:focus:ring-gray-600">
                        ` + code + `
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"/>
                            </svg>
                        </button>
                        
                    </div>
                </div>
            </div>
                <div class="self-center m-1">
                <button class="goteambtn2 hover:bg-white flex items-center p-1 text-sm font-medium text-center text-gray-900 rounded-lg focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-500 dark:focus:ring-gray-600">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                    </svg>
                </button>
            </div>
                <div class="self-center m-1">
                <button class="removejointeam hover:bg-white flex items-center p-1 text-sm font-medium text-center text-gray-900 rounded-lg focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-500 dark:focus:ring-gray-600">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
                </svg>
                </button>
            </div>
        </div>

        `);
    }
}
// get team join list from server
function getJoinedTeam() {
    return new Promise(function (resolve) {
        $.when(ajaxHandler.team_LoadJoinedList()).done(function (data) {
            console.log(data);
            resolve(data);

        });
    });

};
// get team create list from server
function getCreatedTeam() {
    return new Promise(function (resolve) {
        $.when(ajaxHandler.team_LoadCreatedList()).done(function (data) {
            console.log(data);
            resolve(data);

        });
    });
};

// main function
$(document).ready(function () {
    // generate and load screen  
    function init() {
        $("#UserList-Toggle").addClass("hidden");
        $.when(getJoinedTeam(),
            getCreatedTeam()).done(function (joined, created) {
                team = Object.assign({}, created, joined);
                //  check team list is empty or not
                if (Object.keys(team).length == 0) {
                    console.log("No team found or created");
                    return;
                }
                user.user_id = team[0].user_id; //get admin id
                console.log(user.user_id);
                // TODO:
                /*
                1 create a new var temp={}
                2 traverse 'team' get team_id
                3 temp[team_id] = team[i].team_id;
                4 team = temp;
                */
                temp = {};
                for (let key in team) {
                    let idteam = team[key].team_id;
                    temp[idteam] = {};//team[key];
                    temp[idteam].name = team[key].team_name;
                    temp[idteam].des = team[key].team_description;
                    temp[idteam].code = team[key].team_code;
                    temp[idteam].members = team[key].members;
                    temp[idteam].admin = team[key].admin_id;
                    temp[idteam].id = team[key].team_id;

                }
                team = temp;
            }).then(
                function () {
                    console.log('teamlist1 running');
                    console.log(team);
                    teamlist1();

                }
            );
    };



    // team[teamid] = content=inside 

    init();
    // team list generate function
    function teamlist1() {
        console.log('teamlist running');
        let teamlistjoi = $("#CreateAndJoinTeam #teamlist");
        let teamlistcre = $("#CreateAndJoinTeam #teamlist2");
        console.log(teamlistjoi, teamlistcre);
        teamlistjoi.empty();
        teamlistcre.empty();

        for (let key in team) {
            let teamname = team[key].name;
            let teamid = key;
            let teamcode = team[key].code;
            let teamdes = team[key].des;
            let admin = team[key].admin;
            // console.log(teamname, teamid, teamcode, teamdes);
            if (user.user_id != admin) {
                teamlistjoi.append(teamlist(teamid, teamname, teamcode));
            }
            else {
                teamlistcre.append(teamlist(teamid, teamname, teamcode));
                console.log('hi')
            }
        }
    }
    // dropdown menu 
    $("#CreateAndJoinTeam #teamlist2").on("click", ".dropdown_btn_tc", function (e) {
        console.log("clicked dropdown");
        let dropdown = $(e.currentTarget).next("#dropdown");
        dropdown.toggle();
    });
    // add team function
    function addteam(teamcode, teamname, teamdes) {
        if (teamcode) {
            $.when(ajaxHandler.team_JoinTeam(teamcode)).done(function (data) {
                console.log(data);
                ajaxHandler.team_setLastVisitedTeam(data.team_id);
                lastVisitedTeam = data.team_id;
                setTimeout(onVisitTeam, 50);
                init();
            });
        } else {
            let teamid = "tid" + Utils.getUuid();
            let teamcode = "" + Math.floor(Math.random() * 1000000);

            $.when(ajaxHandler.team_AddTeam(teamid, teamname, teamdes, teamcode)).done(function (data) {
                console.log(data);
                ajaxHandler.team_setLastVisitedTeam(data.team_id);
                lastVisitedTeam = data.team_id;
                setTimeout(onVisitTeam, 50);
                init();
            });

        }


    }
    // remove team function
    function removeteam(teamid,) {
        delete team[teamid];
        teamlist1();
    }
    // edit function
    function edit(key, name, des) {
        console.log(key);
        let teamid = team[key].id;

        console.log(teamid);
        modalteampage.editTeam(teamid, name, des);
        $.when(ajaxHandler.Team_EditTeam(teamid, name, des)).done(function (data) {
            console.log(data)
            init();
        });
    }


    // create and join team button
    $("#CreateAndJoinTeam #create").click(function () {
        modalteampage.CreateTeam();
    });

    $("#CreateAndJoinTeam #join").click(function () {
        modalteampage.JoinTeam();
    });
    $("#CreateAndJoinTeam #create1").click(function () {
        modalteampage.CreateTeam();
    });

    $("#CreateAndJoinTeam #join1").click(function () {
        modalteampage.JoinTeam();
    });
    // end 
    // reset state
    modalteampage.resetState();

    $("#CreateAndJoinTeam #createandjoin").click(function () {
        $("#CreateAndJoinTeam #teamcreate_join ").show();

        $("#CreateAndJoinTeam #pageheader").hide();
        $("#CreateAndJoinTeam #teamlist").hide();
        $("#CreateAndJoinTeam #teamlist2").hide();
    });
    // don't using not working now
    /*
     function t_join(){
        let searchCode = $("#code-sec #teamcode").val();
        console.log(searchCode);
        let teamId = Object.keys(team).find(key => team[key].code == searchCode);
        console.log(teamId);
        let teamname = $("#teamname-sec #teamname").val();
        let teamdes = $("#teamdesc-sec #teamdescription").val();
        console.log(teamname);
        console.log(teamdes);
        return teamId, teamname, teamdes;
    }
     */
    $("#crud-modal2 #Join-sec").click(function () {
        let team_code = $("#code-sec #teamcode").val();
        addteam(team_code);
        modalteampage.hide();
        $("#CreateAndJoinTeam #teamcreate_join ").hide();

        $("#CreateAndJoinTeam #pageheader").show();
        $("#CreateAndJoinTeam #teamlist").show();
        $('#teamlist2').hide();
        teamlist1();
        // location.reload();
    });
    $("#crud-modal2 #Create-sec").click(function () {
        let teamname = $("#teamname-sec #teamname").val();
        let teamdes = $("#teamdesc-sec #teamdescription").val();
        addteam(null, teamname, teamdes);
        modalteampage.hide();
        $("#CreateAndJoinTeam #teamcreate_join ").hide();

        $("#CreateAndJoinTeam #pageheader").show();
        $("#CreateAndJoinTeam #teamlist").hide();
        $('#CreateAndJoinTeam #teamlist2').show();
        $("#changetojoin").addClass("text-gray-400");
        $(this).addClass("text-gray-800");
        $(this).addClass("dark:text-white");
        $("#changetojoin").removeClass("text-gray-800");
        $(this).removeClass("text-gray-400");
        $("#changetojoin").removeClass("dark:text-white");
        teamlist1();
        // location.reload();
    });
    $("#CreateAndJoinTeam #teamlist2").on("click", ".editteam", function () {
        let teamid = $(this).closest(".team_createlist").attr("id");
        console.log("ahhhha :", teamid);
        console.log("ahhhha :", team[teamid].name);
        console.log("ahhhha :", team[teamid].des);
        console.log("ahhhha :", team[teamid].id);


        modalteampage.editTeam(teamid, team[teamid].name, team[teamid].des);


    });
    $("#crud-modal2 #save-sec").click(function () {
        let id = $('#crud-modal2 input[type="checkbox"]').attr("id");
        console.log("Id: ", id);
        let name = $('#crud-modal2 #teamname').val();
        console.log(name);
        let des = $('#crud-modal2 #teamdescription').val();
        console.log(des);
        edit(id, name, des);
        modalteampage.hide();
        $("#CreateAndJoinTeam #teamcreate_join ").hide();

        $("#CreateAndJoinTeam #pageheader").show();
        $("#CreateAndJoinTeam #teamlist").hide();
        $('#teamlist2').show();
        teamlist1();

    });
    // 
    $("#crud-modal2 #delete-sec").click(function () {
        let id = $('#crud-modal2 input[type="checkbox"]').attr("id");
        $('#teamname-sec #teamname').val("");
        $('#teamdesc-sec #teamdescription').val("");
    });


    // remove team from join list
    $("#CreateAndJoinTeam #teamlist").on("click", ".removejointeam", function () {
        let teamid = $(this).closest(".team_joinlist").attr("id");
        console.log(teamid);
        removeteam(teamid);
        ajaxHandler.team_LeaveTeam(teamid);
    });
    // delete team from create list
    $("#CreateAndJoinTeam #teamlist2").on("click", ".removecreateteam", function () {
        let teamid = $(this).closest(".team_createlist").attr("id");
        console.log(teamid);
        removeteam(teamid);
        ajaxHandler.team_DeleteTeam(teamid);
    });
    // back button
    $("#CreateAndJoinTeam #backbtn").click(function () {
        $("#CreateAndJoinTeam #teamcreate_join").hide();
        $("#CreateAndJoinTeam").show();
        $("#CreateAndJoinTeam #pageheader").show();
        $("#CreateAndJoinTeam #teamlist").show();
        $("#CreateAndJoinTeam #teamlist2").hide();
        $("#changetojoin").addClass("text-gray-800");
        $("#changetojoin").addClass("dark:text-white");
        $("#changetocreate").addClass("text-gray-400");
        $("#changetojoin").removeClass("text-gray-400");
        $("#changetocreate").removeClass("text-gray-800");
        $("#changetocreate").removeClass("dark:text-white");

    });
    // btn for jumping to teampage
    $("#teamlist2").on("click", ".goteambtn1", function (e) {
        lastVisitedTeam = $(e.currentTarget).closest(".team_createlist").attr("id");
        console.log(lastVisitedTeam);
        ajaxHandler.team_setLastVisitedTeam(lastVisitedTeam);
        onVisitTeam();
    });
    $("#teamlist").on("click", ".goteambtn2", function (e) {
        lastVisitedTeam = $(e.currentTarget).closest(".team_joinlist").attr("id");
        console.log(lastVisitedTeam);
        ajaxHandler.team_setLastVisitedTeam(lastVisitedTeam);
        onVisitTeam();
    });
    //

    // copy code to clipboard
    $("#teamlist").on("click", ".copy_btn2", function (e) {
        let code = $(e.currentTarget).attr("id");
        navigator.clipboard.writeText(code);
    });
    $("#teamlist2").on("click", ".copy_btn1", function (e) {
        let code = $(e.currentTarget).attr("id");
        navigator.clipboard.writeText(code);
    });
    // join team when join and create team  imidiately after create or join
    $.when(ajaxHandler.team_getLastVisitedTeam()).done((data) => {
        $.when(ajaxHandler.team_LoadInfo(data.last_team)).done(() => {
            console.log("Last visited: " + data.last_team);
            lastVisitedTeam = data.last_team;
            onVisitTeam();
        }).fail(() => {
            ajaxHandler.team_setLastVisitedTeam(""); // if not found team
        });
    });

});

export { lastVisitedTeam };