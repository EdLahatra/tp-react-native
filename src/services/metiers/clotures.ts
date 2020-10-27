import { useEffect } from 'react';

import { useMetiersRequeteSQL } from './requeteSQL';
import { tables_synchro_up, toDatetime } from '../utils';
import { RequestDTO } from '../../dto/request';
import { FormatData } from '../../interfaces';

const { name } = tables_synchro_up.Clotures;

const initial = {
  table: name,
  // columns: columns,
};

export function useMetierClotures() {

  const { selectTable, insertTable, selectOneLasteValue, updateTable } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertSynchroDownFileCSV();
  }, []);

  async function getClotures(query: string) {
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

  async function insertClotures(data: FormatData) {
    const newRows = await insertTable(data, name);
    console.log({ newRows });
    return newRows;
  }

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

  async function insertCloturesAnnuelle(data: FormatData) {
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

  async function insertCloturesDetailsPaiement(data: FormatData) {
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

  async function insertCloturesMensuelle(data: FormatData) {
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

  async function updateClotures(usr_fermeture: string) {
    const data = {
      usr_fermeture,
      date_fin_fermeture: toDatetime(new Date()).toString(),
      date_fermeture: toDatetime(new Date()).toString(),
      synchro_up: 0,
    };
    const columns = ['id'];
    const cloture = await selectOneLasteValue(name, columns, []);
    const where = ['id', cloture.id]
    const res = await updateTable(name, data, where);
    return res;
  }

  async function selectClotutre() {
    const columns = ['usr_ouverture', 'date_ouverture', 'date_fin_ouverture', 'date_fermeture', 'id_cloture', 'date_fin_fermeture', 'usr_fermeture'];
    const cloture = await selectOneLasteValue(name, columns, []);
    return cloture;
  }

  return {
    getClotures,
    insertClotures,
    getCloturesMensuelle,
    insertCloturesMensuelle,
    insertCloturesDetailsPaiement,
    getCloturesDetailsPaiement,
    insertCloturesAnnuelle,
    getCloturesAnnuelles,
    selectClotutre,
    updateClotures,
  };
}
