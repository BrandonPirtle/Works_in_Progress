// Create the canvas (some attributes set within styles.css)
var canvas    = document.createElement("canvas");
var context   = canvas.getContext("2d");
// Canvas will be considered to be squares of 32x32
canvas.width  = 640; // 20 squares long (columns)
canvas.height = 480; // 15 squares tall (rows)
document.body.appendChild(canvas);

// 0 is walk on
// 1 is not walk on
// 640x480px (20x15 grid)
var room = [ [1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,1,1,1,1],
             [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
             [1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,0,0,1,1,0],
             [1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0],
             [1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,0,1],
             [1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
             [1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
             [1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
             [1,1,1,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
             [1,1, 1,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1],
             [1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,0,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0],
             [1,1,1,1,0,0,0,1,0,1,1,0,1,1,0,0,0,0,0,0] ];

// Divide map layers into 3
// Under   character matrix
// Same as character matrix
// Above   character matrix
// Event matrix for each room
    // (this handles people, chests, doors, etc.)
    // (this could perhaps use characters as keys so rooms can hold more events?)
    // (it would probably also be best to draw this right before or right after the same as character matrix)
// As for the panning transition when going room to room, should adjacents rooms be drawn beforehand?
    // (perhaps if all images were loaded beforehand at game load up, the rooms would load faster if they were loaded on the fly)
// Function can be made that handles ALL images being loaded into the system
    // (should not return until all 'readies' have returned true)
    // (call it at new/load game)
// All menu layers will obviously have to be drawn last, so they will be the top layer
// Time intervals for main game loop may have to be return unless a better idea happens for animations and their frames
// Drawing order:
    // Background image (black more than likely)
    // Under matrix
    // Same  matrix
    // Event matrix
    // Character
    // Above matrix
    // Menu layers

// Background image
var background_image = new Image();
var background_image_ready = false;
background_image.onload = function () {
    background_image_ready =  true; };
background_image.src = "images/background.png";

// Map image
var map_image = new Image();
var map_image_ready = false;
map_image.onload = function () {
    map_image_ready = true; };
map_image.src = "images/map.png";

// Character image (possibly for future walking animation?)
var character_image = new Image();
var character_image_ready = false;
character_image.onload = function () {
    character_image_ready = true; };
character_image.src = "images/character.png";
character_image_number_of_frames = 3;
character_image_current_frame = 0;
character_image_ticks_per_frame = 5
character_image_tick_count = 0

// Character Image Up
var character_image_up = new Image();
var character_image_up_ready = false;
character_image_up.onload = function () {
    character_image_up_ready =  true; };
character_image_up.src = "images/character_up.png";

// Character Image Down
var character_image_down = new Image();
var character_image_down_ready = false;
character_image_down.onload = function () {
    character_image_down_ready =  true; };
character_image_down.src = "images/character_down.png";

// Character Image Left
var character_image_left = new Image();
var character_image_left_ready = false;
character_image_left.onload = function () {
    character_image_left_ready =  true; };
character_image_left.src = "images/character_left.png";

// Character Image Right
var character_image_right = new Image();
var character_image_right_ready = false;
character_image_right.onload = function () {
    character_image_right_ready =  true; };
character_image_right.src = "images/character_right.png";

// Chest Image Closed
var chest_image_closed = new Image();
var chest_image_closed_ready = false;
chest_image_closed.onload = function () {
    chest_image_closed_ready = true; };
chest_image_closed.src = "images/chest_closed.png";

// Chest Image Opened
var chest_image_opened = new Image();
var chest_image_opened_ready = false;
chest_image_opened.onload = function () {
    chest_image_opened_ready = true; };
chest_image_opened.src = "images/chest_opened.png";

var opened = false;

// Game objects
var character = {
    column_index: 0,
    row_index:    0,
    direction:   's',
    move_ready: false,
};

// Handle keyboard controls
var keys_down = {};
addEventListener("keydown", function (e) {
    keys_down[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    delete keys_down[e.keyCode];
}, false);

// Reset the game
var reset = function () {
    // Resets character back to default position for level
    character.column_index = 10;
    character.row_index    =  7;
};

// Update game objects
var update = function () {
    if (!character.move_ready) {
        // Player holding up
        if (38 in keys_down) {
            character.direction  = 'w';
            if (room[character.row_index-1][character.column_index] != 1) {
                character.row_index -=    1;
                character.move_ready = true;
            }
        }
        // Player holding down
        else if (40 in keys_down) {
            character.direction  = 's';
            if (room[character.row_index+1][character.column_index] != 1) {
                character.row_index +=   1;
                character.move_ready = true;
            }
        }
        // Player holding left
        else if (37 in keys_down) {
            character.direction     = 'a';
            if (room[character.row_index][character.column_index-1] != 1) {
                character.column_index -=   1;
                character.move_ready = true;
            }
        }
        // Player holding right
        else if (39 in keys_down) {
            character.direction     = 'd';
            if (room[character.row_index][character.column_index+1] != 1) {
                character.column_index +=   1;
                character.move_ready = true;
            }
        }
        if (13 in keys_down) {
            temp_col = character.column_index;
            temp_row = character.row_index;
            if (character.direction == 'w') {
                temp_row -= 1;
            }
            else if (character.direction == 's') {
                temp_row += 1;
            }
            else if (character.direction == 'a') {
                temp_col -= 1;
            }
            else if (character.direction == 'd') {
                temp_col += 1;
            }
            if (temp_col == 2 && temp_row == 9) {
                if ((character.row_index > temp_row && character.direction == 'w') ||
                     character.column_index > temp_col && character.direction == 'a') {
                    opened = true;
                }
            }
        }
    }
};

// Draw images
var render = function () {
    // Draw background image
    if (background_image_ready) {
        context.drawImage(background_image, 0, 0);
    }
    // Translate the game grid based upon character movement waiting to be rastered to screen
    if (character.move_ready) {
             if (character.direction == 'w') {
            context.translate(0, 32);
        }
        else if (character.direction == 's') {
            context.translate(0, -32);
        }
        else if (character.direction == 'a') {
            context.translate(32, 0);
        }
        else if (character.direction == 'd') {
            context.translate(-32, 0);
        }
        character.move_ready = false;
    }
    // Draw map image
    if (map_image_ready) {
        context.drawImage(map_image, 0, 0);
    }
         if (chest_image_closed_ready && !opened) {
        context.drawImage(chest_image_closed, 2*32, 9*32);
    }
    else if (chest_image_opened_ready && opened) {
        context.drawImage(chest_image_opened, 2*32, 9*32);
    }
    // Draw character based on direction
         if (character_image_up_ready    && character.direction == 'w') {
        context.drawImage(character_image_up,    character.column_index*32, character.row_index*32);
    }
    else if (character_image_down_ready  && character.direction == 's') {
        context.drawImage(character_image_down,  character.column_index*32, character.row_index*32);
    }
    else if (character_image_left_ready  && character.direction == 'a') {
        context.drawImage(character_image_left,  character.column_index*32, character.row_index*32);
    }
    else if (character_image_right_ready && character.direction == 'd') {
        context.drawImage(character_image_right, character.column_index*32, character.row_index*32);
    }
    // // Set format of display font
    // context.fillStyle    = "rgb(250, 250, 250)";
    // context.font         = "24px Helvetica";
    // context.textAlign    = "left";
    // context.textBaseline = "top";
    // // Display score to screen
    // context.fillText("Score: " + score, 464, 16);
};

// Main game loop
var main = function () {
    setInterval(
        function () {
            update();
            render();
        }, 150
    );
};

// Play game
reset();
main();