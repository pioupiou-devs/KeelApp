// import {Grid, Frame,calculFrame,calculScoreTotal,calcFrame10 } from "./grid-frame.js";

class Grid {
    constructor() {
        this.players = new Map();
    }

    addPlayer(player) {
        if(player == null) throw new Error('Player is undefined');

        if( typeof player !== 'string' ) throw new Error('Player is not a string');

        if( player.trim() === '' ) throw new Error('Player is empty');


        this.players.set(player, this.constructFrameList());
    }

    constructFrameList() {
        let frameList = [];

        for (let i = 0; i < 10; i++) {
            frameList.push(new Frame());
        }

        return frameList;
    }
}

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
        if (score < 0 || score > 30 || score == null || typeof score != 'number')
            throw new Error("Out of range total score");

        this.score = score;
    }

    getTotalScore() {
        return this.totalScore;
    }

    setTotalScore(totalScore) {
        if (totalScore < 0 || totalScore > 300 || totalScore == null || typeof totalScore != 'number')
            throw new Error("Out of range total score");

        this.totalScore = totalScore;
    }
    //#endregion Getters and Setters
}


function calculFrame(frameTable, mancheNumber){

    if(mancheNumber==10){
        frameTable[mancheNumber-1].setScore(calcFrame10(frameTable[mancheNumber-1]));
    }else{

        if(frameTable[mancheNumber-1].getC1()==10){ //case of a strike


            if(frameTable[mancheNumber].getC1()==10){ //case 2 strikes in a row
                if(mancheNumber==9){ // case of the 9th frame with 2 strikes in a row
                    frameTable[mancheNumber-1].setScore(20+frameTable[mancheNumber].getC2());
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
    }

    return  frameTable[mancheNumber-1].getScore();
}


function calculScoreTotal(frameTable){
    sum=0;
    for(let i=1;i<11;i=i+1){
        sum=sum+calculFrame(frameTable,i);
        frameTable[i-1].setTotalScore(sum);
    }
    return sum;
}



function calcFrame10(frame){
    if(!(frame instanceof(Frame))){ //also cover undefined and null
        return 0;
    }

    var result = 0;
    if(frame.getC1() === null){
        return result;
    }
    result = frame.getC1();

    if(result === 10){ // we got a strike on the first throw
        if(frame.getC2() === null){
            return result;
        }
        result += frame.getC2();

        if(frame.getC3() === null){
            return result;
        }
        result += frame.getC3();

        return result;
    }

    if(frame.getC2() === null){
        return result;
    }
    result += frame.getC2();

    if (result === 10){ // we got a spare
        if(frame.getC3() === null){
            return result;
        }
        result += frame.getC3();
        return result;
    }
    else{ // we got a normal round with only 2 throws
        return result;
    }
}


const CellType = {
    LEFT: "left",
    RIGHT: "right",
    CENTER: "center",
    BOTTOM: "bottom",
    NONE: ""
}

let playingOrder = [];
let cellToBePlayed = 0;
let rowNumber = 1;
let grid = new Grid();

generateHeader()
addRow()
addRow()
generatePlayingOrder(getNbPlayers())
//TODO GESTION DE LA MANCHE 10 en front

/**
 * Retourn le type de cellule en fonction de CellType
 * @param cellType
 * @returns {string}
 */
function getCellType(cellType) {
    switch (cellType) {
        case "left":
            return "_L";//TODO changer en 1,2,3... avec test aussi
        case "right":
            return "_R";
        case "center":
            return "_C";
        case "bottom":
            return "_B";
        default:
            throw new Error("Invalid cell type");
    }
}

/**
 * Génère le header du tableau de score
 * @returns {HTMLElement}
 */
function generateHeader() {
    console.log("Generating header");
    let header = document.getElementById("grid-header");
    let nameCell = document.createElement("th");
    nameCell.setAttribute("id", getId(0, 0, CellType.NONE));
    nameCell.textContent = "Name";
    header.appendChild(nameCell)
    for (let i = 1; i <= 10; i++) {
        let col = document.createElement("th")
        col.textContent = i.toString();
        col.setAttribute("id", getId(0, i));
        header.appendChild(col);
    }
    let total = document.createElement("th");
    total.textContent = "Total";
    total.setAttribute("id", getId(0, 11));
    header.appendChild(total);
    return header;
}

function createFrameCell(idRow, idCol, cellType) {
    if (cellType == CellType.CENTER && idCol != 10) {
        throw new Error("Can't create a center cell for a frame different than 10");
    }
    let innerFrameCell = document.createElement("div");
    innerFrameCell.setAttribute("id", getId(idRow, idCol, cellType));
    return innerFrameCell;
}

/**
 * Ajoute une ligne au tableau de score
 * @returns {HTMLTableRowElement}
 */
function addRow() {

    let row = document.createElement("tr");
    let nameCell = document.createElement("td");
    nameCell.setAttribute("id", getId(rowNumber, 0, CellType.NONE));
    let inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("id", getId(rowNumber, 0, CellType.NONE));
    nameCell.appendChild(inputName);

    row.appendChild(nameCell)
    for (let i = 1; i <= 10; i++) {
        let cell = document.createElement("td");
        let leftInput = createFrameCell(rowNumber, i, CellType.LEFT);
        let rightInput = createFrameCell(rowNumber, i, CellType.RIGHT);
        let bottomInput = createFrameCell(rowNumber, i, CellType.BOTTOM);
        cell.appendChild(leftInput);
        if (i == 10) {
            let centerInput = createFrameCell(rowNumber, i, CellType.CENTER);
            cell.appendChild(centerInput);

        }
        cell.appendChild(rightInput);
        cell.appendChild(bottomInput);
        row.appendChild(cell);
    }
    let total = document.createElement("td");
    total.textContent = "Somme";
    row.appendChild(total);
    let tbody = document.querySelector("tbody");
    tbody.appendChild(row);

    //TODO TEMPORARY FIX
    grid.addPlayer("Player" + rowNumber);

    rowNumber++;
    return row;
}

/**
 * Retourne l'id d'une cellule (sans vérifier si elle existe)
 * @param idRow ligne/joueur
 * @param idCol manche
 * @param cellType type de cellule
 * @returns {string} id de la cellule
 */
function getId(idRow, idCol, cellType) {
    if (idRow < 0 || idCol < 0 || idCol > 11) {
        throw new Error(`Invalid id ${idRow}, ${idCol}`);
    }
    if (idCol != 10 && cellType == CellType.CENTER) {
        throw new Error("No center cell for a frame different than 10");
    }

    const row = "rowP";
    const col = "_col";

    const identifierCol = idCol == 0 ? "name" : idCol == 11 ? "total" : idCol;

    if (idRow == 0) {
        const rowHeader = "row";
        return rowHeader + idRow + col + identifierCol;
    } else {
        const type = cellType != null && idCol != 0 && idCol != 11 ? getCellType(cellType) : "";
        return row + idRow + col + identifierCol + type;
    }
}

/**
 * Met à jour le score d'un joueur
 */
function addScore() {
    // console.log(document.querySelector("body").outerHTML);
    let first = parseInt(document.getElementById('first').value);
    let second = parseInt(document.getElementById('second').value);
    let score = first + second;
    // cell to update
    let row = playingOrder[cellToBePlayed].split("_")[0];
    let frameNum = playingOrder[cellToBePlayed].split("_")[1];
    let firstThrowCell = document.getElementById(getId(row, frameNum, CellType.LEFT));
    let secondThrowCell = document.getElementById(getId(row, frameNum, CellType.RIGHT));
    // let thirdThrowCell = document.getElementById(getId(row, frame, CellType.RIGHT));

    //update the cells
    if (first == 10) {
        firstThrowCell.textContent = "X";
        secondThrowCell.textContent = "";
    } else if (score == 10) {
        firstThrowCell.textContent = first.toString();
        secondThrowCell.textContent = "/";
    } else {
        firstThrowCell.textContent = first.toString();
        secondThrowCell.textContent = second.toString();
    }

    if (cellToBePlayed == playingOrder.length) {
        cellToBePlayed = 0;
        total();
    }
    nextTurn();

}
//TODO TEMPORARY FIX
function total() {
    for (let i = 1; i < rowNumber; i++) {
        for (let j = 1; j <= 10; j++) {
            let left = document.getElementById(getId(i, j, CellType.LEFT)).textContent;
            let right = document.getElementById(getId(i, j, CellType.RIGHT)).textContent;
            let bottom = document.getElementById(getId(i, j, CellType.BOTTOM)).textContent;
            let center = document.getElementById(getId(i, j, CellType.CENTER)).textContent;
            grid["Player"+i](i, j, left, right, bottom, center);
        }
    }
    console.log(grid);
    calculScoreTotal(grid);
}

/**
 * Met à jour le tour de jeu
 */
function nextTurn() {
    if (cellToBePlayed < playingOrder.length -1 ) cellToBePlayed++;
    let row = playingOrder[cellToBePlayed].split("_")[0];
    let frame = playingOrder[cellToBePlayed].split("_")[1];
    let playerId = document.getElementById("player-id");
    let frameId = document.getElementById("frame-id");
    playerId.innerHTML = row;
    frameId.innerHTML = frame;
    return playingOrder[cellToBePlayed];
}

/**
 * Génère l'ordre de jeu
 * @param nbPlayer
 * @returns {*[]} tableau contenant l'ordre de jeu
 */
function generatePlayingOrder(nbPlayer) {
    // console.log("Generating playing order");
    // console.log("Nb player : " + nbPlayer);
    if (nbPlayer < 1 || nbPlayer == null) {
        throw new Error("Invalid number of player");
    }
    playingOrder = [];
    for (let frame = 1; frame <= 10; frame++) {
        for (let row = 1; row <= nbPlayer; row++) {
            playingOrder.push(row + "_" + frame);
        }
    }
    return playingOrder;

}

/**
 * Compte le nombre de joueurs avant de commencer la partie
 * @returns {number}
 */
function getNbPlayers() {
    return document.querySelectorAll("tr").length - 1;
}

/**
 * Vérifie si un input fourni via son id est valide
 * @param inputId id de l'input à vérifier
 * @returns {boolean}
 */
function isValidInput(inputId) {
    // Récupère la valeur du champ input
    let inputValue = document.getElementById(inputId).value;
    let errorMsg = document.getElementById("error-msg");
    if (inputValue == "") {
        errorMsg.innerHTML = "Saisir le nombre de quilles tombées (entre 0 et 10)";
        return false;
    }
    else if (!Number.isInteger(parseInt(inputValue))) {//si pas un entier
        errorMsg.innerHTML = "Veuillez saisir un nombre entier";
        return false;
    } else if (parseInt(inputValue) < 0 || parseInt(inputValue) > 10) {
        errorMsg.innerHTML = "Veuillez saisir un nombre entre 0 et 10";
        return false;
    }
    errorMsg.innerHTML = "";
    return true;
}

/**
 * Lance la vérification des inputs
 * @param input
 */
function checkInput(input) {
    let errorMsg = document.getElementById("error-msg");

    let button = document.getElementById('add-score');
    let block2 = false;
    let block3 = false;
    if (input === "first") {
        if (!isValidInput("first")) {
            button.disabled = true;
            document.getElementById('first').value = "";
            if (document.getElementById('second').value == "10") {
                document.getElementById('second').disabled = true;
                errorMsg.innerHTML = "";
                block2 = true;
            }
        }
    }

    if (input === "second" && !block2) {
        if (!isValidInput("second")) {
            button.disabled = true;
            document.getElementById('second').value = "";
        } else {
            if (!isValidInput("first")) {
                button.disabled = true;
                document.getElementById('second').value = "";
                errorMsg.innerHTML = "Veuillez saisir une valeur pour le premier lancer";
            } else {
                button.disabled = false;
            }
        }
    }

    if (isValidInput("first") && isValidInput("second")) {
        button.disabled = false;
        let first = parseInt(document.getElementById('first').value);
        let second = parseInt(document.getElementById('second').value);
        if ((first + second) > 10) {
            button.disabled = true;
            errorMsg.innerHTML = "Le nombre de quilles tombées ne peut pas être supérieur à 10";
        } else {
            errorMsg.innerHTML = "";
            button.disabled = false;
        }
    }

}

function resetGlobalVariables() {
    playingOrder = [];
    cellToBePlayed = 0;
    rowNumber = 1;
}

// {addScore, generatePlayingOrder, getNbPlayers, nextTurn, resetGlobalVariables, generateHeader, checkInput, isValidInput,
// };

// module.exports = {
//     generateHeader, addRow, getId, getCellType, CellType,
//     getNbPlayers, addScore, nextTurn, generatePlayingOrder, createFrameCell,
//     checkInput, isValidInput, playingOrder, cellToBePlayed, resetGlobalVariables, rowNumber
// };
