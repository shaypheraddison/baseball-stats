// need to contact baseball stats api to display MLB players' stats
// need to take custom input stats that will calculate a slash line and display it out

const inputData = document.getElementById("stat-input");
const playerChoice = document.getElementById("player-choice");
const nameButton = document.getElementById("name-button");
const baseballStatsDisplay = document.getElementById("baseball-stats");

const atBats = document.getElementById("at-bats");
const hits = document.getElementById("hits");
const walks = document.getElementById("walks");
const sacrificeFlies = document.getElementById("sacrifice-flies");
const hitByPitches = document.getElementById("hit-by-pitches");
const singles = document.getElementById("singles");
const doubles = document.getElementById("doubles");
const triples = document.getElementById("triples");
const homeRuns = document.getElementById("home-runs");

const inningsPitched = document.getElementById("innings-pitched");
const runsAllowed = document.getElementById("runs-allowed");
const earnedRuns = document.getElementById("earned-runs");
const hitsGivenUp = document.getElementById("hits-given-up");
const walksIssued = document.getElementById("walks-issued");
const wildPitches = document.getElementById("wild-pitches");
const strikeouts = document.getElementById("strikeouts");
const homeRunsAllowed = document.getElementById("home-runs-allowed");
const wins = document.getElementById("wins");
const losses = document.getElementById("losses");

const hittingStatsArray = [
    "at-bats", "hits", "singles", "doubles", "triples", "home-runs",
    "walks", "hit-by-pitch","sacrifice fly"
];

const pitchingStatsArray = [
    "innings pitched", "runs allowed", "earned runs", "hits", "walks", "wild pitches",
    "strikeout", "home-runs", "wins", "losses"
];

const batterBackground = "Resources/batter-box.webp";
const pitcherBackground = "Resources/mlb-mound.jpeg";
const defaultBackground = "Resources/baseball.jpeg";

function selectPlayer() {
    const batterStats = document.getElementById("batter-stats");
    const pitcherStats = document.getElementById("pitcher-stats");

    playerChoice.addEventListener("change", function(event) {
        const playerValue = event.target.value;
        if (playerValue=== "batter") {
            batterStats.style.display = "inline";
            pitcherStats.style.display = "none";
            document.body.style.backgroundImage = `url(${batterBackground})`;
        } else if (playerValue === "pitcher") {
            pitcherStats.style.display = "inline";
            batterStats.style.display = "none";
            document.body.style.backgroundImage = `url(${pitcherBackground})`;
        } else {
            pitcherStats.style.display = "none";
            batterStats.style.display = "none";
            document.body.style.backgroundImage = `url(${defaultBackground})`;
        };
    });
};




selectPlayer();
