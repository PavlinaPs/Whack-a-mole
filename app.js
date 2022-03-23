
    const squares = document.querySelectorAll('.square');
    const mole = document.getElementsByClassName('mole');
    const score = document.getElementById('score');
    const timeLeft = document.getElementById('time-left');
    const gameBoard = document.querySelector('.grid');
    const gameOver = document.querySelector('.game-over');
    const resultGameOver = document.getElementById('result');
    const saysMartin = document.getElementById('saysMartin');
    const newGameButton = document.getElementById('newGame');

    let lockboard = false;
    
function playWhackAMole() {
    let result = 0;
    let hitPosition;
    var currentTime = 5;
    var timerId = null;
    let martinsLine;
    
    if(lockboard === true) {
        return;
    }

    score.innerText = result;
    timeLeft.innerText = currentTime;

    function selectRandom() {
        squares.forEach(square => {
            square.classList.remove('mole');
        })

        let randomSquare = squares[Math.floor(Math.random() * 9)];
        randomSquare.classList.add('mole');

        hitPosition = randomSquare.id;
    }

    squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if(square.id == hitPosition) {
                result++;
                score.innerText = result;
                hitPosition = null;
            }
        })
    })

    function moveMole() {
        timerId = setInterval(selectRandom, 1000);
    }
    moveMole()

    var countDownTimerId = setInterval(countDown, 1000);

    function countDown() {
        currentTime--;
        timeLeft.innerText = currentTime;
        lockboard = true;
        if(currentTime == 0) {
            clearInterval(countDownTimerId);
            clearInterval(timerId);
            gameBoard.setAttribute('hidden', '');
            gameOver.removeAttribute('hidden');
            resultGameOver.innerText = result;
            martinSays(result);
            saysMartin.innerText = martinsLine;
            lockboard = false;
        }
    }

    function martinSays(score) {
        switch(true) {
            case score === 0:
                martinsLine = "Martin is not happy. The mole will make more hills!"
                break;
            case 0 < score && score < 6:
                martinsLine = "Martin says, please, get more moles next time."
                break;
            case 6 <= score && score <= 9:
                martinsLine = "Martin is happy and says thank you!"
                break;
            case score >= 10:
                martinsLine = "Martin is excited! No more hills!"
                break;
        }
    }
}
playWhackAMole();

newGameButton.addEventListener('click', playNewGame);

function playNewGame() {
    gameOver.setAttribute('hidden', '');
    gameBoard.removeAttribute('hidden');
    playWhackAMole();
}