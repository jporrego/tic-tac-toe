const gameBoard = (() => {
  /* ----- 2D array to represent tic tac toe board ----- */
  let board2dArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const initializeGameBoard = () => {
    /* ----- Function to render the game board ----- 
    - Adds the corresponding coordinates to each positon
    - Adds the an event listender to each position 
    */

    const BoardDiv = document.querySelector(".game-board");
    const boardRows = BoardDiv.children;

    let row = 0;
    for (const rowDiv of boardRows) {
      let col = 0;
      for (const cellDiv of rowDiv.children) {
        cellDiv.addEventListener("click", gameController.placeMarker);
        cellDiv.textContent = board2dArray[row][col];
        cellDiv.dataset.row = row;
        cellDiv.dataset.col = col;
        col++;
      }
      row++;
    }
  };

  const renderGameBoard = () => {
    const rows = document.querySelector(".game-board").children;
    for (const row of rows) {
      for (const cell of row.children) {
        marker = board2dArray[cell.dataset.row][cell.dataset.col];
        if (marker !== "") {
          cell.textContent = marker;
          cell.classList.add(marker.toLowerCase());
        }
      }
    }
  };

  const fillPosition = (position, marker) => {
    board2dArray[position.dataset.row][position.dataset.col] = marker;
    renderGameBoard();
  };

  return {
    initializeGameBoard,
    fillPosition,
  };
})();

const gameController = (() => {
  const winPositions = [
    /* Row 1 */
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    /* Row 2 */
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    /* Row 3 */
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    /* Column 1 */
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    /* Column 2*/
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    /* Column 3*/
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    /* Cross Top left - Bottom right*/
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    /* Cross Bottom left - Top right*/
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];
  let isGameOver = false;
  let winner;

  const player1 = playerFactory("Player 1", "O");
  const player2 = playerFactory("Player 2", "X");

  let currentPlayer = player1;

  const changeTurn = () => {
    if (!isGameOver) {
      if (currentPlayer.name === "Player 1") {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
    }
  };

  const placeMarker = (e) => {
    if (e.target.textContent === "" && !isGameOver) {
      gameBoard.fillPosition(e.target, currentPlayer.marker);
      changeTurn();
      checkGameOver();
      if (!isGameOver)
        displayController.showCurrentPlayer(
          currentPlayer.name,
          currentPlayer.marker
        );
      else {
        if (winner != undefined) {
          displayController.clearCurrentPlayer();
        }
      }
    }
  };

  const checkGameOver = () => {
    const rows = document.querySelector(".game-board").children;
    let cells = [];
    for (const row of rows) {
      for (const cell of row.children) {
        cells.push(cell);
      }
    }

    let oPositions = [];
    let xPositions = [];

    /* 
      ---- Loop through each cell of each row. 
      ---- If it's been marked, save it's index to the corresponding array 
    */
    for (const cell of cells) {
      if (cell.textContent === "O") {
        oPositions.push([
          parseInt(cell.dataset.row),
          parseInt(cell.dataset.col),
        ]);
      } else if (cell.textContent === "X") {
        xPositions.push([
          parseInt(cell.dataset.row),
          parseInt(cell.dataset.col),
        ]);
      }
    }

    /* 
      ---- If either Os or Xs have been placed on 3 or more cells, compare with the winning positions. 
      ---- For each coordinate that matches with those of a placed O or X, increase the matchCount for that specific winning position array.
      ---- If there's 3 matches, a player won.
    */

    /* --- Check if O won --- */
    if (oPositions.length >= 3 && !isGameOver) {
      for (const winPositionArray of winPositions) {
        let matchCount = 0;
        matchCoordinates = [];
        for (const i of winPositionArray) {
          for (const [index, position] of oPositions.entries()) {
            if (JSON.stringify(i) === JSON.stringify(position)) {
              matchCount++;
              matchCoordinates.push(position);
            }
          }
          if (matchCount === 3) {
            isGameOver = true;
            setWinner(player1, matchCoordinates, cells);
            break;
          }
        }
        if (isGameOver) {
          break;
        }
      }
    }

    /* --- Check if X won --- */
    if (xPositions.length >= 3 && !isGameOver) {
      for (const winPositionArray of winPositions) {
        let matchCount = 0;
        matchCoordinates = [];
        for (const i of winPositionArray) {
          for (const [index, position] of xPositions.entries()) {
            if (JSON.stringify(i) === JSON.stringify(position)) {
              matchCount++;
              matchCoordinates.push(position);
            }
          }
          if (matchCount === 3) {
            isGameOver = true;
            setWinner(player2, matchCoordinates, cells);
            break;
          }
        }
        if (isGameOver) {
          break;
        }
      }
    }

    if (oPositions.length + xPositions.length === 9 && !isGameOver) {
      isGameOver = true;
      displayController.showTie();
    }
  };

  const setWinner = (player, matchCoordinates, cells) => {
    winner = player;
    displayController.showWinner(winner, matchCoordinates, cells);
  };

  return {
    placeMarker,
  };
})();

const displayController = (() => {
  /* ------------- Module that takes care of displaying information ------------- */

  /* ------------- Variables ------------- */
  const currentPlayerDiv = document.querySelector(".current-player");
  const winnerDiv = document.querySelector(".winner-text");

  /* ------------- Functions ------------- */

  /* --- ShowCurrentPlayer --- */
  const showCurrentPlayer = (currentPlayerName, currentPlayerMarker) => {
    currentPlayerDiv.textContent = `${currentPlayerName} (${currentPlayerMarker})`;
    if (currentPlayerName === "Player 1") {
      currentPlayerDiv.className = "player1-colors";
    } else {
      currentPlayerDiv.className = "player2-colors";
    }
  };

  /* --- ClearCurrentPlayer --- */
  const clearCurrentPlayer = () => {
    currentPlayerDiv.textContent = "";
  };

  /* --- ShowWinner --- */
  const showWinner = (player, matchCoordinates, cells) => {
    winnerDiv.textContent = `Winner: ${player.name} (${player.marker})`;

    if (player.name === "Player 1") {
      winnerDiv.classList.add("player1-colors");
    } else {
      winnerDiv.classList.add("player2-colors");
    }

    /* --- Add winner CSS class to the corresponding cells --- */
    for (const coordinate of matchCoordinates) {
      for (const cell of cells) {
        if (
          cell.dataset.row == coordinate[0] &&
          cell.dataset.col == coordinate[1]
        ) {
          if (player.name === "Player 1") {
            cell.classList.add("o-winner");
          } else {
            cell.classList.add("x-winner");
          }
        }
      }
    }
  };

  const showTie = () => {
    currentPlayerDiv.textContent = `Tie!`;
  };

  return {
    showCurrentPlayer,
    clearCurrentPlayer,
    showWinner,
    showTie,
  };
})();

function playerFactory(name, marker) {
  return {
    name,
    marker,
  };
}

gameBoard.initializeGameBoard();
