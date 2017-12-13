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
	sql = "INSERT INTO EQUIPMENT (NAME,TYPE,STR) VALUES ('Short Sword','Weapon',3);" \
		  "INSERT INTO EQUIPMENT (NAME,TYPE,STR) VALUES (      'Sword','Weapon',3);";

	/* Execute SQL statement */
	rc = sqlite3_exec(db, sql, callback, 0, &zErrMsg);
	if (rc != SQLITE_OK) {
		fprintf(stderr, "SQL error: %s\n", zErrMsg);
		sqlite3_free(zErrMsg);
	} else {
		fprintf(stdout, "Tables updated successfully\n");
	}

	/* Close database */
	sqlite3_close(db);
}