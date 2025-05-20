// main menu function 
export function mainmenu() {
    $(".game").html(`
        <h1>M A R V E L</h1>
        <h2>Memory Matching Game</h2>
        <menu class="main-menu">
            <button class="main-menu-btn start-game">Start Game</button>
            <button class="main-menu-btn sound">Sound</button>
            <button class="main-menu-btn background-btn">Background</button>
            <button class="main-menu-btn about-btn">About</button>
            <button class="main-menu-btn leaderboard">Leaderboard</button>
        </menu>`);
}
  export function aboutOverlay() {
        // إنشاء الأوفرلاي
        var overlay = $(`
            <div class="about-overlay">
                <div class="about-content">
                    <h2>About This Game</h2>
                    <p>This is a Marvel-themed memory matching game. Flip the cards and try to find all matching pairs. Track your moves and time. Have fun!</p>
                    <button class="close-about">Close</button>
                </div>
            </div>
        `);

        $("body").append(overlay);

    
        $(".close-about").on("click", function() {
            $(".about-overlay").remove();
        });
    };


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
