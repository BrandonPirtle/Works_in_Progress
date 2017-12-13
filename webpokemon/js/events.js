var pause_menu_event = {
    cursor_position: 0,
    populate_text:   "Dex\nParty\nBag\nOptions\nClose"
};

var room1x2_event_1 = {
    npc_id:     0,
    image_src:  sign_metal_image,
    direction:  '',
    start_text: "This is a sign.\nThis is a very beautiful sign.\nSuch...beauty...pphhfff..."
};

var room2x1_event_1 = {
    npc_id:     1,
    image_src:  npc1_image_down1,
    direction:  's',
    start_text: "I'm just a stupid bug catcher!\nMy Metapod wants to hit you with a Harden!\nIf only it also knew Pound!"
};

update_npc_image = function (event_name, character_direction, i, j) {
    // Update the given event's facing direction
         if (character_direction == 'w') {
        event_name.direction = 's';
    }
    else if (character_direction == 's') {
        event_name.direction = 'w';
    }
    else if (character_direction == 'a') {
        event_name.direction = 'd';
    }
    else if (character_direction == 'd') {
        event_name.direction = 'a';
    }
    // Update the given event's image based on its facing direction
         if (event_name.direction == 'w') {
        event_name.image_src = eval("npc"+event_name.npc_id+"_image_up1");
    }
    else if (event_name.direction == 's') {
        event_name.image_src = eval("npc"+event_name.npc_id+"_image_down1");
    }
    else if (event_name.direction == 'a') {
        event_name.image_src = eval("npc"+event_name.npc_id+"_image_left1");
    }
    else if (event_name.direction == 'd') {
        event_name.image_src = eval("npc"+event_name.npc_id+"_image_right1");
    }
    canvas_tile_map_event_same[i][j] = event_name.image_src;
}