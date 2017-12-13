// Handle keyboard controls
var keys_down = {};
addEventListener("keydown", function (e) {
    keys_down[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    delete keys_down[e.keyCode];
}, false);

// Update game objects
var update = function () {
    if (current_room.loaded == false) {
        load_room_graphics();
    }
    if (13 in keys_down) {
        if (pause_menu_open) {
            character.paused = false;
            pause_menu_open  = false;
        }
        else if (!character.paused) {
            character.paused = true;
            pause_menu_open  = true;
        }
    }
    if (!character.move_ready && !character.paused) {
        // Player holding up
        if (38 in keys_down) {
            character.direction = 'w';
            if (character.row_index != 0) {
                if (current_room.same  [character.row_index-1][character.column_index] == 0 &&
                    current_room.events[character.row_index-1][character.column_index] == 0) {
                    character.row_index -=    1;
                    character.move_ready = true;
                    character.moving     = true;
                }
            }
            else if (character.move_ready == false && character.row_index == 0) {
                if (current_room.world_row_index < world_dimensions.row_size) {
                    current_room.world_row_index += 1;
                    current_room.loaded  = false;
                    pull_room();
                    load_room_graphics();
                    character.row_index  = current_room.under.length-1;
                    character.move_ready = true;
                }
            }
        }
        // Player holding down
        else if (40 in keys_down) {
            character.direction = 's';
            if (character.row_index != current_room.under.length-1) {
                if (current_room.same  [character.row_index+1][character.column_index] == 0 &&
                    current_room.events[character.row_index+1][character.column_index] == 0) {
                    character.row_index +=    1;
                    character.move_ready = true;
                    character.moving     = true;
                }
            }
            else if (character.move_ready == false && character.row_index == current_room.under.length-1) {
                if (current_room.world_row_index > 1) {
                    current_room.world_row_index -= 1;
                    current_room.loaded  = false;
                    pull_room();
                    load_room_graphics();
                    character.row_index  = 0;
                    character.move_ready = true;
                }
            }
        }
        // Player holding left
        else if (37 in keys_down) {
            character.direction = 'a';
            if (character.column_index != 0) {
                if (current_room.same  [character.row_index][character.column_index-1] == 0 &&
                    current_room.events[character.row_index][character.column_index-1] == 0) {
                    character.column_index -=    1;
                    character.move_ready    = true;
                    character.moving        = true;
                }
            }
            else if (character.move_ready == false && character.column_index == 0) {
                if (current_room.world_column_index > 1) {
                    current_room.world_column_index -= 1;
                    current_room.loaded = false;
                    pull_room();
                    load_room_graphics();
                    character.column_index = current_room.under[0].length-1;
                    character.move_ready = true;
                }
            }
        }
        // Player holding right
        else if (39 in keys_down) {
            character.direction = 'd';
            if (character.column_index != current_room.under[0].length-1) {
                if (current_room.same  [character.row_index][character.column_index+1] == 0 && 
                    current_room.events[character.row_index][character.column_index+1] == 0) {
                    character.column_index +=    1;
                    character.move_ready    = true;
                    character.moving        = true;
                }
            }
            else if (character.move_ready == false && character.column_index == current_room.under[0].length-1) {
                if (current_room.world_column_index < world_dimensions.column_size) {
                    current_room.world_column_index += 1;
                    current_room.loaded = false;
                    pull_room();
                    load_room_graphics();
                    character.column_index = 0;
                    character.move_ready = true;
                }
            }
        }
    }
    else { // pause menu is open
             if (38 in keys_down) { // w key
            if (pause_menu_event.cursor_position != 0)
                pause_menu_event.cursor_position--;
        }
        else if (40 in keys_down) { // s key
            if (pause_menu_event.cursor_position != 4)
                pause_menu_event.cursor_position++;
        }
        else if (90 in keys_down) { // z key
            if (pause_menu_event.cursor_position == 4) { // close
                character.paused = false;
                pause_menu_open  = false;
            }
        }
        // enter key handles open or close
    }
    if (90 in keys_down && !pause_menu_open) {
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
        if (current_room.event_text == "") {
            if (current_room.events[temp_row][temp_col] != 0) {
                current_room.event_text = eval("room"+current_room.world_column_index+"x"+current_room.world_row_index+"_event_"+current_room.events[temp_row][temp_col]+".start_text");
                if (current_room.event_text != "") {
                    character.paused = true;
                }
            }
        }
        else {
            current_room.event_text = "";
            character.paused = false;
        }
    }
};