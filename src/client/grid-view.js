const CellType = {
    FIRST: "first",
    SECOND: "second",
    THIRD: "third",
    SUB_TOTAL: "subtotal",
    NONE: ""
}

/**
 * Crée le scordboard à partir du json
 * @param json
 */
function createGridView(json) {
    let grid = new GridView(json);
    grid.createHeader();
    grid.createScoreboard();
    grid.fillScoreboard();
    console.log(grid.NB_KEELS);
    grid.generatePossibilities(grid.playerNameToPlay, grid.frameToPlay, grid.throwToPlay);
    console.log("oui");
}

function getCellType(cellType) {
    switch (cellType) {
        case "first":
            return "_1";//TODO changer en 1,2,3... avec test aussi
        case "second":
            return "_2";
        case "third":
            return "_3";
        case "subtotal":
            return "_4";
        default:
            throw new Error("Invalid cell type");
    }
}

//#region GridView - Scoreboard

class GridView {
    NB_PLAYERS = 0;
    NB_KEELS = 0;
    NB_FRAMES = 0;
    gridview = null;
    players = null;

    //Data needed to send to API
    playerNameToPlay = "";
    frameToPlay = 0;
    throwToPlay = 0;

    constructor(jsonDocument) {
        this.gridview = JSON.parse(jsonDocument);
        console.log( this.gridview)
        this.NB_KEELS = this.gridview['nbKeel'];
        this.players = Object.entries(this.gridview['player']);
        // console.log(this.players);
        // console.log(typeof this.players);
        // console.log(Object.keys(this.players).length);
        this.NB_FRAMES = this.gridview['nbFrame'];
        this.NB_PLAYERS = this.players.length;
        // this.NB_PLAYERS = this.gridview['players'].length;
        // this.NB_FRAMES = this.gridview['players'][0]['frames'].length;
    }

    createHeader() {
        console.log("Generating header");
        let header = document.getElementById("grid-header");
        let nameCell = document.createElement("th");
        nameCell.setAttribute("id", this.   getId(0, 0, CellType.NONE));
        nameCell.textContent = "Name";
        header.appendChild(nameCell)
        for (let i = 1; i <= this.NB_FRAMES; i++) {
            let col = document.createElement("th")
            col.textContent = i.toString();
            col.setAttribute("id", this.getId(0, i));
            header.appendChild(col);
        }
        let total = document.createElement("th");
        total.textContent = "Total";
        total.setAttribute("id", this.getId(0, this.NB_FRAMES+1));
        header.appendChild(total);
        return header;
    }

    /**
     * Retourne l'id d'une cellule (sans vérifier si elle existe)
     * @param idRow ligne/joueur
     * @param idCol manche
     * @param cellType type de cellule
     * @returns {string} id de la cellule
     */
    getId(idRow, idCol, cellType = null) {
        if (idRow < 0 || idCol < 0 || idCol > 11) {
            throw new Error(`Invalid id ${idRow}, ${idCol}`);
        }
        if (idCol != this.NB_FRAMES && cellType == CellType.THIRD) {
            throw new Error("No 3rd cell for a frame different than 10");
        }

        const row = "rowP";
        const col = "_col";

        const identifierCol = idCol == 0 ? "name" : idCol == this.NB_FRAMES+1 ? "total" : idCol;

        if (idRow == 0) {
            const rowHeader = "row";
            return rowHeader + idRow + col + identifierCol;
        } else {
            const type = cellType != null && idCol != 0 && idCol != 11 ? getCellType(cellType) : "";
            return row + idRow + col + identifierCol + type;
        }
    }

    createFrameCell(idRow, idCol, cellType) {
        if (cellType == CellType.THIRD && idCol != this.NB_FRAMES) {
            throw new Error("Can't create a third cell for a frame different than 10");
        }
        let innerFrameCell = document.createElement("div");
        innerFrameCell.setAttribute("id", this.getId(idRow, idCol, cellType));
        return innerFrameCell;
    }

