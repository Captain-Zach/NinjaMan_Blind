/*
*This is the core file of our NinjaMan Ice edition. It's called that due to it being a
*some thing from scratch, built with no references.  The hope is to replicate the NinjaMan
*application at the basic level with a better set up for random maps, and pathfinding. 
*/

//core functionality variables, like frame speed
var frameSpeed = 64;
var world; 
//end of core variables
function start(){
    console.log("start");
    setInterval(main, frameSpeed);
    world = bridger();
    mapGen();
    rando();
    //console.log(bridger());
    //console.log(world);
}

//Gameloop that updates every x ms set by framespeed.
function main(){
    //console.log("Main");
}

var mapKey = {
    0 : 'wall',
    1 : 'blank',
    2 : 'sushi',
    3 : 'onigiri'
}

function drawMap(){

}

function mapGen(){
    
    var content = " ";
    document.getElementById('map').innerHTML = content;
    for(sectionY = 0; sectionY < world.length; sectionY++ ){
        for(sectionX = 0; sectionX < world[sectionY].length; sectionX++){
            for(blockY = 0; blockY < block1.length; blockY++){
                for(blockX = 0; blockX < block1[0].length; blockX++){
                    var address = addressMachine(sectionY, sectionX,blockY,blockX);
                    content += "<div id = 'loc"+address+"' class = '"+mapKey[tileType(sectionY,sectionX,blockY,blockX)]+"' style = \"top:"+pixelPlaceY(sectionY,blockY)+"px; "; 
                    content += "left:"+pixelPlaceX(sectionX,blockX)+"px;\"></div>";
                    document.getElementById('map').innerHTML = content;
                }
            }
        }
    }
    console.log(world);
}

// calculates the pixel location for a block to draw, Y axis
function pixelPlaceY(secY, blockY){
    return((400 * secY)+(40 * blockY));
}

// calculates the pixel location for a block to draw, X axis
function pixelPlaceX(secX, blockX){
    return((400 * secX)+(40 * blockX));
}

// creates addresses so that each block can be selected by ID
function addressMachine(secY, secX, blockY,blockX){
   var address = ""+secY+""+secX+""+blockY+""+blockX;
   //This was unneccessary come to find out. The "" sections that is.
   return(address);
}

//returns the tile type for the sake of readability.
function tileType(secY, secX, blockY, blockX){
    //console.log("type"+world[secY][secX][blockY][blockX]);
    return(world[secY][secX][blockY][blockX]);
    
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

    ]

    var blockA = [];
    var blockB = [];
    var blockC = [];
    var blockX = [];
    var blockY = [];
    var blockZ = [];

    /*var blockIndex = {
        0 : block1, // A big ole empty block.
        1 : block2 // A big block of sushi!
    }*/
// BLOCK LIBRARY GLOBAL.//  

//bridger takes blocks from the block library and connects them with short arrays
function bridger(){
    var world = [
        [block2,block2,block1],
        [block1,block1,block1]
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
    blockA[bridgeAB][9] = 1;
    blockA[9][bridgeAX] = 1;
    blockB = reBuilder(world[0][1]);
    blockB[bridgeAB][0] = 1;
    blockB[9][bridgeBY] = 1;
    blockB[bridgeBC][9] = 1;
    blockC = reBuilder(world[0][2]);
    blockC[bridgeBC][0] = 1;
    blockC[9][bridgeCZ] = 1;
    blockX = reBuilder(world[1][0]);
    blockX[bridgeXY][9] = 1;
    blockX[0][bridgeAX] = 1;
    blockY = reBuilder(world[1][1]);
    blockY[bridgeXY][0] = 1;
    blockY[0][bridgeBY] = 1;
    blockY[bridgeYZ][9] = 1;
    blockZ = reBuilder(world[1][2]);
    blockZ[bridgeYZ][0] = 1;
    blockZ[0][bridgeCZ] = 1;


    world = [
        [blockA,blockB,blockC],
        [blockX,blockY,blockZ]
    ];

    //console.log(world);
    return(world);
                 
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