using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopIT_SynchroniseurCaisse.Services.Csv
{
    public static class CodeBarreCsvService
    {
        public static ArticlesCodesBarre CodeBarreFromString(string[] cols)
        {
            if (cols == null || cols.Count() < 2) return null;

            try
            {
                ArticlesCodesBarre ncb = new ArticlesCodesBarre();
                ncb.code_barre = cols[0].ToString();
                ncb.article_code_article = cols[1].ToString();

                return ncb;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de codeBarre d'article", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
    }
}
