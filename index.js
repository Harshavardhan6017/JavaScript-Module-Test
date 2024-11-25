const rulesElement = document.getElementById('rules');
const cancelButton = document.getElementById('inner-cancel');
const gameContainer = document.getElementById('game');
const rockButton = gameContainer.querySelector('.rock');
const scissorButton = gameContainer.querySelector('.scissor');
const paperButton = gameContainer.querySelector('.paper');
const rightCircleIndicator = document.querySelector('.circle-right');
const lossParagraph = document.querySelector('.lost-para');
const nextPageButton = document.querySelector('#next');
const actionButtons = document.querySelectorAll('.big-circle');
const clickDisplay = document.querySelector('.click-display');
const opponentDisplay = document.querySelector('.against-para');
const opponentPick = document.querySelector('#pc-pick');
const playerPick = document.querySelector('#my-pick');
const restartButton = document.querySelector('.play-again-button');
const computerScoreElement = document.querySelector('#computer-score');
const playerScoreElement = document.querySelector('#my-score');
const winMessage = document.querySelector('.win-para');
const lossMessage = document.querySelector('.lost-para');
const tieMessage = document.querySelector('.tie');
const leftCircleIndicator = document.querySelector('.circle-left');


let playerScore = parseInt(localStorage.getItem('player_score')) || 0;
let computerScore = parseInt(localStorage.getItem('computer_score')) || 0;
computerScoreElement.innerHTML = computerScore;
playerScoreElement.innerHTML = playerScore;

nextPageButton.addEventListener('click', () => {
    location.href = "win.html";
});

function updatePlayerScore() {
    playerScore += 1;
    localStorage.setItem('player_score', playerScore);
    playerScoreElement.innerHTML = playerScore;
    winMessage.style.visibility = 'visible';
    leftCircleIndicator.style.visibility = 'visible';
    rulesElement.style.right = '170px';
    nextPageButton.style.visibility = 'visible';
}

restartButton.addEventListener('click', () => {
    location.reload();
});

rulesElement.addEventListener('click', () => {
    document.getElementById('rules-defined').style.visibility = 'visible';
});

cancelButton.addEventListener('click', () => {
    document.getElementById('rules-defined').style.visibility = 'hidden';
});

function handlePick(button, pickValue) {
    button.removeEventListener('click', () => handlePick(button, pickValue));
    gameContainer.style.visibility = 'hidden';
    button.style.visibility = 'visible';
    button.style.top = '20%';
    button.style.left = '-12%';
    makeComputation(pickValue);
}

rockButton.addEventListener('click', () => handlePick(rockButton, 0));
scissorButton.addEventListener('click', () => handlePick(scissorButton, 1));
paperButton.addEventListener('click', () => handlePick(paperButton, 2));

function makeComputation(playerChoice) {
    actionButtons.forEach(button => {
        button.disabled = true;
        button.classList.add('disabled-button');
    });

    const computerChoice = Math.floor(Math.random() * 3);
    const compElement = document.querySelector(`[value="${computerChoice}"]`);
    const clonedCompElement = compElement.cloneNode(true);

    opponentDisplay.style.visibility = 'visible';
    opponentPick.style.visibility = 'visible';
    playerPick.style.visibility = 'visible';
    restartButton.style.visibility = 'visible';

    if (computerChoice === playerChoice) {
        document.getElementById('clone-element').append(clonedCompElement);
        tieMessage.style.visibility = 'visible';
        opponentDisplay.style.visibility = 'hidden';
        restartButton.innerHTML = 'REPLAY';
    } else {
        switch (true) {
            case playerChoice === 0 && computerChoice === 1:
            case playerChoice === 1 && computerChoice === 2:
            case playerChoice === 2 && computerChoice === 0:
                updatePlayerScore();
                break;
            default:
                computerScore += 1;
                localStorage.setItem('computer_score', computerScore);
                computerScoreElement.innerHTML = computerScore;
                lossMessage.style.visibility = 'visible';
                rightCircleIndicator.style.visibility = 'visible';
                break;
        }
        compElement.style.visibility = 'visible';
        compElement.style.left = '32%';
        compElement.style.top = '20%';
    }
}
