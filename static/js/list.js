import {modalteampage} from "./CRUB2modal_handlerforteam.js";

let team = {
    id000001 :{
        name: "Team 1",
        des: "Team 1 description",
        code: "code1",
        members: [],        
    },
    id000002 :{
        name: "Team 2",
        des: "Team 2 description",
        code: "code2",
        members: [],        
    },
    id000003 :{
        name: "Team 3",
        des: "Team 3 description",
        code: "code3",
        members: [],        
    },
}
function teamlist(id, name, code) {
    return (
      ` <div id="`+ id + `"class="flex sm:w-5/6 md:w-3/4 lg:w-4/5 sm:max-w-md md:max-w-xl lg:max-w-screen-xl  h-fit my-3 md:ml-8 lg:ml-0 border-2 rounded-lg  ">
      <div class="inline-block  self-center border-2 rounded-full mx-4 ">
          <img class="w-10 h-10 rounded-full" src="/static/images/profile.jpg" alt="avtr">
      </div>
      <div class="inline-block grow mr-2 ">
          <p id="`+ name +`" class="dark:text-white">`+ name + `</p>
          <p id="`+ code + `" class="dark:text-white">`+ code + `</p>
      </div>
      <div class="inline-block justify-self-end self-center mr-4">
          <button><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
            </svg>
            </button>
      </div>
  </div> ` 
    );
  }
$(document).ready(function(){
   

    function teamlist1() {
        let teamlist2 = $("#teamlist");
        teamlist2.empty();
        for (let key in team) {
            let teamname = team[key].name;
            let teamid = key;
            let teamcode = team[key].code;
            teamlist2.append(teamlist(teamid, teamname, teamcode));
        }
    }


    function addteam(teamid){ 
        let teamname = $("#teamname").val();
        let teamdes = $("#teamdescription").val();
        let teamcode;
        if (teamid) {
            let teamcode = team[teamid].code;
            // let Tid = teamid; // Remove this line
        } else {
            teamid = "id" + Math.floor(Math.random() * 1000000);
            teamcode = "code" + Math.floor(Math.random() * 1000000);
        }
        
        team[teamid] = {
            name: teamname,
            des: teamdes,
            code: teamcode,
            members: [],
        };
    }
    teamlist1();
    $("#create").click(function(){
        modalteampage.CreateTeam();
    });

    $("#join").click(function(){
        modalteampage.JoinTeam();
    });
    $("#create1").click(function(){
        modalteampage.CreateTeam();
    });

    $("#join1").click(function(){
        modalteampage.JoinTeam();
    });
   
    modalteampage.resetState();
   
        $("#createandjoin").click(function(){
        $("#teamcreate_join ").show();

        $("#teampage #pageheader").hide();
        $("#teampage #teamlist").hide();
        });
        // don't using not working now
     function t_join(){
        let searchCode = $("#teamcode").val();
        let teamId = Object.keys(team).find(key => team[key].code === searchCode);
        addteam(teamId);
     }
     $("#Join-sec").click(function(){
            t_join();
            modalteampage.hide();
            $("#teamcreate_join ").hide();

            $("#teampage #pageheader").show();
            $("#teampage #teamlist").show();
            teamlist1();
     });
     $("#Create-sec").click(function(){
            addteam(null);
            modalteampage.hide();
            $("#teamcreate_join ").hide();
    
            $("#teampage #pageheader").show();
            $("#teampage #teamlist").show();
            teamlist1();
    });
});
