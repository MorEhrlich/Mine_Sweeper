'use strict'
const MINE = '💣';
const FLAG = '🚩';
const LOSE = '😨';
const WIN = '🤩';
const SMILE = '🙂';
const EMPTY = '';

var gBoard;
var gGameInterval;
var gStartTime;
var firstClick = true;

var gLevel = {
    size: 4,
    mines: 2
};
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
};

function init() {
    gGame.isOn = true;
    var elSmile = document.querySelector('.smile')
    elSmile.innerHTML = SMILE;
    play();
}

function play() {
    gBoard = buildBoard();
    addRandomMines(gBoard)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard);
    resetTimer();
    firstClick = true;
    gGame.shownCount = 0;
    gGame.markedCount = 0
}


function easy() {
    gLevel.size = 4;
    gLevel.mines = 2;
    play();
}

function medium() {
    gLevel.size = 8;
    gLevel.mines = 12;
    play();
}

function hard() {
    gLevel.size = 12;
    gLevel.mines = 30;
    play();
}


function buildBoard() {
    var level = gLevel.size;
    var board = [];
    for (var i = 0; i < level; i++) {
        board[i] = [];
        for (var j = 0; j < level; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell;
        }
    }
    return board;
}



function renderBoard(board) {
    var strHtml = ''
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            strHtml += `<td class="unpressed cell-${i}-${j}" data-i="${i}" data-j="${j}"
              onmousedown="whichButton(event, this)"></td>`
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml
}


function whichButton(ev, elCell) {
    if (ev.button === 0) {
        cellClicked(elCell);
    }
    if (ev.button === 2) {
        window.addEventListener('contextmenu', function (elCell) {
            elCell.preventDefault();
        }, false);
        cellMarked(elCell)
    }
}



function cellClicked(elCell) {
    if (!gGame.isOn) {
        return;
    }
    if (firstClick) {
        startTimer()
        firstClick = false;
    }
    var i = +elCell.dataset.i
    var j = +elCell.dataset.j

    if (gBoard[i][j]) {
        if (gBoard[i][j].isMarked === true) {
            return;
        }
        gBoard[i][j].isShown = true;
        gGame.shownCount++
        if (gBoard[i][j].isMine === true) {
            elCell.innerHTML = MINE;
            elCell.classList.add('pressed');
            showAllMines();
            gameOver();
            return;
        }
    } else {
        elCell.innerHTML = gBoard[i][j].minesAroundCount;
        elCell.classList.remove('unpressed');
        elCell.classList.add('pressed');
    }
}

function showAllMines() {
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            if (gBoard[i][j].isMine) {
                gBoard[i][j].isShown = true;
                var cellElement = document.querySelector(`.cell-${i}-${j}`);
                if (gBoard[i][j].isMine) {
                    cellElement.innerHTML = MINE;
                    cellElement.style.backgroundColor = 'rgb(193, 192, 194)';
                }
            }
        }
    }
}

function cellMarked(elCell) {
    if (!gGame.isOn) {
        return;
    }
    if (firstClick) {
        startTimer()
        firstClick = false;
    }
    var i = +elCell.dataset.i
    var j = +elCell.dataset.j
    if (gBoard[i][j]) {
        if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked) {
            elCell.innerHTML = FLAG;
            gBoard[i][j].isMarked = true;
            elCell.classList.add('marked');
            gGame.markedCount++;
        }
        else if (gBoard[i][j].isMarked) {
            elCell.innerHTML = EMPTY;
            gBoard[i][j].isMarked = false;
            elCell.classList.remove('marked');
            gGame.markedCount--;
        }
    }
    checkGameOver()
}


function checkGameOver() {
    var numShown = (gLevel.size * size) - gLevel.mines;
    if (gGame.markedCount === gLevel.mines && gGame.shownCount === numShown) {
        gGame.isOn = false;
        var elSmile = document.querySelector('.smile')
        elSmile.innerHTML = WIN;
        playWinSound()
        stopTimer()
    }
}


function gameOver() {
    gGame.isOn = false;
    var elSmile = document.querySelector('.smile')
    elSmile.innerHTML = LOSE;
    playLoseSound()
    stopTimer()
}


function playLoseSound() {
    var failSound = new Audio('sound/fail.wav');
    failSound.play();
}

function playWinSound() {
    var winSound = new Audio('sound/win.wav');
    winSound.play();
}

function expandShown(board, i, j) {
    var rowIdx = i
    var colIdx = j
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board.length) continue
            if (rowIdx === i && colIdx === j) continue
            var currCell = board[i][j]
            if (currCell.isShown || currCell.isMine || currCell.isMarked) continue
            board[i][j].isShown = true;
            gGame.shownCount++
            renderBoard(gBoard)
            if (currCell.minesAroundCount === 0) {
                expandShown(board, i, j)
            }
        }
    }
}