import { useState, useEffect } from 'react';

import { useMetiersRequeteSQL } from './requeteSQL';
import { tables } from '../utils';
import { RequestDTO } from '../../dto/request';

const table = tables.Clients.name;

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

    const request = new RequestDTO(data).generateRequestSelect();

    const res = await selectTable(request);
    console.log({ res });
    return res;
  } 

  return {
    getClients,
  };
}
