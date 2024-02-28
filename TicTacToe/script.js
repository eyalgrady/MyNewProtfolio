const parent = document.querySelector(".start-container");
const closeBtn = document.querySelector(".close-btn");
const gameboard = document.getElementById("gameboard");

let playerText = document.getElementById('playerText');
let start = document.getElementById('startBtn');
let reStart = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const winningCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function appear() {
    parent.style.display = "block";
    gameboard.style.filter = "blur(10px)"
}

function disappearX() {
    parent.style.display = "none";
    gameboard.style.filter = "blur(0)"
}

const startGame = () => {
    reStart.style.display = 'block';
    disappearX()
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            // console.log(winning_blocks);
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}

function playerHasWon() {
    for (condition of winningCombs) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerHTML = ''
        box.style.backgroundColor = ''
    })

    playerText.innerHTML = 'Tic Tac Toe'
    currentPlayer = X_TEXT;
}

start.addEventListener('click', startGame);
closeBtn.addEventListener("click", disappearX);
reStart.addEventListener('click', restart)







