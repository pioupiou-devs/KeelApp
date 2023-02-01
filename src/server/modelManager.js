const Grid = require("./models/grid");

var g;

function createGrid(json)
{
    g=new Grid(json.nbKeel,json.nbFrame);
    for (let i = 0; i < json.players.length; i++) {
        g.addPlayer(json.players[i]);
        
    }
}

