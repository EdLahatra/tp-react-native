import { useState, useEffect } from "react";
import { Client } from "../../services/repository/types/List";
import { useDatabase } from "../../context/DatabaseContext";

import { Counts, initialCount } from '../../interfaces/request';

// import { openRealm } from '../../services/repository/RealmService';

const newLine = /\r?\n/;
const defaultFieldDelimiter = ";";

// export interface Counts {
//   articles: number,
//   reglements: number,
//   clients: number,
//   utilisateurs: number,
//   codebarres: number,
//   reglements_verifs: number,
// };

// const initialCount = {
//   articles: 0,
//   reglements: 0,
//   clients: 0,
//   utilisateurs: 0,
//   codebarres: 0,
//   reglements_verifs: 0,
// };

export function useClients() {
  const [lists, setLists] = useState<Client[]>([]);
  const [count, setCount] = useState<Counts>(initialCount);
  const [toObj, setToObj] = useState<Function>(() => {});
  const [flag, setFlag] = useState<boolean>(false);
  const [lastFileDB, setLastFileDB] = useState<string>('');
  const [lineString, setlinesString] = useState<string[]>([]);
  const database = useDatabase();

  useEffect(() => {
    // refreshListOfLists();
    selectCountClients();
    // getInsertLastFileDown();
  }, []);

  async function getInsertLastFileDown() {
    const last = await  database.selectLastInsertFile();
    console.log({ last });
    return last;
  }

  async function insertLastFileDown(name: string, size: number, date: number) {
    return await database.insertLastFileDown(name, size, date);
  }

  async function requestFlagsSychro(fg: boolean) {
    setFlag(fg);
    if(!fg){
      await recursiveSynchro(false, false, () => {});
    }
  }

  async function createClient (newClient: Client) {
    await database.createClient(newClient);
  }

  async function insertTest (data = { nom: 'Honda', prenom: 'RSX' }) {
    // await realm?.create();
    // realm?.write(() => {
    //   realm.create('Test', { nom: 'Honda', prenom: 'RSX' });
    // });
  }

  async function synchroDown(data: any, cb: Function) {
    // const { dataString, trasfomToObj } = data;
    // const lines = dataString.split(newLine);
    // console.timeEnd('warmup');
    // const nb = lines.length;
    // // realm?.write(() => {
    //   lines.map((line: string, key: number) => {
    //     let currentLine = line.split(defaultFieldDelimiter);
    //     let toObject = trasfomToObj(currentLine);
    //     if(toObject && toObject.requete) {
    //       const { requete, values } = toObject;
    //       // await db.executeSql(requete, values);
    //     }
        
    //     // const obj = { nom: currentLine[0], prenom: currentLine[1] || currentLine[2] }
    //     // let test = 'Objects ======> ' + key + '/' + nb;
    //     // console.time(test);
    //     // // realm.create('Test', { nom: 'Honda', prenom: 'RSX' });
    //     // realm.create('Test', obj);
    //   });
    // });
    console.timeEnd('warmup ::::>')
    
    // await database.synchroDown(data, cb);
    // const { dataString, trasfomToObj } = data;
    // const lines = dataString.split(newLine);
    // lines.slice(0, 50).map(async (line: string, key: number) => {
    //   let currentLine = line.split(defaultFieldDelimiter);
    //   let toObject = trasfomToObj(currentLine);
    //   if(toObject && toObject.requete) {
    //     const { requete, values } = toObject;
    //     const insertOne = await database.insertSynchroOneToOne(requete, values);
    //     console.log({ insertOne, key });
    //   }
    // })

    const { dataString, trasfomToObj } = data;
    const lines = dataString.split(newLine);
    // lines.slice(0, 50).map(async (line: string, key: number) => {
      
    // })
    // let currentLine = lines[0].split(defaultFieldDelimiter);
    // let toObject = trasfomToObj(currentLine);
    // if(toObject && toObject.requete) {
    //   const { requete, values } = toObject;
    //   const insertOne = await database.insertSynchroOneToOne(requete, values);
    //   console.log({ insertOne });
    // }
    await setlinesString(lines);
    await setToObj(trasfomToObj);
    await recursiveSynchro(lines, trasfomToObj, cb);
  }

  async function insertSynchroOneToOne(reqSQL: string, values: string[]) {
    const insertOne = await database.insertSynchroOneToOne(reqSQL, values);
    return insertOne;
  }

  async function recursiveSynchro(a: any, b: any, cb: Function) {
    let lineS = lineString;
    let transfObject = toObj;
    if(a && b){
      lineS = a;
      transfObject = b;
    }
    if(!lineS || lineS.length === 0){
      return;
    }
    console.log({ lineS });
    let currentLine = lineS[0].split(defaultFieldDelimiter);
    console.log({ currentLine });
    let toObject = transfObject(currentLine);
    if(toObject && toObject.requete) {
      const { requete, values } = toObject;
      const insertOne = await database.insertSynchroOneToOne(requete, values);
      console.log({ insertOne });
    }
    const nextSynchro = lineS.splice(0);
    await setlinesString(nextSynchro);
    if(!flag && nextSynchro && nextSynchro.length > 0){
      console.log('nextSynchro ===================>', nextSynchro.length)
      await recursiveSynchro(false, false, cb);
    }
  }

  async function synchroClients (dataString: string, cb: Function) {
    await database.synchroClients(dataString, cb);
  }

  function refreshListOfLists() {
    // Query all lists from the DB, then store them as state
    return database.getAllClients().then(setLists);
  }

  async function selectCountClients() {
    // Query all lists from the DB, then store them as state
    return database.selectCountClients().then(setCount);
    // const tes = await realm?.objects('Test');
    // let array = Array.from(tes || []);
    // console.log({ array });
  }

  return {
    count,
    lists,
    lastFileDB,
    createClient,
    synchroClients,
    selectCountClients,
    synchroDown,
    insertTest,
    requestFlagsSychro,
    recursiveSynchro,
    insertSynchroOneToOne,
    insertLastFileDown,
    getInsertLastFileDown,
  };
}
