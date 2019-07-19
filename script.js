let score1 = 0, score2 = 0;

const score = document.querySelectorAll('.score div');

const buttons = document.querySelectorAll('.buttons button');

function selectButton(button) {
    button.addEventListener('click', playerButton);
    button.addEventListener('click', game);
}

let playerSelection;
function playerButton(e) {
    playerSelection = this.className;
    const playerImg = document.querySelector('.game .player');
    if(playerSelection == 'rock') {
        playerImg.setAttribute('src', './hands/rockPlayer.png');
    } else if(playerSelection == 'paper') {
        playerImg.setAttribute('src', './hands/paperPlayer.png');
    } else {
        playerImg.setAttribute('src', './hands/scissorsPlayer.png');
    }
}

function computerPlay() {
    const num = Math.floor(Math.random()*3)+1;
    const computerImg = document.querySelector('.game .computer');
    if(num == 1) {
        computerImg.setAttribute('src', './hands/rockComputer.png');
        return 'rock';
    } else if(num == 2) {
        computerImg.setAttribute('src', './hands/paperComputer.png');
        return 'paper';
    } else {
        computerImg.setAttribute('src', './hands/scissorsComputer.png');
        return 'scissors';
    }
}

function playRound(computerSelection, playerSelection) {
    if(computerSelection == playerSelection)
        return 0
    else if(computerSelection == 'rock') {
        if(playerSelection == 'paper')
            return 1
        else return -1
    } else if(computerSelection == 'paper') {
        if(playerSelection == 'scissors')
            return 1
        else return -1
    } else {
        if(playerSelection == 'rock')
            return 1
        else return -1
    }
}

function game() {
    let result = playRound(computerPlay(), playerSelection)
    if(result == 1) {
        score1++;
        score[0].textContent = score1;
    } else if(result == -1) {
        score2++;
        score[1].textContent = score2;
    }
    if(score1 == 5 || score2 == 5) {
        decideWinner();
    }
}

function decideWinner() {
    const button = document.querySelector('.game button');
    if(score1 == 5) {
        button.textContent = 'You win!!';
        reset();
    }
    if(score2 == 5) {
        button.textContent = 'You lose!';
        reset();
    }
}

function disableButton(button) {
    button.removeEventListener('click', playerButton);
    button.removeEventListener('click', game);
}

function reset() {
    buttons.forEach(disableButton);
    const button = document.querySelector('.game button');
    button.addEventListener('click', gameStart);
}

function gameStart() {
    score1 = 0;
    score2 = 0;
    this.textContent = 'Playing';
    score.forEach(scoreDiv => scoreDiv.textContent = '0');
    buttons.forEach(selectButton);
    this.removeEventListener('click', gameStart);
} 

gameStart();