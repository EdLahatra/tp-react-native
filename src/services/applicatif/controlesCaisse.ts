import { useState, useEffect } from 'react';

import { useMetiersRequeteSQL } from '../metiers/requeteSQL';
import { tables } from '../utils';
import { RequestDTO } from '../dto/request';

const { name } = tables.Tickets;

const initial = {
  table: name,
  // columns: columns,
};

export function useAppControlesCaisses() {
  
  const { selectTable, insertTable } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);

  async function getControlesCaisses(query: string) {
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

  async function insertControlesCaisse(data: { [s: string]: string; }) {
    // const data = {
    //   numero_ticket: '',
    //   statut: '',
    //   user_creation: '',
    //   id_clientvarchar: '',
    //   user_annulation: '',
    //   motif_annulation: '',
    //   date_debut: '',
    //   date_fin: '',
    //   id_cloture: '',
    //   vendeurs: '',
    // };
    const values = Object.values(data);
    const request = new RequestDTO(initial).generateRequestInsert(data);
    const newRows = await insertTable(request, values);
    console.log({ newRows });
    return newRows;
  }

  return {
    getControlesCaisses,
    insertControlesCaisse,
  };
}
