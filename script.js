// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function() {

   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      response.json().then( function(json) {
         const div = document.getElementById("missionTarget");
         div.innerHTML = `

      <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[1].name}</li>
            <li>Diameter: ${json[1].diameter}</li>
            <li>Star: ${json[1].star}</li>
            <li>Distance from Earth: ${json[1].distance}</li>
            <li>Number of Moons: ${json[1].moons}</li>
         </ol>
         <img src="${json[1].image}">

         `;
      });
   });


   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotnameInput = document.querySelector("input[name=pilotName]");
      let copilotnameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]")

      document.getElementById("pilotStatus").textContent = pilotnameInput.value;
      document.getElementById("copilotStatus").textContent = copilotnameInput.value;


      if (pilotnameInput.value === "" || copilotnameInput.value === "" || 
      fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      }

      else if(!isNaN(pilotnameInput.value) || !isNaN(copilotnameInput.value)){
         alert("Pilot and Co-Pilot must be characters");
         event.preventDefault();

      }

      else if(fuelLevelInput.value >= 10000 && cargoMassInput.value <= 10000){
         event.preventDefault();
         document.getElementById("faultyItems").style.visibility = "visible"; 
         document.getElementById("launchStatus").textContent = "Shuttle is ready for launch";
         document.getElementById("launchStatus").style.color = "green";

      }

      else if(fuelLevelInput.value < 10000){
         event.preventDefault(); 
         document.getElementById("faultyItems").style.visibility = "visible"; 
         document.getElementById("fuelStatus").textContent = "Not enough fuel for takeoff"; 
         document.getElementById("launchStatus").textContent = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
         if(cargoMassInput.value > 10000){
            document.getElementById("cargoStatus").textContent = "Too much mass for shuttle to take off";
         }
      }

      else if(cargoMassInput.value > 10000){ // not working
         event.preventDefault();
         document.getElementById("faultyItems").style.visibility = "visible"; // working
         document.getElementById("cargoStatus").textContent = "Too much mass for shuttle to take off";
         document.getElementById("launchStatus").textContent = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
      }



      // else{
      //    let r = 1;
      // }


   });
});