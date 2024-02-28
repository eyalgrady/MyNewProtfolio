const simonGame = document.querySelector('.game-container');
const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');
const countValue = document.getElementById('count');
const startBtn = document.querySelector('.start-btn');
const newgameBtn = document.querySelector('.newgame-btn');
const stopBtn = document.querySelector('.stop-btn');
const pauseBtn = document.querySelector('.pause-btn');

let noise = true;

const getRandomPanel = () => {
    const panels = [
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    ]
    return panels[parseInt(Math.random() * panels.length)];
}

let sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];

const flash = (panel) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (panel == topLeft) one();
            if (panel == topRight) two();
            if (panel == bottomLeft) three();
            if (panel == bottomRight) four();
            setTimeout(() => {
                clearColor();
                resolve();
            }, 250);
        }, 1000);
    });
};

function one() {
    let audio = document.getElementById("clip1");
    audio.play();
    topLeft.style.backgroundColor = "lightgreen";
}

function two() {
    let audio = document.getElementById("clip2");
    audio.play();
    topRight.style.backgroundColor = "tomato";
}

function three() {
    let audio = document.getElementById("clip3");
    audio.play();
    bottomLeft.style.backgroundColor = "yellow";
}

function four() {
    let audio = document.getElementById("clip4");
    audio.play();
    bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
}

let canClick = false;

const panelClicked = (panelClicked) => {
    if (!canClick) return;
    const expectedPanel = sequenceToGuess.shift();
    if (expectedPanel === panelClicked) {
        if (sequenceToGuess.length === 0) {
            // start new game
            sequence.push(getRandomPanel());
            sequenceToGuess = [...sequence];
            startGame();
        }
    } else {
        // end game
        // alert('Game Over');
        countValue.innerHTML = 'Game Over';
        countValue.innerHTML = 0;
        sequence = [getRandomPanel()];
        sequenceToGuess = [...sequence];
        flashColor();
        appear();
    };
}

function flashColor() {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
}

// functions to set up panels
topLeft.addEventListener('click', (event) => {
    if (canClick) {
        one();
    }
    setTimeout(() => {
        clearColor();
    }, 300);
})
topRight.addEventListener('click', (event) => {
    if (canClick) {
        two();
    }
    setTimeout(() => {
        clearColor();
    }, 300);
})
bottomLeft.addEventListener('click', (event) => {
    if (canClick) {
        three();
    }
    setTimeout(() => {
        clearColor();
    }, 300);
})
bottomRight.addEventListener('click', (event) => {
    if (canClick) {
        four();
    }
    setTimeout(() => {
        clearColor();
    }, 300);
})

// Function to start the game

const startGame = async () => {
    disappearX()

    countValue.innerHTML++;
    countValue.style.display = 'block';
    for (let panel of sequence) {
        await flash(panel);
    }
    canClick = true;
}

startBtn.addEventListener('click', startGame);
newgameBtn.addEventListener('click', startGame);


// Function to stop the game

const stopGame = async () => {
    countValue.innerHTML = 0;
    sequence = [getRandomPanel()];
    sequenceToGuess = [...sequence];
    appear();
}

stopBtn.addEventListener('click', stopGame);


// Function to pause the game

const pauseGame = async () => {
    canClick = false;
    countValue.innerHTML--;
    countValue.style.display = 'none';

}

pauseBtn.addEventListener('click', pauseGame);



// < !--gameOver - container-- >

const parent = document.querySelector(".gameOver-container");
const closeBtn = document.querySelector(".close-btn");

function appear() {
    parent.style.display = "block";
    simonGame.style.filter = "blur(10px)"
}

closeBtn.addEventListener("click", disappearX);

function disappearX() {
    parent.style.display = "none";
    simonGame.style.filter = "blur(0)"
}

parent.addEventListener("click", disappearP)

function disappearP(e) {
    if (e.target.className == "gameOver-container") {
        parent.style.display = "none";
        simonGame.style.filter = "blur(0)"
    }
}