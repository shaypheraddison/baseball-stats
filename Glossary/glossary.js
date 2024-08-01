// this is for displaying specific stats based on the user choosing from select dropdown

const dropdown = document.getElementById("player-dropdown");
const definitionHeaders = document.querySelectorAll("h2");
const statDefinitions = document.querySelectorAll("div.definitions");


function main() {
    let option = "";

    dropdown.addEventListener("change", function(event) {
        option = event.target.value;
        if (option === "batter") {
            definitionHeaders[0].style.display = "block";
            statDefinitions[0].style.display = "block";
            definitionHeaders[1].style.display = "none";
            statDefinitions[1].style.display = "none";     
        } else if (option === "pitcher") {
            definitionHeaders[0].style.display = "none";
            statDefinitions[0].style.display = "none";
            definitionHeaders[1].style.display = "block";
            statDefinitions[1].style.display = "block";  
        } else {
            definitionHeaders.forEach(function(header) {
                header.style.display = "none";
            })
            statDefinitions.forEach(function(stat) {
                stat.style.display = "none";
            });
        };
    });
};

main();