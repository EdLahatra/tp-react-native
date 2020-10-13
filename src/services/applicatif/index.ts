import { useState, useEffect } from 'react';

import { useMetiersRequeteSQL } from '../metiers/requeteSQL';
import { RequestSelectDTO } from '../dto/request';

export function useApplicatif() {

  const { selectTable } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);

  async function getEntity(data: any) {
    const request = new RequestSelectDTO(data).generateRequestSelect();
    const res = await selectTable(request);
    return res;
  } 

  return {
    getEntity,
  };
}
