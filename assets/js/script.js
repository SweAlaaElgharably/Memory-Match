// global variables
let movesDisplay = null;
let timerDisplay = null;
let restartBtn = null;
const bgAudio = new Audio('./assets/audio/The Avengers Theme Song.mp3');
const flipAudio = new Audio('./assets/audio/flip-audio.wav');
var container = document.getElementsByClassName("game");
var backgroundImage = "./assets/images/marvel-back.jpeg";
let moves = 0;
let flippedCards = [];
let canFlip = true;
let gameTimer;
let seconds = 0;
let minutes = 0;
let isGameActive = false;
let totalCards = 0;
let matchedPairs = 0;
var cardsImages = [
    "./assets/images/altron.jpg",
    "./assets/images/blackwidow.jpg",
    "./assets/images/bucky.jpg",
    "./assets/images/cap.jpg",
    "./assets/images/DD.jpg",
    "./assets/images/deadpool.jpg",
    "./assets/images/doom.jpg",
    "./assets/images/drax.png",
    "./assets/images/dr-strange.jpg",
    "./assets/images/fury.jpg",
    "./assets/images/groot.jpg",
    "./assets/images/hawkeye.jpg",
    "./assets/images/hulk.jpg",
    "./assets/images/ironfist.jpg",
    "./assets/images/ironman.jpg",
    "./assets/images/loki.jpg",
    "./assets/images/mysc.jpg",
    "./assets/images/panther.png",
    "./assets/images/punisher.png",
    "./assets/images/quicksilver.jpg",
    "./assets/images/reed.jpg",
    "./assets/images/rocket.jpg",
    "./assets/images/spidy.png",
    "./assets/images/starlord.jpg",
    "./assets/images/storm.jpg",
    "./assets/images/thanos.jpg",
    "./assets/images/thing.jpg",
    "./assets/images/thor.jpg",
    "./assets/images/torch.jpg",
    "./assets/images/venom.jpg",
    "./assets/images/wanda.jpg",
    "./assets/images/wolvrine.jpg",
];

// main menu function 
function mainmenu() {
    $(".game").html(`
        <menu class="main-menu">
            <button class="main-menu-btn start-game">Start Game</button>
            <button class="main-menu-btn sound">Sound</button>
            <button class="main-menu-btn">Background</button>
            <button class="main-menu-btn">About</button>
            <button class="main-menu-btn">Leaderboard</button>
        </menu>
        `);
}
mainmenu();

// level menu function
function startgamemenu() {
    $(".game").html(`
        <menu class="main-menu">
            <button class="main-menu-btn render-page">Easy</button>
            <button class="main-menu-btn render-page">Normal</button>
            <button class="main-menu-btn render-page">Difficult</button>
            <button class="main-menu-btn back">Back</button>
        </menu>
    `);
}
$(".game").on("click", ".start-game", startgamemenu);
$(".game").on("click", ".back", mainmenu);

// game page function
function gamePage() {
    var navBar = document.createElement("div")
    navBar.className = "nav-bar";
    $(".game").html('')
    $(".game").append(navBar);
    // Create back to menu button
    var backBtn = document.createElement("button");
    backBtn.className = "main-menu-btn back-to-menu";
    backBtn.textContent = "Back to Menu";
    // Create back to level button
    var lvlBtn = document.createElement("button");
    lvlBtn.className = "main-menu-btn back-to-menu";
    lvlBtn.textContent = "Level Selection";
    $(backBtn).on("click", () => {
        mainmenu();
    });
    $(lvlBtn).on("click", () => {
        startgamemenu();
    })
    $(".nav-bar").append(backBtn, lvlBtn)
    const buttonText = $(this).text();
    let columns, height, imageParameter;
    if (buttonText === "Easy") {
        columns = 4;
        height = 140;
        imageParameter = cardsImages.sort(() => Math.random() - 0.5).slice(0, 8);
    } else if (buttonText === "Normal") {
        columns = 6;
        height = 120;
        imageParameter = cardsImages.sort(() => Math.random() - 0.5).slice(0, 18);
    } else if (buttonText === "Difficult") {
        columns = 8;
        height = 80;
        imageParameter = cardsImages;
    }
    // Render the game
    renderPage(columns, height, imageParameter);
}
$(".game").on("click", ".render-page", gamePage);

