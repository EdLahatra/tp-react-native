using System;
using System.Linq;
using System.Web;

namespace ShopIT_SynchroniseurCaisse.Services.Csv
{
    public static class ParametreUtility
    {
        public static Parametre ParametreFromString(string[] cols)
        {
            if (cols == null || cols.Count() < 3) return null;

            try
            {
                Parametre nprm = new Parametre();

                nprm.Variable = cols[0];
                nprm.CodeMag = cols[1];
                nprm.Valeur = HttpUtility.UrlDecode(cols[2]);

                return nprm;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de parametre.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
        public static Parametre Parametre2FromString(string[] cols)
        {
            if (cols == null || cols.Count() < 4) return null;

            try
            {
                Parametre nprm = new Parametre();

                nprm.Variable = cols[0];
                nprm.Enseigne = cols[1];
                nprm.CodeMag = cols[2];
                nprm.Caisse = cols[3];

                if (string.IsNullOrWhiteSpace(nprm.Enseigne) == true || nprm.Enseigne == "null") nprm.Enseigne = null;
                if (string.IsNullOrWhiteSpace(nprm.CodeMag) == true || nprm.CodeMag == "null") nprm.CodeMag = null;
                if (string.IsNullOrWhiteSpace(nprm.Caisse) == true || nprm.Caisse == "null") nprm.Caisse = null;

                nprm.Valeur = HttpUtility.UrlDecode(cols[4]);

                return nprm;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de parametre2.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
    }
}
