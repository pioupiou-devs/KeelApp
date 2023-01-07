const assert = require('assert');
const {JSDOM} = require("jsdom");

const {getId, generateHeader, getCellType, addRow, generatePlayingOrder,
    getNbPlayers, addScore, checkInput, isValidInput, nextTurn,CellType
} = require('../src/client/grid-view');


const baseHtml = `
        <table id="grid">
            <thead>
                <tr id="grid-header"></tr>
            </thead>
            <tbody id="grid-content">
            </tbody>
        </table>
        <div>
            <span>Player : </span>
            <span id="player-id">1</span>
            <span id="">Frame : </span>
            <span id="frame-id">1</span>
        </div>
        
        <input required placeholder="Premier coup" id="first" type="number" min="0" max="10"
               oninput="checkInput('first')" pattern="\\d*">
        <input required placeholder="Deuxième coup " id="second" min="0" max="10" type="number"
               oninput="checkInput('second')" pattern="\\d*">
        <div style="color: #a21313" id="error-msg"></div>
`

//verifie le header
describe('header', function () {
    it('should return the correct result', function () {
        const dom = new JSDOM(baseHtml);//in order to test (dom not available in nodejs)
        global.document = dom.window.document;

        let html = generateHeader();
        let actual = html.outerHTML;
        let expected = `<tr id="grid-header"><th id="row0_colname">Name</th><th id="row0_col1">1</th><th id="row0_col2">2</th><th id="row0_col3">3</th><th id="row0_col4">4</th><th id="row0_col5">5</th><th id="row0_col6">6</th><th id="row0_col7">7</th><th id="row0_col8">8</th><th id="row0_col9">9</th><th id="row0_col10">10</th><th id="row0_coltotal">Total</th></tr>`;
        assert.equal(actual, expected);
    });
});

//verifie le nombre de row
describe('addRow', function () {
    it('add 2 rows and header', function () {
        const dom = new JSDOM(baseHtml);
        global.document = dom.window.document;
        generateHeader();
        addRow();
        addRow();
        let actual = document.querySelectorAll("tr").length;
        let expected = 3;
        assert.equal(actual, expected);
    });
    it('no row added and header', function () {
        const dom = new JSDOM(baseHtml);
        global.document = dom.window.document;
        generateHeader();
        let actual = document.querySelectorAll("tr").length;
        let expected = 1;//always at least one <tr> is static
        assert.equal(actual, expected);
    });
});



//test la generation d'id en fonction d'un row et d'une colonne (tour)
describe('getId', function () {
    it('should return the correct id', function () {
        assert.equal(getId(0, 0), "row0_colname");
        assert.equal(getId(1, 5), "rowP1_col5");
        assert.equal(getId(0, 5), "row0_col5");
        assert.equal(getId(0, 11), "row0_coltotal");
        assert.equal(getId(0, 11, CellType.BOTTOM), "row0_coltotal");
        assert.equal(getId(4, 7, CellType.LEFT), "rowP4_col7_L");
        assert.equal(getId(4, 7, CellType.RIGHT), "rowP4_col7_R");
        assert.equal(getId(10, 10, CellType.BOTTOM), "rowP10_col10_B");
    });
    it ('should return an error', function () {
        assert.throws(() => getId(0, 12), Error);
        assert.throws(() => getId(-1, 9, CellType.BOTTOM), Error);
        assert.throws(() => getId(2, 12, CellType.LEFT), Error);
        assert.throws(() => getId(4, 7, CellType.CENTER), Error);
    });
});

//test la generation de getCellType
describe('getCellType', function () {
    it('should return the correct cell type', function () {
        assert.equal(getCellType(CellType.LEFT), "_L");
        assert.equal(getCellType(CellType.RIGHT), "_R");
        assert.equal(getCellType(CellType.CENTER), "_C");
        assert.equal(getCellType(CellType.BOTTOM), "_B");
        assert.throws(() => getCellType("invalid"), Error);
    });
});

