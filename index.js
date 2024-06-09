
const battingElements = {
    atBats: document.getElementById("at-bats"),
    hits: document.getElementById("hits"),
    walks: document.getElementById("walks"),
    sacrificeFlies: document.getElementById("sacrifice-flies"),
    hitByPitches: document.getElementById("hit-by-pitches"),
    singles: document.getElementById("singles"),
    doubles: document.getElementById("doubles"),
    triples: document.getElementById("triples"),
    homeRuns: document.getElementById("home-runs"),
    runsBattedIn: document.getElementById("runs-batted-in"),
    runsScored: document.getElementById("runs-scored"),
    stolenBases: document.getElementById("stolen-bases")
};

const pitchingElements = {
    inningsPitched: document.getElementById("innings-pitched"),
    runsAllowed: document.getElementById("runs-allowed"),
    earnedRuns: document.getElementById("earned-runs"),
    hitsGivenUp: document.getElementById("hits-given-up"),
    walksIssued: document.getElementById("walks-issued"),
    wildPitches: document.getElementById("wild-pitches"),
    strikeouts: document.getElementById("strikeouts"),
    homeRunsAllowed: document.getElementById("home-runs-allowed"),
    wins: document.getElementById("wins"),
    losses: document.getElementById("losses")
};

const playerElements = {
    playerChoice: document.getElementById("player-choice"),
    playerName: document.getElementById("player-name"),
    batterStats: document.getElementById("batter-stats"),
    pitcherStats: document.getElementById("pitcher-stats")
};

const inputElements = {
    inputData: document.getElementById("stat-input"),
    mainButton: document.getElementById("main-button"),
    baseballStatsDisplay: document.getElementById("baseball-stats"),
    resultsBox: document.getElementById("results-box"),
    statsBox: document.getElementById("stats-go-here"),
    statHeader: document.querySelector("h2"),
    statLabels: document.getElementById("stat-labels"),
    miscStatLabels: document.getElementById("misc-stat-labels"),
    miscStats: document.getElementById("misc-stats"),
    nameContainer: document.querySelector(".input-data"),
    mainForm: document.getElementById("main-form"),
    container: document.getElementById("stats-container")
};

const batterBackground = "Resources/HomePlate3x3.png";
const pitcherBackground = "Resources/mlb-mound.png";
const defaultBackground = "Resources/baseball.png";

function selectPlayer() {

    playerElements.playerChoice.addEventListener("change", function(event) {
        const playerValue = event.target.value;

        if (playerValue=== "batter") {
            playerElements.batterStats.style.display = "inline-flex";
            playerElements.pitcherStats.style.display = "none";
            inputElements.nameContainer.style.display = "flex";
            document.body.style.backgroundImage = `url(${batterBackground})`;

            for (let element in battingElements) {
                if (battingElements[element]) {
                    battingElements[element].setAttribute("required", "true");
                };
            };

            for (let element in pitchingElements) {
                if (pitchingElements[element]) {
                    pitchingElements[element].removeattribute = "required";
                };
            };
        
        } else if (playerValue === "pitcher") {
            playerElements.pitcherStats.style.display = "inline-flex";
            playerElements.batterStats.style.display = "none";
            inputElements.nameContainer.style.display = "flex";
            document.body.style.backgroundImage = `url(${pitcherBackground})`;

            for (let element in pitchingElements) {
                if (pitchingElements[element]) {
                    pitchingElements[element].setAttribute("required", "true");
                };
            };

            for (let element in battingElements) {
                if (battingElements[element]) {
                    battingElements[element].removeattribute = "required";
                };
            };

        } else {
            playerElements.pitcherStats.style.display = "none";
            playerElements.batterStats.style.display = "none";
            inputElements.nameContainer.style.display = "none";
            document.body.style.backgroundImage = `url(${defaultBackground})`;
        }
    });
};

function formatStat(number) {
    //This will remove the leading zero from any 0.xxx or 1.xxx stat
    return number.toString().replace(/^0\./, '.');
};

function calcBattingAverage(hitsStat, atBatsStat) {
    const average = parseFloat(hitsStat) / parseFloat(atBatsStat);
    const roundedAverage = average.toFixed(3);
    const finalStatAvg = formatStat(roundedAverage);
    return finalStatAvg
};

