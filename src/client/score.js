function calculFrame(frameTable,mancheNumber){
    if(mancheNumber==10){
        frameTable[mancheNumber-1]["score"]=calcFrame10(frameTable[mancheNumber-1]);
    }

    if(frameTable[mancheNumber-1]["c1"]==10){ //case of a strike

        if(frameTable[mancheNumber]["c1"]==10){ //case 2 strikes in a row
            if(mancheNumber==9){ // case of the 9th frame with 2 strikes in a row
                frameTable[mancheNumber-1]["score"]=20+frameTable[10]["c2"];
            }else{
                frameTable[mancheNumber-1]["score"]=20+frameTable[mancheNumber+1]["c1"];
            }

        }else{
            frameTable[mancheNumber-1]["score"]=10+frameTable[mancheNumber]["c1"]+frameTable[mancheNumber]["c2"];
        }
        

    }else{
        if(frameTable[mancheNumber-1]["c1"]+frameTable[mancheNumber-1]["c2"]==10){ //case of a spare
            frameTable[mancheNumber-1]["score"]=10+frameTable[mancheNumber]["c1"];

        }else{ //no spare, no strike
            frameTable[mancheNumber-1]["score"]=frameTable[mancheNumber-1]["c1"]+frameTable[mancheNumber-1]["c2"];
        }
    }

    return  frameTable[mancheNumber-1]["score"];
}

module.exports = calculFrame;

function calculScoreTotal(frameTable){
    sum=0;
    for(let i=0;i<10;i=i+1){
        sum=sum+frameTable[i]["score"];
        frameTable[i]["scoreCum"]=sum;
    }
    return sum;
}

module.exports = calculScoreTotal;