let movesDisplay = null;
let timerDisplay = null;
let restartBtn = null;
let gameTimer;
let seconds = 0;
let minutes = 0;
let isGameActive = false;
let totalCards = 0;
let matchedPairs = 0;
let moves = 0;
let flippedCards = [];
let canFlip = true;
const sounds = {
  correct: new Audio("./assets/audio/right-sound.wav"),
  wrong: new Audio("./assets/audio/wrong-sound.mp3"),
  bg: new Audio("./assets/audio/The Avengers Theme Song.mp3"),
  flip: new Audio("./assets/audio/flip-audio.wav"),
};
var container = document.getElementsByClassName("game");
var backgroundImage = "./assets/images/marvel-back.jpeg";
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

function mainmenu() {
  $(".game").html(`
        <menu class="main-menu">
            <button class="main-menu-btn start-game">Start Game</button>
            <button class="main-menu-btn sound">Sound</button>
            <button class="main-menu-btn background-btn">Background</button>
            <button class="main-menu-btn">About</button>
            <button class="main-menu-btn">Leaderboard</button>
        </menu>
        `);
}
mainmenu();

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
function changeBG() {
  $(".game").html(
    `
        <button class="main-menu-btn back">Back</button>
        <menu class="main-menu">
         <button class="main-menu-btn bg-function first-bg">
         <img id="Changeimg" src="assets/images/bg.jpg" alt="">
         </button>
            <button class="main-menu-btn bg-function second-bg">
                     <img id="Changeimg" src="assets/images/marvel.jpg" alt="">
            </button>
            <button class="main-menu-btn bg-function third-bg">
                     <img id="Changeimg" src="assets/images/avengers.jpg" alt="">

            </button>
        </menu>
        `
  );
}

$(".game").on("click", ".bg-function", function () {
  let img = $(this).find("img");
  let src = img.attr("src");
  document.body.style.backgroundImage = `url("${src}")`;
});

$(".game").on("click", ".start-game", startgamemenu);
$(".game").on("click", ".back", mainmenu);
$(".game").on("click", ".background-btn", changeBG);

//render cards function with sound function
$(".game").on("click", ".render-page", function () {
  // Create and add the back button to select the start menu
  var backBtn = document.createElement("button");
  backBtn.className = "main-menu-btn back-to-menu";
  backBtn.textContent = "Back to Menu";
  backBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
    `;
  document.body.appendChild(backBtn);
  // Add click handler for the back button
  backBtn.addEventListener("click", function () {
    // Remove the back button
    if (backBtn) {
      backBtn.remove();
      backBtn = null;
    }
    if (lvlBtn) {
      lvlBtn.remove();
      lvlBtn = null;
    }
    if (movesDisplay) {
      movesDisplay.remove();
      movesDisplay = null;
    }
    if (timerDisplay) {
      timerDisplay.remove();
      timerDisplay = null;
    }
    if (restartBtn) {
      restartBtn.remove();
      restartBtn = null;
    }
    // Show the start menu
    mainmenu();
  });

  // Create and add the back button to select a level
  var lvlBtn = document.createElement("button");
  lvlBtn.className = "main-menu-btn back-to-menu";
  lvlBtn.textContent = "Level Selection";
  lvlBtn.style.cssText = `
            position: fixed;
            width: 204px;
            top: 20px;
            left: 20px;
            z-index: 1000;
                                `;
  document.body.appendChild(lvlBtn);
  // Add click handler for the back button
  lvlBtn.addEventListener("click", function () {
    // Remove the back button
    if (lvlBtn) {
      lvlBtn.remove();
      lvlBtn = null;
    }
    if (backBtn) {
      backBtn.remove();
      backBtn = null;
    }
    if (movesDisplay) {
      movesDisplay.remove();
      movesDisplay = null;
    }
    if (timerDisplay) {
      timerDisplay.remove();
      timerDisplay = null;
    }
    if (restartBtn) {
      restartBtn.remove();
      restartBtn = null;
    }
    // Show the level selection menu
    startgamemenu();
  });

  const buttonText = $(this).text();
  let imageParameter;
  if (buttonText === "Easy") { 
    imageParameter = cardsImages.sort(() => Math.random() - 0.5).slice(0, 8);
  } else if (buttonText === "Normal") {
    imageParameter = cardsImages.sort(() => Math.random() - 0.5).slice(0, 18);
  } else if (buttonText === "Difficult") {
    imageParameter = cardsImages;
  }

  // Render the game
  renderPage(buttonText, imageParameter);
});

//$(".background").attr("src", "#");