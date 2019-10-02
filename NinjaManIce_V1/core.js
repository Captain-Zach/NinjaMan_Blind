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

function drawMap(){
    var content = " ";
    content += "<div id = 'wall00' class = 'wall'></div>";
    console.log(content);
    document.getElementById('map').innerHTML = content;
    //console.log(document.getElementById('map').innerHTML);
}
function mapGen(){
    
}

//bridger takes blocks from the block library and connects them with short arrays
function bridger(){
    var world = [[blockIndex[0],blockIndex[0],blockIndex[0]],
                 [blockIndex[0],blockIndex[0],blockIndex[0]]];
                 
}

//block library holds predefined map blocks and can be called upon to plop them out.
function blockLibrary(){

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
}

