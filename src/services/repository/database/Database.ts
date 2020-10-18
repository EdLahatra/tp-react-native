import { AppState, AppStateStatus } from "react-native";
import SQLite from "react-native-sqlite-storage";
import RNFS from 'react-native-fs';

import { DatabaseInitialization } from "./DatabaseInitialization";
import { List, Client } from "../types/List";
import { ListItem } from "../types/ListItem";
import { DATABASE } from "./Constants";
import { DropboxDatabaseSync } from "../sync/dropbox/DropboxDatabaseSync";

import Tables from './tables';

const newLine = /\r?\n/;
const defaultFieldDelimiter = ";";

export const createFromLocation = `${RNFS.DocumentDirectoryPath}/mydbfile.sqlite`;

export interface Database {
  // Create
  createList(newListTitle: string): Promise<void>;
  addListItem(text: string, list: List): Promise<void>;
  // Read
  getAllLists(): Promise<List[]>;
  getListItems(list: List, doneItemsLast: boolean): Promise<ListItem[]>;
  // Update
  updateListItem(listItem: ListItem): Promise<void>;
  // Delete
  deleteList(list: List): Promise<void>;

  createClient(ListClient: Client): Promise<void>;

  getAllClients(): Promise<Client[]>;
  synchroClients(dataString: string, cb: Function): Promise<void>;
  synchroDown(data: any, cb: Function): Promise<void>;
  selectCounts(): Promise<{
    count: any;
    table: string;
  }[]>;
  insertSynchroOneToOne(reqSQL: string, values: string[]): Promise<any>;
  insertLastFileDown(name: string, size: number, date: number): Promise<any>;
  selectLastInsertFile(): Promise<string>;
  selectTable(reqSQL: string): Promise<any[]>;
  insertTable(reqSQL: string, values: string[]): Promise<any>;
  updateTable(reqSQL: string, values: string[]): Promise<any>;
  deleteTable(reqSQL: string, values: string[]): Promise<any>;
  selectOneLasteValue(table: string, columns: string[]): Promise<any>;
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;
const databaseSync: DropboxDatabaseSync = new DropboxDatabaseSync();

// Insert a new list into the database
async function createList(newListTitle: string): Promise<void> {
  return getDatabase()
    .then((db) => db.executeSql("INSERT INTO List (title) VALUES (?);", [newListTitle]))
    .then(([results]) => {
      const { insertId } = results;
      console.log(`[db] Added list with title: "${newListTitle}"! InsertId: ${insertId}`);

      // Queue database upload
      return databaseSync.upload();
    });
}

async function createClient(newClient: Client): Promise<void> {
  return getDatabase()
    .then((db) => db.executeSql("INSERT INTO Clients (id_client,nom,prenom,telephone,user_createur,date_creation,date_modification) VALUES (?,?,?,?,?,?,?);", Object.values(newClient)))
    .then(([results]) => {
      const { insertId } = results;
      console.log(`[db] Added list with title: "${newClient}"! InsertId: ${insertId}`);
    });
}

function promiseInsertDB(db: { transaction: (arg0: (tx: { executeSql: (arg0: string, arg1: never[], arg2: (_: any, { rows }: { rows: any; }) => void) => void; }) => void, arg1: null, arg2: null) => void; }, req: string, values: never[]) {
  return new Promise((resolve, reject) => {
    return db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: (_: any, { rows }: { rows: any; }) => void) => void; }) => {
        return tx.executeSql(req, values, (_, { rows }) => {
          setTimeout(() => {}, 50);
          return resolve(rows);
      });
    }, null, null);
  });      
}

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
        console.log({ tx1, results })
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
        console.log({ results });

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
        console.log({ results });

        resolve(results);

      });
    });
  });
}

