using System;
using System.Linq;
using MFControls;
using ShopIT_Common;

namespace ShopIT_SynchroniseurCaisse.Services.Csv
{
    public static class ArticleCsvService
    {
        public static Article ArticleFromString(string[] cols)
        {
            if (cols == null || cols.Count() < 27) return null;

            try
            {
                Article nart = new Article();

                //nart.a_crea_par = cols[0];

                //DateTime? dCreation = cols[1].ToDate();
                //if (dCreation.HasValue == false) return null;
                //nart.a_horo_creation = dCreation.Value;

                DateTime? dModif = cols[0].ToDate();
                if (dModif.HasValue == false) return null;
                nart.a_horo_modification = dModif.Value;

                //nart.a_modif_par = cols[3];
                //nart.a_statut_synchronise = Conversion.StringToNBool(cols[4]);
                //nart.a_uuid_synchro = cols[5].ToStringOrNull();

                //bool? bauth = Conversion.StringToNBool(cols[6]);
                //if (bauth.HasValue == false) return null;
                //nart.article_auth_remonte = bauth.Value;

                //nart.article_autre_code_1 = cols[1].ToStringOrNull();
                //nart.article_autre_code_2 = cols[2].ToStringOrNull();
                //nart.article_autre_code_3 = cols[3].ToStringOrNull();
                //nart.article_autre_code_4 = cols[4].ToStringOrNull();
                //nart.article_autre_code_5 = cols[5].ToStringOrNull();
                //nart.article_bonnet_code = Conversion.StringToNByte(cols[12]);
                nart.article_bonnet_designation = cols[6].ToStringOrNull();
                nart.article_code_article = cols[7];
                //nart.article_code_barre_13 = cols[8];
                nart.article_commentaire = cols[9].ToStringOrNull();
                //nart.article_composition = cols[17].ToStringOrNull();

                //byte? bcode = Conversion.StringToNByte(cols[10]);
                //if (bcode.HasValue == false) return null;
                nart.article_couleur_code = cols[10].ToStringOrNull(); //.Value;

                nart.article_couleur_designation = cols[11].ToStringOrNull();
                nart.article_designation = cols[12];
                nart.article_enseigne = cols[13];
                //nart.article_famille_code = cols[22];
                //nart.article_famille_designation = cols[23];
                //nart.article_lineaire_code = cols[24].ToStringOrNull();
                //nart.article_lineaire_designation = cols[25].ToStringOrNull();
                nart.article_message_deballage = cols[14].ToStringOrNull();
                //nart.article_nomenclature_douane = cols[27].ToStringOrNull();
                //nart.article_pays_fabrication = cols[28].ToStringOrNull();
                //nart.article_photo = cols[29].ToStringOrNull();
                //nart.article_photo_etiquette = cols[30].ToStringOrNull();
                //nart.article_photo_taille = cols[31].ToStringOrNull();
                //nart.article_poids_brut = Conversion.StringToNDecimal(cols[32]);
                //nart.article_poids_net = Conversion.StringToNDecimal(cols[33]);
                //nart.article_prix_achat_moyen = cols[34].ToDecimal();
                //nart.article_prix_revient_moyen = cols[35].ToDecimal();
                nart.article_pv_ttc = cols[15].ToDecimal();
                nart.article_reference = cols[16].ToStringOrNull();
                nart.article_reference_libelle = cols[17].ToStringOrNull();
                nart.article_reference_coloris = cols[18].ToStringOrNull();
                //nart.article_saison_annee = cols[40].ToShort();
                //nart.article_saison_code = cols[41].ToByte();
                //nart.article_segment_code = cols[42].ToStringOrNull();
                //nart.article_segment_designation = cols[43].ToStringOrNull();
                nart.article_statut = cols[19];
                //nart.article_taille_code = cols[45].ToByte();
                nart.article_taille_designation = cols[20].ToStringOrNull();
                //nart.article_theme_code = cols[47].ToStringOrNull();
                nart.article_theme_designation = cols[21].ToStringOrNull();
                //nart.article_total_quantite_recu = cols[49].ToDecimal();
                //nart.article_total_quantite_vente = cols[50].ToDecimal();
                //nart.article_total_valeur_achat = cols[51].ToDecimal();
                //nart.article_total_valeur_revient = cols[52].ToDecimal();
                //nart.article_tribu_code = cols[53].ToStringOrNull();
                //nart.article_tribu_designation = cols[54].ToStringOrNull();
                nart.article_TVA = cols[22].ToDecimal();
                //nart.b_site = cols[56].ToStringOrNull();

                bool? bactif = Conversion.StringToNBool(cols[23]);
                if (bactif.HasValue == false) return null;
                nart.d_actif = bactif.Value;
                
                nart.article_devise = cols[26].ToStringOrNull();

                return nart;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création d'article", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
        // généré depuis le 2017-08-15
        public static Article ArticleFromString2(string[] cols)
        {
            if (cols == null || cols.Count() < 26) return null;

            try
            {
                Article nart = new Article();

                DateTime? dModif = cols[0].ToDate();
                if (dModif.HasValue == false) return null;
                nart.a_horo_modification = dModif.Value;

                //nart.article_autre_code_1 = cols[1].ToStringOrNull();
                //nart.article_autre_code_2 = cols[2].ToStringOrNull();
                //nart.article_autre_code_3 = cols[3].ToStringOrNull();
                //nart.article_autre_code_4 = cols[4].ToStringOrNull();
                //nart.article_autre_code_5 = cols[5].ToStringOrNull();
                nart.article_bonnet_designation = cols[6].ToStringOrNull();
                nart.article_code_article = cols[7];
                //nart.article_code_barre_13 = cols[8];
                nart.article_commentaire = cols[9].ToStringOrNull();

                nart.article_couleur_code = cols[10].ToStringOrNull(); //.Value;

                nart.article_couleur_designation = cols[11].ToStringOrNull();
                nart.article_designation = cols[12];
                nart.article_enseigne = cols[13];
                nart.article_message_deballage = cols[14].ToStringOrNull();
                nart.article_pv_ttc = cols[15].ToDecimal();
                nart.article_reference = cols[16].ToStringOrNull();
                nart.article_reference_libelle = cols[17].ToStringOrNull();
                nart.article_reference_coloris = cols[18].ToStringOrNull();
                nart.article_statut = cols[19];
                nart.article_taille_designation = cols[20].ToStringOrNull();
                nart.article_theme_designation = cols[21].ToStringOrNull();
                nart.article_TVA = cols[22].ToDecimal();

                bool? bactif = Conversion.StringToNBool(cols[23]);
                if (bactif.HasValue == false) return null;
                nart.d_actif = bactif.Value;

                //short v = cols[24].ToShort(); // 0;
                //nart.article_qte_stock = 0; // v;

                //string m = cols[25].Trim(); // m = "";
                //nart.article_magasin = ""; // m;

                nart.article_devise = cols[24].ToStringOrNull();

                nart.infos_caisse = cols[25].ToStringOrNull();

                return nart;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création d'article", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }


        public static Article ArticleFromString3(string[] cols)
        {
            if (cols == null || cols.Count() < 20) return null;

            try
            {
                Article nart = new Article();

                DateTime? dModif = cols[0].ToDate();
                if (dModif.HasValue == false) return null;
                nart.a_horo_modification = dModif.Value;
                
                nart.article_bonnet_designation = cols[1].ToStringOrNull();
                nart.article_code_article = cols[2];
                nart.article_commentaire = cols[3].ToStringOrNull();

                nart.article_couleur_code = cols[4].ToStringOrNull(); //.Value;

                nart.article_couleur_designation = cols[5].ToStringOrNull();
                nart.article_designation = cols[6];
                nart.article_enseigne = cols[7];
                nart.article_message_deballage = cols[8].ToStringOrNull();
                nart.article_pv_ttc = cols[9].ToDecimal();
                nart.article_reference = cols[10].ToStringOrNull();
                nart.article_reference_libelle = cols[11].ToStringOrNull();
                nart.article_reference_coloris = cols[12].ToStringOrNull();
                nart.article_statut = cols[13];
                nart.article_taille_designation = cols[14].ToStringOrNull();
                nart.article_theme_designation = cols[15].ToStringOrNull();
                nart.article_TVA = cols[16].ToDecimal();

                bool? bactif = Conversion.StringToNBool(cols[17]);
                if (bactif.HasValue == false) return null;
                nart.d_actif = bactif.Value;

                nart.article_devise = cols[18].ToStringOrNull();

                nart.infos_caisse = cols[19].ToStringOrNull();

                return nart;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création d'article", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
    }
}
