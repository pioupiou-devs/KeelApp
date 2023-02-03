const Grid = require("./models/grid");
const Frame = require('./models/frame');


var grid;
//#region Grid

/**
* Create Grid: create and initialize a grid object from an Object with the following structure:
* {
*    "nbKeel" : 10,
*    "nbFrames" : 10,
*    "players": 
*    [
*        "player1",
*        "player2",
*        "player3"
*    ]
* }
*
* @param {Object}json, the Object JS 
* @returns Nothing
*/
function createGrid(json)
{
    let nbFrame=json.nbFrame;
    let nbKeel=json.nbKeel;
    let players=json.players;
    grid=new Grid(nbKeel,nbFrame);
    players.forEach(element => {
      grid.addPlayer(element);
    });
    grid.players.get(players[0]).isPlaying=true;
}

/**
 * playingPlayerGestion: set isPlaying at True for the person after the playing passing in parameter
 * 
 * @param {string} namePlayer , name of the current player
 * @returns nothing
 */
function playingPlayerGestion(namePlayer){
   let t=Object.keys(grid.players);
    let indexPlayer=t.indexOf(namePlayer);
    if(indexPlayer!=-1){
      indexPlayer=(indexPlayer+1)%t.length;
      grid.players.get(t[indexPlayer]).isPlaying=true;
      grid.players.get(t[indexPlayer]).throw=1;

    }else{
      throw new Error('Player is undefined');
    }
}

/**
* update Grid : 
*   - udpate frame and scores in the grid after the throw of a player
*   - change the current frame of the player if it is necessary
*   - Increase or reset the number of throws in the current frame of the player
*   - Change the current player if it is necessary
* 
*
* @param {string} namePlayer, the name of the playing player
* @param {int} frame, the number of the current frame of the player between 1 and grid.nbFrame
* @param {int} element, the number of the current throw in the current frame of the player between 1 and 3
* @param {int} value, the number of fallen keels between 0 and grid.nbKeel
* @returns Nothing
*/
function updateGrid(namePlayer, frame, element, value)
{
  let indexFrame=frame-1;
  if(grid.players.get(namePlayer)!=undefined){
    switch (element) {
        case 1:
            grid.players.get(namePlayer).frames[indexFrame].setC1(value);
            if(value==10){
              if(frame==grid.nbFrame){
                grid.players.get(namePlayer).throw=grid.players.get(namePlayer).throw+1;

              }else{
                grid.players.get(namePlayer).currentFrame=grid.players.get(namePlayer).currentFrame+1;
                grid.players.get(namePlayer).isPlaying=false;
                grid.players.get(namePlayer).throw=1;
                playingPlayerGestion(namePlayer);

              }
            }else{
              grid.players.get(namePlayer).throw=grid.players.get(namePlayer).throw+1;
            }

          break;
        case 2:
            grid.players.get(namePlayer).frames[indexFrame].setC2(value);
            let throw1=grid.players.get(namePlayer).frames[indexFrame].getC1();
            let nbKeel=grid.nbKeel;
            if(frame==grid.nbFrame && (throw1==nbKeel || throw1+value==nbKeel)) // Last frame and (strike in the first throw or a spare)
            {
              grid.players.get(namePlayer).throw=grid.players.get(namePlayer).throw+1; // the third throw
            }else{
              grid.players.get(namePlayer).currentFrame=grid.players.get(namePlayer).currentFrame+1;
              grid.players.get(namePlayer).isPlaying=false;
              grid.players.get(namePlayer).throw=1;
              playingPlayerGestion(namePlayer);
            }  
            break;
        case 3:
            grid.players.get(namePlayer).frames[indexFrame].setC3(value);
            grid.players.get(namePlayer).currentFrame=grid.players.get(namePlayer).currentFrame+1;
            grid.players.get(namePlayer).isPlaying=false;
            playingPlayerGestion(namePlayer);
            break;
    }
      
    grid.calculScoreTotal(namePlayer);

  }else{
    throw new Error('Player is undefined');
  }
 
}


/**
 * getGrid: transform the grid (which is a grid object) to a string in a JSON format
 * 
 * @returns a string which contains a JSON object
 */
function getGrid()
{
    return JSON.stringify(grid);
}

//#endregion Grid

module.exports = { createGrid, updateGrid, getGrid };