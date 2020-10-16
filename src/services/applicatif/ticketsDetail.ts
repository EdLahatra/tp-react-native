import { useState, useEffect } from 'react';

import { useMetiersRequeteSQL } from '../metiers/requeteSQL';
import { tables } from '../utils';
import { RequestDTO } from '../dto/request';

const { name } = tables.Tickets;

const initial = {
  table: name,
  // columns: columns,
};

export function useAppClients() {
  
  const { selectTable, insertTable } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);

  async function getticketsDetails(query: string) {
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

  async function insertticketsDetail(data: { [s: string]: string; }) {
    // const data = {
    //   numero_ticket: '',
    //   numero_ligne: '',
    //   code_article: '',
    //   statut: '',
    //   user_creation: '',
    //   date_creation: '',
    //   user_annulation: '',
    //   date_annulation: '',
    //   motif_annulation: '',
    //   quantite: '',
    //   motif_remise: '',
    //   motif_retour: '',
    //   complement_designation: '',
    //   user_retour: '',
    //   prix_base_unitaire_ttc: '',
    //   remise_totale_ttc: '',
    //   tva_totale: '',
    //   prix_total_ttc: '',
    //   motif_remise_complet: '',
    //   envoye: '',
    //   id_promo: ''
    // };
    const values = Object.values(data);
    const request = new RequestDTO(initial).generateRequestInsert(data);
    const newRows = await insertTable(request, values);
    console.log({ newRows });
    return newRows;
  }

  return {
    getticketsDetails,
    insertticketsDetail,
  };
}
