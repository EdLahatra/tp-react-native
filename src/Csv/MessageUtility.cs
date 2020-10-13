using System;
using System.Linq;
using MFControls;

namespace ShopIT_SynchroniseurCaisse.Services.Csv
{
    public static class MessageUtility
    {
        public static Message MessageFromString(string[] cols)
        {
            if (cols == null || cols.Count() < 9) return null;

            try
            {
                Message nmsg = new Message();

                nmsg.contenu = cols[0];

                DateTime? dCreation = cols[1].ToDate();
                if (dCreation.HasValue == false) return null;
                nmsg.date_creation = dCreation.Value;

                nmsg.date_lecture = cols[2].ToDate();
                nmsg.date_modification = cols[3].ToDate();
                nmsg.destination = cols[4].ToStringOrNull();
                //nmsg.id_message = cols[5].ToInt(); // autoincrément
                nmsg.source = cols[6];
                nmsg.usr_destination = cols[7].ToStringOrNull();
                nmsg.usr_source = cols[8];

                return nmsg;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de message.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
    }
}
