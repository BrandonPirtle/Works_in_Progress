// Create the canvas (some attributes set within styles.css)
var canvas    = document.createElement("canvas");
var context   = canvas.getContext("2d");
// Canvas will be considered to be squares of 16x16
canvas.id     = "game_canvas";
canvas.width  = 240; // 15 squares long (columns)
canvas.height = 160; // 10 squares tall (rows)
document.body.appendChild(canvas);

// These will all have the same dimensions
var canvas_tile_map_under      = new Array(current_room.under[0].length);
var canvas_tile_map_same       = new Array(current_room.under[0].length);
var canvas_tile_map_over       = new Array(current_room.under[0].length);
var canvas_tile_map_event_same = new Array(current_room.under[0].length);
var canvas_tile_map_event_over = new Array(current_room.under[0].length);

for (var i = 0; i < current_room.under[0].length; i++) {
    canvas_tile_map_under     [i] = new Array(current_room.under.length);
    canvas_tile_map_same      [i] = new Array(current_room.under.length);
    canvas_tile_map_over      [i] = new Array(current_room.under.length);
    canvas_tile_map_event_same[i] = new Array(current_room.under.length);
    canvas_tile_map_event_over[i] = new Array(current_room.under.length);

    for (var j = 0; j < current_room.under.length; j++) {
        canvas_tile_map_under     [i][j] = new Image();
        canvas_tile_map_same      [i][j] = new Image();
        canvas_tile_map_over      [i][j] = new Image();
        canvas_tile_map_event_same[i][j] = new Image();
        canvas_tile_map_event_over[i][j] = new Image();
    }
}
