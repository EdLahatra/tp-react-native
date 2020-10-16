import { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { RequestDTO } from '../dto/request';

export function useMetiersRequeteSQL() {
  const database = useDatabase();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);


  async function selectTable(sqlRequest: string): Promise<any[]> {
    return await database.selectTable(sqlRequest);
  }

  async function insertTable(sqlRequest: string, values: string[]): Promise<any[]> {
    return await database.insertTable(sqlRequest, values);
  }

  async function updateTable(table: string, data: { [s: string]: string; }): Promise<any[]> {
    const { req, values } = new RequestDTO({ table }).generateRequestUpdate(data);
    return await database.updateTable(req, values);
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
  };
}
