import { useEffect } from 'react';

import { useMetiersRequeteSQL } from './requeteSQL';
import { tables } from '../utils';

const table = tables.Clients.name;

export function useMetierClients() { 
  
  const { findTable } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertSynchroDownFileCSV();
  }, []);

  async function getClientsDB(data: any) {
    const res = await findTable({ ...data, table });
    return res;
  } 

  return {
    getClientsDB,
  };
}
