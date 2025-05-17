function mainmenu() {
    $(".game").html(`
        <menu class="main-menu">
            <button class="main-menu-btn start-game">Start Game</button>
            <button class="main-menu-btn">Sound</button>
            <button class="main-menu-btn">Background</button>
            <button class="main-menu-btn">About</button>
            <button class="main-menu-btn">Leader Board</button>
        </menu>
        `);
}
mainmenu();

function startgamemenu() {
    $(".game").html(`
        <menu class="main-menu">
            <button class="main-menu-btn">Easy</button>
            <button class="main-menu-btn">Normal</button>
            <button class="main-menu-btn">Difficult</button>
            <button class="main-menu-btn back">Back</button>
        </menu>
    `);
}
$(".game").on("click", ".start-game", startgamemenu);
$(".game").on("click", ".back", mainmenu);


