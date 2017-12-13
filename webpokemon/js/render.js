// Should probably be called whenever the character goes to enter into a new room
var load_room_graphics = function () {
    for (var i = 0; i < current_room.under[0].length; i++) {
        for (var j = 0; j < current_room.under.length; j++) {
                 if (current_room.under[j][i] === 0) { canvas_tile_map_under[i][j] = grass1_image; }
        }
    }
    for (var i = 0; i < current_room.same[0].length; i++) {
        for (var j = 0; j < current_room.same.length; j++) {
                 if (current_room.same[j][i] === 0) { canvas_tile_map_same[i][j] = transparent_image; }
            else if (current_room.same[j][i] === 1) { canvas_tile_map_same[i][j] = tree1_part1_image; }
            else if (current_room.same[j][i] === 2) { canvas_tile_map_same[i][j] = tree1_part2_image; }
            else if (current_room.same[j][i] === 3) { canvas_tile_map_same[i][j] = tree1_part3_image; }
            else if (current_room.same[j][i] === 4) { canvas_tile_map_same[i][j] = tree1_part4_image; }
            else if (current_room.same[j][i] === 5) { canvas_tile_map_same[i][j] = tree1_part7_image; }
            else if (current_room.same[j][i] === 6) { canvas_tile_map_same[i][j] = tree1_part8_image; }
            else if (current_room.same[j][i] === 7) { canvas_tile_map_same[i][j] =  sign_metal_image; }
            else if (current_room.same[j][i] === 8) { canvas_tile_map_same[i][j] =  npc1_image_down1; }
        }
    }
    for (var i = 0; i < current_room.over[0].length; i++) {
        for (var j = 0; j < current_room.over.length; j++) {
                 if (current_room.over[j][i] === 0) { canvas_tile_map_over[i][j] = transparent_image; }
            else if (current_room.over[j][i] === 1) { canvas_tile_map_over[i][j] = tree1_part5_image; }
            else if (current_room.over[j][i] === 2) { canvas_tile_map_over[i][j] = tree1_part6_image; }
        }
    }
    for (var i = 0; i < current_room.events[0].length; i++) {
        for (var j = 0; j < current_room.events.length; j++) {
            if (current_room.events[j][i] === 0) {
                canvas_tile_map_event_same[i][j] = transparent_image;
            }
            else {
                var event_image = "room"+current_room.world_column_index+"x"+current_room.world_row_index+"_event_"+current_room.events[j][i]+".image_src";
                if (event_image == "") {
                    canvas_tile_map_event_same[i][j] = transparent_image;
                }
                else {
                    canvas_tile_map_event_same[i][j] = eval(event_image);
                }
            }
        }
    }
    current_room.loaded = true;
};

draw_current_room_ground_layer = function () {
    if (current_room.loaded == true) {
        for (var i = 0; i < current_room.under[0].length; i++) {
            for (var j = 0; j < current_room.under.length; j++) {
                context.drawImage(canvas_tile_map_under[i][j], i*16, j*16);
            }
        }
    }
};

draw_current_room_same_layer = function () {
    if (current_room.loaded == true) {
        for (var i = 0; i < current_room.same[0].length; i++) {
            for (var j = 0; j < current_room.same.length; j++) {
                if (current_room.same[j][i] != 0) {
                    context.drawImage(canvas_tile_map_same[i][j], i*16, j*16);
                }
            }
        }
    }
};

draw_current_room_over_layer = function () {
    if (current_room.loaded == true) {
        for (var i = 0; i < current_room.over[0].length; i++) {
            for (var j = 0; j < current_room.over.length; j++) {
                if (current_room.over[j][i] != 0) {
                    context.drawImage(canvas_tile_map_over[i][j], i*16, j*16);
                }
            }
        }
    }
};

draw_current_room_event_layer = function () {
    if (current_room.loaded == true) {
        for (var i = 0; i < current_room.events[0].length; i++) {
            for (var j = 0; j < current_room.events.length; j++) {
                if (current_room.events[j][i] != 0) {
                    if (eval("room"+current_room.world_column_index+"x"+current_room.world_row_index+"_event_"+current_room.events[j][i]+".npc_id") != 0) {
                        if (current_room.event_text != "") {
                            update_npc_image(eval("room"+current_room.world_column_index+"x"+current_room.world_row_index+"_event_"+current_room.events[j][i]), character.direction, i, j);
                        }
                        context.drawImage(canvas_tile_map_event_same[i][j], i*16, j*16-6);
                    }
                    else {
                        context.drawImage(canvas_tile_map_event_same[i][j], i*16, j*16);
                    }
                }
            }
        }
    }
};

character_animation_refresh = function () {
    draw_current_room_ground_layer();
    draw_current_room_same_layer  ();
    draw_current_room_event_layer ();
    draw_current_room_over_layer  ();
};

