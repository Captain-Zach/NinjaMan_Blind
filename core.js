/*
*This is the core file of our NinjaMan Ice edition. It's called that due to it being a
*some thing from scratch, built with no references.  The hope is to replicate the NinjaMan
*application at the basic level with a better set up for random maps, and pathfinding. 
*/

//core functionality variables, like frame speed
var frameSpeed = 64;
//end of core variables
function start(){
    console.log("start");
    setInterval(main, frameSpeed);
    drawMap();
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
var world = bridger();
function drawMap(){
    var content = " ";
    //content += "<div id = 'wall00' class = 'wall'></div>";
    //document.getElementById('map').innerHTML = content;
    //content += "<div id = '"+mapKey[0]+"00' class = '"+mapKey[0]+"'></div>";
    console.log(content);
    document.getElementById('map').innerHTML = content;
    //block1.forEach(tester());
    for(sectionY = 0; sectionY < world.length; sectionY++ ){
        console.log("section y "+sectionY);
        for(sectionX = 0; sectionX < world[sectionY].length; sectionX++){
            console.log("section x "+sectionX);
            for(blockY = 0; blockY < block1.length; blockY++){
                console.log("blockY "+ blockY);
                for(blockX = 0; blockX < block1[0].length; blockX++){
                    //console.log("Inner Loop, block X "+ blockX);
                    var address = addressMachine(sectionY, sectionX,blockY,blockX);
                    console.log('loc'+address);
                    content += "<div id = 'loc"+address+"' class = '"+mapKey[0]+"' style = \"top: "+(400 * sectionY)+(40 * blockY)+"px; left: "+(400 * sectionX)+(40 * blockX)+"px;\"";

                    document.getElementById('map').innerHTML = content;

                    /*document.getElementById('loc'+address).style.top = (400 * sectionY)+(40 * blockY)+'px';
                    document.getElementById('loc'+address).style.left = (400 * sectionX)+(40 * blockX)+'px';
                    console.log((400 * sectionY)+(40 * blockY)+'px');
                    //document.getElementById('map').innerHTML = content;*/

                }
            }
        }
    }
    console.log(content);
    document.getElementById('map').innerHTML = content;
console.log(world);
}
function addressMachine(secY, secX, blockY,blockX){
   var address = ""+secY+""+secX+""+blockY+""+blockX;
   return(address);
}
function mapGen(){
    
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


    var blockIndex = {
        0 : block1, // A big ole empty block.
        1 : block2 // A big block of sushi!
    }
// BLOCK LIBRARY GLOBAL.//  

//bridger takes blocks from the block library and connects them with short arrays
function bridger(){
    var world = [[block1,block1,block1],
                 [block1,block1,block1]];
    return(world);
                 
}