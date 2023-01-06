const Frame = require('./frame');

class Grid {
    constructor() {
        this.players = new Map();
    }

    addPlayer(player) {
        if(player == null) throw new Error('Player is undefined');

        if( typeof player !== 'string' ) throw new Error('Player is not a string');

        if( player.trim() === '' ) throw new Error('Player is empty');


        this.players.set(player, this.constructFrameList());
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