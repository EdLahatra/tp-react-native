import { useEffect } from 'react';

import { tables } from '../utils';
import { useMetiersTickets } from '../metiers/tickets';
import { FormatData } from '../../interfaces';
import { useAppTicketsDetails } from '../metiers/ticketsDetail';
import { useAppTicketsPaiements } from '../metiers/ticketsPaiement';

const { name } = tables.Tickets;

const initial = {
  table: name,
  // columns: columns,
};

export function useAppTickets() {
  const { insertTicketMetier, getTicketsMetier, generateNumeroTicket } = useMetiersTickets();
	const { insertticketsDetail, updateTicketsDetailMetier,getTicketsDetails } = useAppTicketsDetails();
  const { insertTicketsPaiement, getTicketsPaiement, findTicketsPaiement } = useAppTicketsPaiements();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertSynchroDownFileCSV();
  }, []);

  async function getTickets(data: any) {
    const res = await getTicketsMetier({...data, table: tables.TicketsDetail.name });
    console.log({ res });
    return res;
  }

  async function insertTickets(data: FormatData) {
    // id_cloture
    const res = await insertTicketMetier(data);
    console.log('------------_>',{ res });
    return res;
  }

  async function updateTicketsDetail(data: FormatData, id: string) {
    const res = await updateTicketsDetailMetier(data, id);
    console.log({ res });
    return res;
  }

  async function insertTicketDetails(data: FormatData) {
    // id_cloture
    const res = await insertticketsDetail(data);
    console.log({ res });
    return res;
  }

  async function getTicketsDetail(data:any) {
    const res = await getTicketsDetails(data);
    console.log({ res });
    return res;
  }

  async function getTicketsPaiements(data: any) {
    const res = await getTicketsPaiement({...data, ...initial});
    console.log({ res });
    return res;
  }

  async function findTicketsPaiements(data: any) {
    const res = await findTicketsPaiement(data);
    return res;
  }

  async function generateNumeroTickets(n_ticket: string){
    const res = await generateNumeroTicket(n_ticket);
    console.log({ res });
    return res;
  }
	
	async function insertTicketsPaiements(data: FormatData) {
    // id_cloture
    const res = await insertTicketsPaiement(data);
    console.log({ res });
    return res;
  }


  return {
    getTickets,
    insertTickets,
		insertTicketDetails,
    insertTicketsPaiements,
    generateNumeroTickets,
    getTicketsPaiements,
    findTicketsPaiements,
    updateTicketsDetail,
    getTicketsDetail
  };
}
