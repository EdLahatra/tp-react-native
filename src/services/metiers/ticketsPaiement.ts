import { useState, useEffect } from 'react';

import { useMetiersRequeteSQL } from './requeteSQL';
import { tables } from '../utils';
import { RequestDTO } from '../../dto/request';

const { name } = tables.Tickets;

const initial = {
  table: name,
  // columns: columns,
};

export function useAppTicketsPaiements() {
  
  const { selectTable, insertTable } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);

  async function getTicketsPaiement(query: string) {
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

  async function insertTicketsPaiement(data: { [s: string]: string; }) {
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

    const newRows = await insertTable(data, name);
    console.log({ newRows });
    return newRows;
  }

  return {
    getTicketsPaiement,
    insertTicketsPaiement,
  };
}
