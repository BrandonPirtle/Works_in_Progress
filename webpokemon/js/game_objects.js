// Game objects
var character = {
    column_index: 7,
    row_index:    5,
    direction: 's',
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
    under:  null,
    same:   null,
    over:   null,
    events: null,
    loaded: false,
    event_text: ""
};

pause_menu_open = false;