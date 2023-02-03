const Grid = require("./models/grid");
const Frame = require('./models/frame');


var grid;
//#region Grid
function createGrid(json)
{
    let nbFrame=json.nbFrame;
    let nbKeel=json.nbKeel;
    let players=json.players;
    grid=new Grid(nbKeel,nbFrame);
    players.forEach(element => {
      grid.addPlayer(element);
    });
    grid.players[players[0]].isPlaying=true;
}

// TODO : A modifier pour faire évoluer le joueur en cours et la manche en cours
function updateGrid(namePlayer, frame, element, value)
{
  let indexFrame=frame-1;
  if(grid.players.get(namePlayer)!=undefined){
    switch (element) {
        case 1:
            grid.players[namePlayer].frames[indexFrame].setC1(value);
          break;
        case 2:
            grid.players[namePlayer].frames[indexFrame].setC2(value);

            break;
        case 3:
            grid.players[namePlayer].frames[indexFrame].setC3(value);
            grid.players[namePlayer].currentFrame=grid.players[namePlayer].currentFrame+1;
            grid.players[namePlayer].isPlayin=false;
            break;
    }

    grid.calculScoreTotal(namePlayer);

  }else{
    throw new Error('Player is undefined');
  }

}

function getGrid()
{
    return JSON.stringify(grid);
}

//#endregion Grid

module.exports = { createGrid, updateGrid, getGrid };