import { useEffect } from 'react';
import { useMetiersMotifRemise } from '../metiers/motifRemise';

export function useAppMotifRemise() {
  
  const { getMotifRemiseMetier } = useMetiersMotifRemise();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertSynchroDownFileCSV();
  }, []);

  async function getMotifRemise(data: any) {
    const res = await getMotifRemiseMetier(data);
   
    return res;
  } 

  return {
    getMotifRemise,
  };
}
