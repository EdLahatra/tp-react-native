using System;
using System.Linq;
using MFControls;

namespace ShopIT_SynchroniseurCaisse.Services.Csv
{
    public static class PromoCouponUtility
    {
        public static PromoCoupon PromoCouponFromString(string[] cols)
        {
            if (cols == null || cols.Count() != 7) return null;

            try
            {
                PromoCoupon pc = new PromoCoupon();

                pc.code_coupon = cols[0];

                DateTime? dCrea = cols[1].ToDate();
                if (dCrea.HasValue == false) return null;
                pc.date_creation = dCrea.Value;

                pc.date_fin = null;
                string d = cols[2].Trim();
                if (string.IsNullOrWhiteSpace(d) == false)
                {
                    DateTime? dFin = d.ToDate();
                    if (dFin.HasValue == false) return null;
                    pc.date_fin = dFin.Value;
                }

                pc.id_promo_cible = cols[3].ToInt();
                pc.id_promo_source = cols[4].ToInt();
                pc.no_ticket = cols[5].Trim();
                pc.user_creation = cols[6].Trim();

                return pc;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de Coupon", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }

    }
}
