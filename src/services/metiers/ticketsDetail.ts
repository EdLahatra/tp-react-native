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

  async function insertticketsDetail(data: FormatData) {
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

    const newRows = await insertTable(data, name);
    console.log({ newRows });
    return newRows;
  }

  return {
    getticketsDetails,
    insertticketsDetail,
  };
}
