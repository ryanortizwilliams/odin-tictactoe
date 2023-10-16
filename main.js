// TODO:

//player
function createPlayer(symbol) {
  selectedCells = [];
  return { symbol, selectedCells };
}

playerX = createPlayer("X");
playerO = createPlayer("O");

const gameState = {
  board: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: playerX,
  winner: null,
  gameOver: false,
};

//create divs for the gameboard

for (let i = 0; i < 9; i++) {
  const gameBoard = document.querySelector(".game-board");

  const boardCell = document.createElement("div");
  boardCell.addEventListener("click", function (e) {
    if (!boardCell.firstChild) {
      const symbol = document.createElement("h1");
      symbol.innerText = gameState.currentPlayer.symbol;
      e.target.appendChild(symbol);
      addSymbol(i);
    }
  });
  gameBoard.appendChild(boardCell);
}

//function for adding a symbol

function addSymbol(index) {
  gameState.board[index] = gameState.currentPlayer.symbol;
  gameState.currentPlayer.selectedCells.push(index);

  if (gameState.currentPlayer === playerX) {
    gameState.currentPlayer = playerO;
  } else {
    gameState.currentPlayer = playerX;
  }

  //check if this function works
  console.log(gameState.board);
  console.log(gameState.currentPlayer);
}

function checkWinner() {
  const winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
}
