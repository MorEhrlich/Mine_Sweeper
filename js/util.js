'use strict'

function countInRow(arr, symbol) {
    var count = 0
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === symbol) count++
    }
    return count
}
function countInCol(board, colIdx, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        if (board[i][colIdx] === symbol) count++
    }
    return count
}
function countInPrimaryDiag(board, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        if (board[i][i] === symbol) count++
    }
    return count
}
function countInSecondaryDiag(board, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        if (board[i][board.length - 1 - i] === symbol) count++
    }
    return count
}


function formatTime(ts) {
    var now = Date.now()
    var diff = now - ts
    if (diff >= 0 && diff <= MINUTE) return 'Just now!'
    if (diff <= MINUTE * 5) return 'Few minutes ago'
    if (diff <= HOUR * 24) return 'Today'
    if (diff <= HOUR * 48) return 'Yesterday'
    return getTimeStr(ts)
}


function getTimeStr(ts) {
    var date = new Date(ts)
    return 'At ' + date.getFullYear() + '-' +
        (date.getMonth() + 1) +
        '-' + date.getDate() +
        '  Time: ' + date.getHours() + ':' + date.getMinutes()
}


function getTime() {
    return new Date().toString().split(' ')[4];
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


  // location such as: {i: 2, j: 7}
  function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
  }