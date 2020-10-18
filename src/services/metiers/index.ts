import { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';

const newLine = /\r?\n/;
const defaultFieldDelimiter = ';';

export function useMetiersApp() {
  const [counts, setCounts] = useState<{
    count: any;
    table: string;
  }[]>([]);
  const [toObj, setToObj] = useState<Function>(() => {});
  const [flag, setFlag] = useState<boolean>(false);
  const [lastFileName, setLastFileName] = useState<string>('');
  const [linesInsert, setLinesInsert] = useState<number>(0);
  const [lineString, setlinesString] = useState<string[]>([]);
  const database = useDatabase();

  useEffect(() => {
    // refreshListOfLists();
    selectCounts();
    getInsertLastFileDown();
  }, []);

  async function getInsertLastFileDown() {
    const last = await  database.selectLastInsertFile();
    setLastFileName(last)
    console.log({ last });
    return last;
  }

  async function insertLastFileDown(name: string, size: number, date: number) {
    setLastFileName(name)
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
    setLinesInsert(nextSynchro.length);
    if(!flag && nextSynchro && nextSynchro.length > 0){
      // console.log('nextSynchro ===================>', nextSynchro.length);
      await recursiveSynchro(false, false, cb);
    }
  }

  async function synchroClients (dataString: string, cb: Function) {
    await database.synchroClients(dataString, cb);
  }

  async function selectCounts() {
    return database.selectCounts().then(setCounts);
  }

  async function ouverturesCaisseMetiers() {
    return [];
  }

  return {
    linesInsert,
    counts,
    lastFileName,
    synchroClients,
    selectCounts,
    synchroDown,
    requestFlagsSychro,
    recursiveSynchro,
    insertSynchroOneToOne,
    insertLastFileDown,
    getInsertLastFileDown,
    ouverturesCaisseMetiers,
  };
}
