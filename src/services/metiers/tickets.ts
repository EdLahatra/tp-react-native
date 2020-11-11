import { useEffect } from 'react';

import { useMetiersRequeteSQL } from './requeteSQL';
import { tables } from '../utils';
import { FormatData } from '../../interfaces';

const { name } = tables.Tickets;

export function useMetiersTickets() {
  
  const { insertTable, findTable, selectOneLasteValue } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertSynchroDownFileCSV();
  }, []);

  async function getTicketsMetier(data: any) {
    const res = await findTable(data);
    console.log({ res });
    return res;
	}
	
	async function generateNumeroTicket(n_ticket: string) {
		const where = ['numero_ticket', n_ticket];
		const lastTicket = await selectOneLasteValue(name, ['numero_ticket'], where);
		if (lastTicket && lastTicket.numero_ticket) {
      const old = lastTicket.numero_ticket;
      const n = old.split(n_ticket);
      if(n && n.length > 1) {
        let nb = (Number(n[1]) + 1).toString();
        const length0 = 7 - nb.length;
        let nb0 = '';
        const tableauA = new Array(length0);
        nb0 = tableauA.join('0');
        console.log({ n_ticket, nb });
        return n_ticket + nb0 + nb;
      }
		}
		return `${n_ticket}000000`;
	}
	
	async function insertTicketMetier(data: FormatData) {
    const newRows = await insertTable(data, name);
    console.log({ newRows });
    return { ...newRows, ...data };
  }

  return {
    getTicketsMetier,
		insertTicketMetier,
		generateNumeroTicket,
  };
}
