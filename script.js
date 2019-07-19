let score1 = 0, score2 = 0;

const score = document.querySelectorAll('.score div');

const buttons = document.querySelectorAll('.buttons button');

let playerSelection;
function playerButton() {
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

function disableButton() {
    buttons.forEach(button => {
        button.removeEventListener('click', playerButton);
        button.removeEventListener('click', game);
    });
}

function reset(e) {
    this.childNodes[0].textContent = 'Playing';
    this.removeChild(this.childNodes[1]);
    score1 = 0;
    score2 = 0;
    score.forEach(scoreDiv => scoreDiv.textContent = '0');
    enableButton();
    this.removeEventListener('click', reset);
}

function restart() {
    disableButton();
    const button = document.querySelector('.game button');
    button.addEventListener('click', reset);
}

function decideWinner() {
    const button = document.querySelector('.game button');
    const h2 = document.createElement('h2');
    h2.textContent = 'Restart'
    if(score1 == 5) {
        button.childNodes[0].textContent = 'You Win!'
        button.appendChild(h2);
        restart();
    }
    if(score2 == 5) {
        button.childNodes[0].textContent = 'You Lose!'
        button.appendChild(h2);
        restart();
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

function enableButton() {
    buttons.forEach(button => {
        button.addEventListener('click', playerButton);
        button.addEventListener('click', game);
    });
}

enableButton();




    