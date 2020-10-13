using System;
using System.Linq;
using System.Web.Script;
using MFControls;
using ShopIT_Common;

namespace ShopIT_SynchroniseurCaisse.Services.Csv
{
    public static class ModeReglementUtility
    {
        public static ModeReglement ModeReglementFromString(string[] cols)
        {
            if (cols == null || cols.Count() < 4)
            {
                return null;
            }

            try
            {
                ModeReglement nmod = new ModeReglement();

                bool? bRendu = Conversion.StringToNBool(cols[0]);
                if (bRendu.HasValue == false)
                {
                    return null;
                }
                nmod.autorise_rendu_monnaie = bRendu.Value;

                nmod.code_mode_reglement = cols[1];
                nmod.date_modification = cols[2].ToDate();
                nmod.libelle_mode_reglement = cols[3];

                return nmod;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de mode de reglement.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
        // généré depuis le 2017-08-15
        public static ModeReglement ModeReglementFromString2(string[] cols)
        {
            if (cols == null || cols.Count() < 11)
            {
                return null;
            }

            try
            {
                ModeReglement nmod = new ModeReglement();

                bool? bRendu = Conversion.StringToNBool(cols[0]);
                if (bRendu.HasValue == false)
                {
                    return null;
                }
                nmod.autorise_rendu_monnaie = bRendu.Value;

                nmod.code_mode_reglement = cols[1];
                nmod.date_modification = cols[2].ToDate();
                nmod.libelle_mode_reglement = cols[3];

                nmod.type_decompte = cols[4];

                nmod.ordre_affichage = cols[5].ToByte();

                bool? n1 = Conversion.StringToNBool(cols[6]);
                if (n1.HasValue == false)
                {
                    return null;
                }
                nmod.actif = n1.Value;

                nmod.montant_min = Conversion.StringToNDecimal(cols[7]);

                nmod.montant_max = Conversion.StringToNDecimal(cols[8]);

                bool? n2 = Conversion.StringToNBool(cols[9]);
                if (n2.HasValue == false)
                {
                    return null;
                }
                nmod.demande_id_unique = n2.Value;

                bool? n3 = Conversion.StringToNBool(cols[10]);
                //if (n3.HasValue == false) return null;
                nmod.verif_id_unique = n3; //.Value;

                return nmod;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de mode de reglement.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }

        public static ModeReglement ModeReglementFromString3(string[] cols)
        {
            if (cols == null || cols.Count() < 11)
            {
                return null;
            }

            try
            {
                ModeReglement nmod = new ModeReglement();

                bool? bRendu = Conversion.StringToNBool(cols[0]);
                if (bRendu.HasValue == false)
                {
                    return null;
                }
                nmod.autorise_rendu_monnaie = bRendu.Value;

                nmod.code_mode_reglement = cols[1];
                nmod.date_modification = cols[2].ToDate();
                nmod.libelle_mode_reglement = cols[3];

                nmod.type_decompte = cols[4];

                nmod.ordre_affichage = cols[5].ToByte();

                bool? n1 = Conversion.StringToNBool(cols[6]);
                if (n1.HasValue == false)
                {
                    return null;
                }
                nmod.actif = n1.Value;

                nmod.montant_min = Conversion.StringToNDecimal(cols[7]);

                nmod.montant_max = Conversion.StringToNDecimal(cols[8]);

                bool? n2 = Conversion.StringToNBool(cols[9]);
                if (n2.HasValue == false)
                {
                    return null;
                }
                nmod.demande_id_unique = n2.Value;

                bool? n3 = Conversion.StringToNBool(cols[10]);
                //if (n3.HasValue == false) return null;
                nmod.verif_id_unique = n3; //.Value;

                bool? need_depot_banque = Conversion.StringToNBool(cols[11]);
                if (need_depot_banque.HasValue == false)
                {
                    return null;
                }

                nmod.need_depot_banque = need_depot_banque.Value;

                return nmod;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de mode de reglement.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }



        public static ModesReglementsVerif ModeReglementVerifFromString(string[] cols)
        {
            if (cols == null || cols.Count() < 3)
            {
                return null;
            }

            try
            {
                ModesReglementsVerif nmr = new ModesReglementsVerif();

                nmr.type_carte = cols[0];
                nmr.id_carte = cols[1];

                //DateTime? d = cols[2].ToDate();
                //if (d.HasValue == false)
                //{
                //    return null;
                //}
                //nmr.date_modif = d.Value;

                return nmr;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de vérif mode reglement", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
    }
}
