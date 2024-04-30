
let team = {
    id000001 :{
        name: "Team 1",
        des: "Team 1 description",
        members: [],        
    },
    id000002 :{
        name: "Team 2",
        des: "Team 2 description",
        members: [],        
    },
    id000003 :{
        name: "Team 3",
        des: "Team 3 description",
        members: [],        
    },
}
function teamlist(id, name) {
    return (
      ` <div id="`+ id + `"class="flex sm:w-5/6 md:w-3/4 lg:w-4/5 sm:max-w-md md:max-w-xl lg:max-w-screen-xl  h-fit my-3 md:ml-8 lg:ml-0 border-2 rounded-lg  ">
      <div class="inline-block  self-center border-2 rounded-full mx-4 ">
          <img class="w-10 h-10 rounded-full" src="/static/images/profile.jpg" alt="avtr">
      </div>
      <div class="inline-block grow mr-2 ">
          <p id="`+ name +`">`+ name + `</p>
          <p id="`+ id + `">`+ id + `</p>
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

    function teamlist1() {
        let teamlist2 = $("#teamlist");
        teamlist2.empty();
        for (let key in team) {
            let teamname = team[key].name;
            let teamid = key;
            teamlist2.append(teamlist(teamid, teamname));
        }
    }


    function addteam(){
        let teamname = $("#teamname").val();
        let teamdes = $("#teamdes").val();
        let teamid = "id" + Math.floor(Math.random() * 1000000);
        team[teamid] = {
            name: teamname,
            des: teamdes,
            members: [],
        };        
    }

    $("#createteam_button").click(function(){
       
        addteam();
        teamlist1();
        window.location.href ="teamspage.html";
    });
    teamlist1();
