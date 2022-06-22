const gbdiv = document.querySelector('#gameboard');
const body = document.querySelector('body');
const restartbtn = document.createElement('button');
const winDiv = document.createElement('p');

let numPlays = 0;

winDiv.setAttribute('id', 'windiv');

restartbtn.innerText = 'reset';
restartbtn.setAttribute('id', 'restartbtn');

const gameBoard = (() => {
  let gameboard = ['', '', '', '', '', '', '', '', ''];

  const setup = () => {
    for (let i = 0; i < 9; i++) {
      const square = document.createElement('div');
      square.setAttribute('class', 'empty');
      square.setAttribute('id', `sq${i}`);
      square.setAttribute('onclick', `displayController.render(${i})`);
      gbdiv.appendChild(square);
    }
    gbdiv.appendChild(winDiv);
    gbdiv.appendChild(restartbtn);
    winDiv.style.display = 'none';
    restartbtn.style.display = 'none';
    console.log('setup board successfully');
  };

  return {
    gameboard,
    setup,
  };
})();

const player = (name, choice) => {
  return { name, choice };
};

const player1 = player('me', 'x');
const player2 = player('they', 'o');

const players = [player1, player2];

let currPlayer = players[0];

const displayController = (() => {
  let winMessage = '';

  const render = (index) => {
    let toChange = document.querySelector(`#sq${index}`);
    if (toChange.innerText === '') {
      numPlays++;
      gameBoard.gameboard[index] = currPlayer.choice;
      toChange.innerText = gameBoard.gameboard[index];
      currPlayer === players[0]
        ? (currPlayer = players[1])
        : (currPlayer = players[0]);
      isGameOver();
    }
  };

  const isGameOver = () => {
    if (numPlays == 9) {
      gameOver('All tiles full!');
    }
    checkRows();
    checkColumns();
    checkDiagonals();
  };

  const checkRows = () => {
    let rows = [];
    let i = 0;
    while (i < 9) {
      let row = [];
      row.push(gameBoard.gameboard[i]);
      row.push(gameBoard.gameboard[i + 1]);
      row.push(gameBoard.gameboard[i + 2]);
      rows.push(row);
      i += 3;
    }
    rows.forEach((row, i) => {
      if (row[0] == row[1] && row[0] == row[2]) {
        if (row[0] !== '') {
          winMessage = `WIN ON ROW ${i + 1}`;
          gameOver(winMessage);
        }
      }
    });
  };

  const checkColumns = () => {
    let columns = [];
    let i = 0;
    while (i < 3) {
      let column = [];
      column.push(gameBoard.gameboard[i]);
      column.push(gameBoard.gameboard[i + 3]);
      column.push(gameBoard.gameboard[i + 6]);
      console.log(column);
      columns.push(column);
      i += 1;
    }
    columns.forEach((column, i) => {
      if (column[0] == column[1] && column[0] == column[2]) {
        if (column[0] !== '') {
          winMessage = `WIN ON COLUMN ${i + 1}`;
          gameOver(winMessage);
        }
      }
    });
  };

  const checkDiagonals = () => {
    let gb = gameBoard.gameboard;
    if (gb[4] !== '') {
      if (gb[0] == gb[4] && gb[0] == gb[8]) {
        winMessage = `WIN ON 1st DIAGONAL!`;
        gameOver(winMessage);
      }
      if (gb[2] == gb[4] && gb[2] == gb[6]) {
        winMessage = 'WIN ON 2nd DIAGONAL!';
        gameOver(winMessage);
      }
    }
  };

  const gameOver = (winMessage) => {
    winDiv.innerText = winMessage;
    winDiv.style.display = 'block';
    restartbtn.style.display = 'block';
  };
  return {
    render,
  };
})();

restartbtn.addEventListener('click', () => {
  while (gbdiv.firstChild) {
    gbdiv.removeChild(gbdiv.firstChild);
  }
  numPlays = 0;
  gameBoard.gameboard = ['', '', '', '', '', '', '', '', ''];
  setTimeout(() => {
    gameBoard.setup();
  }, 1000);
});

gameBoard.setup();
