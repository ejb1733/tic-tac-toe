const gbdiv = document.querySelector('#gameboard');

const gameBoard = (() => {
    let gameboard = ['', 'o', '', 
                     'x', 'o', '',
                     '', '', 'x',];
    const render = () => {
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            if (gameboard[i] == '') {
                square.setAttribute('class', 'empty');
                square.setAttribute('onclick', `displayController.play(${i})`);
                gbdiv.appendChild(square);
                console.log('empty');
            } else if (gameboard[i] == 'x') {
                square.setAttribute('class', 'xsquare');
                square.innerText = 'X';
                gbdiv.appendChild(square);
            } else {
                square.setAttribute('class', 'osquare');
                square.innerText = 'O';
                gbdiv.appendChild(square);
            }
        };
    }
    return {
        gameboard,
        render,
    };
})();

const player = (name, choice) => {
    return {name, choice};
}

const player1 = player('me', 'x');
const player2 = player('they', 'o');

const players = [
    player1,
    player2,
]

let currPlayer = players[1];

const displayController = (() => {
    const play = (index) => {
        gameBoard.gameboard[index] = currPlayer.choice;
        gameBoard.render();
        console.log('k');
        currPlayer === players[0] ? currPlayer = players[1] : currPlayer = players[0];
    }
    return {
        play,
    }
})();

gameBoard.render();