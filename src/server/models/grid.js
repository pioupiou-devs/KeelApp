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


        this.players.set(player, Player(this.nbFrame));
        
    }


    calculFrame(namePlayer, mancheNumber) {

        frameTable=this.players[namePlayer];
        if (mancheNumber == this.nbFrame) {
            frameTable[mancheNumber - 1].setScore(calcFrame10(frameTable[mancheNumber - 1]),this.nbKeel);
        } else {

            if (frameTable[mancheNumber - 1].getC1() == this.nbKeel) { //case of a strike


                if (frameTable[mancheNumber].getC1() == this.nbKeel) { //case 2 strikes in a row
                    if (mancheNumber == this.nbFrame-1) { // case of the 9th frame with 2 strikes in a row
                        frameTable[mancheNumber - 1].setScore(this.nbKeel*2 + frameTable[mancheNumber].getC2(),this.nbKeel);
                    } else {
                        frameTable[mancheNumber - 1].setScore(this.nbKeel*2 + frameTable[mancheNumber + 1].getC1(),this.nbKeel);
                    }

                } else {
                    frameTable[mancheNumber - 1].setScore(this.nbKeel + frameTable[mancheNumber].getC1() + frameTable[mancheNumber].getC2(),this.nbKeel);
                }


            } else {
                if (frameTable[mancheNumber - 1].getC1() + frameTable[mancheNumber - 1].getC2() == this.nbKeel) { //case of a spare
                    frameTable[mancheNumber - 1].setScore(this.nbKeel + frameTable[mancheNumber].getC1(),this.nbKeel);

                } else { //no spare, no strike
                    frameTable[mancheNumber - 1].setScore(frameTable[mancheNumber - 1].getC1() + frameTable[mancheNumber - 1].getC2(),this.nbKeel);
                }
            }
        }

        return frameTable[mancheNumber - 1].getScore();
    }


    calculScoreTotal(namePlayer) {
        sum = 0;
        for (let i = 1; i < this.nbFrame+1; i = i + 1) {
            sum = sum + calculFrame(namePlayer, i);
            this.players[namePlayer][i - 1].setTotalScore(sum,this.nbFrame,this.nbKeel);
        }
        return sum;
    }



    calcFrame10(frame) {
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