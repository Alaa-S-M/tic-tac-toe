// choose the number of players to start the game.
let boardListener =
    () => setTimeout(alert, 10, 'please choose the number of players to start the game.');
document.getElementById('board').addEventListener('click', boardListener);

// choosing the number of players
document.getElementById('number of players').addEventListener('change', function () {
    if (this.value == '1') {
        //open popup
        let symbol = prompt('Please Choose your symbol', 'X');
        if (symbol != null && symbol != "") {
            document.getElementById('X').innerHTML = symbol;
            startNewGame();
        } else {
            document.getElementById('number of players').value = '';
            stopGame();
        }
    } else if (this.value == '2') {
        startNewGame();
    } else {
        alert('please choose the number of players.');
    }
}, false);
// the game
let startNewGame = () => {
    resetGame();
    document.getElementById('board').removeEventListener('click', boardListener);
    initGame();
    //hide the select dropdown
    document.getElementById("number of players").style.display = 'none';
}
let initGame = () => [...document.getElementsByClassName('content')].forEach(element => {
    element.addEventListener('click', cellListener);
});
let resetGame = () => {
    [...document.getElementsByClassName('content')].forEach(element => {
        element.innerHTML = '';;
    });
    document.getElementById('X').innerHTML = 'X';
    document.getElementById('X').style.display = 'inline';
    document.getElementById('O').style.display = 'none';
    document.getElementById("play again").style.display = 'none'
    //show and reset the select option
    document.getElementById("number of players").style.display = 'inline';
    document.getElementById("number of players").value = '';
    document.getElementById('board').addEventListener('click', boardListener);
}
let stopGame = () => {
    [...document.getElementsByClassName('content')].forEach(element => {
        element.removeEventListener('click', cellListener);
    });
    document.getElementById("play again").style.display = 'inline';
}
function cellListener() {
    if (this.innerHTML != '') {
        alert("choose an empty cell!");
    } else {
        let currentPlayer = getCurrentPlayer();
        this.innerHTML = currentPlayer.innerHTML;
        // toggle the current player lable.
        let secondPlayer = currentPlayer.nextElementSibling || currentPlayer.previousElementSibling;
        secondPlayer.style.display = 'inline';
        currentPlayer.style.display = 'none';
        //check if this move cauesed a win or Draw
        if (checkWin(currentPlayer.innerHTML)) {
            setTimeout(alert, 10, 'Congratulations! ' + currentPlayer.innerHTML + ' Wins!');
            stopGame();
        } else if (boardIsFull()) {
            setTimeout(alert, 10, 'XO DRAW !');
            stopGame();
        }
    }
}
let getCurrentPlayer =
    () => (document.getElementById('X').style.display == 'none') ? document.getElementById('O') : document.getElementById('X');
let checkWin = (currentPlayer) => {
    let win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let board = [...document.getElementsByClassName('content')].map(e => e.innerText);
    return win.map(config => ((board[config[0]] == currentPlayer) && (board[config[1]] == currentPlayer) && (board[config[2]]) == currentPlayer))
        .includes(true);
}
let boardIsFull = () => ![...document.getElementsByClassName('content')].map(e => e.innerText).includes('');

document.getElementById("play again").addEventListener('click', resetGame);