async function synchroDown(data: any, cb: Function): Promise<any> {
  const { dataString, trasfomToObj } = data;
  const lines = dataString.split(newLine);
  console.log({ lines: lines.length });
  const db = await getDatabase();
  const proms = lines.map(async (line: string) => {
    let currentLine = line.split(defaultFieldDelimiter);
    let toObject = trasfomToObj(currentLine);
    if(toObject && toObject.requete) {
      const { requete, values } = toObject;
      // await db.executeSql(requete, values);
      return promiseInsertDB(db, requete, values);
    }
    return { error: toObject }
  });

  Promise.all(proms)
    .then((res) => {
      console.log({ res });
      cb();
    })
    .catch((e) => {
      console.log({ e });
      cb();
    })
  // await cb();
}

async function synchroClients(dataString: String, cb: Function): Promise<any> {
  const lines = dataString.split(newLine);
  const db = await getDatabase();
  await lines.forEach(async line => {
    let currentLine = line.split(defaultFieldDelimiter);
    if(currentLine[0] && currentLine[2] && currentLine[3] && currentLine[5] && currentLine[6]) {
      let newClient = [
        currentLine[2],
        currentLine[3],
        currentLine[5],
        currentLine[6],
        currentLine[10],
        currentLine[0],
        currentLine[1]
      ];
      await db.executeSql("INSERT INTO Clients (id_client,nom,prenom,telephone,user_createur,date_creation,date_modification) VALUES (?,?,?,?,?,?,?);", newClient);
    }
  });
  await cb();

}

async function selectOneLasteValue(table: string, columns: string[]): Promise<any> {
  const columsValue = columns && columns.length > 0 ? `, ${columns.join(',')}` : '';
  const db = await getDatabase();
  const newC = await db.executeSql(`Select max(id) ${columsValue} from ${table};`, []);
  const file = newC[0].rows.item(0);
  return file;
}

// SELECT * FROM table ORDER BY column DESC LIMIT 1;
async function selectLastInsertFile(): Promise<string> {
  const db = await getDatabase();
  const newC = await db.executeSql("Select max(id), name, date from LastFileDown;", []);
  const file = newC[0].rows.item(0);
  console.log({ file, newC });
  // return newC;
  return file ? file.name : 'no%20file';
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
          count: tbl[0].rows.item(0)["COUNT(*)"],
          table,
        }
      });
      const res = await Promise.all(promiseAll);
      console.log({ res });
      return res;

    })
    .then((countAll) => {
      console.log({ countAll });
      return countAll;
    })
    .catch(k => {
      console.log({ k });
      return [];
    });
}

// Get an array of all the lists in the database
async function getAllClients(): Promise<Client[]> {
  console.log("[db] Fetching lists from the db...");
  return getDatabase()
    .then((db) =>
      // Get all the lists, ordered by newest lists first
      db.executeSql("SELECT * FROM Clients LIMIT 100;"),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const lists: Client[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const { id_client,nom,prenom,telephone,user_createur,date_creation,date_modification } = row;
        console.log(`[db] List title: ${id_client}`);
        lists.push({ id_client,nom,prenom,telephone,user_createur,date_creation,date_modification });
      }
      return lists;
    });
}

// Get an array of all the lists in the database
async function getAllLists(): Promise<List[]> {
  console.log("[db] Fetching lists from the db...");
  return getDatabase()
    .then((db) =>
      // Get all the lists, ordered by newest lists first
      db.executeSql("SELECT list_id as id, title FROM List ORDER BY id DESC;"),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const lists: List[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const { title, id } = row;
        console.log(`[db] List title: ${title}, id: ${id}`);
        lists.push({ id, title });
      }
      return lists;
    });
}

async function insertLastFileDown(name: string, size: number, date: number): Promise<void> {
  console.log(`[db] name, size, date: ${name} ${size} ${date}`);
  return getDatabase()
    .then((db) => db.executeSql("INSERT INTO LastFileDown (name, size, date) VALUES (?,?,?);", [name, size, date]))
    .then(([results]) => {
      console.log(`[db] name, size, date: ${name} ${size} ${date}`);

      // Queue database upload
    });
}

