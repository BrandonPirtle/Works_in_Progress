// Game objects
var character = {
    column_index:  7,
    row_index:     5,
    direction:   's',
    move_ready: false,
    paused: false,
    moving: false
};

var world_dimensions = {
    // these dimensions begin at the bottom left, where 1x1 will be the first room
    column_size: 2,
    row_size:    2
};

var current_room = {
    world_column_index: 1,
    world_row_index:    1,
    under:  room1x1_under,
    same:   room1x1_same,
    over:   room1x1_over,
    events: room1x1_event,
    loaded: false,
    event_text: ""
};

pause_menu_open = false;

// As for the panning transition when going room to room, should adjacents rooms be drawn beforehand?
    // (perhaps if all images were loaded beforehand at game load up, the rooms would load faster if they were loaded on the fly)
// Function can be made that handles ALL images being loaded into the system
    // (should not return until all 'readies' have returned true)
    // (call it at new/load game)
// All menu layers will obviously have to be drawn last, so they will be the top layer

// Needed to refresh main game loop for start button
var interval;
function ending_game() {
    window.clearInterval(interval);
}

// Main game loop
// Immediately-Invoked Function Expression (IIFE)
(function () {
    function main() {
        interval = setTimeout(function () {
            window.requestAnimationFrame(main);
            update();
            render();
        }, 150);
    }
    main();
})();

// Is this needed?
// window.requestAnimFrame = (function(){ 
//     return  window.requestAnimationFrame       ||  
//             window.webkitRequestAnimationFrame ||  
//             window.mozRequestAnimationFrame    ||  
//             window.oRequestAnimationFrame      ||  
//             window.msRequestAnimationFrame     ||  
//             function( callback ){ 
//                 window.setTimeout(callback, 1000 / 60); 
//             }; 
// })();