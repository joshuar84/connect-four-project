export class RowWinInspector {
    constructor(columns) {
        this.columns = columns;
    }
    inspect() {
        for (let i = 0; i < this.columns.length - 3; i++) {
            for (let j = 0; j < this.columns[i].length; j++) {
                let j1 = this.columns[i][j];
                let j2 = this.columns[i + 1][j];
                let j3 = this.columns[i + 2][j];
                let j4 = this.columns[i + 3][j];
                if (j1 === j2 && j2 === j3 && j3 === j4 && j1 === 1) {
                    return 'PlayerONE';
                } else if (j1 === j2 && j2 === j3 && j3 === j4 && j1 === 2) {
                    return 'PlayerTWO';
                }
            }
        }
    }
}
