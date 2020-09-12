import { Game } from "./game.js";
import { ColumnWinInspector } from "./column-win-inspector.js";
import { RowWinInspector } from "./row-win-inspector.js";
import { DiagWinInspector } from './diag-win-inspector.js';

window.addEventListener("DOMContentLoaded", (event) => {
    // Variables
    const clickTargets = document.getElementById("click-targets");
    const boardHolder = document.getElementById("board-holder");
    boardHolder.setAttribute("class", "is-invisible");
    let playerOneName = document.getElementById("player-1-name");
    let playerTwoName = document.getElementById("player-2-name");
    const newGame = document.getElementById("new-game");
    const gameName = document.getElementById("game-name");
    let p1Count = 0;
    let p2Count = 0;
    let game = undefined;
    let fullArray = [];
    let c0 = [0, 1, 2, 3, 4, 5];
    let c1 = [0, 1, 2, 3, 4, 5];
    let c2 = [0, 1, 2, 3, 4, 5];
    let c3 = [0, 1, 2, 3, 4, 5];
    let c4 = [0, 1, 2, 3, 4, 5];
    let c5 = [0, 1, 2, 3, 4, 5];
    let c6 = [0, 1, 2, 3, 4, 5];
    let matrix = [c0, c1, c2, c3, c4, c5, c6];

    newGame.addEventListener("click", (event) => {
        game = new Game(playerOneName.value, playerTwoName.value);
        playerOneName.value = "";
        playerTwoName.value = "";
        newGame.disabled = true;
        game.getName();
        updateUI();
    });

    const updateUI = () => {
        if (game) {
            boardHolder.classList.remove("is-invisible");
            gameName.innerHTML = game.getName();
            if (game.turn === 1) {
                clickTargets.classList.add("black");
                clickTargets.classList.remove("red");
            } else if (game.turn === 2) {
                clickTargets.classList.add("red");
                clickTargets.classList.remove("black");
            }

            for (let rowIdx = 0; rowIdx < 6; rowIdx++) {
                for (let colIdx = 0; colIdx < 7; colIdx++) {
                    const square = document.getElementById(`square-${rowIdx}-${colIdx}`);
                    const val = game.getTokenAt(rowIdx, colIdx);
                    square.innerHTML = "";
                    if (val === 1) {
                        const token = document.createElement("div");
                        token.classList.add("token", "black");
                        square.appendChild(token);
                    } else if (val === 2) {
                        const token = document.createElement("div");
                        token.classList.add("token", "red");
                        square.appendChild(token);
                    }
                }
            }

            for (let colIdx = 0; colIdx < 7; colIdx++) {
                let col = document.getElementById(`column-${colIdx}`);
                if (game.isColumnFull(colIdx)) {
                    col.classList.add("full");
                    if (!fullArray.includes(colIdx)) {
                        fullArray.push(colIdx);
                    }
                } else {
                    col.classList.remove("full");
                }
                if (fullArray.length === 7) {
                    let playerOne = localStorage.getItem("player1");
                    let playerTwo = localStorage.getItem("player2");
                    gameName.innerHTML = `${playerOne} tied with ${playerTwo}`;
                }
            }
        }
        if (game === undefined) {
            boardHolder.classList.add("is-invisible");
            newGame.disabled = true;
        }
    };

    playerOneName.addEventListener("keyup", (event) => {
        p1Count++;
        if (p1Count !== 0 && p2Count !== 0) {
            newGame.disabled = false;
        }
    });
    
    playerTwoName.addEventListener("keyup", (event) => {
        p2Count++;
        if (p1Count !== 0 && p2Count !== 0) {
            newGame.disabled = false;
        }
    });

    function resetGame() {
        game = undefined;
        p1Count = 0;
        p2Count = 0;
        c0 = [];
        c1 = [];
        c2 = [];
        c3 = [];
        c4 = [];
        c5 = [];
        c6 = [];
        matrix = [c0, c1, c2, c3, c4, c5, c6];
        fullArray = [];
    }

    function columnWin(arrayOfArrays) {
        for (let i = 0; i < arrayOfArrays.length; i++) {
            let oneArray = arrayOfArrays[i];
            let newColumnWinIn = new ColumnWinInspector(oneArray);
            if (newColumnWinIn.inspect() === "PlayerONE") {
                gameName.innerHTML = `${localStorage.getItem("player1")} wins the game!`;
                resetGame();
            } else if (newColumnWinIn.inspect() === "PlayerTWO") {
                gameName.innerHTML = `${localStorage.getItem("player2")} wins the game!`;
                resetGame();
            }
        }
    }

    function rowWin(columnArray) {
        let rowInspector = new RowWinInspector(columnArray);
        if (rowInspector.inspect() === 'PlayerONE') {
            gameName.innerHTML = `${localStorage.getItem("player1")} wins the game!`;
            resetGame();
        } else if (rowInspector.inspect() === 'PlayerTWO') {
            gameName.innerHTML = `${localStorage.getItem("player2")} wins the game!`;
            resetGame();
        }
    }

    clickTargets.addEventListener("click", (event) => {
        if (game === undefined) return;
        if (!event.target.id.startsWith("column-")) return;
        if (event.target.classList.contains("full")) return;
        const colIdx = parseInt(event.target.id[event.target.id.length - 1]);
        switch (colIdx) {
            case 0:
                c0.push(game.turn);
                console.log(`Array c0: ${c0}`);
                break;
            case 1:
                c1.push(game.turn);
                console.log(`Array c1: ${c1}`);
                break;
            case 2:
                c2.push(game.turn);
                console.log(`Array c2: ${c2}`);
                break;
            case 3:
                c3.push(game.turn);
                console.log(`Array c3: ${c3}`);
                break;
            case 4:
                c4.push(game.turn);
                console.log(`Array c4: ${c4}`);
                break;
            case 5:
                c5.push(game.turn);
                console.log(`Array c5: ${c5}`);
                break;
            case 6:
                c6.push(game.turn);
                console.log(`Array c6: ${c6}`);
                break;
        }
        game.playInColumn(colIdx);
        updateUI();
        columnWin(matrix);
        rowWin(matrix);
    });

    let diagWin = new DiagWinInspector(matrix);
    diagWin.inspector();

});
