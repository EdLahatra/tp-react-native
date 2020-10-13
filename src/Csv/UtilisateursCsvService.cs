using System.Collections.Generic;
using System.Linq;

namespace ShopIT_SynchroniseurCaisse.Services.Csv
{
    public static class UtilisateursCsvService
    {
        public static void Clean(ShopITDBEntities entity, List<Utilisateur> users)
        {
            List<Utilisateur> usersAVirer = new List<Utilisateur>();
            int j = 0;
            bool quitte = true;
            do
            {
                quitte = true;

                foreach (Utilisateur user in users)
                {
                    string h1 = user.GetHash();
                    string nom_user = user.nom_user;

                    Utilisateur u2 = users.FirstOrDefault(c => c.nom_user == nom_user && c.id_user != user.id_user);
                    if (u2 != null)
                    {
                        string h2 = u2.GetHash();

                        if (h2.Length > h1.Length)
                        {
                            users.Remove(user);
                            usersAVirer.Add(user);
                            quitte = false;
                            break;
                        }
                        else // if (h2.Length <= h1.Length)
                        {
                            users.Remove(u2);
                            usersAVirer.Add(u2);
                            quitte = false;
                            break;
                        }
                    }
                    else
                    {
                        users.Remove(user);
                        quitte = false;
                        break;
                    }
                }
                j++;
            } while (quitte == false && j < 10000);
            if (usersAVirer.Count > 0)
            {
                foreach (Utilisateur user in usersAVirer)
                {
                    entity.Utilisateurs.Remove(user);
                }
                entity.SaveChanges();
            }
        }
    }
}
