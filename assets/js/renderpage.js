import { showGameCompletion } from "./notification.js";

var container = document.getElementsByClassName("game-body");
let moves = 0;
let flippedCards = [];
let matchedPairs = 0;
let gameTimer;
let seconds = 0;
let minutes = 0;
var backgroundImage = "./assets/images/marvelCards.jpeg";
let canFlip = true;


// all sounds
const sounds = {
    correct: new Audio("./assets/audio/right-sound.wav"),
    wrong: new Audio("./assets/audio/wrong-sound.mp3"),
    flip: new Audio("./assets/audio/flip-audio.wav"),
    completion: new Audio("./assets/audio/completion-sound.wav"),
};

// Function to start the timer
export function startTimer() {
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
export function resetTimer() {
    clearInterval(gameTimer);
    seconds = 0;
    minutes = 0;
    updateTimer();
}

// Function to update and display the timer
export function updateTimer() {
    $(".timer-display").text(`Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
}

export function renderPage(level, imageArr) {
    if (!container[0]) return;
    $(container[0]).html('');
    var currentLevel = {lvl: level, images: imageArr};
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
                            showGameCompletion(moves, minutes, seconds, level, currentLevel);
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
