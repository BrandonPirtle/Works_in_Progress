#include <stdio.h>
#include <stdlib.h>

#include <sqlite3.h>

static int callback (void *NotUsed, int argc, char **argv, char **azColName){
	for(int i = 0; i < argc; i++){
		printf("%s = %s\n", azColName[i], argv[i] ? argv[i] : "NULL");
	}
	printf("\n");
	return 0;
}

int main (int argc, char const **argv) {
	sqlite3 *db;
	char *zErrMsg = 0;
	int  rc;
	char *sql;

	/* Open database */
	rc = sqlite3_open("game.db", &db);
	if (rc) {
		fprintf(stderr, "Cannot open database: %s\n", sqlite3_errmsg(db));
		exit(0);
	} else {
		fprintf(stdout, "Opened database successfully\n");
	}

	/* Create SQL statement */
	sql = "CREATE TABLE EQUIPMENT(" \
		  "ID INTEGER PRIMARY KEY ASC NOT NULL," \
		  "NAME              TEXT     NOT NULL," \
		  "TYPE              TEXT     NOT NULL," \
		  "BUYCOST        INTEGER DEFAULT NULL," \
		  "SELLCOST       INTEGER DEFAULT NULL," \
		  "HP             INTEGER DEFAULT    0," \
		  "STR            INTEGER DEFAULT    0," \
		  "DEF            INTEGER DEFAULT    0," \
		  "ACC            INTEGER DEFAULT    0," \
		  "SPD            INTEGER DEFAULT    0);";

	/* Execute SQL statement */
	rc = sqlite3_exec(db, sql, callback, 0, &zErrMsg);
	if (rc != SQLITE_OK) {
		fprintf(stderr, "SQL error: %s\n", zErrMsg);
		sqlite3_free(zErrMsg);
	} else {
		fprintf(stdout, "Tables created successfully\n");
	}

	/* Close database */
	sqlite3_close(db);
}