using System;
using System.Linq;
using MFControls;

namespace ShopIT_SynchroniseurCaisse.Services.Csv
{
    public static class MotifRemiseUtility
    {

        public static MotifRemise MotifRemiseFromString(string[] cols)
        {
            if (cols == null || cols.Count() < 4) return null;

            try
            {
                MotifRemise nmot = new MotifRemise();

                nmot.date_modification = cols[0].ToDate();
                nmot.id_motif_remise = cols[1].ToInt();
                nmot.libelle_complet = cols[2];
                nmot.libelle_impression = cols[3];

                return nmot;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de motif de remise", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
        // généré depuis le 2017-08-15
        public static MotifRemise MotifRemiseFromString2(string[] cols)
        {
            if (cols == null || cols.Count() < 6) return null;

            try
            {
                MotifRemise nmot = new MotifRemise();

                nmot.date_modification = cols[0].ToDate();
                nmot.id_motif_remise = cols[1].ToInt();
                nmot.libelle_complet = cols[2];
                nmot.libelle_impression = cols[3];

                nmot.niveau_droit = cols[4].ToByte();
                nmot.pourcent_remise_max = cols[5].ToByte();

                return nmot;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de motif de remise", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
    }
}
