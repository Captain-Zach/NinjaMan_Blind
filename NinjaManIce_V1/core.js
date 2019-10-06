/*
*This is the core file of our NinjaMan Ice edition. It's called that due to it being a
*some thing from scratch, built with no references.  The hope is to replicate the NinjaMan
*application at the basic level with a better set up for random maps, and pathfinding. 
*/

//core functionality variables, like frame speed
var score = 0;
var frameSpeed = 32;
var world;
var world2D;
var player = {
    xPos : 0,
    yPos : 0,
    lives : 0,
    speed : 2,
    offsetX : 0,
    offsetY : 0,
    direction : "right",
    dBuffer : "right"
}
var pumpky = {
    speed : 2
}
//end of core variables

//Starts the whole thing off, called at the end of body div, in the html file to make sure all requisite divisions 
//available.
function start(){

    console.log("start");
    mapGen();
    ninjaGen();
    setInterval(main, frameSpeed);
}

//Gameloop that updates every x ms set by framespeed.
function main(){
    movePlayer();
    drawPlayer();
    collision();
    
    //console.log("Main");
}

var mapKey = {
    0 : 'wall',
    1 : 'blank',
    2 : 'sushi',
    3 : 'onigiri'
}

// Used on collision with consumable items on the map, only changing when it needs to.
function drawMap(){
    element = document.getElementById('loc'+player.yPos+'_'+player.xPos);
    element.className = "";
    console.log(element);
    

}

// Draws on frame update
function drawPlayer(){

    document.getElementById('ninjaman').style.left = ((40 * player.xPos)+player.offsetX)+'px';
    document.getElementById('ninjaman').style.top = ((40 * player.yPos)+player.offsetY)+'px';


}

//handles things that need to happen only once per  20 frames, aka on offset == 0
function step(){
    drawMap();
    document.getElementById('scoreboard').innerText = "SCORE: "+score;
}

document.onkeydown = function(e){
    console.log(e);
    if (e.keyCode == 39){
        player.dBuffer = "right";
    }
    if (e.keyCode == 40){
        player.dBuffer = "down";
    }
    if (e.keyCode == 37){
        player.dBuffer = "left";
    }
    if (e.keyCode == 38){
        player.dBuffer = "up";
    }
}

//movement is achieved by pointing ninjaman in a direction.  He will move in the selected direction
//until direction is changed, or he hits a wall
function movePlayer(){
    /*console.log("x"+player.xPos);
    console.log("y"+player.yPos);
    console.log("world x = "+world2D[player.yPos][player.xPos])*/

    if (player.direction == "right"){
        if(world2D[player.yPos][player.xPos+1] != 0){
            if (player.offsetX < 38){
                player.offsetX += player.speed;
            } else {
                player.offsetX = 0;
                player.xPos++;
                player.direction = player.dBuffer;
                step();
            }
        } else {
            player.offsetX = 0;
            player.offsetY = 0;
            player.direction = player.dBuffer;
        }
    }

    if (player.direction == "left"){
        if(world2D[player.yPos][player.xPos-1] != 0){
            if (player.offsetX > -38){
                player.offsetX -= player.speed;
            } else {
                player.offsetX = 0;
                player.xPos--;
                player.direction = player.dBuffer;
                step();
            }
        } else {
            player.offsetX = 0;
            player.offsetY = 0;
            player.direction = player.dBuffer;
        }
    }

    if (player.direction == "down"){
        if(world2D[player.yPos+1][player.xPos] != 0){
            if (player.offsetY < 38) {
                player.offsetY += player.speed;
            } else{
                player.offsetY = 0;
                player.yPos++;
                player.direction = player.dBuffer;
                step();

            }
        } else {
            player.offsetX = 0;
            player.offsetY = 0;
            player.direction = player.dBuffer;
        }


    }

    if (player.direction == "up"){
        if(world2D[player.yPos-1][player.xPos] != 0){
            if (player.offsetY > -38) {
                player.offsetY -= player.speed;
            } else{
                player.offsetY = 0;
                player.yPos--;
                player.direction = player.dBuffer;
                step();

            }
        } else {
            player.offsetX = 0;
            player.offsetY = 0;
            player.direction = player.dBuffer;
        }


    }
}

