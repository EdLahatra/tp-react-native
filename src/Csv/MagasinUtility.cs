using System;
using System.Linq;
using MFControls;

namespace ShopIT_SynchroniseurCaisse.Services.Csv
{
    public static class MagasinUtility
    {
        public static Magasin MagasinFromString(string[] cols)
        {
            if (cols == null || cols.Count() < 9) return null;

            try
            {
                Magasin nmag = new Magasin();

                nmag.code_magasin_franchiseur = cols[0];
                nmag.code_magasin_interne = cols[1];
                nmag.date_modification = cols[2].ToDate();
                nmag.designation = cols[3];
                //nmag.id_magasin = cols[4]; // autoincrement
                nmag.no_enseigne = cols[5];
                nmag.no_magasin = cols[6];
                nmag.ville = cols[7];
                nmag.enseigne = cols[8];

                nmag.need_deballage = true;
                if (cols.Count() > 9)
                {
                    nmag.need_deballage = (cols[9] == "1" ? true : false);
                }

                return nmag;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de magasin.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
    }
}
