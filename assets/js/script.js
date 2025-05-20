import { aboutOverlay, mainmenu, startgamemenu } from "./mainmenu.js";
import showSoundOverlay from "./sound.js";
import { showLeaderBoard } from "./leaderboard.js";
import { changeBG } from "./background.js";
import { gamePage } from "./gamepage.js";

mainmenu();
$(".game").on("click", ".start-game", startgamemenu);
$(".game").on("click", ".back", mainmenu);
$(".game").on("click", ".leaderboard", showLeaderBoard);
$(".game").on("click", ".render-page", gamePage);

// event listener for the "Sound" button to show the overlay
$(".game").on("click", ".sound", function () {
    showSoundOverlay();
});
// background call
$(".game").on("click", ".background-btn", changeBG);
$(".game").on("click", ".about-btn", aboutOverlay);


