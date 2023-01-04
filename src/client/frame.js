class Frame{
    //#region Constructor
    constructor(){
        this.leftValue = null;
        this.rightValue = null;
        this.centerValue = null;
        this.score = null;
        this.totalScore = null;
    }

    constructor(leftValue){
        this.leftValue = leftValue;
        this.rightValue = null;
        this.centerValue = null;
        this.score = null;
        this.totalScore = null;
    }

    constructor(leftValue, rightValue){
        this.leftValue = leftValue;
        this.rightValue = rightValue;
        this.centerValue = null;
        this.score = null;
        this.totalScore = null;
    }

    constructor(leftValue, rightValue, centerValue){
        this.leftValue = leftValue;
        this.rightValue = rightValue;
        this.centerValue = centerValue;
        this.score = null;
        this.totalScore = null;
    }
    //#endregion Constructor
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