// moves function
function updateMoves() {
    // Create or update moves display
    if (!movesDisplay) {
        movesDisplay = document.createElement('div');
        movesDisplay.className = 'moves-display main-menu-btn';
        $(".nav-bar").append(movesDisplay);
    }
    movesDisplay.textContent = `Moves: ${moves}`;
}
// Function to update and display the timer
function updateTimer() {
    if (!timerDisplay) {
        timerDisplay = document.createElement('div');
        timerDisplay.className = 'timer-display main-menu-btn';
        $(".nav-bar").append(timerDisplay);
    }
    timerDisplay.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to start the timer
function startTimer() {
    isGameActive = true;
    gameTimer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        updateTimer();
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(gameTimer);
    isGameActive = false;
}

// Function to reset the timer
function resetTimer() {
    stopTimer();
    seconds = 0;
    minutes = 0;
    updateTimer();
}

// Function to show game completion notification
function showGameCompletion() {
    const notification = document.createElement('div');
    notification.className = 'game-completion';
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        z-index: 2000;
        min-width: 300px;
    `;

    notification.innerHTML = `
        <h2>Game Completed! 🎉</h2>
        <p>Your Score (Moves): ${moves}</p>
        <p>Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</p>
        <button class="main-menu-btn restart-btn">Play Again</button>
        <button class="main-menu-btn menu-btn">Main Menu</button>
    `;

    document.body.appendChild(notification);

    // Add event listeners for the buttons
    notification.querySelector('.restart-btn').addEventListener('click', () => {
        notification.remove();
        resetTimer();
        startTimer();
        renderPage(currentLevel.columns, currentLevel.height, currentLevel.images);
    });

    notification.querySelector('.menu-btn').addEventListener('click', () => {
        notification.remove();
        resetTimer();
        mainmenu();
    });
}

// Store current level information
let currentLevel = {
    columns: 0,
    height: 0,
    images: []
};

// game render page
function renderPage(columns, height, imageArr) {
    if (!container[0]) return;
    currentLevel = {columns: columns, height: height, images: imageArr};
    // Reset game state
    moves = 0;
    flippedCards = [];
    matchedPairs = 0;
    totalCards = imageArr.length;
    updateMoves();
    resetTimer();
    startTimer();
    // Create restart button
    if (!restartBtn) {
        restartBtn = document.createElement('button');
        restartBtn.className = 'main-menu-btn restart-game-btn';
        restartBtn.textContent = 'Restart Level';
        restartBtn.style.cssText = `
            position: fixed;
            bottom: 750px;
            left: 20px;
            z-index: 1000;
        `;
        document.body.appendChild(restartBtn);

        restartBtn.addEventListener('click', () => {
            resetTimer();
            startTimer();
            renderPage(currentLevel.columns, currentLevel.height, currentLevel.images);
        });
    }
    // cards section
    const section = document.createElement('section');
    section.className = 'parent';
    section.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    const allImages = [...imageArr, ...imageArr,].sort(() => Math.random() - 0.5);
    allImages.forEach(image => {
        const div = document.createElement('div');
        div.className = 'card';
        div.style.height = `${height}px`;
        div.dataset.image = image; // Store the image path in a data attribute
        const front = document.createElement('div');
        front.className = 'card-front';
        front.style = `width: 100%; height: 100%; background: url(${backgroundImage}) no-repeat center/cover;`;
        const back = document.createElement('div');
        back.className = 'card-back';
        back.style = `width: 100%; height: 100%; background: url(${image}) no-repeat center/cover;`;
        // Add the front and back to the card
        div.appendChild(front);
        div.appendChild(back);
        // Modified click event for card flipping and matching
        div.addEventListener('click', function () {
            if (!canFlip || div.classList.contains('flipped') || div.classList.contains('matched')) return;
            div.classList.add('flipped');
            flipAudio.currentTime = 0;
            flipAudio.play();
            flippedCards.push(div);
            if (flippedCards.length === 2) {
                canFlip = false;
                moves++; // Increment moves counter when two cards are flipped
                updateMoves(); // Update moves display
                const [card1, card2] = flippedCards;
                if (card1.dataset.image === card2.dataset.image) {
                    // Match found
                    setTimeout(() => {
                        card1.classList.add('matched');
                        card2.classList.add('matched');
                        matchedPairs++;
                        flippedCards = [];
                        canFlip = true;
                        // Check if game is complete
                        if (matchedPairs === currentLevel.images.length) {
                            stopTimer();
                            showGameCompletion();
                        }
                    }, 500);
                } else {
                    // No match
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                        flippedCards = [];
                        canFlip = true;
                    }, 1000);
                }
            }
        });
        section.appendChild(div);
    });
    container[0].appendChild(section);
}

//background voice add event listner
document.addEventListener('DOMContentLoaded', () => {
    // Wait for user interaction to play the audio
    document.body.addEventListener('click', () => {
        bgAudio.loop = true;
        bgAudio.volume = 0.5;
        bgAudio.play().catch((error) => {
            console.error("Audio playback failed:", error);
        });
    }, { once: true }); // Ensure this event listener runs only once
});

// event listener for the "Sound" button to show the overlay
$(".game").on("click", ".sound", function () {
    showSoundOverlay();
});

// Function to show the sound overlay
function showSoundOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'sound-overlay';
    overlay.innerHTML = `
        <div class="sound-controls">
            <h3>Sound Settings</h3>
            <label><span>Volume:</span> <input type="range" id="volume-control" min="0" max="1" step="0.1" value="${bgAudio.volume}"></label>
            <button id="mute-btn">${bgAudio.muted ? 'Unmute' : 'Mute'}</button>
            <button id="close-overlay">Close</button>
        </div>
    `;
    document.body.appendChild(overlay);
    // Add event listeners for the controls
    document.getElementById('volume-control').addEventListener('input', (e) => {
        bgAudio.volume = e.target.value;
    });
    document.getElementById('mute-btn').addEventListener('click', () => {
        bgAudio.muted = !bgAudio.muted;
        document.getElementById('mute-btn').textContent = bgAudio.muted ? 'Unmute' : 'Mute';
    });
    document.getElementById('close-overlay').addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
}


