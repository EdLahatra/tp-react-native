import { AppState, AppStateStatus } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';

import { DatabaseInitialization } from './DatabaseInitialization';
import { DATABASE } from './Constants';

import Tables from './tables';

export const createFromLocation = `${RNFS.DocumentDirectoryPath}/mydbfile.sqlite`;

export interface Database {
  selectCounts(): Promise<{count: any; table: string;}[]>;
  insertSynchroOneToOne(reqSQL: string, values: string[]): Promise<any>;
  insertSynchroDownFileCSV(lines: number, name: string, size: string, date: number, numero_line: number): Promise<any>;
  updateSynchroDownFileCSV(name: string, fin: number, numero_line: number): Promise<any>;
  selectLastInsertFile(): Promise<{[s: string]: string}>;
  selectTable(reqSQL: string): Promise<any[]>;
  insertTable(reqSQL: string, values: string[]): Promise<any>;
  updateTable(reqSQL: string, values: string[]): Promise<any>;
  deleteTable(reqSQL: string, values: string[]): Promise<any>;
	selectOneLasteValue(table: string, columns: string[], where: string[]): Promise<any>;
	checkFileSynchroDownFileCSV(name: string): Promise<any>;
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;

async function insertSynchroOneToOne(reqSQL: string, values: string[]) {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(reqSQL, values, (tx1, results) => {
        // console.log({ tx1, results })
        resolve(results);
      });
    });
  });
}
// WHERE item_id = 
async function selectTable(sqlRequest: string): Promise<any[]> {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(sqlRequest, [], (tx1, results) => {
        const { rows } = results;
        const data = [];

        for (let i = 0; i < rows.length; i++) {
          data.push({
            ...rows.item(i),
          });
        }
        // console.log({ tx1, results })
        resolve(data);
      });
    });
  });
}

async function insertTable(request: string, values: string[]) {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(request, values, (_tx, results) => {
        if(results && results.insertId) {
          resolve(results.insertId);
        } else {
          reject(0);
        }
      });
    });
  });
}

async function deleteTable(request: string, values: string[]) {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(request, values, (tx, results) => {
        // console.log({ results });

        resolve(results);

      });
    });
  });
}

async function updateTable(request: string, values: string[]) {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(request, values, (tx, results) => {
        // console.log({ results });

        resolve(results);

      });
    });
  });
}

async function selectOneLasteValue(table: string, columns: string[], where: string[]): Promise<any> {
	let WHERE = '';
	if(where && where.length > 1) {
		WHERE = `WHERE ${where[0]} LIKE %${where[1]}%}`;
	}
  const columsValue = columns && columns.length > 0 ? `, ${columns.join(',')}` : '';
  const db = await getDatabase();
  const newC = await db.executeSql(`Select max(id) ${columsValue} from ${table}; `, []);
  const file = newC[0].rows.item(0);
  return file ;
}
// [s: string]: string
async function selectLastInsertFile(): Promise<{[s: string]: string}> {
  const db = await getDatabase();
  const newC = await db.executeSql('Select max(id), lines, name, numero_line, date, fin from SynchroDownFileCSV;', []);
  const file = newC[0].rows.item(0);
  // return newC;
  return file || {};
}

// Get an array of all the lists in the database
async function selectCounts(): Promise<{
  count: any;
  table: string;
}[]> {
  return getDatabase()
    .then(async (db) => {
      const promiseAll = Object.keys(Tables).map(async table => {
        const tbl = await db.executeSql(`SELECT COUNT(*) FROM ${table};`);
        return {
          count: tbl[0].rows.item(0)['COUNT(*)'],
          table,
        }
      });
      const res = await Promise.all(promiseAll);
      return res;

    })
    .then((countAll) => {
      return countAll;
    })
    .catch(k => {
      return [];
    });
}

async function checkFileSynchroDownFileCSV(name: string): Promise<any> {
  const db = await getDatabase();
  const isExist = await db.executeSql(`SELECT * FROM SynchroDownFileCSV WHERE name = '${name}'`, [])
	return isExist[0].rows.item(0);
}

async function insertSynchroDownFileCSV(lines: number, name: string, size: string, date: number, numero_line: number): Promise<any> {
  const db = await getDatabase();
  const isExist = await db.executeSql(`SELECT * FROM SynchroDownFileCSV WHERE lines = ${lines} AND name = '${name}'`, [])
	const res = isExist[0].rows.item(0);
	// res && console.log(res.fin, res.name, res.folder, res.size);
  if(res && (res.fin === 0 || res.fin === 1)) {
    return isExist[0].rows.item(0);
  } else {
		console.log(lines, name, size, date, numero_line)
		await db.executeSql('INSERT INTO SynchroDownFileCSV (lines, name, size, date, numero_line, fin) VALUES (?,?,?,?,?,?);', [lines, name, size, date, numero_line, 0])
  	return {};
	}
}

async function updateSynchroDownFileCSV(name: string, fin: number, numero_line: number): Promise<any> {
	const db = await getDatabase();
	const isExist = await db.executeSql(`SELECT * FROM SynchroDownFileCSV WHERE name = '${name}'`, [])
	const res = isExist[0].rows.item(0);
	// res && console.log(res.fin, res.name, res.folder, res.size, numero_line);
  if(res && res.fin === 1 && fin === 0) {
    return true;
	}
	await db.executeSql(`UPDATE SynchroDownFileCSV SET fin = ${fin}, numero_line = ${numero_line} WHERE name = '${name}'`, [])
	return false;
}

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (databaseInstance !== undefined) {
    return Promise.resolve(databaseInstance);
  }
  // otherwise: open the database first
  return open();
}

// Open a connection to the database
async function open(): Promise<SQLite.SQLiteDatabase> {
  // SQLite.DEBUG(true);
  SQLite.DEBUG(false);
  SQLite.enablePromise(true);


  if (databaseInstance) {
    console.log('[db] Database is already open: returning the existing instance');
    return databaseInstance;
  }

  // Otherwise, create a new instance
  const db = await SQLite.openDatabase({
    name: DATABASE.FILE_NAME,
    location: 'default',
    // location: 'Documents',
    // createFromLocation,
  });
  console.log('[db] Database open!');

  // Perform any database initialization or updates, if needed
  const databaseInitialization = new DatabaseInitialization();
  await databaseInitialization.updateDatabaseTables(db);

  databaseInstance = db;
  return db;
}

// Close the connection to the database
async function close(): Promise<void> {
  if (databaseInstance === undefined) {
    console.log("'[db] No need to close DB again - it's already closed'");
    return;
  }
  const status = await databaseInstance.close();
  console.log('[db] Database closed.', status);
  databaseInstance = undefined;
}

// Listen to app state changes. Close the database when the app is put into the background (or enters the 'inactive' state)
let appState = 'active';
console.log('[db] Adding listener to handle app state changes');
AppState.addEventListener('change', handleAppStateChange);

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus) {
  if (appState === 'active' && nextAppState.match(/inactive|background/)) {
    // App has moved from the foreground into the background (or become inactive)
    console.log('[db] App has gone to the background - closing DB connection.');
    // close();
  }
  appState = nextAppState;
}

// Export the functions which fulfill the Database interface contract
export const sqliteDatabase: Database = {
  selectCounts,
  insertSynchroOneToOne,
  insertSynchroDownFileCSV,
  selectLastInsertFile,
  selectTable,
  insertTable,
  updateTable,
  deleteTable,
  selectOneLasteValue,
	updateSynchroDownFileCSV,
	checkFileSynchroDownFileCSV,
};
