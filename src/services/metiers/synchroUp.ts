import { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { RequestDTO } from '../dto/request';
import { post } from '../bdl/api';

const toUrlData = (str: string) => str.replace(' ', '%20');

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
    if (list && list.length) {
      const newRes = list.map(async ({ id, synchro_up, ...row }) => {
        const dataApi = Object.keys(row).map((key) => `${key}=${toUrlData(row[key])}`).join('&')
        const api = await post(dataApi);
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