function calcOnBasePercentage(hitsStat, atBatsStat, walksStat, hitByPitchesStat, sacrificeFliesStat) {
    const onBaseNumerator = parseFloat(hitsStat) + parseFloat(walksStat) + parseFloat(hitByPitchesStat);
    const denominator = parseFloat(atBatsStat) + parseFloat(walksStat) + parseFloat(sacrificeFliesStat) + parseFloat(hitByPitchesStat);
    const onBase = onBaseNumerator / denominator;
    const roundedOnBase = onBase.toFixed(3);
    const finalStatOpb = formatStat(roundedOnBase);
    return finalStatOpb;
};

function calcSlugging(singlesStat, doublesStat, triplesStat, homeRunsStat, atBatsStat) {
    const numerator = (parseFloat(singlesStat) + (2 * parseFloat(doublesStat))+ (3 * parseFloat(triplesStat)) + (4 * parseFloat(homeRunsStat)));
    const slugging = numerator / parseFloat(atBatsStat);
    const roundedSlugging = slugging.toFixed(3);
    const finalStatSlg = formatStat(roundedSlugging);
    return finalStatSlg
};

function calcOnBasePlusSlugging(hitsStat, atBatsStat, walksStat, hitByPitchesStat, sacrificeFliesStat, singlesStat, doublesStat, triplesStat, homeRunsStat) {
    const obpStat = parseFloat(calcOnBasePercentage(hitsStat, atBatsStat, walksStat, hitByPitchesStat, sacrificeFliesStat));
    const sluggingStat = parseFloat(calcSlugging(singlesStat, doublesStat, triplesStat, homeRunsStat, atBatsStat));
    const opsStat = obpStat + sluggingStat;
    const roundedOPS = opsStat.toFixed(3);
    const finalStatOps = formatStat(roundedOPS);
    return finalStatOps;
};


function hittingMath() {
    const battingAverage = calcBattingAverage(battingElements.hits.value, battingElements.atBats.value);
    const onBasePercentage = calcOnBasePercentage(battingElements.hits.value, battingElements.atBats.value, battingElements.walks.value, battingElements.sacrificeFlies.value, battingElements.hitByPitches.value);
    const slugging = calcSlugging(battingElements.singles.value, battingElements.doubles.value, battingElements.triples.value, battingElements.homeRuns.value, battingElements.atBats.value);
    const onBasePlusSlugging = calcOnBasePlusSlugging(battingElements.hits.value, battingElements.atBats.value, battingElements.walks.value, battingElements.sacrificeFlies.value, battingElements.hitByPitches.value, battingElements.singles.value, battingElements.doubles.value, battingElements.triples.value, battingElements.homeRuns.value);
    return { battingAverage, onBasePercentage, slugging, onBasePlusSlugging }
};

function calcEarnedRunAvg(earnedRunsStat, inningsPitchedStat) {
    const earnedRunAvgNumerator = parseFloat(earnedRunsStat) * 9;
    const earnedRunAvg = earnedRunAvgNumerator / parseFloat(inningsPitchedStat);
    const roundedERA = earnedRunAvg.toFixed(2);
    const finalStatEra = formatStat(roundedERA);
    return finalStatEra;
};

function calcWalksHitsInningPitched(walksIssuedStat, inningsPitchedStat, hitsGivenUpStat) {
    const whipNumberator = parseFloat(walksIssuedStat) + parseFloat(hitsGivenUpStat);
    const walksHitsInningsPitched = whipNumberator / parseFloat(inningsPitchedStat);
    const roundedWHIP = walksHitsInningsPitched.toFixed(3);
    const finalStatWhip = formatStat(roundedWHIP);
    return finalStatWhip;
};

function calcPer9Stats(strikeoutsStat, walksIssuedStat, hitsGivenUpStat, homeRunsAllowedStat,  inningsPitchedStat) {
    const innings = parseFloat(inningsPitchedStat);
    const stats = [strikeoutsStat, walksIssuedStat, hitsGivenUpStat, homeRunsAllowedStat];
    const finalStat = ["finalStatK", "finalStatBb", "finalStatHits", "finalStatHr"];
    const result = {};

    for (let x = 0; x < stats.length; x++) {
        const per9Equation = ((parseFloat(stats[x]) * 9) / innings).toFixed(3);
        result[`${finalStat[x]}`] = formatStat(per9Equation);
    };
    return result;
};

