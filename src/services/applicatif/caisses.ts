import { useEffect } from 'react';

import { useAppClotures } from '../metiers/clotures';
import { useAppOuverturesTiroir } from '../metiers/ouvertureTirroir';
import { FormatData } from '../../interfaces';

export function useCaisseApp() {

  const { insertClotures, selectClotutre } = useAppClotures();
  const { insertOuverturesTiroir } = useAppOuverturesTiroir();

  useEffect(() => {
    checkCloture();
    // getInsertLastFileDown();
  }, []);

  async function checkCloture() {
    return selectClotutre();
  }

  async function ouvertureCaisse(cloture: FormatData, ouverture: FormatData) {
    console.log(cloture);
    // 637363953100000000 1603014612869
    const res_cloture = await insertClotures(cloture);
    const res_ouverture = await insertOuverturesTiroir(ouverture);
  
    return {
      res_cloture,
      res_ouverture,
    };
  } 
  
  return {
    ouvertureCaisse,
    checkCloture,
  };
}
