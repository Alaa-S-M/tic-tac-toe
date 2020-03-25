// helpping functions
function getCurrentPlayer() {
    let firstPlayer = document.getElementById('X'),
        secondPlayer = document.getElementById('O');
    if (firstPlayer.style.display == 'none') {
        return secondPlayer;
    }
    return firstPlayer;

}
function resetGame() {
    let cells = document.getElementsByClassName('content');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
    document.getElementById('X').innerHTML = 'X';
    document.getElementById('X').style.display = 'inline';
    document.getElementById('O').style.display = 'none';
}
initGame();

// the One Player "Choose Symbol" popup.
let playersNumber = document.getElementById('number of players');
playersNumber.addEventListener('change', function () {
    if (this.value == '1') {
        //open popup
        let symbol = prompt('Please Choose your symbol', 'X');
        if (symbol != null && symbol != "") {
            document.getElementById('X').innerHTML = symbol;
        }
        // this.style.display = 'none';
        startNewGame();
    } else if (this.value == '') {
        alert('please choose the number of players.');
    } else {
        // this.style.display = 'none';
        startNewGame();
    }
}, false);

// the board
function initGame() {
    resetGame();
    let cells = document.getElementsByClassName('content');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', () => {
            if (cells[i].innerHTML != '') {
                alert("choose an empty cell!");
            } else {
                let currentPlayer = getCurrentPlayer();
                cells[i].innerHTML = currentPlayer.innerHTML;
                // toggle the current player lable.
                let secondPlayer = currentPlayer.nextElementSibling || currentPlayer.previousElementSibling;
                secondPlayer.style.display = 'inline';
                currentPlayer.style.display = 'none';
            }
        });
    }
}
function startNewGame() {
    resetGame();

}