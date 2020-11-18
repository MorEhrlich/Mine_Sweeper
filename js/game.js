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
    gLevel.size = 4;
    gLevel.mines = 2;
    gGame.isOn = true;
    var elSmile = document.querySelector('.smile')
    elSmile.innerHTML = SMILE;
    play();
}

function play() {
    gBoard = buildBoard();
    addRandomMines()
    setMinesNegsCount(gBoard)
    renderBoard(gBoard);
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
             onClick="cellClicked(this)" onmousedown="whichButton(event, this)"></td>`
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml
}



//  each click restaring the timer
// function whichButtons(ev) {
//     if (ev.buttons === 0 || 2) {
//         startTimer()
//     }
// }

function whichButton(ev, elCell) {
    var i = +elCell.dataset.i
    var j = +elCell.dataset.j
    var cell = gBoard[i][j];
    if (ev.button === 0) {
        cell.isShown = true;
    } else {
        cell.isMarked === true
    }
    if (ev.button === 2) {
        cell.isMarked = true;
    }
}



function cellClicked(elCell) {
    var i = +elCell.dataset.i
    var j = +elCell.dataset.j
    elCell.classList.remove("unpressed");
    elCell.classList.add("pressed");
    if (gBoard[i][j]) {
        gBoard[i][j].isShown = true;
        gGame.shownCount++
        if (gBoard[i][j].isMine === true) {
            elCell.innerHTML = MINE;
            elCell.classList.add("pressed");
            showAllMines();
            gameOver();
            return;
        }
        if (gBoard[i][j].isMarked === true) {
            return;
        } else {
            elCell.innerHTML = gBoard[i][j].minesAroundCount;
        }
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
                }
            }
        }
    }
}

function cellMarked(elCell) {
    var i = +elCell.dataset.i
    var j = +elCell.dataset.j
    if (gBoard[i][j]) {
        gBoard[i][j].isMarked = true;
        gGame.markedCount++
    }
    var currCell = elCell.innerText;
    if (currCell === EMPTY) {
        elCell.innerText = FLAG;
    } else {
        elCell.innerText = EMPTY;
    }
    // elCell.preventDefault();
}


function checkGameOver() {
    var numShown = (gLevel.size * size) - gLevel.mines;
    if (gGame.markedCount === gLevel.mines && gGame.shownCount === numShown) {
        var elSmile = document.querySelector('.smile')
        elSmile.innerHTML = WIN;
        gGame.isOn = false;
    }
}


function gameOver() {
    gGame.isOn = false;
    var elSmile = document.querySelector('.smile')
    elSmile.innerHTML = LOSE;
}