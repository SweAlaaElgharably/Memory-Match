// main menu function 
export function mainmenu() {
    $(".game").html(`
        <h1 class="typewrite" data-text="MARVEL"></h1>
        <h2 class="typewrite" data-text="Memory Matching Game"></h2>
        <menu class="main-menu">
            <button class="main-menu-btn start-game">Start Game</button>
            <button class="main-menu-btn sound">Sound</button>
            <button class="main-menu-btn background-btn">Background</button>
            <button class="main-menu-btn">About</button>
            <button class="main-menu-btn leaderboard">Leaderboard</button>
        </menu>`);
    typeAll();
}

function typeAll() {
    const elements = document.querySelectorAll('.typewrite');
    let delay = 0;
    elements.forEach(el => {
        el.textContent = "";
        const text = el.getAttribute('data-text');
        setTimeout(() => typeWriter(el, text, 0), delay);
        delay += text.length * 80 + 500; // adjust speed and pause between lines
    });
}

function typeWriter(element, text, i) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        setTimeout(() => typeWriter(element, text, i + 1), 80);
    }
}

// level menu function
export function startgamemenu() {
    $(".game").html(`
        <menu class="main-menu">
            <button class="main-menu-btn render-page">Easy</button>
            <button class="main-menu-btn render-page">Normal</button>
            <button class="main-menu-btn render-page">Difficult</button>
            <button class="main-menu-btn back">Back</button>
        </menu>`);
}
