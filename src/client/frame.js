class Frame{
    constructor(leftValue = null, rightValue = null, centerValue = null){

        if(!Frame.isValid(leftValue, rightValue, centerValue)){
            throw new Error("Invalid data provided");
        }

        this.leftValue = leftValue;
        this.rightValue = rightValue;
        this.centerValue = centerValue;
        this.score = null;
        this.totalScore = null;
    }

    //#region Methods
    static isValid(leftValue, rightValue, centerValue){

        if(leftValue == null || rightValue == null || leftValue == undefined || rightValue == undefined){
            return false;
        }

        if(typeof leftValue != 'number' || typeof rightValue != 'number'){
            return false;
        }

        if(leftValue <0 || leftValue > 10 || rightValue <0 || rightValue > 10){
            return false;
        }
        
        return true;
    }
    //#endregion Methods
    
    //#region Getters and Setters
    getLeftValue(){
        return this.leftValue;
    }

    setLeftValue(leftValue){
        this.leftValue = leftValue;
    }

    getRightValue(){
        return this.rightValue;
    }

    setRightValue(rightValue){
        this.rightValue = rightValue;
    }

    getCenterValue(){
        return this.centerValue;
    }

    setCenterValue(centerValue){
        this.centerValue = centerValue;
    }

    getScore(){
        return this.score;
    }

    setScore(score){
        this.score = score;
    }

    getTotalScore(){
        return this.totalScore;
    }

    setTotalScore(totalScore){
        this.totalScore = totalScore;
    }
    //#endregion Getters and Setters
}

module.exports = Frame;