describe('generatePlayingOrder', function () {
    it('should the correct playing order', function () {
        let actual = generatePlayingOrder(4);
        let expected = ["1_1","2_1","3_1","4_1","1_2","2_2","3_2","4_2","1_3","2_3","3_3","4_3","1_4","2_4","3_4","4_4",
            "1_5","2_5","3_5","4_5","1_6","2_6","3_6","4_6","1_7","2_7","3_7","4_7","1_8","2_8","3_8","4_8","1_9",
            "2_9","3_9","4_9","1_10","2_10","3_10","4_10"];
        assert.deepEqual(actual, expected);
    });
});

describe('input', function () {
    const dom = new JSDOM(baseHtml);
    global.document = dom.window.document;
    it('the input fields should display the correct result/error', function () {
        let first = document.getElementById("first");
        first.value = 5;
        assert.equal(isValidInput("first"), true);
        first.value = 11;
        assert.equal(isValidInput("first"), false);
        first.value = 10;
        assert.equal(isValidInput("first"), true);
        first.value = 0;
        assert.equal(isValidInput("first"), true);
        first.value = -1;
        assert.equal(isValidInput("first"), false);
        first.value = "qsdqsdsqd";
        assert.equal(isValidInput("first"), false);
        first.value = 'a';
        assert.equal(isValidInput("first"), false);
    });
});

//test next turn
describe('nextTurn', function () {
    it('should return the correct turn', function () {
        const dom = new JSDOM(baseHtml);
        global.document = dom.window.document;
        generateHeader();
        addRow();
        addRow();
        generatePlayingOrder(getNbPlayers())
        assert.equal(nextTurn(), "2_1");
        assert.equal(nextTurn(), "1_2");
        assert.equal(nextTurn(), "2_2");
        assert.equal(nextTurn(), "1_3");
        assert.equal(nextTurn(), "2_3");
        assert.equal(nextTurn(), "1_4");
        assert.equal(nextTurn(), "2_4");
    });
});

describe('addScore', function () {
    const dom = new JSDOM(baseHtml);
    global.document = dom.window.document;
    generateHeader();
    addRow();
    addRow();
    generatePlayingOrder(getNbPlayers());
    let i = 0;
    while (i < 8) {
        nextTurn();
        i++;
    }

    it('should return the correct result - spare', function () {
        let first = document.getElementById("first");
        let second = document.getElementById("second");

        let row = document.getElementById("player-id").innerHTML;
        let frame = document.getElementById("frame-id").innerHTML;

        first.value = 5;
        second.value = 5;
        addScore();

        let firstThrow = parseInt(document.getElementById(getId(row, frame, CellType.LEFT)).innerHTML);
        let secondThrow = document.getElementById(getId(row, frame, CellType.RIGHT)).innerHTML;

        assert.equal(firstThrow, 5);
        assert.equal(secondThrow, "/");

    });
    it('should return the correct result - strike', function () {
        let first = document.getElementById("first");
        let second = document.getElementById("second");

        let row = document.getElementById("player-id").innerHTML;
        let frame = document.getElementById("frame-id").innerHTML;

        first.value = 10;
        second.value = 0;
        addScore();

        let firstThrow = document.getElementById(getId(row, frame, CellType.LEFT)).innerHTML;
        let secondThrow = document.getElementById(getId(row, frame, CellType.RIGHT)).innerHTML;

        assert.equal(firstThrow, "X");
        assert.equal(secondThrow, "");

    });
    it('should return the correct result - simple throw', function () {
        let first = document.getElementById("first");
        let second = document.getElementById("second");

        let row = document.getElementById("player-id").innerHTML;
        let frame = document.getElementById("frame-id").innerHTML;

        first.value = 5;
        second.value = 4;
        addScore();

        let firstThrow = parseInt(document.getElementById(getId(row, frame, CellType.LEFT)).innerHTML);
        let secondThrow = document.getElementById(getId(row, frame, CellType.RIGHT)).innerHTML;

        assert.equal(firstThrow, 5);
        assert.equal(secondThrow, 4);

    });
});


