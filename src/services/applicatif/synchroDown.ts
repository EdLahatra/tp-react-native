import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import RNFS from 'react-native-fs';

import { synchroOneToOne, getFileToStringOld } from '../utils';
import { useMetiersApp } from '../metiers';
import config from '../../data/config';
import { readStream } from '../../presentations/navigation/RNFetchBlobReadStream';


const newLine = /\r?\n/;
const defaultFieldDelimiter = ';';

let appState: AppStateStatus;

export const checkModulo = (n: number) => n % 51 === 0


export function useAppSynchroDown() {
  // Initialize state
	const [] = useState(false);
	const [lastFile] = useState('');

  const { insertSynchroOneToOne, insertSynchroDownFileCSV, getInsertSynchroDownFileCSV } = useMetiersApp();

  appState = AppState.currentState;

  async function insertData(line: string, transform: any) {
    console.log('insertData insertData =============', line);
    const currentLine = line.split(defaultFieldDelimiter);
    const currentTable = transform(currentLine);
    if (currentTable && currentTable.requete && currentTable.values) {
      const { requete, values } = currentTable;
      console.log('transform ============= insertSynchroOneToOne', values);
      await insertSynchroOneToOne(requete, values);
    }
  }

  async function nextSynchro(path: string, filename: string, size: string) {
    console.log('Next Syncro =======================+>');
    await insertSynchroDownFileCSV(0, filename, size, new Date().getTime(), 0);
    await deleteFile(path);
    await recurciveGetCSVFile(undefined);
  }

  async function deleteFile(path: string) {
    console.log('deleteFile ============= deleteFile', path);
    return await RNFS.unlink(path);
  }

  async function toSynchroInDB(files: any[]) {
    console.log(files);
    if (files && files.length > 0) {
      const sortFile = files.sort((a, b) => a.size - b.size)
      const file = sortFile[0];
      if (file) {
        const { path, transform, size, filename } = file;
        if (size < Number(config.MineFile)) {
          const dataString = await getFileToStringOld(path);
          const res = await parseDataToInsert(dataString.split(newLine), transform);
          console.log(res);
          await nextSynchro(path, filename, size);
        } else {
          const ifstream = await readStream(
            path,
            async (line: string) => await insertData(line, transform),
            async () => await nextSynchro(path, filename, size)
          );
          ifstream.open();
        }
        
        console.log('================================+ FIN ================================+');
      }
      
    }
  }

  async function getLastFile(): Promise<string> {
		const { name } = await getInsertSynchroDownFileCSV();
		let folder = config.last_file; // 20200928_151618_hap 20200131_094745_hap 
		const fld = name && name.split('hap');
		if (fld && fld.length > 0) {
			folder = `${fld[0]}hap`
		}
		return folder;
  }

  async function recurciveGetCSVFile(lastFile: string | undefined) {
    let file = lastFile || await getLastFile();
    const { zip_name, files } = await synchroOneToOne(file);
    if (zip_name === 'no update') {
      return;
    }
    if (files && files.length > 0) {
      await toSynchroInDB(files)
    }
    // await recurciveGetCSVFile(zip_name, oldFile);
  }
  
  async function goToSynchroDownNew(last_file: string | undefined) {
    await recurciveGetCSVFile(last_file);
  }

  async function parseDataToInsert(data: string[], transform: any) {
    const promise = await data.map(async (line) => await insertData(line, transform));
    const res = await Promise.all(promise);
    console.log(res);
  }

  return {
		lastFile,
		// goToSynchroDown,
    getLastFile,
    goToSynchroDownNew,
  };
}
