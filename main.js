function createPlayer(symbol, name) {
  selectedCells = [];
  score = 0;
  return { symbol, name, selectedCells, score };
}

function showModal(selector) {
  const modal = document.querySelector(selector);
  modal.classList.remove("hidden");
}

function hideModal(selector) {
  const modal = document.querySelector(selector);
  modal.classList.add("hidden");
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
  hideModal("#start-modal");
  playGame(playerX, playerO);
  settingsForm.reset();
});

function playGame(playerX, playerO) {
  const gameState = {
    board: ["", "", "", "", "", "", "", "", ""],
    legalMovesAvailable: 9,
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
          // Win Condition Met
          this.winner = this.currentPlayer;
          const winnerText = document.getElementById("winner-text");
          const message = document.createElement("h1");
          message.textContent = `${this.winner.name} is the winner!`;
          winnerText.replaceChildren(message);
          showModal("#winner-modal");
          this.winner.score++;
          updateScoreboard(playerX, playerO);
          break;
        } else if (this.legalMovesAvailable === 0) {
          // Draw Condition Met
          const winnerText = document.getElementById("winner-text");
          const message = document.createElement("h1");
          message.textContent = "It's a draw!";
          winnerText.replaceChildren(message);
          showModal("#winner-modal");
        }
      }
    },
    reset: function () {
      this.board = ["", "", "", "", "", "", "", "", ""];
      this.legalMovesAvailable = 9;
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
    const scoreOne = document.getElementById("score1");
    const playerTwo = document.getElementById("player2");
    const scoreTwo = document.getElementById("score2");
    // Add info to Scoreboard
    playerOne.textContent = playerX.name;
    scoreOne.textContent = playerX.score;
    playerTwo.textContent = playerO.name;
    scoreTwo.textContent = playerO.score;
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
    gameState.legalMovesAvailable--;
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
  resetButton.addEventListener("click", function (e) {
    e.preventDefault();
    hideModal("#winner-modal");
    showModal("#start-modal");
  });

  //continue behaviors
  function continueGame() {
    gameState.reset();
    createGameboard();
    hideModal("#winner-modal");
  }

  const continueButton = document.getElementById("continue");
  continueButton.addEventListener("click", continueGame);
}
