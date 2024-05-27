// need to contact baseball stats api to display MLB players' stats
// need to take custom input stats that will calculate a slash line and display it out

const inputData = document.getElementById("stat-input");
const playerChoice = document.getElementById("player-choice");
const mainButton = document.getElementById("main-button");
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
    const nameContainer = document.querySelector(".input-data");

    playerChoice.addEventListener("change", function(event) {
        const playerValue = event.target.value;
        if (playerValue=== "batter") {
            batterStats.style.display = "block";
            pitcherStats.style.display = "none";
            nameContainer.style.display = "flex";
            document.body.style.backgroundImage = `url(${batterBackground})`;
        } else if (playerValue === "pitcher") {
            pitcherStats.style.display = "block";
            batterStats.style.display = "none";
            nameContainer.style.display = "flex";
            document.body.style.backgroundImage = `url(${pitcherBackground})`;
        } else {
            pitcherStats.style.display = "none";
            batterStats.style.display = "none";
            nameContainer.style.display = "none";
            document.body.style.backgroundImage = `url(${defaultBackground})`;
        }
    });
};

function calcBattingAverage(hitsStat, atBatsStat) {
    const average = Number(hitsStat) / Number(atBatsStat);
    const roundedAverage = average.toFixed(3);
    return roundedAverage
};

function calcOnBasePercentage(hitsStat, atBatsStat, walksStat, hitByPitchesStat, sacrificeFliesStat) {
    const denominator = Number(atBatsStat) + Number(walksStat) + Number(sacrificeFliesStat) + Number(hitByPitchesStat);
    const onBaseNumerator = Number(hitsStat) + Number(walksStat) + Number(hitByPitchesStat);
    const onBase = onBaseNumerator / denominator;
    const roundedOnBase = onBase.toFixed(3);
    return roundedOnBase;
};

function calcSlugging(singlesStat, doublesStat, triplesStat, homeRunsStat, atBatsStat) {
    const numerator = (Number(singlesStat) + (2 * Number(doublesStat))+ (3 * Number(triplesStat)) + (4 * Number(homeRunsStat)));
    const slugging = numerator / Number(atBatsStat);
    const roundedSlugging = slugging.toFixed(3);
    return roundedSlugging
};

function calcOnBasePlusSlugging(hitsStat, atBatsStat, walksStat, hitByPitchesStat, sacrificeFliesStat, singlesStat, doublesStat, triplesStat, homeRunsStat) {
    const obpStat = parseFloat(calcOnBasePercentage(hitsStat, atBatsStat, walksStat, hitByPitchesStat, sacrificeFliesStat));
    const sluggingStat = parseFloat(calcSlugging(singlesStat, doublesStat, triplesStat, homeRunsStat, atBatsStat));
    const opsStat = obpStat + sluggingStat;
    const roundedOPS = opsStat.toFixed(3);
    return roundedOPS;
};


function hittingMath() {
    const battingAverage = calcBattingAverage(hits.value, atBats.value);
    const onBasePercentage = calcOnBasePercentage(hits.value, atBats.value, walks.value, sacrificeFlies.value, hitByPitches.value);
    const slugging = calcSlugging(singles.value, doubles.value, triples.value, homeRuns.value, atBats.value);
    const onBasePlusSlugging = calcOnBasePlusSlugging(hits.value, atBats.value, walks.value, sacrificeFlies.value, hitByPitches.value, singles.value, doubles.value, triples.value, homeRuns.value);

    console.log(`Slash Line is: ${battingAverage}/${onBasePercentage}/${slugging}/${onBasePlusSlugging}`);
    return { battingAverage, onBasePercentage, slugging, onBasePlusSlugging }
};


function main() {
    selectPlayer();
    mainButton.addEventListener("click", function(event) {
        event.preventDefault();
        hittingMath();
    });  
};

main();