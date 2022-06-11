const gbdiv = document.querySelector('#gameboard');

const gameBoard = (() => {
    let gameboard = ['', '', '', 
                     '', '', '',
                     '', '', '',];
    const render = () => {
        gameboard.forEach(e => {
            if (e == '') {
                const emptySquare = document.createElement('div');
                emptySquare.setAttribute('class', 'empty');
                gbdiv.appendChild(emptySquare);
                console.log('empty');
            } else if (e == 'x') {
                const xSquare = document.createElement('div');
                xSquare.setAttribute('class', 'xsquare');
                gbdiv.appendChild(xSquare);
            } else {
                const oSquare = document.createElement('div')
                oSquare.setAttribute('class', 'osquare');
                gbdiv.appendChild(oSquare);
            }
        });
    }
    return {
        gameboard,
        render,
    };
})();

const players = (name, choice) => {
    return {name, choice};
}

const displayController = (() => {

})();

gameBoard.render();