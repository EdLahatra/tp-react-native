import { useState, useEffect } from 'react';

import { useMetiersRequeteSQL } from '../metiers/requeteSQL';
import { tables } from '../utils';
import { RequestSelectDTO } from '../dto/request';

const table = tables.Clients;

export function useAppClients() {
  
  const { selectTable } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);

  async function getClients(query: string) {
    const data = {
      query,
      table,
      where: ['code', 'prenom'],
      like: true,
      operator: 'OR',
      limit: 20,
    };

    const request = new RequestSelectDTO(data).generateRequestSelect();

    const res = await selectTable(request);
    console.log({ res });
    return res;
  } 

  return {
    getClients,
  };
}
