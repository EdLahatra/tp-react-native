import { useEffect } from 'react';

import { useMetiersRequeteSQL } from './requeteSQL';
import { tables } from '../utils';
import { FormatData } from '../../interfaces';

const { name } = tables.Tickets;

const initial = {
  table: name,
  // columns: columns,
};

export function useMetiersTickets() {
  
  const { insertTable, findTable } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);

  async function getTicketsMetier(query: number) {
    const data = {
      query,
      // table: name,
      where: ['statut'],
      // like: true,
      // operator: 'OR',
      limit: 200,
      ...initial,
    };

    const res = await findTable(data);
    console.log({ res });
    return res;
  }

  async function insertTicketMetier(data: FormatData) {
    const newRows = await insertTable(data, name);
    console.log({ newRows });
    return newRows;
  }

  return {
    getTicketsMetier,
    insertTicketMetier,
  };
}
