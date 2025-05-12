"use strict";
const rows = 50;
const cols = 50;
let board = [];
let interval;
const gameContainer = document.getElementById("game");
function initBoard() {
    board = Array.from({ length: rows }, () => Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0)));
}
function renderBoard() {
    gameContainer.innerHTML = "";
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.className = `cell ${board[r][c] ? "alive" : "dead"}`;
            gameContainer.appendChild(cell);
        }
    }
}
function getNextState() {
    const next = board.map(arr => [...arr]);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const aliveNeighbors = countAliveNeighbors(r, c);
            if (board[r][c] === 1) {
                next[r][c] = aliveNeighbors === 2 || aliveNeighbors === 3 ? 1 : 0;
            }
            else {
                next[r][c] = aliveNeighbors === 3 ? 1 : 0;
            }
        }
    }
    return next;
}
function countAliveNeighbors(row, col) {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0)
                continue;
            const r = row + dr;
            const c = col + dc;
            if (r >= 0 && r < rows && c >= 0 && c < cols) {
                count += board[r][c];
            }
        }
    }
    return count;
}
function update() {
    board = getNextState();
    renderBoard();
}
function startGame() {
    let interval;
    if (interval)
        return;
    interval = setInterval(update, 200);
}
function stopGame() {
    clearInterval(interval);
    interval = undefined;
}
initBoard();
renderBoard();
//# sourceMappingURL=app.js.map