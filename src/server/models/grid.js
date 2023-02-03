const Frame = require('./frame');
const Player=require('./player');

class Grid {
    constructor(nbKeel=10, nbFrame=10) {
        this.players = new Map();
        this.nbKeel=nbKeel;
        this.nbFrame=nbFrame;
    }

    addPlayer(player) {
        if (player == null) throw new Error('Player is undefined');

        if (typeof player !== 'string') throw new Error('Player is not a string');

        if (player.trim() === '') throw new Error('Player is empty');


        this.players.set(player,new Player(this.nbFrame));
        
    }

    // as we create the list of frame during player creation, we need to set value of frame
    setFrameThrow(playerName, frameNumber, c1 = 0,c2 = 0, c3 = 0){
        //player inupt verification
        if (playerName == null) {throw new Error('Player is undefined');}
        if (typeof playerName !== 'string') {throw new Error('Player is not a string');}
        if (playerName.trim() === '') {throw new Error('Player is empty');}
        //is player existe
        var frameTable=this.players.get(playerName).frames;
        if (frameTable == null) {throw new Error('PLayer is not in List');}

        //throw value verification
        //in case of null or undefined input, we set to 0
        if (c1 == null){c1 = 0;}
        if (c2 == null){c2 = 0;}
        if (c3 == null){c3 = 0;}
        if (c1 <0 || c1 >this.nbKeel || c2 <0 || c2 >this.nbKeel || c3 <0 || c3 >this.nbKeel){throw new Error('Throw not valid');}

        //frame number verification
        if (frameNumber <1 || frameNumber >this.nbFrame ){throw new Error('Frame not valid');}
        this.players.get(playerName).frames[frameNumber -1] = new Frame(c1,c2,c3);
    }

    calculFrame(namePlayer, mancheNumber) {
        var frameTable=this.players.get(namePlayer).frames;
        var frameIndex =  mancheNumber -1;
        var nextFrameIndex =  mancheNumber;
        var next2FrameIdex=  mancheNumber+1;
        var doubleKeel = this.nbKeel*2;

        if (nextFrameIndex == this.nbFrame) {
            frameTable[frameIndex].setScore(this.calculLastFrame(frameTable[frameIndex]),this.nbKeel);
        } else {

            if (frameTable[frameIndex].getC1() == this.nbKeel) { //case of a strike


                if (frameTable[nextFrameIndex].getC1() == this.nbKeel) { //case 2 strikes in a row
                    if (nextFrameIndex == this.nbFrame-1) { // case of the 9th frame with 2 strikes in a row
                        frameTable[frameIndex].setScore(doubleKeel + frameTable[nextFrameIndex].getC2(),this.nbKeel);
                    } else {
                        frameTable[frameIndex].setScore(doubleKeel + frameTable[next2FrameIdex].getC1(),this.nbKeel);
                    }

                } else {
                    frameTable[frameIndex].setScore(this.nbKeel + frameTable[nextFrameIndex].getC1() + frameTable[nextFrameIndex].getC2(),this.nbKeel);
                }


            } else {
                if (frameTable[frameIndex].getC1() + frameTable[frameIndex].getC2() == this.nbKeel) { //case of a spare
                    frameTable[frameIndex].setScore(this.nbKeel + frameTable[nextFrameIndex].getC1(),this.nbKeel);

                } else { //no spare, no strike
                    frameTable[frameIndex].setScore(frameTable[frameIndex].getC1() + frameTable[frameIndex].getC2(),this.nbKeel);
                }
            }
        }

        return frameTable[frameIndex].getScore();
    }


    calculScoreTotal(namePlayer) {
        var sum = 0;
        for (let i = 1; i < this.nbFrame+1; i = i + 1) {
            sum = sum + this.calculFrame(namePlayer, i);
            this.players.get(namePlayer).frames[i - 1].setTotalScore(sum,this.nbFrame,this.nbKeel);
        }
        return sum;
    }




    calculLastFrame(frame) {
        if (!(frame instanceof (Frame))) { //also cover undefined and null
            return 0;
        }

        var result = 0;
        if (frame.getC1() === null) {
            return result;
        }
        result = frame.getC1();

        if (result === this.nbKeel) { // we got a strike on the first throw
            if (frame.getC2() === null) {
                return result;
            }
            result += frame.getC2();

            if (frame.getC3() === null) {
                return result;
            }
            result += frame.getC3();

            return result;
        }

        if (frame.getC2() === null) {
            return result;
        }
        result += frame.getC2();

        if (result === this.nbKeel) { // we got a spare
            if (frame.getC3() === null) {
                return result;
            }
            result += frame.getC3();
            return result;
        }
        else { // we got a normal round with only 2 throws
            return result;
        }
    }
}

module.exports = Grid;