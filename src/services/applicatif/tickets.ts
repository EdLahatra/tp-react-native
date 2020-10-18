import { useEffect } from 'react';

import { tables } from '../utils';
import { useMetiersTickets } from '../metiers/tickets';
import { FormatData } from '../../interfaces';

const { name } = tables.Tickets;

const initial = {
  table: name,
  // columns: columns,
};

export function useAppTickets() {
  const { insertTicketMetier, getTicketsMetier } = useMetiersTickets();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);

  async function getTickets(query: number) {
    const res = await getTicketsMetier(query);
    console.log({ res });
    return res;
  }

  async function insertTickets(data: FormatData) {
    // id_cloture
    const res = await insertTicketMetier(data);
    console.log({ res });
    return res;
  }

  return {
    getTickets,
    insertTickets,
  };
}
