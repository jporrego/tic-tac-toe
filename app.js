const gameBoard = (() => {
  let board2dArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const renderGameBoard = () => {
    const BoardDiv = document.querySelector(".game-board");
    const boardRows = BoardDiv.children;

    let row = 0;
    for (const rowDiv of boardRows) {
      let col = 0;
      for (const positionDiv of rowDiv.children) {
        positionDiv.addEventListener("click", (e) => player1.placeMarker(e));
        positionDiv.textContent = board2dArray[row][col];
        positionDiv.dataset.row = row;
        positionDiv.dataset.col = col;
        col++;
      }
      row++;
    }
  };

  const fillPosition = (e, marker) => {
    e.target.textContent = marker;
  };

  return {
    renderGameBoard,
    fillPosition,
  };
})();

const gameController = (() => {
  const renderGameBoard = 1;

  return {
    renderGameBoard,
  };
})();

function playerFactory(name, marker) {
  const placeMarker = (e) => {
    gameBoard.fillPosition(e, marker);
  };
  return {
    placeMarker,
  };
}

const player1 = playerFactory("Player 1", "O");

gameBoard.renderGameBoard();
