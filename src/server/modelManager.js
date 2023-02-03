const Grid = require("./models/grid");
const Frame = require('./frame');


var grid;

function createGrid(json)
{
    let nbFrame=json.nbFrame;
    let nbKeel=json.nbKeel;
    let players=json.players;
    grid=new Grid(nbKeel,nbFrame);
    players.forEach(element => {
      grid.addPlayer(element);
    });
    grid.players[players[0]].isPlayin=true;
}

// A modifier pour faire évoluer le joueur en cours et la manche en cours
function updateGrid(namePlayer, frame, element, value)
{
  if(grid.players.get(namePlayer)!=undefined){
    switch (element) {
        case 1:
            grid.players[namePlayer].frames[frame-1].setC1(value);
          break;
        case 2:
            grid.players[namePlayer].frames[frame-1].setC2(value);
            
            break;
        case 3:
            grid.players[namePlayer].frames[frame-1].setC3(value);
            grid.players[namePlayer].currentFrame=grid.players[namePlayer].currentFrame+1;
            grid.players[namePlayer].isPlayin=false;
            break;
    }
      
    grid.calculScoreTotal(namePlayer);

  }
 
}

function getGrid()
{
    return JSON.stringify(grid);
}

