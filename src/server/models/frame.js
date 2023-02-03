class Frame {
    constructor(c1 = 0, c2 = 0, c3 = 0) {

        if (!this.isValid(c1, c2, c3)) {
            throw new Error("Invalid data provided");
        }

        //in case of null or undefined input, we set to 0
        if (c1 == null){c1 = 0;}
        if (c2 == null){c2 = 0;}
        if (c3 == null){c3 = 0;}

        this.c1 = c1;
        this.c2 = c2;
        this.c3 = c3;
        this.score = null;
        this.totalScore = null;
    }

    //#region Methods
    isValid(c1 = null, c2 = null, c3 = null, nbKeel=10) {

        if (isNaN(c1) || isNaN(c2) || isNaN(c3))
            return false;

        if (c1 != null) {
            if (typeof c1 != 'number' || c1 < 0 || c1 > nbKeel) {
                return false;
            }
        }

        if (c2 != null) {
            if (typeof c2 != 'number' || c2 < 0 || c2 > nbKeel) {
                return false;
            }
        }

        if (c3 != null) {
            if (typeof c3 != 'number' || c3 < 0 || c3 > nbKeel) {
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

    setScore(score, nbKeel=10) {
        let maxScore=3*nbKeel;
        if (score < 0 || score > maxScore || score == null || typeof score != 'number')
            throw new Error("Out of range total score");

        this.score = score;
    }

    getTotalScore() {
        return this.totalScore;
    }

    setTotalScore(totalScore, nbFrame=10,nbKeel=10) {
        let maxScoreTotal=nbFrame*nbKeel*3;
        if (totalScore < 0 || totalScore > maxScoreTotal || totalScore == null || typeof totalScore != 'number')
            throw new Error("Out of range total score");

        this.totalScore = totalScore;
    }
    //#endregion Getters and Setters
}

module.exports = Frame;