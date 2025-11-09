//Craps Main Data
let crapsUsername = ""

//Craps Game Settings
const startingMoney = 1000
const startingRounds = 0
const bets ={
    even: "EVEN",
    odd: "ODD"
}
const minimumBet = 100

//HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatsUsername = "craps-stats-username"
const crapsStatsMoney = "craps-stats-money"
const crapsStatsRounds = "craps-stats-rounds"
const crapsUserBetAmount = "craps-user-bet-amount"
const rollDiceButton = "roll-dice-button"
const crapsRollDiceAnimationContainer = "craps-roll-dice-animation-container"
const crapsBettingGridContainer = "craps-betting-grid-container"
const crapsRoundFinishGridContainer = "craps-round-finish-grid-container"
const crapsRoundFinishMessage = "craps-round-finish-message"
const crapsNextRoundBotton = "craps-next-round-botton"

//In-game variables
let currentMoney = startingMoney
let currentRounds = startingRounds
let currentBet = bets.even
let currentBetAmount = minimumBet
let canChangeBet = true


function registerCrapsPlayer() {
	crapsUsername =	document.getElementById(crapsUsernameInput).value

	// Username validation check
    let firstCharIsDigitRegex = /^[0-9]|[^a-zA-Z0-9_]/g
    if (firstCharIsDigitRegex.test(crapsUsername) || crapsUsername.length < 5) {
        alert("Username must be at least 5 characters long, alphanumeric and underscore only, no spaces, and cannot start with a digit")
    } else {
        removeRegistrationPane()
        showMainGameSection()
        setUpFirstRound ()
    }
}

function removeRegistrationPane () {
    document.getElementById(crapsRegistrationPane).style.display = "none"
}

function showRegistrationPane () {
    document.getElementById(crapsRegistrationPane).style.display = "block"
}

function showMainGameSection () {
    document.getElementById(crapsMainSection).style.display = "block"
}

function hideMainGameSection () {
    document.getElementById(crapsMainSection).style.display = "none"
}

function setUpFirstRound () {
    document.getElementById(crapsStatsUsername).innerHTML = crapsUsername
    setMoney (startingMoney)
    setRounds(startingRounds)
    betEven()
    setUpNextRound ()
}

function setUpNextRound () {
    document.getElementById(crapsRollDiceAnimationContainer).style.display = "none"
    document.getElementById(crapsRoundFinishGridContainer).style.display = "none"
    document.getElementById(rollDiceButton).style.display = "block"
    document.getElementById(crapsBettingGridContainer).style.display = "block"
    canChangeBet = true
    setBetAmount(minimumBet)

}

function setMoney (money) {
    currentMoney = money
    document.getElementById(crapsStatsMoney).innerHTML = money
}

function setRounds (round) {
    currentRounds = round
    document.getElementById(crapsStatsRounds).innerHTML = round
}



function betEven () {
    chooseBet(bets.even)
}

function betOdd () {
    chooseBet(bets.odd)
}
function chooseBet (bet) {
    if (canChangeBet) {
        currentBet = bet
        document.getElementById(bet).style.backgroundColor = "red"
        const deselectBet = bet == bets.even ? bets.odd : bets.even
        document.getElementById(deselectBet).style.backgroundColor = "transparent"
    }
}

function increaseBet () { 
    setBetAmount(Math.min(currentBetAmount + minimumBet, currentMoney))
}

function decreaseBet () {
    setBetAmount(Math.max(currentBetAmount - minimumBet, minimumBet))
}

function setBetAmount (betAmount) {
    if (canChangeBet) {
        currentBetAmount = betAmount
        document.getElementById(crapsUserBetAmount).innerHTML = "$" + betAmount
    }
}

function rollDice() {
    canChangeBet = false
    formatDiceScale ()
    document.getElementById(crapsRollDiceAnimationContainer).style.display = "block"
    document.getElementById(rollDiceButton).style.display = "none"
    const diceRollElement = document.getElementById(crapsRollDiceAnimationContainer)
    rollADie({ element: diceRollElement, numberOfDice: 2, callback: delayedProcessDiceResult, delay: 10000000 })
}

window.addEventListener("resize",formatDiceScale)

function formatDiceScale () {
    const vw = window.innerWidth * 0.8
    const vh = window.innerHeight * 0.8
    const widthScale = Math.min(700, vw, vh)
    const heightScale = widthScale * 0.714
    const scale = heightScale / 438.11039999999997
    document.getElementById(crapsRollDiceAnimationContainer).style.transform = "scale(" + scale + ")"
}
function delayedProcessDiceResult (diceResult) {
    setTimeout(function () { processDiceResult (diceResult) }, 2000)
}


function processDiceResult (diceResult) {
    const sum = diceResult.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    let diceSumResult = bets.even
    if (sum % 2 === 1) {
        diceSumResult = bets.odd
    }
    setRounds(currentRounds + 1)
    let roundFinishMessage = ""
    if (diceSumResult === currentBet) {
        // alert("YOU WIN")
        roundFinishMessage = "You WIN"
        setMoney(currentMoney + currentBetAmount)
    } else {
        // alert("YOU LOSE")
        roundFinishMessage = "You LOSE :("
        setMoney(currentMoney - currentBetAmount)
    }
    if (currentMoney === 0) {
        roundFinishMessage = "YOU'RE OUT! :)"
        document.getElementById(crapsNextRoundBotton).onclick = null
        document.getElementById(crapsNextRoundBotton).style.color = "grey"
        document.getElementById(crapsNextRoundBotton).style.backgroundColor = "rgba(0, 0, 0, 0.5)"
        document.getElementById(crapsNextRoundBotton).style.cursor = "not-allowed"
    }

    document.getElementById(crapsBettingGridContainer).style.display = "none"
    document.getElementById(crapsRoundFinishGridContainer).style.display = "block"
    document.getElementById(crapsRoundFinishMessage).innerHTML = roundFinishMessage
}

function exitGame() {
    if (currentRounds > 1) {
        alert("After Playing " + currentRounds + " Rounds, you leave with " + currentMoney + "$")
    } else {
        alert("After Playing " + currentRounds + " Round, you leave with " + currentMoney + "$")
    }
    
    hideMainGameSection ()
    showRegistrationPane ()
    document.getElementById(crapsUsernameInput).value = ""
}

