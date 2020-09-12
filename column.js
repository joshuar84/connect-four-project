class Column {
    constructor() {
        this.rows = [null,
            null,
            null,
            null,
            null,
            null,];
    }

    add(playerNum) {
        for (let i = this.rows.length - 1; i >= 0; i--) {
            if (!this.rows[i]) {
                this.rows[i] = playerNum;
                return;
            }
        }
    }

    getTokenAt(rowIdx) {
        return this.rows[rowIdx];
    }

    isFull() {
        return this.rows[0] !== null;
    }
}

export {
    Column,
}