var render = function () {
    // Draw background image
    if (background_image_ready) {
        context.drawImage(background_image, 0, 0);
    }
    // Translate the game grid based upon character movement waiting to be rastered to screen
    if (character.move_ready) {
        // Instead of the map panning 1 square per each character movement,
        // the map needs to load up the next room whenever the character reaches
        // the edge of the map and then presses the button again to move, at that point
        // the map will have to do a complete pan from current room to the new current
        // room so that the new current room fills up the viewing screen completely
        //      if (character.direction == 'w') {
        //     context.translate(0, 16);
        // }
        // else if (character.direction == 's') {
        //     context.translate(0, -16);
        // }
        // else if (character.direction == 'a') {
        //     context.translate(16, 0);
        // }
        // else if (character.direction == 'd') {
        //     context.translate(-16, 0);
        // }
        character.move_ready = false;
    }

    draw_current_room_ground_layer();
    draw_current_room_same_layer  ();
    draw_current_room_event_layer ();

    if (character_image_up_ready1 && character.direction == 'w') {
        if (!character.moving) {
            context.drawImage(character_image_up1, character.column_index*16, character.row_index*15-6);
        }
        else {
            context.drawImage(character_image_up2, character.column_index*16, character.row_index*16-6);
            if (current_room.same  [character.row_index-1][character.column_index] == 0 &&
                current_room.events[character.row_index-1][character.column_index] == 0) {
                setTimeout ( function () { character_animation_refresh();
                    context.drawImage(character_image_up3, character.column_index*16, character.row_index*16-12);
                    setTimeout ( function () { character_animation_refresh();
                        context.drawImage(character_image_up1, character.column_index*16, character.row_index*16-17);
                    }, 50);
                }, 50);
            }
            character.moving = false;
        }
    }
    else if (character_image_down_ready1 && character.direction == 's') {
        if (!character.moving) {
            context.drawImage(character_image_down1, character.column_index*16, character.row_index*16-6);
        }
        else {
            context.drawImage(character_image_down2, character.column_index*16, character.row_index*15-6);
            if (current_room.same  [character.row_index+1][character.column_index] == 0 &&
                current_room.events[character.row_index+1][character.column_index] == 0) {
                setTimeout ( function () { character_animation_refresh();
                    context.drawImage(character_image_down3, character.column_index*16, character.row_index*15);
                    setTimeout ( function () { character_animation_refresh();
                        context.drawImage(character_image_down1, character.column_index*16, character.row_index*15+5);
                    }, 50);
                }, 50);
            }
            character.moving = false;
        }
    }
    else if (character_image_left_ready1 && character.direction == 'a') {
        if (!character.moving) {
            context.drawImage(character_image_left1, character.column_index*15, character.row_index*16-6);
        }
        else {
            context.drawImage(character_image_left2, character.column_index*16, character.row_index*16-6);
            if (current_room.same  [character.row_index][character.column_index-1] == 0 &&
                current_room.events[character.row_index][character.column_index-1] == 0) {
                setTimeout ( function () { character_animation_refresh();
                    context.drawImage(character_image_left3, character.column_index*16-6, character.row_index*16-6);
                    setTimeout ( function () { character_animation_refresh();
                        context.drawImage(character_image_left1, character.column_index*16-11, character.row_index*16-6);
                    }, 50);
                }, 50);
            }
            character.moving = false;
        }
    }
    else if (character_image_right_ready1 && character.direction == 'd') {
        if (!character.moving) {
            context.drawImage(character_image_right1, character.column_index*16, character.row_index*16-6);
        }
        else {
            context.drawImage(character_image_right2, character.column_index*15, character.row_index*16-6);
            if (current_room.same  [character.row_index][character.column_index+1] == 0 &&
                current_room.events[character.row_index][character.column_index+1] == 0) {
                setTimeout ( function () { character_animation_refresh();
                    context.drawImage(character_image_right3, character.column_index*15+6, character.row_index*16-6);
                    setTimeout ( function () { character_animation_refresh();
                        context.drawImage(character_image_right1, character.column_index*15+11, character.row_index*16-6);
                    }, 50);
                }, 50);
            }
            character.moving = false;
        }
    }

    draw_current_room_over_layer();

    // Drawing of text box and text
    if (current_room.event_text != "") {
        context.drawImage(text_box_image,0,0);
        context.fillStyle    = "rgb(0, 0, 0)";
        context.font         = "10px sans-serif";
        context.textAlign    = "left";
        context.textBaseline = "top";
        var lines = current_room.event_text.split('\n');
        for (var i = 0; i < lines.length; i++) {
            context.fillText(lines[i], 12, 120+(i*11));
        }
    }

    // Drawing of pause menu and text
    if (pause_menu_open) {
        context.drawImage(pause_menu_image,168, 2);
        context.drawImage(pause_menu_cursor_image, 175, 14+(pause_menu_event.cursor_position*18));
        context.fillStyle    = "rgb(0, 0, 0)";
        context.font         = "10px sans-serif";
        context.textAlign    = "left";
        context.textBaseline = "top";
        var lines = pause_menu_event.populate_text.split('\n');
        for (var i = 0; i < lines.length; i++) {
            context.fillText(lines[i], 183, 14+(i*18));
        }

        // TESTING //
        document.getElementById("bulbasaur_front").className = "video_shown";
    }
    else
        document.getElementById("bulbasaur_front").className = "video_hidden";
};