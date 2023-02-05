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
    let nbFrame=json.nbFrames;
    let nbKeel=json.nbKeel;
    let players=json.players;
    grid=new Grid(nbKeel,nbFrame);
    players.forEach(element => {
      grid.addPlayer(element);
    });
    grid.players.get(players[0]).isPlaying=true;

    module.exports = { grid };

}

/**
 * playingPlayerGestion: set isPlaying at True for the person after the playing passing in parameter
 *
 * @param {string} namePlayer , name of the current player
 * @returns nothing
 */
function playingPlayerGestion(namePlayer){
    const iterator=grid.players.keys();
    let firstIteration;
    let currentIteration;

    for (let index = 0; index < grid.players.size; index++) {
      currentIteration=iterator.next().value;
      if(index==0){
        firstIteration=currentIteration;
      }
      if(currentIteration==namePlayer){
        if(index!=grid.players.size-1){
          let nextIteration=iterator.next().value;
          grid.players.get(nextIteration).isPlaying=true;
          grid.players.get(nextIteration).nbThrow=1;
          break;
        }else{
          let nextIteration=firstIteration;
          grid.players.get(nextIteration).isPlaying=true;
          grid.players.get(nextIteration).nbThrow=1;
          break;
        }

      }

    }


    if(currentIteration!=namePlayer){//Player not found
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
                grid.players.get(namePlayer).nbThrow=grid.players.get(namePlayer).nbThrow+1;

              }else{
                grid.players.get(namePlayer).currentFrame=grid.players.get(namePlayer).currentFrame+1;
                grid.players.get(namePlayer).isPlaying=false;
                grid.players.get(namePlayer).nbThrow=1;
                playingPlayerGestion(namePlayer);

              }
            }else{
              grid.players.get(namePlayer).nbThrow=grid.players.get(namePlayer).nbThrow+1;
            }

          break;
        case 2:
            grid.players.get(namePlayer).frames[indexFrame].setC2(value);
            let throw1=grid.players.get(namePlayer).frames[indexFrame].getC1();
            let nbKeel=grid.nbKeel;
            if(frame==grid.nbFrame && (throw1==nbKeel || throw1+value==nbKeel)) // Last frame and (strike in the first throw or a spare)
            {
              grid.players.get(namePlayer).nbThrow=grid.players.get(namePlayer).nbThrow+1; // the third throw
            }else{
              grid.players.get(namePlayer).currentFrame=grid.players.get(namePlayer).currentFrame+1;
              grid.players.get(namePlayer).isPlaying=false;
              grid.players.get(namePlayer).nbThrow=1;
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
{   let json="{";
    let proprieties=Object.keys(grid);
    proprieties.forEach(element => {
      if(element!="players"){
        json=json+"\""+element+"\":"+grid[element]+",";
      }else{
        json=json+"\"player\":{";
        const iterator=grid.players.keys();
        for (let index = 0; index < grid.players.size; index++) {
          let key=iterator.next().value;
          if(index!=0){
            json=json+",";
          }
          json=json+"\""+key+"\":"+JSON.stringify(grid.players.get(key));

        }
        json=json+"},";
      }


    });
    json = json.slice(0,-1);
    json=json+"}";

    return json;
}

//#endregion Grid

module.exports = { createGrid, updateGrid, getGrid, playingPlayerGestion };