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

module.exports = {
    generateHeader, addRow, getId, getCellType, CellType,
    getNbPlayers, addScore, nextTurn, generatePlayingOrder, createFrameCell,
    checkInput, isValidInput, playingOrder, cellToBePlayed
}

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
    let first = parseInt(document.getElementById('first').value);
    let second = parseInt(document.getElementById('second').value);
    let score = first + second;
    // cell to update
    let row = playingOrder[cellToBePlayed].split("_")[0];
    let frame = playingOrder[cellToBePlayed].split("_")[1];
    let firstThrowCell = document.getElementById(getId(row, frame, CellType.LEFT));
    let secondThrowCell = document.getElementById(getId(row, frame, CellType.RIGHT));
    // let thirdThrowCell = document.getElementById(getId(row, frame, CellType.RIGHT));

    //update the cells
    if (first == 10) {
        firstThrowCell.textContent = "X";
        secondThrowCell.textContent = "";
    } else if (score == 10) {
        firstThrowCell.textContent = first;
        secondThrowCell.textContent = "/";
    } else {
        firstThrowCell.textContent = first;
        secondThrowCell.textContent = second;
    }

    if (cellToBePlayed == playingOrder.length) {
        cellToBePlayed = 0;
    }
    nextTurn();

}

/**
 * Met à jour le tour de jeu
 */
function nextTurn() {
    cellToBePlayed++;
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
    console.log("Generating playing order");
    console.log("Nb player : " + nbPlayer);
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