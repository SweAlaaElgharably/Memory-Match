import { saveScore } from "./leaderboard.js";
import { resetTimer, startTimer, renderPage } from "./renderpage.js";
import { mainmenu } from "./mainmenu.js";

// Function to show game completion notification
export function showGameCompletion(moves, minutes, seconds, level, currentLevel) {
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