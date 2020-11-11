import { useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { RequestDTO } from '../../dto/request';
import { post } from '../bdl/api';
import { cle_serveur, code_mag, numero_caisse } from '../../data/faker';

const toUrlData = (str: any) => str && str.length > 0 ? str.replace(' ', '%20') : 'null';


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
      return 'cloture2';
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
  }, []);

  async function updated(table: string, id: string) {
    const sqlRequest = `UPDATE ${table} SET synchro_up = 1 WHERE id = ${id};`;
    return await database.updateTable(sqlRequest, []);
  }

  async function recursiveSynchroUp(sqlRequest: string, table: string, res: any[]) {
    let results: any[] = [];
    const list = await database.selectTable(sqlRequest);
    console.log({ list });
    if (list && list.length) {
      const newRes = list.map(async ({ id, synchro_up, ...row }) => {
				console.log({ row });
        const dataApi = Object.keys(row).map((key) => `${key}=${typeof row[key] === 'number' ? row[key] : toUrlData(row[key])}`).join('&');
        const isClient = table !== 'Clotures' ? `code_mag=${code_mag}&` : '';
        const data = `action=${actionType(table)}&numero_caisse=${numero_caisse}&cle_serveur=${cle_serveur}&${isClient}${dataApi}`;
        console.log({ data });
        const api = await post(data);
				console.log({ api, data });
        if(api && api.data === 'ok') {
          updated(table, id);
        }
			});
			const test = await Promise.all(newRes);
			console.log({ test });
      results = [...res, ...test];
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
    updated,
  };
}
