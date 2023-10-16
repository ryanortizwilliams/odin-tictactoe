function createPlayer(symbol, name) {
  selectedCells = [];
  return { symbol, name, selectedCells };
}
const playerX = createPlayer("X", "Ryan");
const playerO = createPlayer("O", "Trang");

// Create a function to create and display the player objects
function updateScoreboard() {
  //DOM ELEMENTS
  const playerOne = document.getElementById("player1");
  const playerTwo = document.getElementById("player2");

  playerOne.textContent = playerX.name;
  playerTwo.textContent = playerO.name;
}

updateScoreboard();
function playGame() {
  const gameState = {
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: playerX,
    winner: null,
    gameOver: false,
    round: 1,
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
          console.log(`${this.currentPlayer.symbol} is the winner!`);
        }
      }
    },
    reset: function () {
      this.board = ["", "", "", "", "", "", "", "", ""];
      this.currentPlayer = playerX;
      this.winner = null;
      this.gameOver = false;
      if (!this.gameOver) {
        this.round++;
      } else {
        this.round = 1;
      }
    },
  };
  //create divs for the gameboard

  function createGameboard() {
    const gameBoard = document.querySelector(".game-board");
    gameBoard.innerHTML = "";
    for (let i = 0; i < 9; i++) {
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
  createGameboard();
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", playGame);
}

playGame();
