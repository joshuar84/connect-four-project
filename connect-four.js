import { Game } from './game.js'
import { ColumnWinInspector } from './column-win-inspector.js'



window.addEventListener('DOMContentLoaded', event => {
    // Variables
    const clickTargets = document.getElementById('click-targets');
    const boardHolder = document.getElementById('board-holder')
    let playerOneName = document.getElementById('player-1-name');
    let playerTwoName = document.getElementById('player-2-name');
    const newGame = document.getElementById('new-game');
    const gameName = document.getElementById('game-name');
    let p1Count = 0;
    let p2Count = 0;
    let game = undefined;

    newGame.addEventListener('click', event => {
        game = new Game(playerOneName.value, playerTwoName.value);
        playerOneName.value = '';
        playerTwoName.value = '';
        newGame.disabled = true;
        game.getName();
        updateUI();
    })



    const updateUI = () => {
        if (game === undefined) {
            boardHolder.classList.add("is-invisible");
        } else {
            boardHolder.classList.remove("is-invisible");
            gameName.innerHTML = game.getName();
            if (game.turn === 1) {
                clickTargets.classList.add("black")
                clickTargets.classList.remove("red")
            } else {
                clickTargets.classList.add("red")
                clickTargets.classList.remove("black")
            }
        }
        //Iterating through rows, then their respective columns.
        for (let rowIdx = 0; rowIdx < 6; rowIdx++) {
            for (let colIdx = 0; colIdx < 7; colIdx++) {
                const square = document.getElementById(`square-${rowIdx}-${colIdx}`)
                const val = game.getTokenAt(rowIdx, colIdx)
                square.innerHTML = ''
                if (val === 1) {
                    const token = document.createElement('div')
                    token.classList.add('token', 'black')
                    square.appendChild(token)
                } else if (val === 2) {
                    const token = document.createElement('div')
                    token.classList.add('token', 'red')
                    square.appendChild(token)
                }

            }
        }
        //Adds full class to columns with the top value !== null
        let fullArray = [];
        for (let colIdx = 0; colIdx < 7; colIdx++) {
            let col = document.getElementById(`column-${colIdx}`)
            if (game.isColumnFull(colIdx)) {
                col.classList.add('full')
                if (!fullArray.includes(colIdx)) {
                    fullArray.push(colIdx);
                }
            } else {
                col.classList.remove('full')
            }
            if (fullArray.length === 7) {
                let playerOne = localStorage.getItem('player1')
                let playerTwo = localStorage.getItem('player2')
                gameName.innerHTML = (`${playerOne} tied with ${playerTwo}`)
            }
        }
    }

    playerOneName.addEventListener('keyup', event => {
        p1Count++;
        if (p1Count !== 0 && p2Count !== 0) {
            newGame.disabled = false;
        }
    })
    playerTwoName.addEventListener('keyup', event => {
        p2Count++;
        if (p1Count !== 0 && p2Count !== 0) {
            newGame.disabled = false;
        }
    })
    
    let c0 = [];
    let c1 = [];
    let c2 = [];
    let c3 = [];
    let c4 = [];
    let c5 = [];
    let c6 = [];
    let allColumn = [c0,c1,c2,c3,c4,c5,c6];

    function columnWin(arrayOfArrays) {
        for (let i = 0; i < arrayOfArrays.length; i++) {
            let oneArray = arrayOfArrays[i];
            let newColumnWinIn = new ColumnWinInspector(oneArray);
            if (newColumnWinIn.inspect() === 'PlayerONE') {
                newGame.disabled = false;
                gameName.innerHTML = localStorage.getItem
            } else if (newColumnWinIn.inspect() === 'PlayerTWO') {
                newGame.disabled = false;
            }
        }
    }

    clickTargets.addEventListener('click', (event) => {
        if (!event.target.id.startsWith('column-')) return
        if (event.target.classList.contains('full')) return
        const colIdx = parseInt(event.target.id[event.target.id.length - 1])
        switch (colIdx) {
            case 0:
                c0.push(game.turn);
                break;
            case 1:
                c1.push(game.turn);
                break;
            case 2:
                c2.push(game.turn);
                break;
            case 3:
                c3.push(game.turn);
                break;
            case 4:
                c4.push(game.turn);
                break;
            case 5:
                c5.push(game.turn);
                break;
            case 6:
                c6.push(game.turn);
                break;
        }
        game.playInColumn(colIdx);
        updateUI();
        columnWin(allColumn);
    })
})
