import { useState, useEffect } from 'react';

import { useMetiersRequeteSQL } from './requeteSQL';
import { tables } from '../utils';
import { RequestDTO } from '../../dto/request';
import { FormatData } from '../../interfaces';

const { name } = tables.Tickets;
const { names } = tables.TicketsPaiements;

const initial = {
  table: name,
  // columns: columns,
};

export function useAppTicketsPaiements() {
  
  const { selectTable, insertTable , findTable} = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertSynchroDownFileCSV();
  }, []);

  async function getTicketsPaiement(query: any) {
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

  async function findTicketsPaiement(data: any) {

    const res = await findTable({ ...data, table : name });
    console.log({ res });
    return res;
  }

  async function insertTicketsPaiement(data: FormatData) {
    // const data = {
      // numero_ticket: '',
      // numero_ligne: '',
      // mode_paiement: '',
      // montant_paiement: '',
      // info_paiement: '',
      // encaisse: '',
      // user_annulation: '',
      // date_annulation: '',
      // motif_annulation: '',
    // };

    const newRows = await insertTable(data, names);
    console.log({ newRows });
    return newRows;
  }

  return {
    getTicketsPaiement,
    insertTicketsPaiement,
    findTicketsPaiement
  };
}
