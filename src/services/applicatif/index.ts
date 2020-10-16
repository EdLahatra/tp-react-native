import { useState, useEffect } from 'react';

import { useMetiersRequeteSQL } from '../metiers/requeteSQL';
import { RequestDTO } from '../dto/request';

export function useApplicatif() {

  const { selectTable } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);

  async function getEntity(data: any) {
    const request = new RequestDTO(data).generateRequestSelect();
    const res = await selectTable(request);
    return res;
  } 

  return {
    getEntity,
  };
}
