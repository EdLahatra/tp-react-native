using System;
using System.Linq;
using MFControls;
using ShopIT_Common;

namespace ShopIT_SynchroniseurCaisse.Services.Csv
{
    public static class UtilisateurUtility
    {
        public static Utilisateur UtilisateurFromString2(string[] cols)
        {
            if (cols == null || cols.Count() != 26) return null;

            try
            {
                Utilisateur nuser = new Utilisateur();

                nuser.date_creation = cols[0].ToDate();
                nuser.date_modif = cols[1].ToDate();
                nuser.date_naissance = cols[2].ToDate();
                nuser.derniere_connexion = cols[3].ToDate();

                bool? n1 = Conversion.StringToNBool(cols[4]);
                if (!n1.HasValue)
                {
                    return null;
                }
                nuser.droit_abandon = n1.Value;

                bool? n2 = Conversion.StringToNBool(cols[5]);
                if (!n2.HasValue)
                {
                    return null;
                }
                nuser.droit_admin = n2.Value;

                bool? n3 = Conversion.StringToNBool(cols[6]);
                if (!n3.HasValue)
                {
                    return null;
                }
                nuser.droit_avoir = n3.Value; // nouveau

                bool? n4 = Conversion.StringToNBool(cols[7]);
                if (!n4.HasValue)
                {
                    return null;
                }
                nuser.droit_avoir_force = n4.Value; // nouveau

                bool? n5 = Conversion.StringToNBool(cols[8]);
                if (!n5.HasValue)
                {
                    return null;
                }
                nuser.droit_cloture_sans_decompte = n5.Value; // nouveau

                bool? n6 = Conversion.StringToNBool(cols[9]);
                if (!n6.HasValue)
                {
                    return null;
                }
                nuser.droit_fermeture = n6.Value; // nouveau

                bool? n7 = Conversion.StringToNBool(cols[10]);
                if (!n7.HasValue)
                {
                    return null;
                }
                nuser.droit_kdo_force = n7.Value; // nouveau

                bool? n8 = Conversion.StringToNBool(cols[11]);
                if (!n8.HasValue)
                {
                    return null;
                }
                nuser.droit_manager = n8.Value;

                bool? n9 = Conversion.StringToNBool(cols[12]);
                if (!n9.HasValue)
                {
                    return null;
                }
                nuser.droit_ouverture = n9.Value;

                bool? n10 = Conversion.StringToNBool(cols[13]);
                if (!n10.HasValue)
                {
                    return null;
                }
                nuser.droit_ouverture_tiroir = n10.Value; // nouveau

                bool? n11 = Conversion.StringToNBool(cols[14]);
                if (!n11.HasValue)
                {
                    return null;
                }
                nuser.droit_remise1 = n11.Value;

                bool? n12 = Conversion.StringToNBool(cols[15]);
                if (!n12.HasValue)
                {
                    return null;
                }
                nuser.droit_remise2 = n12.Value; // nouveau

                bool? n13 = Conversion.StringToNBool(cols[16]);
                if (!n13.HasValue)
                {
                    return null;
                }
                nuser.droit_remise3 = n13.Value; // nouveau

                bool? n14 = Conversion.StringToNBool(cols[17]);
                if (!n14.HasValue)
                {
                    return null;
                }
                nuser.droit_retour = n14.Value;

                int z = 18;

                //if (cols.Count() == 27)
                //{
                //    bool? n15 = Conversion.StringToNBool(cols[z]); // 18
                //    if (n15.HasValue == false) return null;
                //    nuser.droit_retour_force = n15.Value;
                //    z++;
                //}

                bool? n16 = Conversion.StringToNBool(cols[z]);
                if (!n16.HasValue)
                {
                    return null;
                }
                nuser.droit_vente = n16.Value;
                z++;

                bool? n17 = Conversion.StringToNBool(cols[z]);
                if (!n17.HasValue)
                {
                    return null;
                }
                nuser.droit_rembourse_esp = n17.Value;
                z++;

                //nuser.id_user = cols[z]; // autoincrément
                z++;

                nuser.nom = cols[z].ToStringOrNull();
                z++;

                nuser.nom_user = cols[z];
                z++;

                nuser.numero_tel = cols[z].ToStringOrNull();
                z++;

                nuser.passwd = cols[z];
                z++;

                nuser.prenom = cols[z].ToStringOrNull();

                return nuser;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création d'utilisateur.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
        // généré depuis le 2017-11-09
        public static Utilisateur UtilisateurFromString3(string[] cols)
        {
            if (cols == null || cols.Count() != 27) return null;

            try
            {
                Utilisateur nuser = new Utilisateur();

                nuser.date_creation = cols[0].ToDate();
                nuser.date_modif = cols[1].ToDate();
                nuser.date_naissance = cols[2].ToDate();
                nuser.derniere_connexion = cols[3].ToDate();

                bool? n1 = Conversion.StringToNBool(cols[4]);
                if (!n1.HasValue)
                {
                    return null;
                }
                nuser.droit_abandon = n1.Value;

                bool? n2 = Conversion.StringToNBool(cols[5]);
                if (!n2.HasValue)
                {
                    return null;
                }
                nuser.droit_admin = n2.Value;

                bool? n3 = Conversion.StringToNBool(cols[6]);
                if (!n3.HasValue)
                {
                    return null;
                }
                nuser.droit_avoir = n3.Value; // nouveau

                bool? n4 = Conversion.StringToNBool(cols[7]);
                if (!n4.HasValue)
                {
                    return null;
                }
                nuser.droit_avoir_force = n4.Value; // nouveau

                bool? n5 = Conversion.StringToNBool(cols[8]);
                if (!n5.HasValue)
                {
                    return null;
                }
                nuser.droit_cloture_sans_decompte = n5.Value; // nouveau

                bool? n6 = Conversion.StringToNBool(cols[9]);
                if (!n6.HasValue)
                {
                    return null;
                }
                nuser.droit_fermeture = n6.Value; // nouveau

                bool? n7 = Conversion.StringToNBool(cols[10]);
                if (!n7.HasValue)
                {
                    return null;
                }
                nuser.droit_kdo_force = n7.Value; // nouveau

                bool? n8 = Conversion.StringToNBool(cols[11]);
                if (!n8.HasValue)
                {
                    return null;
                }
                nuser.droit_manager = n8.Value;

                bool? n9 = Conversion.StringToNBool(cols[12]);
                if (!n9.HasValue)
                {
                    return null;
                }
                nuser.droit_ouverture = n9.Value;

                bool? n10 = Conversion.StringToNBool(cols[13]);
                if (!n10.HasValue)
                {
                    return null;
                }
                nuser.droit_ouverture_tiroir = n10.Value; // nouveau

                bool? n11 = Conversion.StringToNBool(cols[14]);
                if (!n11.HasValue)
                {
                    return null;
                }
                nuser.droit_remise1 = n11.Value;

                bool? n12 = Conversion.StringToNBool(cols[15]);
                if (!n12.HasValue)
                {
                    return null;
                }
                nuser.droit_remise2 = n12.Value; // nouveau

                bool? n13 = Conversion.StringToNBool(cols[16]);
                if (!n13.HasValue)
                {
                    return null;
                }
                nuser.droit_remise3 = n13.Value; // nouveau

                bool? n14 = Conversion.StringToNBool(cols[17]);
                if (!n14.HasValue)
                {
                    return null;
                }
                nuser.droit_retour = n14.Value;

                int z = 18;

                //if (cols.Count() == 27)
                //{
                bool? n15 = Conversion.StringToNBool(cols[z]); // 18
                if (!n15.HasValue)
                {
                    return null;
                }
                nuser.droit_retour_force = n15.Value;
                z++;
                //}

                bool? n16 = Conversion.StringToNBool(cols[z]);
                if (!n16.HasValue)
                {
                    return null;
                }
                nuser.droit_vente = n16.Value;
                z++;

                bool? n17 = Conversion.StringToNBool(cols[z]);
                if (!n17.HasValue)
                {
                    return null;
                }
                nuser.droit_rembourse_esp = n17.Value;
                z++;

                //nuser.id_user = cols[z]; // autoincrément
                z++;

                nuser.nom = cols[z].ToStringOrNull();
                z++;

                nuser.nom_user = cols[z];
                z++;

                nuser.numero_tel = cols[z].ToStringOrNull();
                z++;

                nuser.passwd = cols[z];
                z++;

                nuser.prenom = cols[z].ToStringOrNull();

                return nuser;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création d'utilisateur.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }

        public static Utilisateur UtilisateurFromString(string[] cols)
        {
            if (cols == null || cols.Count() < 17)
            {
                return null;
            }

            try
            {
                Utilisateur nuser = new Utilisateur();

                nuser.date_creation = cols[0].ToDate();
                nuser.date_modif = cols[1].ToDate();
                nuser.date_naissance = cols[2].ToDate();
                nuser.derniere_connexion = cols[3].ToDate();

                bool? n1 = Conversion.StringToNBool(cols[4]);
                if (!n1.HasValue)
                {
                    return null;
                }
                nuser.droit_abandon = n1.Value;

                bool? n2 = Conversion.StringToNBool(cols[5]);
                if (!n2.HasValue)
                {
                    return null;
                }
                nuser.droit_admin = n2.Value;

                bool? n3 = Conversion.StringToNBool(cols[6]);
                if (!n3.HasValue)
                {
                    return null;
                }
                nuser.droit_manager = n3.Value;

                bool? n4 = Conversion.StringToNBool(cols[7]);
                if (!n4.HasValue)
                {
                    return null;
                }
                nuser.droit_ouverture = n4.Value;

                bool? n5 = Conversion.StringToNBool(cols[8]);
                if (!n5.HasValue)
                {
                    return null;
                }
                nuser.droit_remise1 = n5.Value;

                bool? n6 = Conversion.StringToNBool(cols[9]);
                if (!n6.HasValue)
                {
                    return null;
                }
                nuser.droit_retour = n6.Value;

                bool? n7 = Conversion.StringToNBool(cols[10]);
                if (!n7.HasValue)
                {
                    return null;
                }
                nuser.droit_vente = n7.Value;

                //nuser.id_user = cols[11]; // autoincrément
                nuser.nom = cols[12].ToStringOrNull();
                nuser.nom_user = cols[13];
                nuser.numero_tel = cols[14].ToStringOrNull();
                nuser.passwd = cols[15];
                nuser.prenom = cols[16].ToStringOrNull();

                return nuser;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création d'utilisateur.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
        // added on 2020-03-26
        public static Utilisateur UtilisateurFromString4(string[] cols)
        {
            if (cols == null || cols.Count() != 28) return null;

            try
            {
                Utilisateur nuser = new Utilisateur();

                nuser.date_creation = cols[0].ToDate();
                nuser.date_modif = cols[1].ToDate();
                nuser.date_naissance = cols[2].ToDate();
                nuser.derniere_connexion = cols[3].ToDate();

                int z = 4;

                bool? b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_abandon = b.Value;
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_admin = b.Value;
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_avoir = b.Value; // nouveau
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_avoir_force = b.Value; // nouveau
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_cloture_sans_decompte = b.Value; // nouveau
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_fermeture = b.Value; // nouveau
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_kdo_force = b.Value; // nouveau
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_manager = b.Value;
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_ouverture = b.Value;
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_ouverture_tiroir = b.Value; // nouveau
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_remise1 = b.Value;
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_remise2 = b.Value; // nouveau
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_remise3 = b.Value; // nouveau
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_retour = b.Value;
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_retour_force = b.Value;
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_vente = b.Value;
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_rembourse_esp = b.Value;
                z++;

                b = Conversion.StringToNBool(cols[z]);
                if (!b.HasValue)
                {
                    return null;
                }
                nuser.droit_annuler_ligne = b.Value;
                z++;

                //nuser.id_user = cols[z]; // autoincrément
                z++;

                nuser.nom = cols[z].ToStringOrNull();
                z++;

                nuser.nom_user = cols[z];
                z++;

                nuser.numero_tel = cols[z].ToStringOrNull();
                z++;

                nuser.passwd = cols[z];
                z++;

                nuser.prenom = cols[z].ToStringOrNull();

                return nuser;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création d'utilisateur.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }

    }
}
