class Frame {
    constructor(c1 = null, c2 = null, c3 = null) {

        if (!this.isValid(c1, c2, c3)) {
            throw new Error("Invalid data provided");
        }

        this.c1 = c1;
        this.c2 = c2;
        this.c3 = c3;
        this.score = null;
        this.totalScore = null;
    }

    //#region Methods
    isValid(c1 = null, c2 = null, c3 = null) {

        if (isNaN(c1) || isNaN(c2) || isNaN(c3))
            return false;

        if (c1 != null) {
            if (typeof c1 != 'number' || c1 < 0 || c1 > 10) {
                return false;
            }
        }

        if (c2 != null) {
            if (typeof c2 != 'number' || c2 < 0 || c2 > 10) {
                return false;
            }
        }

        if (c3 != null) {
            if (typeof c3 != 'number' || c3 < 0 || c3 > 10) {
                return false;
            }
        }

        return true;
    }
    //#endregion Methods

    //#region Getters and Setters
    getC1() {
        return this.c1;
    }

    setC1(c1) {
        if (this.isValid(c1, this.c2, this.c3))
            this.c1 = c1;
    }

    getC2() {
        return this.c2;
    }

    setC2(c2) {
        if (this.isValid(this.c1, c2, this.c3))
            this.c2 = c2;
    }

    getC3() {
        return this.c3;
    }

    setC3(c3) {
        if (this.isValid(this.c1, this.c2, c3))
            this.c3 = c3;
    }

    getScore() {
        return this.score;
    }

    setScore(score) {
        if (score >= 0 && score <= 30)
            this.score = score;
    }

    getTotalScore() {
        return this.totalScore;
    }

    setTotalScore(totalScore) {
        if (totalScore >= 0 && totalScore <= 300)
            this.totalScore = totalScore;
    }
    //#endregion Getters and Setters
}

module.exports = Frame;