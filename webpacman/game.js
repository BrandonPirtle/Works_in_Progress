/*H**********************************************************************
* FILENAME :    game.js
*
* DESCRIPTION :
*       Game guts
*
* NOTES :
*       Still need to implement ghosts
* 
* AUTHOR :    Brandon Pirtle        START DATE :    27 Aug 15
*                                   EDIT  DATE :    13 Dec 17
*
*H*/

// Create the canvas (some attributes set within styles.css)
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 720;
canvas.height = 480;
document.body.appendChild(canvas);
console.log("Created canvas");

// 0 is wall
// 1 is pellet
// 2 is blank
// 3 is big pellet
// 4 is taken pellet
// 5 is taken large pellet
// 6 is left tunnel
// 7 is right tunnel
// 8 is ghost
// maze is 30 rows by 28 columns
// 242 pellets per level
var maze = [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
             [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
             [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
             [0,3,0,2,2,0,1,0,2,2,2,0,1,0,0,1,0,2,2,2,0,1,0,2,2,0,3,0],
             [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
             [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
             [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
             [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
             [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
             [0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0],
             [2,2,2,2,2,0,1,0,2,2,2,0,2,0,0,2,0,2,2,2,0,1,0,2,2,2,2,2],
             [2,2,2,2,2,0,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,2,2,2,2,2],
             [2,2,2,2,2,0,1,0,0,2,2,2,2,2,8,2,2,2,2,0,0,1,0,2,2,2,2,2],
             [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
             [6,2,2,2,2,2,1,2,2,2,0,2,2,2,2,2,2,0,2,2,2,1,2,2,2,2,2,7],
             [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
             [2,2,2,2,2,0,1,0,0,2,2,2,2,2,2,2,2,2,2,0,0,1,0,2,2,2,2,2],
             [2,2,2,2,2,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,2,2,2,2,2],
             [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
             [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
             [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
             [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
             [0,3,1,1,0,0,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,0,0,1,1,3,0],
             [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
             [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
             [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
             [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
             [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
             [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ];
console.log("Created maze matrix")

// Setting variables for tile dimensions
var canvas_tile_map = new Array(maze[0].length);
for (var i = 0; i < maze[0].length; i++) {
    canvas_tile_map[i] = new Array(maze.length);
    for (var j = 0; j < maze.length; j++) {
        canvas_tile_map[i][j] = new Image();
        if (maze[j][i] === 0) { canvas_tile_map[i][j].src = "images/wall.png"; }
        if (maze[j][i] === 1) { canvas_tile_map[i][j].src = "images/pellet.png"; }
        if (maze[j][i] === 2) { canvas_tile_map[i][j].src = "images/blank.png"; }
        if (maze[j][i] === 3) { canvas_tile_map[i][j].src = "images/large_pellet.png"; }
        if (maze[j][i] === 8) { canvas_tile_map[i][j].src = "images/enemy.png"; }
    }
}
console.log("Populated canvas tile map");

// Background image
var background_image = new Image();
background_image.src = "images/background.png";

// Character Image
var character_image_up = new Image();
character_image_up.src = "images/character_up.png";
var character_image_down = new Image();
character_image_down.src = "images/character_down.png";
var character_image_left = new Image();
character_image_left.src = "images/character_left.png";
var character_image_right = new Image();
character_image_right.src = "images/character_right.png";
var character_direction = 'a';

// Enemy Image
var enemy_image = new Image();
enemy_image.src = "images/enemy.png";

console.log("Loaded images");

// Game objects
var character = {
    column_index: 0,
    row_index:    0,
};
// var enemies = {
//     enemy1_x: 14,
//     enemy1_y: 12,
//     enemy2_x: 0,
//     enemy2_y: 0,
//     enemy3_x: 0,
//     enemy3_y: 0,
//     enemy4_x: 0,
//     enemy5_y: 0
// };
var score = 0;
var lives = 3;
var pellets_per_level = 242;
var pellets_remaining_in_level = 242;
console.log("Created objects");

// Handle keyboard controls
var keys_down = {};
addEventListener("keydown", function (e) {
    keys_down[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    delete keys_down[e.keyCode];
}, false);
console.log("Created keydown event listeners");

// Reset the game
var reset = function() {
    // Resets character back to default position for level
    character.column_index = 14;
    character.row_index    = 22;
    // Resets ghosts back into their default positions for level
    // enemy.x = null
    // enemy.y = null
};
console.log("Created reset function");

// Update game objects
var update = function () {
    // Player holding up
    if (38 in keys_down && maze[character.row_index-1][character.column_index] != 0) {
        character_direction  = 'w';
        character.row_index -=   1;
    }
    // Player holding down
    else if (40 in keys_down && maze[character.row_index+1][character.column_index] != 0) {
        character_direction  = 's';
        character.row_index +=   1;
    }
    // Player holding left
    else if (37 in keys_down && maze[character.row_index][character.column_index-1] != 0) {
        character_direction     = 'a';
        character.column_index -=   1;
    }
    // Player holding right
    else if (39 in keys_down && maze[character.row_index][character.column_index+1] != 0) {
        character_direction     = 'd';
        character.column_index +=   1;
    }

    // Current maze tile is a pellet
    if (maze[character.row_index][character.column_index] == 1) {
        maze[character.row_index][character.column_index] = 4;
        canvas_tile_map[character.column_index][character.row_index].src = "images/blank.png";
        score++;
        pellets_remaining_in_level--;
    }
    // Current maze tile is a large pellet
    else if (maze[character.row_index][character.column_index] == 3) {
        maze[character.row_index][character.column_index] = 5;
        canvas_tile_map[character.column_index][character.row_index].src = "images/blank.png";
        score += 5;
        pellets_remaining_in_level--;
        // Do eat ghost stuff
    }

    // Current maze tile is a ghost
    if (maze[character.row_index][character.column_index] == 8) {
        lives--;
        if (lives != 0) {
            reset();
        }
    }

    // Current maze tile is left tunnel exit
    if (maze[character.row_index][character.column_index] == 6) {
        character.column_index = maze[0].length-2;
    }
    // Current maze tile is right tunnel exit
    else if (maze[character.row_index][character.column_index] == 7) {
        character.column_index = 1;
    }

    // All pellets have been collected or ran out of lives
    if (pellets_remaining_in_level == 0 || lives == 0) {
        pellets_remaining_in_level = pellets_per_level;
        for (var i = 0; i < maze[0].length; i++) {
            for (var j = 0; j < maze.length; j++) {
                // Maze tile was a pellet
                if (maze[j][i] == 4) {
                    maze[j][i] = 1;
                    canvas_tile_map[i][j].src = "images/pellet.png";
                }
                // Maze tile was a large pellet
                if (maze[j][i] == 5) {
                    maze[j][i] = 3;
                    canvas_tile_map[i][j].src = "images/large_pellet.png";
                }
            }
        }
        // If lives are gone
        if (lives == 0) {
            lives = 3;
            score = 0;
            main();
        }
        reset();
    }
    // Character was hit by ghost
    // if (character.column_index <= (enemy.x + 32) &&
    //     character.row_index <= (enemy.y + 32) &&
    //     enemy.x <= (character.column_index + 32) &&
    //     enemy.y <= (character.row_index + 32)) {
    //     score++;
    //     reset();
    // }
};
console.log("Created update function");

// Draw images
var render = function () {
    // Draw background image
    context.drawImage(background_image, 0, 0);
    // Draw 'game board'
    for (var i = 0; i < maze[0].length; i++) {
        for (var j = 0; j < maze.length; j++) {
            context.drawImage(canvas_tile_map[i][j], i*16, j*16);
        }
    }
    // Draw character based on direction
    if (character_direction == 'w') {
        context.drawImage(character_image_up,    character.column_index*16, character.row_index*16);
    }
    else if (character_direction == 's') {
        context.drawImage(character_image_down,  character.column_index*16, character.row_index*16);
    }
    else if (character_direction == 'a') {
        context.drawImage(character_image_left,  character.column_index*16, character.row_index*16);
    }
    else if (character_direction == 'd') {
        context.drawImage(character_image_right, character.column_index*16, character.row_index*16);
    }
    // Draw enemies
    // context.drawImage(enemy_image, enemies.enemy1_x*16, enemies.enemy1_y*16);
    // Set format of display font
    context.fillStyle = "rgb(250, 250, 250)";
    context.font = "24px Helvetica";
    context.textAlign = "left";
    context.textBaseline = "top";
    // Display score to screen
    context.fillText("Score: " + score, 464, 16);
    // Display lives to screen
    context.fillText("Lives:", 464, 440);
    for (var i = 0; i < lives; i++) {
        var temp_image = new Image();
        temp_image.src = "images/character_right.png";
        context.drawImage(temp_image, 540+(i*24), 448);
    }
};
console.log("Created render function");

// Main game loop
var main = function () {
    setInterval(
        function () {
            update();
            render();
        }, 150
    );
};
console.log("Created main function");

// Play game
reset();
console.log("Calling function: main");
main();