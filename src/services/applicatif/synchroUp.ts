import { useEffect } from 'react';

import { useMetiersSynchroUp } from '../metiers/synchroUp';
import { tables_synchro_up } from '../utils';
import { useMetiersRequeteSQL } from '../metiers/requeteSQL';

export function useAppSynchroUp() {
  
  const { synchroUpMetiers } = useMetiersSynchroUp();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertSynchroDownFileCSV();
  }, []);

  async function synchroUp() {
    const promiseSelect = Object.keys(tables_synchro_up).map(async (table) => await synchroUpMetiers(table));
    console.log({ promiseSelect });
    const res = await Promise.all(promiseSelect);
    console.log({ res });
    return res;
  } 

  return {
    synchroUp,
  };
}
