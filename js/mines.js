'use strict'

function addRandomMines() {
    var emptyCells = findEmptyCells();
    for (var i = 0; i < gLevel.mines; i++) {
        var randomPlace = getRandomInt(0, emptyCells.length - 1);
        var randCell = emptyCells[randomPlace]
        gBoard[randCell.i][randCell.j].isMine = true;
        emptyCells.splice(randomPlace, 1);
    }
}


function findEmptyCells() {
    var emptyCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j];
            var emptyCell = { i: i, j: j };
            if (currCell.isMine === false) {
                emptyCells.push(emptyCell);
            }
        }
    }
    return emptyCells;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            gBoard[i][j].minesAroundCount = countNegs(board, i, j);
        }
    }
}


function countNegs(mat, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat.length) continue
            if (rowIdx === i && colIdx === j) continue
            if (mat[i][j].isMine) {
                count++
            }
        }
    }
    gBoard[rowIdx][colIdx].minesAroundCount = count
    return (count === 0) ? EMPTY : count;
}
