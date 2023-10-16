// TODO:
// Set up grid, put event listener on it(for now just make it change color)

const gameState = {
  board: ["", "", "a", "", "", "", "", "", ""],
  currentPlayer: "X",
  winner: null,
  gameOver: false,
};

//player
function createPlayer(symbol) {
  selectedCells = [];
  return { symbol, selectedCells };
}

playerX = createPlayer("X");
playerO = createPlayer("O");

//create divs for the gameboard

for (let i = 0; i < 9; i++) {
  const gameBoard = document.querySelector(".game-board");

  const boardCell = document.createElement("div");
  boardCell.setAttribute("id", i);
  boardCell.addEventListener("click", function (e) {
    const symbol = document.createElement("h1");
    symbol.innerText = playerO.symbol;
    e.target.appendChild(symbol);
  });
  gameBoard.appendChild(boardCell);
}

//function for adding a symbol
