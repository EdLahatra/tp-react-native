import { useState, useEffect } from 'react';

import { useApplicatif } from './index';
import { tables } from '../utils';
import { RequestDTO } from '../dto/request';

const table = tables.Utilisateurs.name;

export function useAppAuth() {

  const { getEntity } = useApplicatif();
  


  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);

  async function getUsers(query: string) {
    const data = {
      query,
      table,
      where: ['nom', 'prenom'],
      like: true,
      operator: 'OR',
      limit: 10,
    };

    const res = await getEntity(data);
    console.log({ res });
    return res;
  } 
  
  return {
    getUsers,
  };
}
