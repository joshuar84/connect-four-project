export class DiagWinInspector {
    constructor(colArrays) {
        this.colArrays = colArrays;
    }
    inspector() {
        for (let i = 0; i < this.colArrays.length - 4; i++) {
            let aS1 = this.colArrays[i].slice()[i];
            let aS2 = this.colArrays[i+1].slice()[i+1];
            let aS3 = this.colArrays[i+2].slice()[i+2];
            let aS4 = this.colArrays[i+3].slice()[i+3];

            console.log(aS1,aS2,aS3,aS4);
        }
        for (let i = this.colArrays.length - 5; i >= 0; i--) {
            let dS1 = this.colArrays[i].slice()[i];
            let dS2 = this.colArrays[i+1].slice()[i+1];
            let dS3 = this.colArrays[i+2].slice()[i+2];
            let dS4 = this.colArrays[i+3].slice()[i+3];

            console.log(dS1,dS2,dS3,dS4);
        }
    }
}
