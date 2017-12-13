#ifndef mygetch_cpp
#define mygetch_cpp

enum Keys {
    RETURN      =  10,      // <Return> is really a '\n' (on Mac/Linux)
    ENTER       =  13,      // Windows style <Enter> is '\r'
    ESCAPE      =  27,      // Escape key character
    SPACE_BAR   =  32,      // Space  key character
    A           =  65,
    B           =  66,
    C           =  67,
    E           =  69,
    I           =  73,
    S           =  83,
    U           =  85,
    GET_READY   =  91,      // After an ESC, this preceeds a named key
    a           =  97,
    b           =  98,
    c           =  99,
    e           = 101,
    i           = 105,
    s           = 115,
    u           = 117,
    UP_ARROW    = 9999965,  // to get out of the way of ASCII and UNICODE
    DOWN_ARROW  = 9999966,  // (highest unicode is 1114111)
    RIGHT_ARROW = 9999967,  // (which is 10ffff in hex)
    LEFT_ARROW  = 9999968
};

int mygetch_helper () {
    struct termios oldt, newt;
    tcgetattr(STDIN_FILENO, &oldt);
    newt = oldt;
    newt.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &newt);
    int ch = getchar();
    tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
    return ch;
}

int mygetch () {
    int ch = mygetch_helper();
    if (ch == ESCAPE)                           // If you see ESCAPE, there might be a named key coming
        if (mygetch_helper() == GET_READY)      // Second code should be GET_READY, followed by a key code
            ch = 9999900 + mygetch_helper();    // Add 9999900 to move out of the way of printable characters
    return ch;
}

#endif