function collision(){
    if(world2D[player.yPos][player.xPos] == 2){
        world2D[player.yPos][player.xPos] = 1;
        score += 10;
    }
    if(world2D[player.yPos][player.xPos] == 3){
        world2D[player.yPos][player.xPos] = 1;
        score += 5;
    }
    //drawMap();
}

//Initial map generation.  global world variable is sent to bridger to be rebuilt into unique blocks,
//then connected through "bridges," which are just holes in the walls of the cells.  
//will later connect them with tunnels.
//mapBuilder takes the bridged world array and turns it into a 2D array, cutting the draw time 
//and generation time down significantly.  coordinate system preserved.
function mapGen(){

    world = bridger();
    world2D = mapBuilder(world);
    var content = " ";
    document.getElementById('map').innerHTML = content;

    for(y = 0; y < world2D.length; y++){
        for(x = 0; x < world2D[y].length; x++){
            content += "<div id = loc"+y+"_"+x+" class = '"+mapKey[world2D[y][x]]+"' style = \" top: "+(y*40)+"px; ";
            content += "left: "+(x*40)+"px;\"></div>";
        }
    }
    document.getElementById('map').innerHTML = content;
}

//creates and places ninjaman in the level, probably always spot 1,1
function ninjaGen(){

    var content = "<div id = 'ninjaman' class = 'ninjaman'></div>"
    document.getElementById('map').innerHTML += content;
    player.xPos = 1; player.yPos = 1;
    player.lives = 3;
    
}

//block library holds predefined map blocks and can be called upon to plop them out.
// BLOCK LIBRARY GLOBAL//

    var block1 = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];

    var block2 = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,0,0,0,0,0,0,0,0,0],

    ];

    var block3 = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,2,2,2,0,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,0,0,0,0],
        [0,2,2,2,2,2,2,2,3,0],
        [0,2,2,2,2,0,0,0,0,0],
        [0,2,2,2,2,0,1,0,3,0],
        [0,2,0,2,2,0,0,0,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,0,0,0,0,0,0,0,0,0],

    ];

    var block4 = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,0,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,0,2,0],
        [0,2,0,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,0,0],
        [0,0,0,0,0,0,0,0,0,0],

    ];

    var block5 = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,0,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,0,2,2,2,2,2,0],
        [0,2,2,2,2,2,0,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,0,0,0,0,0,0,0,0,0],

    ];

    var block6 = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,0,0,0,0,0,1,0],
        [0,2,2,2,2,2,2,0,2,0],
        [0,2,2,2,2,2,2,0,0,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,0,0,0,0,0,0,0,0,0],

    ];

    var block7 = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,2,2,2,2,2,2,2,1,0],
        [0,2,2,2,2,2,2,0,3,0],
        [0,2,2,2,2,2,2,0,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,0,0,0,0,0,0,0,0,0],

    ];

    var block8 = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,2,2,2,2,0,2,2,2,0],
        [0,2,2,2,2,0,2,2,2,0],
        [0,2,2,2,2,0,2,2,2,0],
        [0,2,2,2,2,0,2,2,2,0],
        [0,2,2,2,2,2,2,2,2,0],
        [0,0,0,0,0,0,0,0,0,0],

    ];

    var block9 = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,1,1,0,0,1,0],
        [0,1,0,1,1,1,1,0,1,0],
        [0,1,0,1,1,1,1,0,1,0],
        [0,1,0,1,1,1,1,0,1,0],
        [0,0,0,0,0,0,0,0,0,0],

    ];

    var tunnel1 = [
        [0],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [0]
    ]

    var blockA = [];
    var blockB = [];
    var blockC = [];
    var blockX = [];
    var blockY = [];
    var blockZ = [];

    var blockIndex = {
        1 : block1, // A big ole empty block.
        2 : block2, // A big block of sushi!
        3 : block3,
        4 : block4,
        5 : block5,
        6 : block6,
        7 : block7,
        8 : block8,
        9 : block9
    }
