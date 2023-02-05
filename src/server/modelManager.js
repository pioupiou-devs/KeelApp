const Grid = require("./models/grid");
const Frame = require('./models/frame');


var grid;
//#region Grid
function createGrid(json)
{
    console.log(json);
    let nbFrame=json.nbFrame;
    let nbKeel=json.nbKeel;
    let players=json.players;
    console.log(players)
    grid=new Grid(nbKeel,nbFrame);
    players.forEach(element => {
      grid.addPlayer(element);
    });
    grid.players.get(players[0]).isPlaying=true;
    module.exports = { grid };
}

// TODO : A modifier pour faire évoluer le joueur en cours et la manche en cours
function updateGrid(namePlayer, frame, element, value)
{
  let indexFrame=frame-1;
  // console.log(grid)
  //   console.log(namePlayer)
  //   console.log(grid.players.get(namePlayer))
  //   console.log(grid.players.get(namePlayer)!=undefined)
  if(grid.players.get(namePlayer)!=undefined){
    switch (element) {
        case 1:
            grid.players[namePlayer].frames[indexFrame].setC1(value);
            if(value==10){
              if(frame==grid.nbFrame){
                grid.players[namePlayer].throw=grid.players[namePlayer].throw+1;

              }else{
                grid.players[namePlayer].currentFrame=grid.players[namePlayer].currentFrame+1;
                grid.players[namePlayer].isPlaying=false;
                grid.players[namePlayer].throw=1;

              }
            }else{
              grid.players[namePlayer].throw=grid.players[namePlayer].throw+1;
            }

          break;
        case 2:
            grid.players[namePlayer].frames[indexFrame].setC2(value);
            let throw1=grid.players[namePlayer].frames[indexFrame].getC1();
            let nbKeel=grid.nbKeel;
            if(frame==grid.nbFrame && (throw1==nbKeel || throw1+value==nbKeel)) // Last frame and (strike in the first throw or a spare)
            {
              grid.players[namePlayer].throw=grid.players[namePlayer].throw+1; // the third throw
            }else{
              grid.players[namePlayer].currentFrame=grid.players[namePlayer].currentFrame+1;
              grid.players[namePlayer].isPlaying=false;
              grid.players[namePlayer].throw=1;
            }
            break;
        case 3:
            grid.players[namePlayer].frames[indexFrame].setC3(value);
            grid.players[namePlayer].currentFrame=grid.players[namePlayer].currentFrame+1;
            grid.players[namePlayer].isPlaying=false;
            break;
    }

    grid.calculScoreTotal(namePlayer);

    let t=Array.from(grid.players.keys());
    // let t=Object.keys(grid.players);

    let indexPlayer=t.indexOf(namePlayer);
    if(indexPlayer!=-1){
      indexPlayer=(indexPlayer+1)%t.length;
      // grid.players[t[indexPlayer]].isPlaying=true;
      // grid.players[t[indexPlayer]].throw=1;
        grid.players.get(t[indexPlayer]).isPlaying=true;
        grid.players.get(t[indexPlayer]).throw=1;
    }else{
      throw new Error('Player is undefined');
    }

  }else{
    throw new Error('Player is undefined');
  }

}

function stringifyObject(obj) {
    let json = JSON.stringify(obj, function(key, value) {
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
            let transformedArray = [];
            for (let i = 0; i < value.length; i++) {
                transformedArray.push(JSON.stringify(value[i]));
            }
            return '[' + transformedArray.join(',') + ']';
        }
        return value;
    }, 2);
    return json;
}


function getGrid()
{
    // let test = {
    //     "nbKeel" : 10,
    //     "nbFrames" : 10,
    //     "players":
    //         [
    //             "player1",
    //             "player2",
    //             "player3"
    //         ]
    // }
    // grid = createGrid(JSON.stringify(test))
    // console.log(JSON.stringify(grid))
    console.log(grid)
    console.log(grid.players.get("player1"))
    console.log(JSON.stringify(grid.players))
    console.log((grid.players))

    return stringifyObject(grid);
}

//#endregion Grid

module.exports = { createGrid, updateGrid, getGrid };