import { useState, useEffect } from 'react';

import { useMetiersApp } from '../metiers';
import { useMetiersRequeteSQL } from '../metiers/requeteSQL';
import { RequestDTO } from '../../dto/request';

export function useApplicatif() {

  const { selectTable } = useMetiersRequeteSQL();
  const { ouverturesCaisseMetiers } = useMetiersApp();

  useEffect(() => {
    // refreshListOfLists();
    // getInsertLastFileDown();
  }, []);

  async function getEntity(data: any) {
    const request = new RequestDTO(data).generateRequestSelect();
    const res = await selectTable(request);
    return res;
  }

  async function checkClotureCaisse() {
    // const request = new RequestDTO(data).generateRequestSelect();
    // const res = await selectTable(request);
  }

  async function ouverturesCaisse() {
    // const request = new RequestDTO(data).generateRequestSelect();
    // const res = await selectTable(request);
    const ouverture = {
      date: '',
      code_mag: '',
      caisse: '',
      nom_user: '',
      raison: '',
    };

    const res = await ouverturesCaisseMetiers();
    return res;
  }

  return {
    getEntity,
    checkClotureCaisse,
    ouverturesCaisse,
  };
}