    createScoreboard() {
        this.players.forEach(([player,frame], index) => {
            let rowNumber = index+1;
            let row = document.createElement("tr");
            let nameCell = document.createElement("td");
            nameCell.setAttribute("id", this.getId(rowNumber, 0, CellType.NONE));
            let namePlayer = document.createElement("div");
            namePlayer.setAttribute("id", this.getId(rowNumber, 0, CellType.NONE));
            namePlayer.innerHTML = player;
            nameCell.appendChild(namePlayer);
            row.appendChild(nameCell)

            // Gestion de l'affichage du joueur qui doit jouer
            if (frame['isPlaying'] == true) {
                this.playerNameToPlay = player;
                this.frameToPlay = frame['currentFrame'];
                this.throwToPlay = frame['nbThrow'];
                let playerToPlay = document.getElementById("player-id");
                playerToPlay.innerHTML = player;
                let frameToPlay = document.getElementById("frame-id");
                frameToPlay.innerHTML = this.frameToPlay.toString();
                let throwToPlay = document.getElementById("throw-id");
                throwToPlay.innerHTML = this.throwToPlay.toString();
            }

            // Création des cellules de score
            for (let i = 1; i <= this.NB_FRAMES; i++) {
                let cell = document.createElement("td");
                let firstThrowDiv = this.createFrameCell(rowNumber, i, CellType.FIRST);// first throw
                let secondThrowDiv = this.createFrameCell(rowNumber, i, CellType.SECOND);// second throw
                let subTotalDiv = this.createFrameCell(rowNumber, i, CellType.SUB_TOTAL);// sub total
                cell.appendChild(firstThrowDiv);
                cell.appendChild(secondThrowDiv);
                //last frame
                if (i == this.NB_FRAMES) {
                    let centerInput = this.createFrameCell(rowNumber, i, CellType.THIRD);
                    cell.appendChild(centerInput);
                }
                cell.appendChild(subTotalDiv);
                row.appendChild(cell);
            }

            let total = document.createElement("td");
            total.setAttribute("id", this.getId(rowNumber, this.NB_FRAMES+1));
            row.appendChild(total);
            let tbody = document.querySelector("tbody");
            tbody.appendChild(row);
        })
        console.log({playerNameToPlay: this.playerNameToPlay, frameToPlay: this.frameToPlay, throwToPlay: this.throwToPlay})
    }

    /**
     * A partir des données du joueur reçu depuis l'API, remplit le tableau de score
     */
    fillScoreboard() {
        console.log(this.players)
        this.players.forEach(([player,playerData], index) => {
            let rowNumber = index+1;
            console.log(playerData)
            for (let i = 1; i <= this.NB_FRAMES; i++) {
                if (i == this.frameToPlay && this.playerNameToPlay == player && this.throwToPlay == 1) {
                    continue;
                } else {
                    let frame = playerData['frames'][i-1];

                    let firstThrowDiv = document.getElementById(this.getId(rowNumber, i, CellType.FIRST));
                    let secondThrowDiv = document.getElementById(this.getId(rowNumber, i, CellType.SECOND));
                    let subTotalDiv = document.getElementById(this.getId(rowNumber, i, CellType.SUB_TOTAL));
                    let totalDiv = document.getElementById(this.getId(rowNumber, this.NB_FRAMES+1));
                    let firstThrow = frame['c1'];
                    let secondThrow = frame['c2'];
                    let subTotal = frame['score'];
                    //TODO devrait être gérer lorsqu'on détecte que la partie est finie
                    //ex : dans json on a un champ isFinished ==> si oui on affiche le total
                    let total = frame['total'];

                    //TODO afficher / ou X si strike ou spare
                    if (firstThrow != null) {
                        firstThrowDiv.innerHTML = firstThrow;
                    }
                    if (secondThrow != null) {
                        secondThrowDiv.innerHTML = secondThrow;
                    }
                    if (subTotal != null) {
                        subTotalDiv.innerHTML = subTotal;
                    }
                    if (total != null) {//TODO devrait être gérer lorsqu'on détecte que la partie est finie
                        totalDiv.innerHTML = total;
                    }

                    if (i == this.NB_FRAMES) {
                        let centerInput = document.getElementById(this.getId(rowNumber, i, CellType.THIRD));
                        if (frame['c3'] != null) {
                            centerInput.innerHTML = frame['c3'];
                        }
                    }
                }

            }
        })
    }

