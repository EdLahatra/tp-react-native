import { useState, useEffect } from 'react';

import { useMetiersRequeteSQL } from './requeteSQL';
import { tables } from '../utils';
import { RequestDTO } from '../../dto/request';
import { FormatData } from '../../interfaces';

const { name } = tables.Tickets;

const initial = {
  table: name,
  // columns: columns,
};

export function useAppControlesCaisses() {
  
  const { selectTable, insertTable } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertSynchroDownFileCSV();
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

  async function insertControlesCaisse(data: FormatData) {
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
    const newRows = await insertTable(data, name);
    console.log({ newRows });
    return newRows;
  }

  return {
    getControlesCaisses,
    insertControlesCaisse,
  };
}