// BLOCK LIBRARY GLOBAL.//  

//bridger takes blocks from the block library and connects them with short arrays
function bridger(){
    var world = [
        [blockIndex[rando()],blockIndex[rando()],blockIndex[rando()]],
        [blockIndex[rando()],blockIndex[9],blockIndex[rando()]]
    ];
    x = rando();
    bridgeAB = rando();
    bridgeBC = rando();
    bridgeAX = rando();
    bridgeBY = rando();
    bridgeCZ = rando();
    bridgeXY = rando();
    bridgeYZ = rando();
    blockA = reBuilder(world[0][0]);
    blockB = reBuilder(world[0][1]);
    blockC = reBuilder(world[0][2]);
    blockX = reBuilder(world[1][0]);
    blockY = reBuilder(world[1][1]);
    blockZ = reBuilder(world[1][2]);



    while(blockA[bridgeAB][9-1]== 0 || blockB[bridgeAB][1] == 0){
        bridgeAB = rando();
    }
    while(blockB[bridgeBC][9-1]== 0 || blockC[bridgeBC][1] == 0){
        bridgeBC = rando();
    }
    while(blockX[bridgeXY][9-1]== 0 || blockY[bridgeXY][1] == 0){
        bridgeXY = rando();
    }
    while(blockY[bridgeYZ][9-1]== 0 || blockZ[bridgeYZ][1] == 0){
        bridgeYZ = rando();
    }
    while(blockB[8][bridgeBY]== 0 || blockY[1][bridgeBY] == 0){
        bridgeBY = rando();
    }
    while(blockA[8][bridgeAX]== 0 || blockX[1][bridgeAX] == 0){
        bridgeAX = rando();
    }
    while(blockC[8][bridgeCZ]== 0 || blockZ[1][bridgeCZ] == 0){
        bridgeCZ = rando();
    }
    

    blockA[1][1] = 1;
    blockA[bridgeAB][9] = 1;
    blockA[9][bridgeAX] = 1;
    blockB[bridgeAB][0] = 1;
    blockB[9][bridgeBY] = 1;
    blockB[bridgeBC][9] = 1;
    blockC[bridgeBC][0] = 1;
    blockC[9][bridgeCZ] = 1;
    blockX[bridgeXY][9] = 1;
    blockX[0][bridgeAX] = 1;
    blockY[bridgeXY][0] = 1;
    blockY[0][bridgeBY] = 1;
    blockY[bridgeYZ][9] = 1;
    blockZ[bridgeYZ][0] = 1;
    blockZ[0][bridgeCZ] = 1;


    world = [
        [blockA,blockB,blockC],
        [blockX,blockY,blockZ]
    ];

    //console.log(world);
    return(world);
                 
}

function mapBuilder(world){
    var row = [];
    var map = [];

    for(x = 0; x < world.length; x++){
        for(y = 0; y < world[x][0].length; y++){
            for (ext = 0; ext < world[x].length; ext++){
                for (point = 0; point < world[x][ext][y].length; point++){
                    row.push(world[x][ext][y][point]);
                    console.log("row #: "+point);
                }
                console.log(row);
            }
            map.push(row);
            row = [];
        }
    }
    console.log(map);
    
    return(map);

}



function rando(){

    var x = Math.random();
    x = x * 10;
    x = Math.round(x);
    while(x == 0 || x == 9 || x == 10){
        var x = Math.random();
        x = x * 10;
        x = Math.round(x);
    }
    console.log(x);
    return(x);
}

//rebuilder adds modified versions of the selected block types
function reBuilder(oldBlock){
    var newBlock = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    for(y = 0; y < oldBlock.length; y ++){
        for(x = 0; x < oldBlock[y].length; x ++){
            newBlock[y][x] = oldBlock[y][x];
        }
    }

    /*newBlock[rando()][9] = 1;
    newBlock[9][rando()] = 1;*/
    return(newBlock);
    
}