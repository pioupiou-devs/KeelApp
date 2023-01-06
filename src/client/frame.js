class Frame {
    constructor(leftValue = null, rightValue = null, centerValue = null) {

        if (!this.isValid(leftValue, rightValue, centerValue)) {
            throw new Error("Invalid data provided");
        }

        this.leftValue = leftValue;
        this.rightValue = rightValue;
        this.centerValue = centerValue;
        this.score = null;
        this.totalScore = null;
    }

    //#region Methods
    isValid(leftValue = null, rightValue = null, centerValue = null) {
        
        if (isNaN(leftValue) || isNaN(rightValue) || isNaN(centerValue))
            return false;

        if (leftValue != null) {
            if (typeof leftValue != 'number' || leftValue < 0 || leftValue > 10) {
                return false;
            }
        }

        if (rightValue != null) {
            if (typeof rightValue != 'number' || rightValue < 0 || rightValue > 10) {
                return false;
            }
        }

        if (centerValue != null) {
            if (typeof centerValue != 'number' || centerValue < 0 || centerValue > 10) {
                return false;
            }
        }

        return true;
    }
    //#endregion Methods

    //#region Getters and Setters
    getLeftValue() {
        return this.leftValue;
    }

    setLeftValue(leftValue) {
        if (this.isValid(leftValue, this.rightValue, this.centerValue))
            this.leftValue = leftValue;
    }

    getRightValue() {
        return this.rightValue;
    }

    setRightValue(rightValue) {
        if (this.isValid(this.leftValue, rightValue, this.centerValue))
            this.rightValue = rightValue;
    }

    getCenterValue() {
        return this.centerValue;
    }

    setCenterValue(centerValue) {
        if (this.isValid(this.leftValue, this.rightValue, centerValue))
            this.centerValue = centerValue;
    }

    getScore() {
        return this.score;
    }

    setScore(score) {
        this.score = score;
    }

    getTotalScore() {
        return this.totalScore;
    }

    setTotalScore(totalScore) {
        this.totalScore = totalScore;
    }
    //#endregion Getters and Setters
}

module.exports = Frame;