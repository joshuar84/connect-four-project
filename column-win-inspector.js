import { Game } from './game.js'

export class ColumnWinInspector {
    constructor(col) {
        this.col = col;
    }
    inspect() {
        for (let i = 0; i < this.col.length; i++) {
            if (this.col[i]
                === this.col[i + 1] && this.col[i + 1]
                === this.col[i + 2] && this.col[i + 2]
                === this.col[i + 3] && this.col[i] === 1) {
                return `PlayerONE`
            } else if (this.col[i]
                === this.col[i + 1] && this.col[i + 1]
                === this.col[i + 2] && this.col[i + 2]
                === this.col[i + 3] && this.col[i] === 2) {
                return `PlayerTWO`;
            }
        }
    }
}
