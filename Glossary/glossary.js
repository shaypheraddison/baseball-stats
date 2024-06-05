// this is for displaying specific stats based on the user choosing from select dropdown

const container = document.getElementById("glossary-container");
const dropdown = document.getElementById("player-dropdown");

const battingHeader = document.getElementById("batting-header");
const pitchingHeader = document.getElementById("pitching-header");

const battingDef = document.getElementById("batting-stats-explained");
const pitchingDef = document.getElementById("pitching-stats-explained");


function displayDefinitions() {
    let option = "";

    dropdown.addEventListener("change", function(event) {
        option = event.target.value;
        if (option === "batter") {
            container.style.marginTop = "100px";
            battingHeader.style.display = "block";
            battingDef.style.display = "block";
            pitchingHeader.style.display = "none";
            pitchingDef.style.display = "none";     
        } else if (option === "pitcher") {
            container.style.marginTop = "100px";
            pitchingHeader.style.display = "block";
            pitchingDef.style.display = "block";
            battingHeader.style.display = "none";
            battingDef.style.display = "none";  
        } else {
            pitchingHeader.style.display = "none";
            pitchingDef.style.display = "none";
            battingHeader.style.display = "none";
            battingDef.style.display = "none"; 
        }
    });
};

displayDefinitions();