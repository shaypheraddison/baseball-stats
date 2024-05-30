// need to contact baseball stats api to display MLB players' stats
// need to take custom input stats that will calculate a slash line and display it out

const inputData = document.getElementById("stat-input");
const playerChoice = document.getElementById("player-choice");
const mainButton = document.getElementById("main-button");
const baseballStatsDisplay = document.getElementById("baseball-stats");
const playerName = document.getElementById("player-name");

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

const batterBackground = "Resources/batter-box.webp";
const pitcherBackground = "Resources/mlb-mound.jpeg";
const defaultBackground = "Resources/baseball.jpeg";

const hittingStatsArray = [
    "at-bats", "hits", "singles", "doubles", "triples", "home-runs",
    "walks", "hit-by-pitch","sacrifice fly"
];

const pitchingStatsArray = [
    "innings pitched", "runs allowed", "earned runs", "hits", "walks", "wild pitches",
    "strikeout", "home-runs", "wins", "losses"
];


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
    const average = parseFloat(hitsStat) / parseFloat(atBatsStat);
    const roundedAverage = average.toFixed(3);
    return roundedAverage
};

function calcOnBasePercentage(hitsStat, atBatsStat, walksStat, hitByPitchesStat, sacrificeFliesStat) {
    const onBaseNumerator = parseFloat(hitsStat) + parseFloat(walksStat) + parseFloat(hitByPitchesStat);
    const denominator = parseFloat(atBatsStat) + parseFloat(walksStat) + parseFloat(sacrificeFliesStat) + parseFloat(hitByPitchesStat);
    const onBase = onBaseNumerator / denominator;
    const roundedOnBase = onBase.toFixed(3);
    return roundedOnBase;
};

function calcSlugging(singlesStat, doublesStat, triplesStat, homeRunsStat, atBatsStat) {
    const numerator = (parseFloat(singlesStat) + (2 * parseFloat(doublesStat))+ (3 * parseFloat(triplesStat)) + (4 * parseFloat(homeRunsStat)));
    const slugging = numerator / parseFloat(atBatsStat);
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
    // showing final slash line on console
    console.log(`Slash Line is: ${battingAverage}/${onBasePercentage}/${slugging}/${onBasePlusSlugging}`);
    return { battingAverage, onBasePercentage, slugging, onBasePlusSlugging }
};

function calcEarnedRunAvg(earnedRunsStat, inningsPitchedStat) {
    const earnedRunAvgNumerator = parseFloat(earnedRunsStat) * 9;
    const earnedRunAvg = earnedRunAvgNumerator / parseFloat(inningsPitchedStat);
    const roundedERA = earnedRunAvg.toFixed(2);
    return roundedERA;
};

function calcWalksHitsInningPitched(walksIssuedStat, inningsPitchedStat, hitsGivenUpStat) {
    const whipNumberator = parseFloat(walksIssuedStat) + parseFloat(hitsGivenUpStat);
    const walksHitsInningsPitched = whipNumberator / parseFloat(inningsPitchedStat);
    const roundedWHIP = walksHitsInningsPitched.toFixed(2);
    return roundedWHIP;
};

function calcPer9Stats(strikeoutsStat, walksIssuedStat, hitsGivenUpStat, homeRunsAllowedStat,  inningsPitchedStat) {
    const innings = parseFloat(inningsPitchedStat);

    const strikeoutPer9Numerator = parseFloat(strikeoutsStat) * 9;
    const strikeoutEquation = strikeoutPer9Numerator / innings;
    const roundedKPer9 = strikeoutEquation.toFixed(2);

    const walksPer9Numerator = parseFloat(walksIssuedStat) * 9;
    const walksEquation = walksPer9Numerator / innings;
    const roundedBBPer9 = walksEquation.toFixed(2);

    const hitsPer9Numerator = parseFloat(hitsGivenUpStat) * 9;
    const hitsEquation = hitsPer9Numerator / innings;
    const roundedHitsPer9 = hitsEquation.toFixed(2);

    const homeRunsPer9Numerator = parseFloat(homeRunsAllowedStat) * 9;
    const homeRunsEquation = homeRunsPer9Numerator / innings;
    const roundedHomeRunsPer9 = homeRunsEquation.toFixed(2);

    return {roundedKPer9, roundedBBPer9, roundedHitsPer9, roundedHomeRunsPer9}
};

function pitchingMath() {
    const earnedRunsMath = calcEarnedRunAvg(earnedRuns.value, inningsPitched.value);
    const walksHitsMath = calcWalksHitsInningPitched(walksIssued.value, inningsPitched.value, hitsGivenUp.value);
    const statsPer9Math = calcPer9Stats(strikeouts.value, walksIssued.value, hitsGivenUp.value, homeRunsAllowed.value, inningsPitched.value);
    console.log(`
        Pitching Line is: 
        IP: ${inningsPitched.value},
        RA: ${runsAllowed.value},
        ERA: ${earnedRunsMath}, 
        WHIP: ${walksHitsMath}, 
        SO: ${strikeouts.value}, 
        BB: ${walksIssued.value},
        HA: ${hitsGivenUp.value},
        HRA: ${homeRunsAllowed.value},
        H/9: ${statsPer9Math.roundedHitsPer9},
        BB/9: ${statsPer9Math.roundedBBPer9},
        HR/9: ${statsPer9Math.roundedHomeRunsPer9},
        K/9: ${statsPer9Math.roundedKPer9}
        `);
    return { earnedRunsMath, walksHitsMath, statsPer9Math }
};



function main() {
    selectPlayer();
    mainButton.addEventListener("click", function(event) {
        // event.preventDefault();
        hittingMath();
        pitchingMath();
    });
};

main();