const squares = document.querySelectorAll('.square');
const mole = document.getElementsByClassName('mole');
const score = document.getElementById('score');
const timeLeft = document.getElementById('time-left');

let result = 0;
let hitPosition;
let currentTime = 10;
let timerId = null;


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

let countDownTimerId = setInterval(countDown, 1000);

function countDown() {
    currentTime--;
    timeLeft.innerText = currentTime;

    if(currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('GAME OVER! Your final core is ' + result);
    }
}

