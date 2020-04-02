// choose the number of players to start the game.
let boardListener =
    () => setTimeout(alert, 1000, 'please choose the number of players to start the game.');
document.getElementById('board').addEventListener('click', boardListener);

// choosing the number of players
document.getElementById('number of players').addEventListener('change', function () {
    if (this.value == '1') {
        //open popup
        let symbol = prompt('Please Choose your symbol', 'X');
        if (symbol != null && symbol != '') {
            AIplayer.on = 1;
            AIplayer.otherPlayer = symbol;
            if (symbol != 'O') {
                document.getElementById('X').innerHTML = symbol;
                //update the symbol in the scoreboard
                document.getElementById('scoreBoard').contentWindow.document.getElementsByTagName('table')[0].innerHTML = '<th>' + symbol + '</th><th>O</th>';
            } else {
                AIplayer.symbol = 'X';
                document.getElementById('X').style.display = 'none';
                document.getElementById('O').style.display = 'inline';
            }
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
    document.getElementById('number of players').style.display = 'none';
    if (AIplayer.on && AIplayer.symbol != 'O') {
        AIplayer.play();
    }
}
let initGame = () => [...document.getElementsByClassName('content')].forEach(element => {
    element.addEventListener('click', cellListener);
});
let resetGame = () => {
    [...document.getElementsByClassName('content')].forEach(element => {
        element.innerHTML = '';;
    });
    if (!AIplayer.on) {
        document.getElementById('X').innerHTML = 'X';
    }
    document.getElementById('X').style.display = 'inline';
    document.getElementById('O').style.display = 'none';
    document.getElementById('play again').style.display = 'none'
    //show and reset the select option
    document.getElementById('number of players').style.display = 'inline';
    document.getElementById('number of players').value = '';
    document.getElementById('board').addEventListener('click', boardListener);
    if (scoreBoard.rounds == 5 || scoreBoard.rounds == 0) {
        let scores = document.getElementById('scoreBoard').contentWindow.document.getElementsByTagName('table')[0];
        scores.innerHTML = '<th>X</th><th>O</th>';
        scoreBoard.X = 0;
        scoreBoard.O = 0;
        scoreBoard.rounds = 0;
    }
}
let stopGame = () => {
    [...document.getElementsByClassName('content')].forEach(element => {
        element.removeEventListener('click', cellListener);
    });
    document.getElementById('play again').style.display = 'inline';
    if (AIplayer.on) {
        AIplayer.reset();
    }
}
function cellListener() {
    if (this.innerHTML != '') {
        alert('choose an empty cell!');
    } else {
        let currentPlayer = getCurrentPlayer();
        !!AIplayer.on && (this.innerHTML = AIplayer.otherPlayer);
        if (!AIplayer.on) {
            this.innerHTML = currentPlayer.innerHTML;
            // toggle the current player lable.
            let secondPlayer = currentPlayer.nextElementSibling || currentPlayer.previousElementSibling;
            secondPlayer.style.display = 'inline';
            currentPlayer.style.display = 'none';
        }
        //check if this move cauesed a win or Draw
        if (checkWin(currentPlayer.innerHTML)) {
            setTimeout(alert, 1000, 'Congratulations! ' + currentPlayer.innerHTML + ' Wins!');
            stopGame();
            updateScoreBoard(currentPlayer.innerHTML);
        } else if (boardIsFull()) {
            setTimeout(alert, 1000, 'XO DRAW !');
            stopGame();
        }
        if (AIplayer.on) {
            AIplayer.play();
        }
    }
}
let getCurrentPlayer =
    () => (document.getElementById('X').style.display == 'none') ? document.getElementById('O') : document.getElementById('X');
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
let checkWin = (currentPlayer) => {
    let board = [...document.getElementsByClassName('content')].map(e => e.innerText);
    return win.map(config => ((board[config[0]] == currentPlayer) && (board[config[1]] == currentPlayer) && (board[config[2]]) == currentPlayer))
        .includes(true);
}
let boardIsFull = () => ![...document.getElementsByClassName('content')].map(e => e.innerText).includes('');

document.getElementById('play again').addEventListener('click', resetGame);

let scoreBoard = { X: 0, O: 0, rounds: 0 };
function updateScoreBoard(winner) {
    let scores = document.getElementById('scoreBoard').contentWindow.document.getElementsByTagName('table')[0];
    let newRow = (winner == 'O') ? '<tr> <td>0</td><td>1</td> </tr>' : '<tr> <td>1</td><td>0</td> </tr>';
    scores.innerHTML += newRow;
    if (!AIplayer.on) {
        scoreBoard.rounds++;
        scoreBoard[winner]++;
        if (scoreBoard.rounds == 5) {
            let winner = (scoreBoard['X'] >= 3) ? 'X' : 'O';
            setTimeout(alert, 100000, 'Game over! ' + winner + ' has won ' + scoreBoard[winner] + ' matches');
        }
    }
}
let AIplayer = {
    on: 0,
    symbol: 'O',
    otherPlayer: 'X',
    play: function () {
        let board = [...document.getElementsByClassName('content')];
        let myWins = win.map(config => ((board[config[0]].innerText == this.symbol) && (board[config[1]].innerText == this.symbol) && (board[config[2]].innerText == '')) ? config[2] :
            ((board[config[0]].innerText == this.symbol) && (board[config[2]].innerText == this.symbol) && (board[config[1]].innerText == '')) ? config[1] :
                ((board[config[1]].innerText == this.symbol) && (board[config[2]].innerText == this.symbol) && (board[config[0]].innerText == '')) ? config[0] : -1)
            .filter(position => (position != -1) ? true : false);
        if (!!myWins && myWins[0]) {
            board[myWins[0]].innerText = this.symbol;
        } else if (!board[4].innerText) {
            board[4].innerText = this.symbol;
        } else {
            let nextMove = win.map(config => ((board[config[0]].innerText == this.otherPlayer) && (board[config[1]].innerText == this.otherPlayer) && (board[config[2]].innerText == '')) ? config[2] :
                ((board[config[0]].innerText == this.otherPlayer) && (board[config[2]].innerText == this.otherPlayer) && (board[config[1]].innerText == '')) ? config[1] :
                    ((board[config[1]].innerText == this.otherPlayer) && (board[config[2]].innerText == this.otherPlayer) && (board[config[0]].innerText == '')) ? config[0] : -1)
                .filter(position => (position != -1) ? true : false);
            if (!!nextMove && !!nextMove[0]) {
                board[nextMove[0]].innerText = this.symbol;
            } else {
                let firstNotEmpty = board.filter(cell => (!cell.innerText) ? true : false)[0];
                !!firstNotEmpty && (firstNotEmpty.innerText = this.symbol);
            }
        }
        if (checkWin(this.symbol)) {
            setTimeout(alert, 1000, 'Congratulations! ' + this.symbol + ' Wins!');
            updateScoreBoard(this.symbol);
            stopGame();
        } else if (boardIsFull()) {
            setTimeout(alert, 1000, 'XO DRAW !');
            stopGame();
        }
    },
    reset: function () {
        this.on = 0;
        this.symbol = 'O';
        this.otherPlayer = 'X';
    }
}