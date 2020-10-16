import { useState, useEffect } from 'react';

import { useMetiersSynchroUp } from '../metiers/synchroUp';
import { tables_synchro_up } from '../utils';
import { RequestDTO } from '../dto/request';

export function useAppSynchroUp() {
  
  const { synchroUpMetiers } = useMetiersSynchroUp();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);

  async function synchroUp() {
    const res = Object.keys(tables_synchro_up).map(async (table) => await synchroUpMetiers(table))
    return res;
  } 

  return {
    synchroUp,
  };
}
