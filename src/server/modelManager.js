const Grid = require("./models/grid");
const Frame = require('./frame');


var grid;

function createGrid(json)
{
    grid=new Grid(json.nbKeel,json.nbFrame);
    for (let i = 0; i < json.players.length; i++) {
        grid.addPlayer(json.players[i]);
        
    }
}

function updateGrid(namePlayer, frame, element, value)
{
  if(grid.players.get(namePlayer)!=undefined){
    switch (element) {
        case 1:
            grid.players[namePlayer][frame-1].setC1(value);
          break;
        case 2:
            grid.players[namePlayer][frame-1].setC2(value);
            break;
        case 3:
            grid.players[namePlayer][frame-1].setC3(value);
            break;
      }
      
  }
  grid.calculScoreTotal(namePlayer);
}

function getGrid()
{
    return JSON.stringify(grid);
}

