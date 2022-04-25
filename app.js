const gameBoard = (() => {
  /* ----- 2D array to represent tic tac toe board ----- */
  let board2dArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

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
        // Function expression to pass the event (e) as parameter to the player.placeMarker ??
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

  const test = (marker) => {};

  return {
    renderGameBoard,
    fillPosition,
  };
})();

const gameController = (() => {
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
    if (e.target.textContent === "") {
      gameBoard.fillPosition(e.target, currentPlayer.marker);
      changeTurn();
      displayController.showCurrentPlayer(currentPlayer.marker);
    }
  };

  return {
    currentPlayer,
    placeMarker,
  };
})();

const displayController = (() => {
  const showCurrentPlayer = (currentPlayerMarker) => {
    document.querySelector(".current-player").textContent =
      "Player: " + currentPlayerMarker;
  };
  return {
    showCurrentPlayer,
  };
})();

function playerFactory(name, marker) {
  return {
    name,
    marker,
  };
}
gameBoard.renderGameBoard();
