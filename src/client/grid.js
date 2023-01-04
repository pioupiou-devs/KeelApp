class Grid {
    constructor() {
        this.players = new [{}];
    }

    addPlayer(player) {
        this.players.push({key: player, value: this.constructFrameList()});
    }

    constructFrameList() {
        let frameList = [];

        for (let i = 0; i < 10; i++) {
            frameList.push(new Frame());
        }

        return frameList;
    }
}

module.exports = Grid;