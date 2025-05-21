export function changeBG() {
  $(".game").html(
    `
        <menu class="main-menu">
        <button class="main-menu-btn bg-function third-bg">
                <img id="Changeimg" src="./assets/images/marvelbg5.png" alt="">
            </button>
            <button class="main-menu-btn bg-function first-bg">
                <img id="Changeimg" src="./assets/images/marvelbg1.jpg" alt="">
            </button>
            <button class="main-menu-btn bg-function first-bg">
                <img id="Changeimg" src="./assets/images/marvelbg2.jpg" alt="">
            </button>
            <button class="main-menu-btn bg-function second-bg">
                <img id="Changeimg" src="./assets/images/marvelbg3.jpg" alt="">
            </button>
            <button class="main-menu-btn bg-function third-bg">
                <img id="Changeimg" src="./assets/images/marvelbg4.jpg" alt="">
            </button>
            <button class="main-menu-btn back">Back</button>
        </menu>
        `
  );
}

$(".game").on("click", ".bg-function", function () {
  let img = $(this).find("img");
  let src = img.attr("src");
  console.log(src)
  document.body.style.backgroundImage = `url("${src}")`;
});