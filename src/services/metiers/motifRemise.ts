import { useEffect } from 'react';

import { useMetiersRequeteSQL } from './requeteSQL';
import { tables } from '../utils';
import { FormatData } from '../../interfaces';

const { name } = tables.MotifRemise;

export function useMetiersMotifRemise() {
  
  const { insertTable, findTable } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertSynchroDownFileCSV();
  }, []);

  async function getMotifRemiseMetier(data: any) {
    const res = await findTable(data);
    console.log({ res });
    return res;
	}
	

	
	async function insertMotifRemise(data: FormatData) {
    const newRows = await insertTable(data, name);
    console.log({ newRows });
    return { ...newRows, ...data };
  }

  return {
    getMotifRemiseMetier,
    insertMotifRemise,
	
  };
}
