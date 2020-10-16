import { useState, useEffect } from 'react';

import { useMetiersRequeteSQL } from '../metiers/requeteSQL';
import { tables_synchro_up } from '../utils';
import { RequestDTO } from '../dto/request';

const { name } = tables_synchro_up.Tickets;

const initial = {
  table: name,
  // columns: columns,
};

export function useAppClotures() {
  
  const { selectTable, insertTable } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);

  async function getCloturesAnnuelles(query: string) {
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

  async function insertCloturesAnnuelle(data: { [s: string]: string; }) {
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

  async function getCloturesDetailsPaiement(query: string) {
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

  async function insertCloturesDetailsPaiement(data: { [s: string]: string; }) {
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


  async function getCloturesMensuelle(query: string) {
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

  async function insertCloturesMensuelle(data: { [s: string]: string; }) {
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
    getCloturesMensuelle,
    insertCloturesMensuelle,
    insertCloturesDetailsPaiement,
    getCloturesDetailsPaiement,
    insertCloturesAnnuelle,
    getCloturesAnnuelles
  };
}
