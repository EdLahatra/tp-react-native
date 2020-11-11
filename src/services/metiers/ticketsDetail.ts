import { useEffect } from 'react';

import { useMetiersRequeteSQL } from './requeteSQL';
import { tables } from '../utils';
import { RequestDTO } from '../../dto/request';
import { FormatData } from '../../interfaces';

const { name } = tables.TicketsDetail;

const initial = {
  table: name,
  // columns: columns,
};

export function useAppTicketsDetails() {
  
  const { selectTable, insertTable, updateTable } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertSynchroDownFileCSV();
  }, []);

  async function getTicketsDetails(query: FormatData) {
    const data = {
      query,
      // table: name,
      // where: ['code', 'prenom'],
      // like: true,
      // operator: 'OR',
      limit: 20,
      ...initial,
    };

    const request = new RequestDTO({...query,...initial}).generateRequestSelect();

    const res = await selectTable(request);
    console.log({ res });
    return res;
  }

  async function insertticketsDetail(data: FormatData) {
    const newRows = await insertTable(data, name);
    console.log({ newRows });
    return newRows;
  }

  async function updateTicketsDetailMetier(data: FormatData , id: string) {
    const where = ['id', id];
    const newRows = await updateTable(name, data, where);
    console.log({ newRows });
    return newRows;
  }

  return {
    getTicketsDetails,
    insertticketsDetail,
    updateTicketsDetailMetier,
  };
}
