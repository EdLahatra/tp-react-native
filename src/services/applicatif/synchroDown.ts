import { useState } from 'react';
import RNFS from 'react-native-fs';

import { AppState, AppStateStatus } from 'react-native';

import { synchroOneToOne, getFileToStringOld, lastSynchroFile, checkSynchroDown } from '../utils';

import { useMetiersApp } from '../metiers';

import { store } from '../redux/store';
import config from '../../data/config';
import { readStream } from '../../presentations/navigation/RNFetchBlobReadStream';

const system = store.getState().system;

// const CryptoJS = require("crypto-js");

const newLine = /\r?\n/;
const defaultFieldDelimiter = ';';

let appState: AppStateStatus;

export const checkModulo = (n: number) => n % 51 === 0

export function useAppSynchroDown() {
  // Initialize state
	const [loadingSynchro, setLoadingSynchro] = useState(false);
	const [lastFile, setLastFile] = useState('');

  const { insertSynchroOneToOne, insertSynchroDownFileCSV, getInsertSynchroDownFileCSV } = useMetiersApp();

  appState = AppState.currentState;

  async function goToSynchroDown(last_file: string | undefined) {
		// console.log('App is now running in the foreground!', loadingSynchro);
		if(loadingSynchro) {
			return;
    }
    console.log({ system });
    const {
      code_mag, numero_caisse, cle_serveur
    } = system?.params;
    const check = await checkSynchroDown(code_mag, numero_caisse, cle_serveur);
    console.log({ check });
    if(check && check.data === 'yes') {
      setLoadingSynchro(true);
      const file = await getInsertSynchroDownFileCSV();
      const { name, numero_line, fin } = file;
      let folder = config.last_file;
      const fld = name && name.split('hap');
      if (fld && fld.length > 1) {
        folder = `${fld[0]}hap`
      }
      if (last_file) {
        folder = last_file;
      }
      if (fin == "0") {
        await checkLastSynchroFile(folder);
      } else {
        await recurciveGetFile(folder, '0');
      }
      setLoadingSynchro(false);
    }
  }

  async function checkLastSynchroFile(folder: string) {
    const { files } = await lastSynchroFile(folder);
		await toSynchroInDB(files || []);
		// await goToSynchroDown(undefined);
  }

  async function insertData(line: string, transform: any) {
    console.log('insertData =============');
    const currentLine = line.split(defaultFieldDelimiter);
    const currentTable = transform(currentLine);
    if (currentTable && currentTable.requete && currentTable.values) {
      const { requete, values } = currentTable;
      console.log('transform ============= insertSynchroOneToOne', values);
      await insertSynchroOneToOne(requete, values);
    }
  }

  async function nextSynchro(path: string, filename: string, size: string) {
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
      const file = files[0];
      console.log("file", file);
      if (file) {
        const { path, transform, size, filename } = file;
        if (size >= 23884570) {
          await nextSynchro(path, filename, size);
        }
        if (size < Number(config.MineFile)) {
          const dataString = await getFileToStringOld(path);
          const res = await parseDataToInsert(dataString.split(newLine), transform);
          await nextSynchro(path, filename, size);
          console.log(res);
        } else {
          const ifstream = await readStream(path);
          ifstream.open();
          ifstream.onData(async (chunk: string) => {
            await insertData(chunk, transform);
            console.log('================================+ chunk chunk ================================+', chunk);
          });

          ifstream.onError((err: any) => {
            console.log('================================+ err err ================================+', err);
          });

          ifstream.onEnd(async () => {
            console.log('================================+ onEnd onEnd ================================+');
            await nextSynchro(path, filename, size);
          });
        }
        
        console.log('================================+ FIN ================================+');
      }
      
    }
  }


  async function recurciveGetFile(lastFile: string, oldFile: string) {
		console.log('===================================================> ', lastFile, oldFile);
		setLastFile(lastFile);
    const { zip_name, files } = await synchroOneToOne(lastFile);
    console.log('===================================================> ', zip_name, files);
    if (files && files.length > 0) {
      await toSynchroInDB(files)
    }
    if (zip_name === 'no update') {
      return;
    }
    await recurciveGetFile(zip_name, oldFile);
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
    if (files && files.length > 0) {
      await toSynchroInDB(files)
    }
    if (zip_name === 'no update') {
      return;
    }
    // await recurciveGetCSVFile(zip_name, oldFile);
  }
  
  async function goToSynchroDownNew(last_file: string | undefined) {
    await recurciveGetCSVFile(last_file);
    // const {
    //   code_mag, numero_caisse, cle_serveur
    // } = system?.params;
    // const check = await checkSynchroDown(code_mag, numero_caisse, cle_serveur);
    // if(check && check.data === 'yes') {
    //   await recurciveGetCSVFile(last_file, last_file);
    // }
  }

  async function parseDataToInsert(data: string[], transform: any) {
    const promise = await data.map(async (line) => await insertData(line, transform));
    const res = await Promise.all(promise);
    console.log(res);
  }

  return {
		lastFile,
		goToSynchroDown,
    getLastFile,
    goToSynchroDownNew,
  };
}
