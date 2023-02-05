const CellType = {
    FIRST: "first",
    SECOND: "second",
    THIRD: "third",
    SUB_TOTAL: "subtotal",
    NONE: ""
}

const BASE_URL = "http://localhost:3000/api";
const GRID_ENDPOINT = BASE_URL + "/grid";
const THROW_ENDPOINT = GRID_ENDPOINT + "/player/frame/";
// POST /api/grid/player/frame/1?p=player1&e=2&v=3 => 3 quille dans le champs 2 de la frame 1 du player1 | renvoie json grid updated

/**
 * Create a new grid from a json
 * @param json
 */
function createGridView(json) {
    let grid = new GridView(json);
    console.log(grid);
    grid.createHeader();
    grid.createScoreboard();
    grid.fillScoreboard();
    // console.log(grid.NB_KEELS);
    grid.generatePossibilities(grid.playerNameToPlay, grid.frameToPlay, grid.throwToPlay);
    // console.log("oui");
}

function updateGridView(json) {
    let grid = new GridView(json);
    grid.fillScoreboard();
    grid.generatePossibilities(grid.playerNameToPlay, grid.frameToPlay, grid.throwToPlay);
}
/**
 * Given a cellType, return the corresponding id value
 * @param cellType cell type
 * @returns {string} return id to display
 */
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
        // console.log( this.gridview)
        this.NB_KEELS = this.gridview['nbKeel'];
        this.players = Object.entries(this.gridview['players']);
        // console.log(this.players);
        // console.log(typeof this.players);
        // console.log(Object.keys(this.players).length);
        this.NB_FRAMES = this.gridview['nbFrame'];
        this.NB_PLAYERS = this.players.length;
        // this.NB_PLAYERS = this.gridview['players'].length;
        // this.NB_FRAMES = this.gridview['players'][0]['frames'].length;
    }

    /**
     * From the data extract from the json, creating the grid header
     */
    createHeader() {
        // console.log("Generating header");
        let header = document.getElementById("grid-header");
        let nameCell = document.createElement("th");
        nameCell.setAttribute("id", this.getId(0, 0, CellType.NONE));
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
    }

    /**
     * Return the id from a cell given the following argument (sans vérifier si elle existe)
     * @param idRow line/player
     * @param idCol nb frame
     * @param cellType CellType
     * @returns {string} id corresponding to the parameters
     */
    getId(idRow, idCol, cellType = null) {
        if (idRow < 0 || idCol < 0 || idCol > this.NB_FRAMES+1) {
            throw new Error(`Invalid id ${idRow}, ${idCol}`);
        }
        if (idCol != this.NB_FRAMES && cellType == CellType.THIRD) {
            throw new Error("No 3rd cell for a frame different than 10");
        }

        const row = "rowP";
        const col = "_col";
        // if idCol is 0, it is the name column, if it's NB_FRAMES+1 : total column, else it's the frame's number
        const identifierCol = idCol == 0 ? "name" : idCol == this.NB_FRAMES+1 ? "total" : idCol;

        if (idRow == 0) {
            const rowHeader = "row";
            return rowHeader + idRow + col + identifierCol;
        } else {
            //retrieve the type in a inner cell (1st throw, 2nd, 3rd or subtotal
            const type = cellType != null && idCol != 0 && idCol != this.NB_FRAMES+1 ? getCellType(cellType) : "";
            return row + idRow + col + identifierCol + type;
        }
    }

    /**
     * Create a score cell (1st throw, 2nd throw, 3rd throw, subtotal ...) given the following parameters
     * @param idRow
     * @param idCol
     * @param cellType
     * @returns {HTMLDivElement}
     */
    createFrameCell(idRow, idCol, cellType) {
        if (cellType == CellType.THIRD && idCol != this.NB_FRAMES) {
            throw new Error("Can't create a third cell for a frame different than 10");
        }
        let innerFrameCell = document.createElement("div");
        innerFrameCell.setAttribute("id", this.getId(idRow, idCol, cellType));
        return innerFrameCell;
    }

    /**
     * Creating the frames for each player
     */
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

            // Management of the display of the player who must play
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

            // create score cells
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
        // console.log({playerNameToPlay: this.playerNameToPlay, frameToPlay: this.frameToPlay, throwToPlay: this.throwToPlay})
    }

    /**
     * From the player's data received from the API, fill in the scoreboard
     */
    fillScoreboard() {
        console.log(this.players)
        this.players.forEach(([player,playerData], index) => {
            let rowNumber = index+1;
            console.log(player + " " + this.NB_FRAMES)
            for (let i = 1; i <= this.NB_FRAMES; i++) {
                if (i == this.frameToPlay && this.playerNameToPlay == player && this.throwToPlay == 1) {
                    continue;
                } else {
                    let frame = playerData['frames'][i-1];
                    // console.log(frame)
                    let firstThrowDiv = document.getElementById(this.getId(rowNumber, i, CellType.FIRST));
                    let secondThrowDiv = document.getElementById(this.getId(rowNumber, i, CellType.SECOND));
                    let subTotalDiv = document.getElementById(this.getId(rowNumber, i, CellType.SUB_TOTAL));
                    let totalDiv = document.getElementById(this.getId(rowNumber, this.NB_FRAMES+1));
                    let firstThrow = frame['c1'];
                    let secondThrow = frame['c2'];
                    let subTotal = frame['score'];
                    //TODO devrait être gérer lorsqu'on détecte que la partie est finie
                    //TODO ex : dans json on a un champ isFinished ==> si oui on affiche le total
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
     * Generate buttons to avoid complexity with the user (error in input...)
     * @param playerToPlay which player is going to play
     * @param frame quelle manche de jeu (de 1 à NB_FRAMES maximum)
     * @param nbThrow throw number 1, 2 or 3 if the last run
     */
    generatePossibilities() {//TODO générer en fonction des coups précédents
        let currentFrame = this.gridview['players'][this.playerNameToPlay]['frames'][this.frameToPlay-1];
        let nbKeelDown = 0;
        if (this.throwToPlay == 2 && currentFrame['c1'] != this.NB_KEELS)
            nbKeelDown = currentFrame['c1'] != null ? currentFrame['c1'] : 0;

        for (let i = 0; i <= this.NB_KEELS - nbKeelDown; i++) {
            let button = document.createElement("button");
            if (this.frameToPlay != this.NB_FRAMES) {
                if (this.throwToPlay == 1 && i == this.NB_KEELS)
                    button.innerHTML = "X";
                else if (this.throwToPlay == 2 && i == this.NB_KEELS - nbKeelDown)// if we made a strike on the first move, we won't go back in because the backing will change the move to be played
                    button.innerHTML = "/";
                else
                    button.innerHTML = i.toString();
            } else {
                // console.log("last frame nbthrow " + this.throwToPlay );
                if (this.throwToPlay == 1 && i == this.NB_KEELS)
                    button.innerHTML = "X";
                else if (this.throwToPlay == 2) {
                    // last shot not a strike and the number of pins dropped is equal to the number of pins remaining
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
            let p = this.playerNameToPlay;
            let t = this.throwToPlay;
            let f = this.frameToPlay;
            button.addEventListener("click", function() {
                // console.log("Click on :", i);
                fetch(THROW_ENDPOINT+`${f}?p=${p}&e=${t}&v=${i}`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3750.0 Iron Safari/537.36'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        console.log("Successfully received updated grid");
                        updateGridView(data);
                    })
                    .catch(error => console.error(error))
            });
            let buttonsDiv = document.getElementById("keels");
            buttonsDiv.appendChild(button);
        }
    }
}


let jsonNew = `
{
  "nbKeel":10,
  "nbFrame":8,
  "players":{
    "player1":{
      "frames":[
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
        },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
        },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
        },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
                },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
                },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
                },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
                },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
                },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
                },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
                },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
        }

      ],
      "isPlaying":true,
      "currentFrame":1,
      "nbThrow": 1
    },
    "player2":{
      "frames":[
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
        },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
        },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
        },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
                },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
                },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
                },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
                },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
                },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
                },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
                },
        {
          "c1":0,
          "c2":0,
          "c3":0,
          "score":0,
          "totalScore":0
        }

      ],
      "isPlaying":false,
      "currentFrame":1,
      "nbThrow": 1
    }
  }
}
`

/**
//  * Send json data to target url
//  * @param {String} url
//  * @param {String} data
//  * @param {String} method
//  * @returns {String} Response JSON
//  */
// async function sendRequest(url, data={}, method) {
//     console.log("sendRequest")
//     const response = await fetch(url, {
//         method: method,
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     });
//     console.log(response.json().then(data => console.log(data)));
//     createGridView(jsonData);
//
//     return response.text();
// }
// let jsonData = sendRequest(GRID_ENDPOINT, {}, 'GET');
/*fetch(GRID_ENDPOINT, {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log("Successfully fetched data")
    })
    .catch(error => console.error(error))*/

// createGridView(jsonData);

//get data from backend to initialize
createGridView(jsonNew);