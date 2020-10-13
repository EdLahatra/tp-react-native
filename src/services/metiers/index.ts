import { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';

import { Counts, initialCount } from '../../interfaces/request';

const newLine = /\r?\n/;
const defaultFieldDelimiter = ';';

export function useMetiersApp() {
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

  async function synchroDown(data: any, cb: Function) {

    const { dataString, trasfomToObj } = data;
    const lines = dataString.split(newLine);

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
    let currentLine = lineS[0].split(defaultFieldDelimiter);
    // console.log({ currentLine });
    let toObject = transfObject(currentLine);
    if(toObject && toObject.requete) {
      const { requete, values } = toObject;
      await database.insertSynchroOneToOne(requete, values);
      // const insertOne = await database.insertSynchroOneToOne(requete, values);
      // console.log({ insertOne });
    }
    const nextSynchro = lineS.splice(0);

    await setlinesString(nextSynchro);

    if(!flag && nextSynchro && nextSynchro.length > 0){
      // console.log('nextSynchro ===================>', nextSynchro.length);
      await recursiveSynchro(false, false, cb);
    }
  }

  async function synchroClients (dataString: string, cb: Function) {
    await database.synchroClients(dataString, cb);
  }

  async function selectCountClients() {
    return database.selectCountClients().then(setCount);
  }

  return {
    count,
    lastFileDB,
    synchroClients,
    selectCountClients,
    synchroDown,
    requestFlagsSychro,
    recursiveSynchro,
    insertSynchroOneToOne,
    insertLastFileDown,
    getInsertLastFileDown,
  };
}
