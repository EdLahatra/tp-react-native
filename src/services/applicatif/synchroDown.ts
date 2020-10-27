import { useEffect, useState } from 'react';
import RNFS from 'react-native-fs';

import { AppState, AppStateStatus } from 'react-native';

import { synchroOneToOne, getFileToString, lastSynchroFile } from '../utils';

import { useMetiersApp } from '../metiers';

// const CryptoJS = require("crypto-js");

const newLine = /\r?\n/;
const defaultFieldDelimiter = ';';

let appState: AppStateStatus;

export const checkModulo = (n: number) => n % 51 === 0

export function useAppSynchroDown() {
  // Initialize state
	const [loadingSynchro, setLoadingSynchro] = useState(false);
	const [lastFile, setLastFile] = useState('');

  const { checkFileSynchroDownFileCSV, insertSynchroOneToOne, insertSynchroDownFileCSV, getInsertSynchroDownFileCSV, updateSynchroDownFileCSV } = useMetiersApp();

  appState = AppState.currentState;

  // Set up a callback to fire when AppState changes (when the app goes to/from the background)
  // useEffect(function() {
  //   // The app is currently active, so the 'change' event will not fire and we need to
  //   // call appIsNowRunningInForeground ourselves.
  //   // return testComunication();
  //   appState = 'active';
  //   // Listen for app state changes
  //   // AppState.addEventListener('change', handleAppStateChange);
	// 	// return testComunication();
  //   return function() {
  //     // Cleanup function
  //     // AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);

  // Handle the app going from foreground to background, and vice versa.
  function handleAppStateChange(nextAppState: AppStateStatus) {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // App has moved from the background (or inactive) into the foreground
      testComunication();
		}
		console.log({ appState });
    appState = nextAppState;
	}
	
	function testComunication() {
		console.log(' appState =====>', appState)
	}

	async function getLastFile() {
		const file = await getInsertSynchroDownFileCSV();
		const { name, numero_line, fin } = file;
		let folder = '20200928_151618_hap'; // 20200928_151618_hap 20200131_094745_hap 
		const fld = name && name.split('hap');
		if (fld && fld.length > 0) {
			folder = `${fld[0]}hap`
		}
		return folder;
	}

  async function goToSynchroDown(last_file: string | undefined) {
		// console.log('App is now running in the foreground!', loadingSynchro);
		if(loadingSynchro) {
			return;
		}

    setLoadingSynchro(true);
    const file = await getInsertSynchroDownFileCSV();
		const { name, numero_line, fin } = file;
		let folder = '20200928_151618_hap'; // 20200928_151618_hap 20200131_094745_hap 
		const fld = name && name.split('hap');
		if (fld && fld.length > 0) {
			folder = `${fld[0]}hap`
		}
		if (last_file) {
			folder = last_file;
		}
    if (fin == "0") {
      await checkLastSynchroFile(folder, name, numero_line);
    } else {
			await recurciveGetFile(folder, '0');
		}
    setLoadingSynchro(false);
  }

  async function checkLastSynchroFile(folder: string, name: string, numero_line: string) {
    const { files } = await lastSynchroFile(folder);
		await toSynchroInDB(files || [], folder, Number(numero_line), name);
		await goToSynchroDown(undefined);
  }

  async function toSynchroInDB(files: any[], lastFile: string, numero_line: number, name: string | undefined) {
    const date = Math.ceil(new Date().getTime() / 1000);
    if (files && files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file) {
					const { path, transform, size, filename } = file;
					const check = await checkFileSynchroDownFileCSV(filename);
					if(!check || check.fin !== 1) {
						const fileString = await getFileToString(path);
						let lines = fileString.split(newLine);
						if (name === filename && numero_line > 0) {
							lines = lines.splice(0, numero_line);
						}
						if (check && check.numero_line > 0) {
							lines = lines.splice(0, check.numero_line);
						}
						if (lines && lines.length > 0) {
							const nb_lines = lines.length;
							if (!check || !check.fin) {
								await insertSynchroDownFileCSV(nb_lines, filename, size, date, nb_lines);
							}
							await recurciveInsert(transform, lines, lastFile, filename);
							await updateSynchroDownFileCSV(filename, 1, 0);
						}
					}

          await RNFS.unlink(path);
        }
      }
    }
  }

  async function recurciveInsert(transform: Function, lines: string[], lastFile: string, filename: string) {
    if(!lines || !lines[0]) {
      return;
    }
    const currentLine = lines[0].split(defaultFieldDelimiter);
    const currentTable = transform(currentLine);
    if (currentTable && currentTable.requete && currentTable.values) {
      const { requete, values } = currentTable;
      await insertSynchroOneToOne(requete, values);
    }
    const newLines = lines.splice(1);
    if(newLines) {
      const md = newLines.length;
      if(checkModulo(md)) {
				const updt = await updateSynchroDownFileCSV(filename, 0, md);
				if (updt) {
					return;
				}
			}
			await recurciveInsert(transform, newLines, lastFile, filename);
    }
  }

  async function recurciveGetFile(lastFile: string, oldFile: string) {
		console.log('===================================================> ', lastFile, oldFile);
		setLastFile(lastFile);
    const { zip_name, files } = await synchroOneToOne(lastFile);
    if (files && files.length > 0) {
      await toSynchroInDB(files, lastFile, 0, undefined)
    }
    if (zip_name === 'no update') {
      return;
    }
    await recurciveGetFile(zip_name, oldFile);
  }

  return {
		lastFile,
		goToSynchroDown,
		getLastFile,
  };
}