async function addListItem(text: string, list: List): Promise<void> {
  if (list === undefined) {
    return Promise.reject(Error(`Could not add item to undefined list.`));
  }
  return getDatabase()
    .then((db) => db.executeSql("INSERT INTO ListItem (text, list_id) VALUES (?, ?);", [text, list.id]))
    .then(([results]) => {
      console.log(`[db] ListItem with "${text}" created successfully with id: ${results.insertId}`);

      // Queue database upload
      return databaseSync.upload();
    });
}

async function getListItems(list: List, orderByDone = false): Promise<ListItem[]> {
  if (list === undefined) {
    return Promise.resolve([]);
  }
  return getDatabase()
    .then((db) =>
      db.executeSql(
        `SELECT item_id as id, text, done FROM ListItem WHERE list_id = ? ${orderByDone ? "ORDER BY done" : ""};`,
        [list.id],
      ),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const listItems: ListItem[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const { text, done: doneNumber, id } = row;
        const done = doneNumber === 1 ? true : false;

        console.log(`[db] List item text: ${text}, done? ${done} id: ${id}`);
        listItems.push({ id, text, done });
      }
      console.log(`[db] List items for list "${list.title}":`, listItems);
      return listItems;
    });
}

async function updateListItem(listItem: ListItem): Promise<void> {
  const doneNumber = listItem.done ? 1 : 0;
  return getDatabase()
    .then((db) =>
      db.executeSql("UPDATE ListItem SET text = ?, done = ? WHERE item_id = ?;", [
        listItem.text,
        doneNumber,
        listItem.id,
      ]),
    )
    .then(([results]) => {
      console.log(`[db] List item with id: ${listItem.id} updated.`);

      // Queue database upload
      return databaseSync.upload();
    });
}

async function deleteList(list: List): Promise<void> {
  console.log(`[db] Deleting list titled: "${list.title}" with id: ${list.id}`);
  return getDatabase()
    .then((db) => {
      // Delete list items first, then delete the list itself
      return db.executeSql("DELETE FROM ListItem WHERE list_id = ?;", [list.id]).then(() => db);
    })
    .then((db) => db.executeSql("DELETE FROM List WHERE list_id = ?;", [list.id]))
    .then(() => {
      console.log(`[db] Deleted list titled: "${list.title}"!`);

      // Queue database upload
      return databaseSync.upload();
    });
}

// "Private" helpers

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
    console.log("[db] Database is already open: returning the existing instance");
    return databaseInstance;
  }

  // Otherwise, create a new instance
  const db = await SQLite.openDatabase({
    name: DATABASE.FILE_NAME,
    location: 'default',
    // location: "Documents",
    // createFromLocation,
  });
  console.log("[db] Database open!");

  // Perform any database initialization or updates, if needed
  const databaseInitialization = new DatabaseInitialization();
  await databaseInitialization.updateDatabaseTables(db);

  databaseInstance = db;
  return db;
}

// Close the connection to the database
async function close(): Promise<void> {
  if (databaseInstance === undefined) {
    console.log("[db] No need to close DB again - it's already closed");
    return;
  }
  const status = await databaseInstance.close();
  console.log("[db] Database closed.");
  databaseInstance = undefined;
}

// Listen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
let appState = "active";
console.log("[db] Adding listener to handle app state changes");
AppState.addEventListener("change", handleAppStateChange);

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus) {
  if (appState === "active" && nextAppState.match(/inactive|background/)) {
    // App has moved from the foreground into the background (or become inactive)
    console.log("[db] App has gone to the background - closing DB connection.");
    // close();
  }
  appState = nextAppState;
}

// Export the functions which fulfill the Database interface contract
export const sqliteDatabase: Database = {
  createList,
  addListItem,
  getAllLists,
  getListItems,
  updateListItem,
  deleteList,
  createClient,
  getAllClients,
  synchroClients,
  selectCounts,
  synchroDown,
  insertSynchroOneToOne,
  insertLastFileDown,
  selectLastInsertFile,
  selectTable,
  insertTable,
  updateTable,
  deleteTable,
  selectOneLasteValue,
};
