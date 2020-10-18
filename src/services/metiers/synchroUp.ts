import { useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { RequestDTO } from '../../dto/request';
import { post } from '../bdl/api';
import { cle_serveur, code_mag, numero_caisse } from '../../data/faker';

const toUrlData = (str: string) => str.replace(' ', '%20');

export const actionType = (table: string) => {
  switch (table) {
    case 'Tickets':
      return 'ticket';
    case 'TicketsDetail':
      return 'ticket_detail';
    case 'Clients':
      return 'client';
    case 'TicketsPaiements':
      return 'ticket_paiement';
    case 'Messages':
      return 'message';
    case 'Utilisateurs':
      return 'utilisateur';
    case 'Clotures':
      return 'cloture';
    case 'Pointages':
      return 'pointage';
    case 'CloturesDetailsPaiement':
      return 'clot_det_paiement';
    default:
      return 'ticket';
  }
}

export function useMetiersSynchroUp() {
  const database = useDatabase();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);

  async function updated(table: string, id: string) {
    const sqlRequest = `UPDATE ${table} SET synchro_up = ? WHERE id = ?;`;
    return await database.updateTable(sqlRequest, [id,'1']);
  }

  async function recursiveSynchroUp(sqlRequest: string, table: string, res: any[]) {
    let results: any[] = [];
    const list = await database.selectTable(sqlRequest);
    console.log({ list });
    if (list && list.length) {
      const newRes = list.map(async ({ id, synchro_up, ...row }) => {
        const dataApi = Object.keys(row).map((key) => `${key}=${toUrlData(row[key])}`).join('&');
        const isClient = table === 'Clients' ? `code_mag=${code_mag}&numero_caisse=${numero_caisse}&` : '';
        const keys = `action${actionType(table)}&cle_serveur=${cle_serveur}&${isClient}`;
        const api = await post(keys + dataApi);
        if(api && api.data) {
          updated(table, id);
        }
      });
      results = [...res, ...newRes];
      await recursiveSynchroUp(sqlRequest, table, results)
    }
    return results;
  }

  async function synchroUpMetiers(table: string): Promise<any[]> {
    const data = {
        query: 0,
        table,
        where: ['synchro_up'],
        // like: true,
        // operator: 'OR',
        limit: 50,
      };
    const sqlRequest = new RequestDTO(data).generateRequestSelect();
    const results = await recursiveSynchroUp(sqlRequest, table, []);
    return results;
  }

  return {
    synchroUpMetiers,
  };
}
