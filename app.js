const gameBoard = (() => {
  /* ----- 2D array to represent tic tac toe board ----- */
  let board2dArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard2dArray = () => board2dArray;

  const renderGameBoard = () => {
    /* ----- Function to render the game board ----- 
    - Adds the corresponding coordinates to each positon
    - Adds the an event listender to each position 
    */

    const BoardDiv = document.querySelector(".game-board");
    const boardRows = BoardDiv.children;

    let row = 0;
    for (const rowDiv of boardRows) {
      let col = 0;
      for (const positionDiv of rowDiv.children) {
        positionDiv.addEventListener("click", gameController.placeMarker);
        positionDiv.textContent = board2dArray[row][col];
        positionDiv.dataset.row = row;
        positionDiv.dataset.col = col;
        col++;
      }
      row++;
    }
  };

  const fillPosition = (position, marker) => {
    position.textContent = marker;
  };

  return {
    renderGameBoard,
    fillPosition,
    getBoard2dArray,
  };
})();

const gameController = (() => {
  let isGameOver = false;
  let winner;

  const player1 = playerFactory("Player 1", "O");
  const player2 = playerFactory("Player 2", "X");

  let currentPlayer = player1;

  const changeTurn = () => {
    if (currentPlayer.name === "Player 1") {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const placeMarker = (e) => {
    if (e.target.textContent === "" && !isGameOver) {
      gameBoard.fillPosition(e.target, currentPlayer.marker);
      changeTurn();
      checkGameOver();
      if (!winner)
        displayController.showCurrentPlayer(
          currentPlayer.name,
          currentPlayer.marker
        );
      else {
        displayController.clearCurrentPlayer();
      }
    }
  };

  const checkGameOver = () => {
    const winPositions = [
      [
        [0, 1],
        [1, 0],
        [1, 2],
        [2, 1],
      ],
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

    const BoardDiv = document.querySelector(".game-board");
    const rows = BoardDiv.children;

    let oPositions = [];
    let xPositions = [];

    for (const row of rows) {
      for (const positionDiv of row.children) {
        if (positionDiv.textContent === "O") {
          oPositions.push([
            parseInt(positionDiv.dataset.row),
            parseInt(positionDiv.dataset.col),
          ]);
        } else if (positionDiv.textContent === "X") {
          xPositions.push([
            parseInt(positionDiv.dataset.row),
            parseInt(positionDiv.dataset.col),
          ]);
        }
      }
    }

    for (const winPositionArray of winPositions) {
      for (const [index, position] of oPositions.entries()) {
        let editedArray = oPositions.slice(0, index + 1);
        if (JSON.stringify(winPositionArray) === JSON.stringify(editedArray)) {
          isGameOver = true;
          winner = player1;
        }
      }
      for (const [index, position] of xPositions.entries()) {
        let editedArray = xPositions.slice(0, index + 1);
        if (JSON.stringify(winPositionArray) === JSON.stringify(editedArray)) {
          isGameOver = true;
          winner = player2;
        }
      }
    }

    let suc;
    console.log(suc);
    if (isGameOver) {
      document.querySelector(".winner").textContent = `Winner: ${winner.name}`;
    }
  };

  return {
    placeMarker,
  };
})();

const displayController = (() => {
  /* --- Variables --- */
  const currentPlayerDiv = document.querySelector(".current-player");

  /* --- Functions --- */

  /* --- ShowCurrentPlayer --- */
  const showCurrentPlayer = (currentPlayerName, currentPlayerMarker) => {
    currentPlayerDiv.textContent = `${currentPlayerName}: ${currentPlayerMarker}`;
  };

  /* --- ClearCurrentPlayer --- */
  const clearCurrentPlayer = () => {
    currentPlayerDiv.textContent = "";
  };
  return {
    showCurrentPlayer,
    clearCurrentPlayer,
  };
})();

function playerFactory(name, marker) {
  return {
    name,
    marker,
  };
}

gameBoard.renderGameBoard();
