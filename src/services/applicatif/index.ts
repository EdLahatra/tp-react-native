import { useEffect } from 'react';

import { useMetiersRequeteSQL } from '../metiers/requeteSQL';

export function useApplicatif() {

  const { getEntity } = useMetiersRequeteSQL();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertSynchroDownFileCSV();
  }, []);

  async function getEntityApp(data: any) {
    const res = await getEntity(data);
    return res;
  }

  return {
    getEntityApp,
  };
}
