function calcFrame10(frame){
    var result = 0;
    result = frame.getC1();

    if(result === 10){ //mean we get a trike on the first throw
        result += frame.getC2() + frame.getC3();
        return result;
    }
    
    result += frame.getC2();

    if (result === 10){ //mean we get a spare 
        result += frame.getC3();
        return result;
    }
    else{ //we got a normal round with only 2 throw
        return result;
    }
}

module.exports = calcFrame10;


