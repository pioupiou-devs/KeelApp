function calculFrame(frameTable,mancheNumber){
    if(mancheNumber==10){
        frameTable[mancheNumber-1].setScore(calcFrame10(frameTable[mancheNumber-1]));
    }

    if(frameTable[mancheNumber-1].getC1()==10){ //case of a strike

        if(frameTable[mancheNumber].getC1()==10){ //case 2 strikes in a row
            if(mancheNumber==9){ // case of the 9th frame with 2 strikes in a row
                frameTable[mancheNumber-1].setScore(20+frameTable[10].getC2());
            }else{
                frameTable[mancheNumber-1].setScore(20+frameTable[mancheNumber+1].getC1());
            }

        }else{
            frameTable[mancheNumber-1].setScore(10+frameTable[mancheNumber].getC1()+frameTable[mancheNumber].getC2());
        }
        

    }else{
        if(frameTable[mancheNumber-1].getC1()+frameTable[mancheNumber-1].getC2()==10){ //case of a spare
            frameTable[mancheNumber-1].setScore(10+frameTable[mancheNumber].getC1());

        }else{ //no spare, no strike
            frameTable[mancheNumber-1].setScore(frameTable[mancheNumber-1].getC1()+frameTable[mancheNumber-1].getC2());
        }
    }

    return  frameTable[mancheNumber-1].getScore();
}

module.exports = calculFrame;

function calculScoreTotal(frameTable){
    sum=0;
    for(let i=0;i<10;i=i+1){
        sum=sum+frameTable[i].getScore();
        frameTable[i].setTotalScore(sum);
    }
    return sum;
}

module.exports = calculScoreTotal;

function calcFrame10(frame){
    var result = 0;
    result = frame.getC1();

    if(result === 10){ // we got a strike on the first throw
        result += frame.getC2() + frame.getC3();
        return result;
    }
    
    result += frame.getC2();

    if (result === 10){ // we got a spare 
        result += frame.getC3();
        return result;
    }
    else{ // we got a normal round with only 2 throws
        return result;
    }
}

module.exports = calcFrame10;