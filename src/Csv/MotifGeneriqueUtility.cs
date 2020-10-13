using System;
using System.Linq;
using MFControls;

namespace ShopIT_SynchroniseurCaisse.Services.Csv
{
    public static class MotifGeneriqueUtility
    {

        public static MotifsGenerique MotifGeneriqueFromString(string[] cols)
        {
            if (cols == null || cols.Count() < 3) return null;

            try
            {
                MotifsGenerique nmot = new MotifsGenerique();

                nmot.date_modif = cols[0].ToDate().Value;
                nmot.id_motif_generique = cols[1].ToInt();
                nmot.libelle_motif = cols[2];

                if (cols.Count() == 4)
                {
                    nmot.id_type = cols[3].ToInt();
                }
                return nmot;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de motif générique", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
    }
}
