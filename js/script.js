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

