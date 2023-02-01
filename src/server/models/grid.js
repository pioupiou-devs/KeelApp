const Frame = require('./frame');

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


        this.players.set(player, this.constructFrameList());
    }

    constructFrameList(nbFrame=10) {
        let frameList = [];

        for (let i = 0; i < nbFrame; i++) {
            frameList.push(new Frame());
        }

        return frameList;
    }

    calculFrame(namePlayer, mancheNumber, nbFrame=10, nbKeel=10) {

        frameTable=this.players[namePlayer];
        if (mancheNumber == nbFrame) {
            frameTable[mancheNumber - 1].setScore(calcFrame10(frameTable[mancheNumber - 1]),nbKeel);
        } else {

            if (frameTable[mancheNumber - 1].getC1() == nbKeel) { //case of a strike


                if (frameTable[mancheNumber].getC1() == nbKeel) { //case 2 strikes in a row
                    if (mancheNumber == nbFrame-1) { // case of the 9th frame with 2 strikes in a row
                        frameTable[mancheNumber - 1].setScore(nbKeel*2 + frameTable[mancheNumber].getC2(),nbKeel);
                    } else {
                        frameTable[mancheNumber - 1].setScore(nbKeel*2 + frameTable[mancheNumber + 1].getC1(),nbKeel);
                    }

                } else {
                    frameTable[mancheNumber - 1].setScore(nbKeel + frameTable[mancheNumber].getC1() + frameTable[mancheNumber].getC2(),nbKeel);
                }


            } else {
                if (frameTable[mancheNumber - 1].getC1() + frameTable[mancheNumber - 1].getC2() == nbKeel) { //case of a spare
                    frameTable[mancheNumber - 1].setScore(10 + frameTable[mancheNumber].getC1(),nbKeel);

                } else { //no spare, no strike
                    frameTable[mancheNumber - 1].setScore(frameTable[mancheNumber - 1].getC1() + frameTable[mancheNumber - 1].getC2(),nbKeel);
                }
            }
        }

        return frameTable[mancheNumber - 1].getScore();
    }


    calculScoreTotal(namePlayer,nbFrame=10,nbKeel) {
        frameTable=this.players[namePlayer];
        sum = 0;
        for (let i = 1; i < nbFrame+1; i = i + 1) {
            sum = sum + calculFrame(frameTable, i);
            frameTable[i - 1].setTotalScore(sum,nbFrame,nbKeel);
        }
        return sum;
    }



    calcFrame10(frame,nbKeel=10) {
        if (!(frame instanceof (Frame))) { //also cover undefined and null
            return 0;
        }

        var result = 0;
        if (frame.getC1() === null) {
            return result;
        }
        result = frame.getC1();

        if (result === nbKeel) { // we got a strike on the first throw
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

        if (result === nbKeel) { // we got a spare
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