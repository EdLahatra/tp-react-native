import { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';

export function useMetiersApp() {
  const [counts, setCounts] = useState<{
    count: any;
    table: string;
  }[]>([]);
  const [lastFileName, setLastFileName] = useState<string>('');
  const [linesInsert, setLinesInsert] = useState<number>(0);
	const database = useDatabase();

  useEffect(() => {
    // refreshListOfLists();
    selectCounts();
    getInsertSynchroDownFileCSV();
	}, []);

  async function getInsertSynchroDownFileCSV() {
    const file = await  database.selectLastInsertFile();
    setLastFileName(file.name || 'no%20file');
    return file;
  }

  async function insertSynchroDownFileCSV(lines: number, name: string, size: string, date: number, numero_line: number) {
    setLastFileName(name);
    return await database.insertSynchroDownFileCSV(lines, name, size, date, numero_line);
	}

	async function checkFileSynchroDownFileCSV(name: string) {
    return await database.checkFileSynchroDownFileCSV(name);
	}

  async function updateSynchroDownFileCSV(name: string, fin: number, numero_line: number) {
    return await database.updateSynchroDownFileCSV(name, fin, numero_line);
  }

  async function insertSynchroOneToOne(reqSQL: string, values: string[]) {
    const insertOne = await database.insertSynchroOneToOne(reqSQL, values);
    return insertOne;
  }

  async function selectCounts() {
    return database.selectCounts().then(setCounts);
  }

  async function ouverturesCaisseMetiers() {
    return [];
  }

  function testValue(nb: number) {
    // console.log('nb <=======>', nb);
    setLinesInsert(nb);
  }

  return {
    testValue,
    linesInsert,
    counts,
    lastFileName,
    selectCounts,
    insertSynchroOneToOne,
    insertSynchroDownFileCSV,
    getInsertSynchroDownFileCSV,
    ouverturesCaisseMetiers,
		updateSynchroDownFileCSV,
		checkFileSynchroDownFileCSV,
  };
}