function pitchingMath() {
    const earnedRunsMath = calcEarnedRunAvg(pitchingElements.earnedRuns.value, pitchingElements.inningsPitched.value);
    const walksHitsMath = calcWalksHitsInningPitched(pitchingElements.walksIssued.value, pitchingElements.inningsPitched.value, pitchingElements.hitsGivenUp.value);
    const statsPer9Math = calcPer9Stats(pitchingElements.strikeouts.value, pitchingElements.walksIssued.value, pitchingElements.hitsGivenUp.value, pitchingElements.homeRunsAllowed.value, pitchingElements.inningsPitched.value);
    return { earnedRunsMath, walksHitsMath, statsPer9Math }
};

function clearResults() {
    const removeText = [inputElements.statsBox, inputElements.statHeader, inputElements.statLabels, inputElements.miscStatLabels, inputElements.miscStats];

    for (let label = 0; label < removeText.length; label++) {
        removeText[label].innerText = "";
    };
};
   
function displayStats() {
    let player = "";

    playerElements.playerChoice.addEventListener("change", function(event) {
        player = event.target.value;
        if (player === "") {
            clearResults();
        } else {
            clearResults();
        };
    });

    inputElements.mainForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const playerNameValue = playerElements.playerName.value;

        if (player === "batter") {
            const hittingStats = hittingMath();

            inputElements.statHeader.style.display = "inline";
            inputElements.resultsBox.style.display = "grid";
            inputElements.statHeader.innerText = `${playerNameValue}'s Stat Line`;

            inputElements.statLabels.innerText = "AVG  |  OBP  |  SLG  |  OPS  "
            inputElements.statsBox.innerText = `${hittingStats.battingAverage}  /  ${hittingStats.onBasePercentage}  /  ${hittingStats.slugging}  /  ${hittingStats.onBasePlusSlugging}`;
            inputElements.miscStatLabels.innerText = "AB  |  H  |  HR  |  R |  RBI  |  SB";
            inputElements.miscStats.innerText = `${battingElements.atBats.value}  |  ${battingElements.hits.value}  |  ${battingElements.homeRuns.value}  |  ${battingElements.runsScored.value}  |  ${battingElements.runsBattedIn.value}  |  ${battingElements.stolenBases.value}`;

        } else if (player === "pitcher") {
            const pitchingStats = pitchingMath();

            inputElements.statHeader.style.display = "inline";
            inputElements.resultsBox.style.display = "grid";
            inputElements.statHeader.innerText = `${playerNameValue}'s Stat Line`;
            
            inputElements.statLabels.innerText = "W  |  L  |  ERA  |  IP  |  HA  |  RA  |  ER  |  HR  |  BB  |  SO  ";
            inputElements.statsBox.innerText = `${pitchingElements.wins.value}  |  ${pitchingElements.losses.value}  |  ${pitchingStats.earnedRunsMath}  |  ${pitchingElements.inningsPitched.value}  |  ${pitchingElements.hitsGivenUp.value}  |  ${pitchingElements.runsAllowed.value}  |  ${pitchingElements.earnedRuns.value}  |  ${pitchingElements.homeRunsAllowed.value}  |  ${pitchingElements.walksIssued.value}  |  ${pitchingElements.strikeouts.value}  `;
            inputElements.miscStatLabels.innerText = "WHIP  |  H/9  |  HR/9  |  BB/9  |  SO/9  ";
            inputElements.miscStats.innerText = `${pitchingStats.walksHitsMath}  |  ${pitchingStats.statsPer9Math.finalStatHits}  |  ${pitchingStats.statsPer9Math.finalStatHr}  |  ${pitchingStats.statsPer9Math.finalStatBb}  |  ${pitchingStats.statsPer9Math.finalStatK}  `;
        };
    });
};



function main() {
    selectPlayer();
    displayStats();
};

main();