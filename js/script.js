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
         <img id="Changeimg" src="/Memory-Match/assets/images/bg.jpg" alt="">
         </button>
            <button class="main-menu-btn bg-function second-bg">
                     <img id="Changeimg" src="/Memory-Match/assets/images/marvel.jpg" alt="">
            </button>
            <button class="main-menu-btn bg-function third-bg">
                     <img id="Changeimg" src="/Memory-Match/assets/images/avengers.jpg" alt="">

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
    console.log(backBtn);
    backBtn.remove();
    backBtn1.remove();
    // Clear the game board
    $(".game").empty();
    // Show the level selection menu
    mainmenu();
  });

  // Create and add the back button to select a level
  var backBtn1 = document.createElement("button");
  backBtn1.className = "main-menu-btn back-to-menu";
  backBtn1.textContent = "Level Selection";
  backBtn1.style.cssText = `
            position: fixed;
            width: 204px;
            top: 20px;
            left: 20px;
            z-index: 1000;
                                `;
  document.body.appendChild(backBtn1);
  // Add click handler for the back button
  backBtn1.addEventListener("click", function () {
    // Remove the back button
    backBtn1.remove();
    // Show the level selection menu
    startgamemenu();
  });

  const buttonText = $(this).text();
  let columns, height, imageParameter;
  if (buttonText === "Easy") {
    columns = 4;
    height = 140;
    imageParameter = cardsImages.sort(() => Math.random() - 0.5).slice(0, 8);
  } else if (buttonText === "Normal") {
    columns = 6;
    height = 100;
    imageParameter = cardsImages.sort(() => Math.random() - 0.5).slice(0, 18);
  } else if (buttonText === "Difficult") {
    columns = 8;
    height = 80;
    imageParameter = cardsImages;
  }

  // Render the game
  renderPage(columns, height, imageParameter);
});

//$(".background").attr("src", "#");

// cards js

const bgAudio = new Audio("./assets/audio/The Avengers Theme Song.mp3");
const flipAudio = new Audio("./assets/audio/flip-audio.wav");

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

function renderPage(columns, height, imageArr) {
  console.log(container[0]);
  if (!container[0]) return;
  container[0].innerHTML = "";
  container[0].style = "";

  const section = document.createElement("section");
  section.className = "parent";
  section.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

  const allImages = [...imageArr, ...imageArr].sort(() => Math.random() - 0.5);

  allImages.forEach((image) => {
    const div = document.createElement("div");
    div.className = "card";
    div.style.height = `${height}px`; // Add a class for styling and flipping

    const front = document.createElement("div");
    front.className = "card-front";
    front.style = `width: 100%; height: 100%; background: url(${backgroundImage}) no-repeat center/cover;`;

    const back = document.createElement("div");
    back.className = "card-back";
    back.style = `width: 100%; height: 100%; background: url(${image}) no-repeat center/cover;`;

    // Add the front and back to the card
    div.appendChild(front);
    div.appendChild(back);

    // Add click event to flip the card and play audio
    div.addEventListener("click", () => {
      if (!div.classList.contains("flipped")) {
        div.classList.add("flipped");
        flipAudio.currentTime = 0;
        flipAudio.play();
      }
    });

    section.appendChild(div);
  });

  container[0].appendChild(section);
}

//background voice add event listner
document.addEventListener("DOMContentLoaded", () => {
  // Wait for user interaction to play the audio
  document.body.addEventListener(
    "click",
    () => {
      bgAudio.loop = true;
      bgAudio.volume = 0.5;
      bgAudio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    },
    { once: true }
  ); // Ensure this event listener runs only once
});

// event listener for the "Sound" button to show the overlay
$(".game").on("click", ".sound", function () {
  showSoundOverlay();
});

// Function to show the sound overlay
function showSoundOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "sound-overlay";
  overlay.innerHTML = `
        <div class="sound-controls">
            <h3>Sound Settings</h3>
            <label><span>Volume:</span> <input type="range" id="volume-control" min="0" max="1" step="0.1" value="${
              bgAudio.volume
            }"></label>
            <button id="mute-btn">${bgAudio.muted ? "Unmute" : "Mute"}</button>
            <button id="close-overlay">Close</button>
        </div>
    `;
  document.body.appendChild(overlay);

  // Add event listeners for the controls
  document.getElementById("volume-control").addEventListener("input", (e) => {
    bgAudio.volume = e.target.value;
  });

  document.getElementById("mute-btn").addEventListener("click", () => {
    bgAudio.muted = !bgAudio.muted;
    document.getElementById("mute-btn").textContent = bgAudio.muted
      ? "Unmute"
      : "Mute";
  });

  document.getElementById("close-overlay").addEventListener("click", () => {
    document.body.removeChild(overlay);
  });
}
