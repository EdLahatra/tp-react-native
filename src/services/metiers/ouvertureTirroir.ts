import { useEffect } from 'react';

import { useMetiersRequeteSQL } from './requeteSQL';
import { tables } from '../utils';
import { RequestDTO } from '../../dto/request';
import { FormatData } from '../../interfaces';

const { name } = tables.OuverturesTiroir;

const initial = {
  table: name,
  // columns: columns,
};

export function useAppOuverturesTiroir() {

  const { selectTable, insertTable } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertSynchroDownFileCSV();
  }, []);

  async function getOuverturesTiroirs(query: string) {
    const data = {
      query,
      // table: name,
      // where: ['code', 'prenom'],
      // like: true,
      // operator: 'OR',
      limit: 20,
      ...initial,
    };

    const request = new RequestDTO(data).generateRequestSelect();

    const res = await selectTable(request);
    console.log({ res });
    return res;
  }

  async function insertOuverturesTiroir(data: FormatData) {
    const newRows = await insertTable(data, name);
    console.log({ newRows });
    return newRows;
  }

  return {
    getOuverturesTiroirs,
    insertOuverturesTiroir,
  };
}
