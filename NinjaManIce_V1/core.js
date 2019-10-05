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
    drawMap();
    console.log(bridger());
    console.log(world);
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

//doesn't do anything yet.  I forgot what we were doing with this.
function tileType(secY, secX, blockY, blockX){
    console.log("type"+world[secY][secX][blockY][blockX]);
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


    /*var blockIndex = {
        0 : block1, // A big ole empty block.
        1 : block2 // A big block of sushi!
    }*/
// BLOCK LIBRARY GLOBAL.//  

//bridger takes blocks from the block library and connects them with short arrays
function bridger(){
    var world = [
        [block1,block2,block1],
        [block1,block1,block1]
    ];
    console.log(world);
    return(world);
                 
}