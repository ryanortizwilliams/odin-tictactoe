function createPlayer(symbol, name) {
  selectedCells = [];
  score = 0;
  return { symbol, name, selectedCells, score };
}

function toggleModal(selector) {
  //make modal disapear after submit
  const modals = document.querySelectorAll(selector);

  modals.forEach((modal) => {
    modal.classList.toggle("hidden");
  });
}

// Modal form behavior

const settingsForm = document.getElementById("modal-form");
settingsForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const playerOne = formData.get("playerOne");
  const playerTwo = formData.get("playerTwo");

  //create new players
  const playerX = createPlayer("X", playerOne);
  const playerO = createPlayer("O", playerTwo);
  toggleModal("#start-modal");
  playGame(playerX, playerO);
  settingsForm.reset();
});

function playGame(playerX, playerO) {
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
          //create element for winner modal
          const winnerModal = document.getElementById("winner-modal");
          //create element for modal text
          const winnerText = document.createElement("h1");
          winnerText.textContent = `${this.winner.name} is the winner!`;
          winnerModal.replaceChildren(winnerText);
          winnerModal.classList.toggle("hidden");
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

  function updateScoreboard(playerX, playerO) {
    //DOM ELEMENTS
    const playerOne = document.getElementById("player1");
    const playerTwo = document.getElementById("player2");

    playerOne.textContent = playerX.name;
    playerTwo.textContent = playerO.name;
  }

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
  updateScoreboard(playerX, playerO);
  createGameboard();

  //reset behaviour
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", toggleModal.bind(null, ".modal"));
}
