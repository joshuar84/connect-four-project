import { Column } from './column.js'

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.turn = 1;
        this.columns = Array.from(Array(7), () => new Column)
    }
    getName() {
        localStorage.setItem('player1', `${this.player1}`)
        localStorage.setItem('player2', `${this.player2}`)
        return `${this.player1} vs. ${this.player2}`;
    }

    playInColumn(colIdx) {

        this.columns[colIdx].add(this.turn);

        if (this.turn === 2) {
            this.turn = 1
        } else {
            this.turn = 2
        }
    }

    getTokenAt(rowIdx, colIdx) {
        const column = this.columns[colIdx];
        return column.getTokenAt(rowIdx);
    }

    isColumnFull(colIdx) {
        const column = this.columns[colIdx];
        return column.isFull();
    }
}

export { Game };
