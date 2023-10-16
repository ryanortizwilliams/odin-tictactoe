// TODO:

//player
function createPlayer(symbol) {
  selectedCells = [];
  return { symbol, selectedCells };
}
const playerX = createPlayer("X");
const playerO = createPlayer("O");
function playGame() {
  const gameState = {
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: playerX,
    winner: null,
    gameOver: false,
    winStates: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
    checkWinner: function () {
      for (i = 0; i < this.winStates.length; i++) {
        const winState = this.winStates[i];
        if (
          this.currentPlayer.symbol === this.board[winState[0]] &&
          this.board[winState[0]] === this.board[winState[1]] &&
          this.board[winState[1]] === this.board[winState[2]]
        ) {
          this.winner = this.currentPlayer;
          alert(`${this.currentPlayer.symbol} is the winner!`);
        }
      }
    },
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

  function addSymbol(index) {
    gameState.board[index] = gameState.currentPlayer.symbol;
    gameState.currentPlayer.selectedCells.push(index);

    gameState.checkWinner();

    if (gameState.currentPlayer === playerX) {
      gameState.currentPlayer = playerO;
    } else {
      gameState.currentPlayer = playerX;
    }
  }
}

playGame();
