using System;
using System.Linq;
using MFControls;
using ShopIT_Common;

namespace ShopIT_SynchroniseurCaisse.Services.Csv
{
    public static class ClientUtility
    {
        public static Client ClientFromString(string[] cols)
        {
            if (cols == null || cols.Count() < 45) return null; // 12

            try
            {
                Client ncli = new Client();

                DateTime? dCreation = cols[0].ToDate();
                if (dCreation.HasValue == false) return null;
                ncli.date_creation = dCreation.Value;

                ncli.date_modification = cols[1].ToDate();
                ncli.id_client = cols[2];
                ncli.nom = cols[3];
                ncli.prenom = cols[4];
                ncli.telephone = cols[5];
                ncli.user_createur = cols[6];
                ncli.salarie = (cols[7] == "1" ? true : false);
                ncli.code_pin = cols[8].ToStringOrNull();
                ncli.remise_permanente = Conversion.NullableByte(cols[9]);
                ncli.numero_carte = cols[10].FillIn(30);
                ncli.groupe = cols[11].FillIn(15);

                ncli.date_naissance = (cols[12] == "null" ? null : cols[12].ToDate());
                ncli.email = (cols[13] == "null" ? null : cols[13]).FillIn(70);
                ncli.code_postal = (cols[14] == "null" ? null : cols[14]).FillIn(5);
                ncli.axe1 = cols[15].FillIn(1);
                ncli.axe2 = cols[16].FillIn(1);
                ncli.axe3 = cols[17].FillIn(1);
                ncli.axe4 = cols[18].FillIn(1);
                ncli.axe5 = cols[19].FillIn(1);
                ncli.axe6 = cols[20].FillIn(1);
                ncli.axe7 = cols[21].FillIn(1);
                ncli.axe8 = cols[22].FillIn(1);
                ncli.axe9 = cols[23].FillIn(1);
                ncli.axe10 = cols[24].FillIn(1);
                ncli.axe11 = cols[25].FillIn(1);
                ncli.axe12 = cols[26].FillIn(1);
                ncli.axe13 = cols[27].FillIn(1);
                ncli.axe14 = cols[28].FillIn(1);
                ncli.axe15 = cols[29].FillIn(1);
                ncli.axe16 = cols[30].FillIn(1);
                ncli.axe17 = cols[31].FillIn(1);
                ncli.axe18 = cols[32].FillIn(1);
                ncli.axe19 = cols[33].FillIn(1);
                ncli.axe20 = cols[34].FillIn(1);
                ncli.axe21 = cols[35].FillIn(1);
                ncli.axe22 = cols[36].FillIn(1);
                ncli.axe23 = cols[37].FillIn(1);
                ncli.axe24 = cols[38].FillIn(1);
                ncli.axe25 = cols[39].FillIn(1);
                ncli.axe26 = cols[40].FillIn(1);
                ncli.axe27 = cols[41].FillIn(1);
                ncli.axe28 = cols[42].FillIn(1);
                ncli.axe29 = cols[43].FillIn(1);
                ncli.axe30 = cols[44].FillIn(1);

                ncli.message_caisse = null;
                if (cols.Count() > 45)
                {
                    string s = cols[45].FillIn(250);
                    if (string.IsNullOrWhiteSpace(s) == true || s == "null") s = null;
                    ncli.message_caisse = s;

                    if (cols.Count() > 46)
                    {
                        //Dossier 004

                        ncli.nom_conjoint = cols[46];
                        ncli.prenom_conjoint = cols[47];
                        ncli.solde_points = cols[48].ToInt();
                        ncli.date_modif_caisse = cols[49].ToDate();

                    }

                    if (cols.Count() > 50)
                    {
                        //Dossier 022
                        ncli.date_naissance_enfant1 = cols[50].ToDate();
                        ncli.date_naissance_enfant2 = cols[51].ToDate();
                        ncli.date_naissance_enfant3 = cols[52].ToDate();
                        ncli.date_naissance_enfant4 = cols[53].ToDate();
                        ncli.sexe_enfant1 = cols[54].FillIn(1);
                        ncli.sexe_enfant2 = cols[55].FillIn(1);
                        ncli.sexe_enfant3 = cols[56].FillIn(1);
                        ncli.sexe_enfant4 = cols[57].FillIn(1);                        
                    }
                    
                    if (cols.Count() > 58)
                    {
                        // rajout le 2020-01-27
                        ncli.sexe = cols[58].FillIn(1);
                    }
                }

                return ncli;
            }
            catch (Exception ex)
            {
                App.ShowAndSaveLog("Une erreur " + ex.GetType().Name + " s'est produite pendant la création de client.", "Ligne : " + string.Join(";", cols) + "\r\nDétails : " + ex.Message + (ex.InnerException != null ? " - " + ex.InnerException.Message : ""), false);
                return null;
            }
        }
    }
}
