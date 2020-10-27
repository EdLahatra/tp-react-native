import { useEffect } from 'react';

import { useMetiersRequeteSQL } from '../metiers/requeteSQL';

export function useAppAuth() {

  const { findTable } = useMetiersRequeteSQL();

  useEffect(() => {
  }, []);

  async function getUsers(data: any) {
    const res = await findTable({...data, table: 'Utilisateurs'});
    console.log({ res });
    return res;
  } 
  
  return {
    getUsers,
  };
}
