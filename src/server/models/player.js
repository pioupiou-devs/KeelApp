const Frame = require('./frame');


class Player{
    constructor(nbFrame=10){
        this.frames=this.constructFrameList(nbFrame);
        this.isPlaying=false;
        this.currentFrame=1;
        this.throw=1;
    }

    constructFrameList(nbFrame=10) {
        let frameList = [];

        for (let i = 0; i < nbFrame; i++) {
            frameList.push(new Frame());
        }

        return frameList;
    }
}

module.exports = Player;