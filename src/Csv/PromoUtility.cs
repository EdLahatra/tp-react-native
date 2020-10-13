using System;
using System.Linq;
using MFControls;
using ShopIT_Common;

namespace ShopIT_SynchroniseurCaisse.Services.Csv
{
    public static class PromoUtility
    {
        public static Promo PromoFromString(string[] cols)
        {
            if (cols == null || cols.Count() < 24)
            {
                return null;
            }

            try
            {
                Promo npro = new Promo();// 19 colonnes

                npro.id_promo = cols[0].ToInt();
                npro.CodeMag = cols[1].ToStringOrNull();

                DateTime? dDeb = cols[2].ToDate();
                if (dDeb.HasValue == false)
                {
                    return null;
                }
                npro.date_debut = dDeb.Value;

                DateTime? dFin = cols[3].ToDate();
                if (dFin.HasValue == false)
                {
                    return null;
                }
                npro.date_fin = dFin.Value;

                npro.montant_remise = Conversion.NullableDecimal(cols[4]);
                npro.pourcent_remise = Conversion.NullableByte(cols[5]);
                npro.quantite_requise = cols[6].ToByte();
                npro.lot_ref1 = cols[7];
                npro.lot_ref2 = cols[8].ToStringOrNull();
                npro.lot_ref3 = cols[9].ToStringOrNull();
                npro.lot_ref4 = cols[10].ToStringOrNull();
                npro.lot_ref5 = cols[11].ToStringOrNull();
                npro.lot_ref6 = cols[12].ToStringOrNull();
                npro.lot_ref7 = cols[13].ToStringOrNull();
                npro.lot_ref8 = cols[14].ToStringOrNull();
                npro.lot_ref9 = cols[15].ToStringOrNull();
                npro.lot_ref10 = cols[16].ToStringOrNull();
                npro.lot_ref11 = cols[17].ToStringOrNull();
                npro.lot_ref12 = cols[18].ToStringOrNull();
                npro.lot_ref13 = cols[19].ToStringOrNull();
                npro.lot_ref14 = cols[20].ToStringOrNull();
                npro.lot_ref15 = cols[21].ToStringOrNull();
                npro.designation = cols[22];
                npro.conditions = cols[23].ToStringOrNull();
                npro.message_client = null;

                return npro;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de promo.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
        // généré depuis le 2017-08-15
        public static Promo PromoFromString2(string[] cols)
        {
            if (cols == null || cols.Count() < 25)
            {
                return null;
            }

            try
            {
                Promo npro = new Promo();// 19 colonnes

                npro.id_promo = cols[0].ToInt();
                npro.CodeMag = cols[1].ToStringOrNull();

                DateTime? dDeb = cols[2].ToDate();
                if (dDeb.HasValue == false)
                {
                    return null;
                }
                npro.date_debut = dDeb.Value;

                DateTime? dFin = cols[3].ToDate();
                if (dFin.HasValue == false)
                {
                    return null;
                }
                npro.date_fin = dFin.Value;

                npro.montant_remise = Conversion.NullableDecimal(cols[4]);
                npro.pourcent_remise = Conversion.NullableByte(cols[5]);
                npro.montant_cible = Conversion.NullableDecimal(cols[6]);
                npro.quantite_requise = cols[7].ToByte();
                npro.lot_ref1 = cols[8];
                npro.lot_ref2 = cols[9].ToStringOrNull();
                npro.lot_ref3 = cols[10].ToStringOrNull();
                npro.lot_ref4 = cols[11].ToStringOrNull();
                npro.lot_ref5 = cols[12].ToStringOrNull();
                npro.lot_ref6 = cols[13].ToStringOrNull();
                npro.lot_ref7 = cols[14].ToStringOrNull();
                npro.lot_ref8 = cols[15].ToStringOrNull();
                npro.lot_ref9 = cols[16].ToStringOrNull();
                npro.lot_ref10 = cols[17].ToStringOrNull();
                npro.lot_ref11 = cols[18].ToStringOrNull();
                npro.lot_ref12 = cols[19].ToStringOrNull();
                npro.lot_ref13 = cols[20].ToStringOrNull();
                npro.lot_ref14 = cols[21].ToStringOrNull();
                npro.lot_ref15 = cols[22].ToStringOrNull();
                npro.designation = cols[23];
                npro.conditions = cols[24].ToStringOrNull();
                npro.message_client = null;

                return npro;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de promo.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
        // généré depuis le 2017-11-20
        public static Promo PromoFromString3(string[] cols)
        {
            if (cols == null || cols.Count() < 26)
            {
                return null;
            }

            try
            {
                Promo npro = new Promo();// 19 colonnes

                npro.id_promo = cols[0].ToInt();
                npro.CodeMag = cols[1].ToStringOrNull();

                DateTime? dDeb = cols[2].ToDate();
                if (dDeb.HasValue == false)
                {
                    return null;
                }
                npro.date_debut = dDeb.Value;

                DateTime? dFin = cols[3].ToDate();
                if (dFin.HasValue == false)
                {
                    return null;
                }
                npro.date_fin = dFin.Value;

                npro.montant_remise = Conversion.NullableDecimal(cols[4]);
                npro.pourcent_remise = Conversion.NullableByte(cols[5]);
                npro.montant_cible = Conversion.NullableDecimal(cols[6]);
                npro.quantite_requise = cols[7].ToByte();
                npro.lot_ref1 = cols[8];
                npro.lot_ref2 = cols[9].ToStringOrNull();
                npro.lot_ref3 = cols[10].ToStringOrNull();
                npro.lot_ref4 = cols[11].ToStringOrNull();
                npro.lot_ref5 = cols[12].ToStringOrNull();
                npro.lot_ref6 = cols[13].ToStringOrNull();
                npro.lot_ref7 = cols[14].ToStringOrNull();
                npro.lot_ref8 = cols[15].ToStringOrNull();
                npro.lot_ref9 = cols[16].ToStringOrNull();
                npro.lot_ref10 = cols[17].ToStringOrNull();
                npro.lot_ref11 = cols[18].ToStringOrNull();
                npro.lot_ref12 = cols[19].ToStringOrNull();
                npro.lot_ref13 = cols[20].ToStringOrNull();
                npro.lot_ref14 = cols[21].ToStringOrNull();
                npro.lot_ref15 = cols[22].ToStringOrNull();
                npro.designation = cols[23];
                npro.conditions = cols[24].ToStringOrNull();
                npro.message_client = cols[25].Replace("<br />", "\r\n").Trim().ToStringOrNull();

                return npro;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de promo.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
    }
}
