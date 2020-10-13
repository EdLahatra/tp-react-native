import { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';

export function useMetiersRequeteSQL() {
  const database = useDatabase();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);


  async function selectTable(sqlRequest: string): Promise<any[]> {
    return await database.selectTable(sqlRequest);
  }

  return {
    selectTable,
  };
}
