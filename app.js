const gbdiv = document.querySelector('#gameboard');
const body = document.querySelector('body');

const gameBoard = (() => {
    let gameboard = ['', 'o', '', 
                     'x', 'o', '',
                     '', '', 'x',];

    const setup = () => {
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.setAttribute('class', 'empty');
            square.setAttribute('id', `sq${i}`);
            square.setAttribute('onclick', `displayController.play(${i})`);
            gbdiv.appendChild(square);
            console.log('render empty square');
        }
    }

    return {
        gameboard,
        setup,
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

let currPlayer = players[0];

const displayController = (() => {
    const play = (index) => {
        gameBoard.gameboard[index] = currPlayer.choice;
        render(index);
        console.log(`rendered an ${gameBoard.gameboard[index]} at ${index}`);
        currPlayer === players[0] ? currPlayer = players[1] : currPlayer = players[0];
    }

    const render = (index) => {
        let toChange = document.querySelector(`#sq${index}`);
        toChange.innerText = gameBoard.gameboard[index];
    }

    return {
        play,
    }
})();

gameBoard.setup();