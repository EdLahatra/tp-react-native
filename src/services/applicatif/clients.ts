import { useEffect } from 'react';
import { useMetierClients } from '../metiers/clients';

export function useAppClients() {
  
  const { getClientsDB } = useMetierClients();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertSynchroDownFileCSV();
  }, []);

  async function getClients(data: any) {
    const res = await getClientsDB(data);
   
    return res;
  } 

  return {
    getClients,
  };
}
