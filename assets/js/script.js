import { mainmenu, startgamemenu } from "./mainmenu.js";
import showSoundOverlay from "./sound.js";
import { showLeaderBoard } from "./leaderboard.js";
import { changeBG } from "./background.js";

// global variables
const sounds = {
  correct: new Audio("./assets/audio/right-sound.wav"),
  wrong: new Audio("./assets/audio/wrong-sound.mp3"),
  flip: new Audio("./assets/audio/flip-audio.wav"),
  completion: new Audio("./assets/audio/completion-sound.wav"),
};
var container = document.getElementsByClassName("game-body");
var backgroundImage = "./assets/images/marvel-back.jpeg";
let moves = 0;
let flippedCards = [];
let canFlip = true;
let gameTimer;
let seconds = 0;
let minutes = 0;
let matchedPairs = 0;
let level = "difficult";
let currentLevel = {columns: 0, height: 0, images: []};
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

mainmenu();
$(".game").on("click", ".start-game", startgamemenu);
$(".game").on("click", ".back", mainmenu);
$(".game").on("click", ".leaderboard", showLeaderBoard);

// game page function
function gamePage() {
    $(".game").html('')
    $(".game").html(`<div class="nav-bar">
                            <button class="main-menu-btn back-to-menu">Back to Menu</button>
                            <div class="moves-display main-menu-btn">Moves: ${moves}</div>
                            <div class="timer-display main-menu-btn">Time: 00:00</div>
                            <button class="main-menu-btn back-to-level">Level Selection</button>
                            <button class="main-menu-btn restart-btn">Restart Game</button>
                        </div>
                        <div class="game-body"></div>`);
    $(".restart-btn").on("click", function () {
        resetTimer();
        startTimer();
        renderPage(currentLevel.lvl, currentLevel.images);
    });
    $(".back-to-menu").on("click", () => mainmenu());
    $(".back-to-level").on("click", () => startgamemenu());
    level = $(this).text();
    let  imageParameter;
    if (level === "Easy") {
        
        imageParameter = cardsImages.sort(() => Math.random() - 0.5).slice(0, 8);
    } else if (level === "Normal") {
        imageParameter = cardsImages.sort(() => Math.random() - 0.5).slice(0, 18);
    } else if (level === "Difficult") {
        imageParameter = cardsImages;
    }
    // Render the game
    renderPage(level, imageParameter);
}
$(".game").on("click", ".render-page", gamePage);

// Function to update and display the timer
function updateTimer() {
    $(".timer-display").text(`Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
}

// Function to start the timer
function startTimer() {
    gameTimer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        updateTimer();
    }, 1000);
}

// Function to reset the timer
function resetTimer() {
    clearInterval(gameTimer);
    seconds = 0;
    minutes = 0;
    updateTimer();
}

// Function to show game completion notification
function showGameCompletion() {
    saveScore(moves, $(".timer-display").text(), level);
    const notification = document.createElement('div');
    notification.className = 'game-completion';
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
        renderPage(currentLevel.lvl, currentLevel.images);
    });
    notification.querySelector('.menu-btn').addEventListener('click', () => {
        notification.remove();
        resetTimer();
        mainmenu();
    });
}

// game render page
function renderPage(level, imageArr) {
    if (!container[0]) return;
    $(container[0]).html('');
    currentLevel = {lvl: level, images: imageArr};
    // Reset game state
    moves = 0;
    flippedCards = [];
    matchedPairs = 0;
    $(".moves-display").text(`Moves: ${moves}`);
    resetTimer();
    startTimer();
    // cards section
   const section = document.createElement("section");
   section.className = `parent-${level}`;
    const allImages = [...imageArr, ...imageArr,].sort(() => Math.random() - 0.5);
    allImages.forEach(image => {
        const div = document.createElement('div');
        div.className = `card-${level}`;
       
        div.dataset.image = image; 
         const front = document.createElement("div");
        front.className = "card-front";
        const frontImg = document.createElement('img')
        frontImg.setAttribute("src" , `${backgroundImage}` )
        frontImg.className='front-img'
        front.appendChild(frontImg)


        const back = document.createElement('div');
        back.className = 'card-back';
        const backImg = document.createElement('img')
        backImg.setAttribute("src" , `${image}` )
        backImg.className='back-img'
        back.appendChild(backImg)

               // Add the front and back to the card
        div.appendChild(front);
        div.appendChild(back);
        // Modified click event for card flipping and matching
        div.addEventListener('click', function () {
            if (!canFlip || div.classList.contains('flipped') || div.classList.contains('matched')) return;
            div.classList.add('flipped');
           sounds.flip.currentTime = 0;
            sounds.flip.play();
            flippedCards.push(div);
            if (flippedCards.length === 2) {
                canFlip = false;
                moves++; // Increment moves counter when two cards are flipped
                $(".moves-display").text(`Moves: ${moves}`); // Update moves display
                const [card1, card2] = flippedCards;
                if (card1.dataset.image === card2.dataset.image) {
                    // Match found
                    setTimeout(() => {
                        card1.classList.add('matched');
                        card2.classList.add('matched');
                        matchedPairs++;
                        flippedCards = [];
                        canFlip = true;
                        sounds.correct.currentTime = 0;
                        sounds.correct.play();

                        // Check if game is complete
                        if (matchedPairs === currentLevel.images.length) {
                            clearInterval(gameTimer);
                            showGameCompletion();
                            sounds.completion.currentTime = 0;
                            sounds.completion.play();
                        }
                    }, 500);
                } else {
                    // No match
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                        flippedCards = [];
                        canFlip = true;
                        sounds.wrong.currentTime = 0;
                        sounds.wrong.play();
                    }, 1000);
                }
            }
        });
        section.appendChild(div);
    });
    container[0].appendChild(section);
}

// event listener for the "Sound" button to show the overlay
$(".game").on("click", ".sound", function () {
  showSoundOverlay();
});
// background call
$(".game").on("click", ".background-btn", changeBG);