    /**
     * Genere les boutons permettant d'éviter toute complexité avec l'utilisateur
     * @param playerToPlay quel joueur va jouer
     * @param frame quelle manche de jeu (de 1 à NB_FRAMES maximum)
     * @param nbThrow n° de lancer 1, 2 ou 3 si la dernière manche
     */
    generatePossibilities() {//TODO générer en fonction des coups précédents
        let currentFrame = this.gridview['player'][this.playerNameToPlay]['frames'][this.frameToPlay-1];
        let nbKeelDown = 0;
        if (this.throwToPlay == 2 && currentFrame['c1'] != this.NB_KEELS)
            nbKeelDown = currentFrame['c1'] != null ? currentFrame['c1'] : 0;

        for (let i = 0; i <= this.NB_KEELS - nbKeelDown; i++) {
            let button = document.createElement("button");
            if (this.frameToPlay != this.NB_FRAMES) {
                if (this.throwToPlay == 1 && i == this.NB_KEELS)
                    button.innerHTML = "X";
                else if (this.throwToPlay == 2 && i == this.NB_KEELS - nbKeelDown)// si on a fait un strike au coup 1, on ne rentrera pas dedans car le backed changera le coup à jouer
                    button.innerHTML = "/";
                else
                    button.innerHTML = i.toString();
            } else {
                // console.log("last frame nbthrow " + this.throwToPlay );
                if (this.throwToPlay == 1 && i == this.NB_KEELS)
                    button.innerHTML = "X";
                else if (this.throwToPlay == 2) {
                    // console.log(this.NB_KEELS - currentFrame['c1'])
                    // console.log(i)
                    //dernier coup pas un strike et le nb de quilles tombées est égal au nb de quilles restantes
                    if (currentFrame['c1'] != this.NB_KEELS && i == this.NB_KEELS - currentFrame['c1'])
                        button.innerHTML = "/";
                    else if (currentFrame['c1'] == this.NB_KEELS && i == this.NB_KEELS)
                        button.innerHTML = "X";
                    else
                        button.innerHTML = i.toString();
                }
                else if (this.throwToPlay == 3 && i == this.NB_KEELS)
                    button.innerHTML = "X";
                else
                    button.innerHTML = i.toString();
            }

            button.addEventListener("click", function() {
                console.log("Click on :", i);
                //request aussi
                //reload scoreboard ici en appelant fonction remplissage de score avec le retour api
            });
            let buttonsDiv = document.getElementById("keels");
            buttonsDiv.appendChild(button);
        }
    }
    //genere les bons nombres de boutons
    // 0 1 2 3 4 5
    // si le 1e coup est 5 on a ces possibilités
    //après appuie sur bouton, envoie le coup fait et passe au suivant
    //puis génère les autres boutons pour le prochain lancer (donc de 0 à 10)






}

let jsonOld = `{
    "nbKeel": 10,
    "players": [
        {
            "name": "John Doe",
            "frames": [
                {
                    "score1": 10,
                    "score2": 0,
                    "score3": 0,
                    "total": 10
                },
                {
                    "score1": 10,
                    "score2": 0,
                    "score3": 0,
                    "total": 20
                },
                null,
                null,
                null
            ],
            "totalScore": 20,
            "isPlaying": true
        },
        {
            "name": "Jane Doe",
            "frames": [
                {
                    "score1": 10,
                    "score2": 0,
                    "score3": 0,
                    "total": 10
                },
                {
                    "score1": 10,
                    "score2": 0,
                    "score3": 0,
                    "total": 20
                },
                null,
                null,
                null
            ],
            "totalScore": 20,
            "isPlaying": false
        }
    ]
}`;

let jsonNew = `
{
  "nbKeel":10,
  "nbFrame":3,
  "player":{
    "player1":{
      "frames":[
        {
          "c1":1,
          "c2":3,
          "c3":0,
          "score":4,
          "totalScore":4
        },
        {
          "c1":1,
          "c2":9,
          "c3":0,
          "score":10,
          "totalScore":14
        },
        {
          "c1":10,
          "c2":10,
          "c3":5,
          "score":25,
          "totalScore":39
        }

      ],
      "isPlaying":false,
      "currentFrame":3,
      "nbThrow": 1
    },
    "player2":{
      "frames":[
        {
          "c1":1,
          "c2":3,
          "c3":0,
          "score":4,
          "totalScore":4
        },
        {
          "c1":1,
          "c2":9,
          "c3":0,
          "score":10,
          "totalScore":14
        },
        {
          "c1":10,
          "c2":10,
          "c3":0,
          "score":20,
          "totalScore":14
        }

      ],
      "isPlaying":true,
      "currentFrame":3,
      "nbThrow": 3
    }
  }
}
`
//get data from backend to initialize
console.log("jsonNew")
createGridView(jsonNew);
