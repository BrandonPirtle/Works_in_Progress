#include <iostream>
    using std::cout;
    using std::cin;
    using std::endl;
#include <stdio.h>
#include <termios.h>
#include <unistd.h>
#include <string>
	using std::string;
#include <cstdlib>

#include <sqlite3.h>

#include "mygetch.cpp"
#include "character.hpp"

int main (int argc, char const **argv) {

    /* Testing Database */
        sqlite3 *db;
        char *zErrMsg = 0;
        int  rc;
        char *sql;

        /* Open database */
        rc = sqlite3_open("db/game.db", &db);
        if (rc) {
            fprintf(stderr, "Cannot open database: %s\n", sqlite3_errmsg(db));
            exit(0);
        } else {
            fprintf(stdout, "Opened database successfully\n");
        }

    Character hero;
    cout << "Press <CTRL> + C to exit..." << endl << endl;
    while(1) {
        int ch = mygetch();
        if (ch == UP_ARROW) {
            cout << "UP";
        }
        else if (ch == DOWN_ARROW) {
            cout << "DOWN";
        }
        else if (ch == LEFT_ARROW) {
            cout << "LEFT";
        }
        else if (ch == RIGHT_ARROW) {
            cout << "RIGHT";
        }
        else if (ch == ESCAPE) {
            cout << "ESCAPE";
        }
        else if (ch == SPACE_BAR) {
            cout << "SPACE BAR";
        }
        else if (ch == c || ch == C) {
            hero.print_stats();
        }
        else {
            cout << static_cast<char>(ch);
        }
        cout << endl;
    }
    return 0;
}