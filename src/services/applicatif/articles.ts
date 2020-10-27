import { useEffect } from 'react';

import { useMetiersRequeteSQL } from '../metiers/requeteSQL';

export function useAppArticles() {

  const { findTable } = useMetiersRequeteSQL();

  useEffect(() => {
  }, []);

  async function getArticles(data: any) {
    const res = await findTable({...data, table: 'Articles'});
    return res;
  }

  async function getArticlesByCodeBarres(data: any) {
    const code_barre = await findTable({ ...data, table: 'SynchroDownFileCSV' });
    console.log({ code_barre });

    // if(code_barre && code_barre.length > 0) {
    //   const article_by_code_query = {
    //     query: code_barre[0].article_code_article,
    //     where: ['article_code_article'],
    //     // where: ['code_barre'],
    //     limit: 1,
    //   };
    //   const res = await getArticles(article_by_code_query);
    //   console.log({ res });
    //   return res || [];
    // }

    return [];
  }
  
  return {
    getArticles,
    getArticlesByCodeBarres,
  };
}
