import { renderPage, startTimer, resetTimer } from "./renderpage.js";
import { mainmenu, startgamemenu } from "./mainmenu.js";

let moves = 0;
let level = "difficult";
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

// game page function
export function gamePage() {
    $(".game").html('')
    $(".game").html(`<div class="nav-bar">
                            <div class="moves-display main-menu-btn">Moves: ${moves}</div>
                            <div class="timer-display main-menu-btn">Time: 00:00</div>
                               <div class="sidebar-btn main-menu-btn main-menu-btn-sidebar  restart restart-btn">
                                    <i class="fas fa-rotate-right"></i>
                                    <span>Restart</span>
                                </div>
                                <div class="sidebar-btn main-menu-btn main-menu-btn-sidebar back-level back-to-level ">
                                  <i class="fab fa-deezer"></i>
                                  <span>Level Selection</span>
                                </div>
                                    <div class="sidebar-btn main-menu-btn main-menu-btn-sidebar back-menu back-to-menu ">
                                  <i class="fas fa-bars"></i>
                                  <span>Back to Menu</span>
                                </div>
                                    <div class="sidebar-btn main-menu-btn main-menu-btn-sidebar sound-in-game sound">
                                  <i class="fas fa-bullhorn"></i>
                                  <span>Sound</span>
                                </div>
                        </div>
                        <div class="game-body"></div>`);
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
    $(".restart-btn").on("click", function () {
        resetTimer();
        startTimer();
        renderPage(level, imageParameter);
    });
    // Render the game
    renderPage(level, imageParameter);
}