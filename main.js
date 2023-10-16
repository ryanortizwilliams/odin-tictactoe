// TODO:
// Set up grid, put event listener on it(for now just make it change color)

const gameState = {
  board: ["", "", "a", "", "", "", "", "", ""],
  currentPlaer: "X",
  winner: null,
  gameOver: false,
};

//create divs for the gameboard

for (let i = 0; i < 9; i++) {
  const gameBoard = document.querySelector(".game-board");

  const boardCell = document.createElement("div");
  boardCell.setAttribute("id", i);
  boardCell.addEventListener("click", function (e) {
    e.target.style.backgroundColor = "blue";
  });
  gameBoard.appendChild(boardCell);
}
