import { useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { RequestDTO } from '../../dto/request';
import { FormatData } from '../../interfaces';

export function useMetiersRequeteSQL() {
  const database = useDatabase();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertSynchroDownFileCSV();
  }, []);

  async function getEntity(data: any) {
    const request = new RequestDTO(data).generateRequestSelect();
    const res = await selectTable(request);
    return res;
  }

  async function selectTable(sqlRequest: string): Promise<any[]> {
    return await database.selectTable(sqlRequest);
  }

  async function findTable(data: any): Promise<any[]> {
    const request = new RequestDTO(data).generateRequestSelect();
    return await database.selectTable(request);
  }

  async function selectOneLasteValue(table: string, columns: string[], where: string[]): Promise<any> {
    return await database.selectOneLasteValue(table, columns, where);
  }

  async function insertTable(data: FormatData, table: string): Promise<any[]> {
    const values = Object.values(data).map(i => i.toString());
    const sqlRequest = new RequestDTO({ table }).generateRequestInsert(data);
    return await database.insertTable(sqlRequest, values);
  }

  async function updateTable(table: string, data: { [s: string]: FormatData; }, where: string[]): Promise<string> {
    const req = new RequestDTO({ table }).generateRequestUpdate(data, where);
    return await database.updateTable(req, []);
  }

  async function deleteTable(table: string, id: string): Promise<any[]> {
    const req = new RequestDTO({ table }).generateRequestDelete();
    return await database.deleteTable(req, [id]);
  }

  return {
    selectTable,
    insertTable,
    updateTable,
    deleteTable,
    selectOneLasteValue,
		findTable,
		getEntity,
  };
}
