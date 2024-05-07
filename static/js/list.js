
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

function teamlist(id, name, code) {
    if (user.user_id == team[id].admin) {
        return (` <div id="` + id + `"class="py-3 team_createlist flex sm:w-5/6 md:w-3/4 lg:w-4/5 sm:max-w-md md:max-w-xl lg:max-w-screen-xl  h-fit my-3 md:ml-8 lg:ml-0 border-2 rounded-lg  ">
        <div class="hidden md:inline-block self-center border-2 rounded-full mx-4 ">
            <img class="w-10 h-10 rounded-full" src="/static/images/profile.jpg" alt="avtr">
        </div>
        <div class="inline-block grow px-3">
            <div class="flex flex-col">
                <p id="`+ name + `" class="dark:text-white truncate">` + name + `</p>
                <div class="flex flex-row gap-3">
                    <p id="`+ code + `" class="dark:text-white">` + code + `</p>
                    <button class="copy_btn1" >
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="inline-block items-center  self-center ">
            <button class="goteambtn1 ">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                </svg>
            </button>
        </div>

        <div class=" justify-self-end self-center mr-1 ">
            <button id="dropdownMenuIconButton `+ id + `"  class="dropdown_btn_tc bg-white inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                </svg>
                </button>
                
                <!-- Dropdown menu -->
                <div id="dropdown" class="absolute z-10 hidden border-2 border-white bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul class="py-2 w-full text-sm text-gray-700 dark:text-white" aria-labelledby="dropdownMenuIconButton">
                    <li>
                        <button class="editteam block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</button>
                    </li>
                    <li>
                        <button class="removecreateteam flex self-start px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete team</button>
                    </li>
                    </ul>
                
                </div>
                
        </div>
    </div>
    `);
    }
    else {
        return (
            ` <div id="` + id + `"class="team_joinlist py-3 flex sm:w-5/6 md:w-3/4 lg:w-4/5 sm:max-w-md md:max-w-xl lg:max-w-screen-xl  h-fit my-3 md:ml-8 lg:ml-0 lg border-2 rounded-lg  ">
        <div class="hidden md:inline-block  self-center border-2 rounded-full mx-4 ">
            <img class="w-10 h-10 rounded-full" src="/static/images/profile.jpg" alt="avtr">
        </div>
        <div class="inline-block grow px-3">
            <div class="flex flex-col">
                <p id="`+ name + `" class="dark:text-white truncate">` + name + `</p>
                <div class="flex flex-row gap-3">
                    <p id="`+ code + `" class="dark:text-white">` + code + `</p>
                    <button class="copy_btn2" >
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="inline-block items-center self-center mr-3">
            <button class="goteambtn2">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                </svg>
            </button>
        </div>
        
        <div class="inline-block justify-self-end self-center mr-2">
        <button class="removejointeam">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
        </svg>
        </button>
        </div>
        </div> `
        );
    }
}

function getJoinedTeam() {
    return new Promise(function (resolve) {
        $.when(ajaxHandler.team_LoadJoinedList()).done(function (data) {
            console.log(data);
            resolve(data);

        });
    });

};

function getCreatedTeam() {
    return new Promise(function (resolve) {
        $.when(ajaxHandler.team_LoadCreatedList()).done(function (data) {
            console.log(data);
            resolve(data);

        });
    });
};



$(document).ready(function () {

    function init() {
        $("#UserList-Toggle").addClass("hidden");
        $.when(getJoinedTeam(),
            getCreatedTeam()).done(function (joined, created) {
                team = Object.assign({}, created, joined);
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

    $("#CreateAndJoinTeam #teamlist2").on("click", ".dropdown_btn_tc", function (e) {
        console.log("clicked dropdown");
        let dropdown = $(e.currentTarget).next("#dropdown");
        dropdown.toggle();
    });

    function addteam(teamcode, teamname, teamdes) {
        if (teamcode) {
            $.when(ajaxHandler.team_JoinTeam(teamcode)).done(function (data) {
                console.log(data);
                init();
            });
        } else {
            let teamid = "tid" + Utils.getUuid();
            let teamcode = "" + Math.floor(Math.random() * 1000000);
            let admin = user.user_id;
            // Ajax call to add team
            $.when(ajaxHandler.team_AddTeam(teamid, teamname, teamdes, teamcode)).done(function (data) {
                console.log(data);
                init();
            });
        }


    }

    function removeteam(teamid,) {
        delete team[teamid];
        teamlist1();
    }




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
        location.reload();
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
        location.reload();
    });
    $("#crud-modal2 #save-sec").click(function () {
        let id = $('#crud-modal2 input[type="checkbox"]').attr("id");
        team[id].name = $('#crud-modal2 #teamname').val();
        team[id].des = $('#crud-modal2 #teamdescription').val();
        modalteampage.hide();
        $("#CreateAndJoinTeam #teamcreate_join ").hide();

        $("#CreateAndJoinTeam #pageheader").show();
        $("#CreateAndJoinTeam #teamlist").hide();
        $('#teamlist2').show();
        teamlist1();

    });
    $("#crud-modal2 #delete-sec").click(function () {
        let id = $('#crud-modal2 input[type="checkbox"]').attr("id");
        $('#teamname-sec #teamname').val("");
        $('#teamdesc-sec #teamdescription').val("");
    });



    $("#CreateAndJoinTeam #teamlist").on("click", ".removejointeam", function () {
        let teamid = $(this).closest(".team_joinlist").attr("id");
        console.log(teamid);
        removeteam(teamid);

    });
    $("#CreateAndJoinTeam #teamlist2").on("click", ".removecreateteam", function () {
        let teamid = $(this).closest(".team_createlist").attr("id");
        console.log(teamid);
        removeteam(teamid);
        ajaxHandler.team_DeleteTeam(teamid);
    });
    $("#CreateAndJoinTeam #teamlist2").on("click", ".editteam", function () {
        let teamid = $(this).closest(".team_createlist").attr("id");
        console.log(teamid);

        modalteampage.editTeam(team[teamid]);
    });
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

    $("#teamlist2").on("click", ".goteambtn1", function (e) {
        lastVisitedTeam = $(e.currentTarget).closest(".team_createlist").attr("id");
        console.log(lastVisitedTeam);
        setTimeout(onVisitTeam, 50);
    });
    $("#teamlist").on("click", ".goteambtn2", function (e) {
        lastVisitedTeam = $(e.currentTarget).closest(".team_joinlist").attr("id");
        console.log(lastVisitedTeam);
        setTimeout(onVisitTeam, 50);
    });

});

export { lastVisitedTeam };