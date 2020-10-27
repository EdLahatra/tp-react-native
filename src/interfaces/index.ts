export interface FormatData {
  [s: string]: string | Date | number
};

export interface ClientI{
  sexe: string,
           sexe_enfant2: string,
           sexe_enfant1: string,
           date_naissance_enfant1: string,
           solde_points: string,
           prenom_conjoint: string,
           synchro_up: number,
           nom_conjoint: string,
           date_naissance_enfant2: string,
           message_caisse: string,
           axe25: string,
           axe22: string,
           axe20: string,
           date_naissance_enfant4: string,
           axe19: string,
           axe30: string,
           axe18: string,
           axe17: string,
           axe16: string,
           user_createur: string,
           axe11: string,
           axe24: string,
           axe10: string,
           axe5: string,
           axe8: string,
           numero_carte: string,
           axe4: string,
           code_pin: string,
           date_naissance_enfant3: string,
           axe29:string,
           axe3: string,
           axe1: string,
           axe12: string,
           axe7: string,
           axe27: string,
           code_postal: string,
           axe23: string,
           axe21: string,
           axe2: string,
           id: number,
           email: string,
           axe14: string,
           remise_permanente: string,
           axe13: string,
           date_naissance: string,
           date_modification: string,
           id_client: string,
           date_modif_caisse: string,
           groupe: string,
           sexe_enfant3: string,
           date_creation: string,
           axe28: string,
           axe15: string,
           axe6:string,
           telephone: string,
           axe9: string,
           salarie: number,
           axe26:string,
           sexe_enfant4: string,
           nom: string,
           prenom: string 
};

export interface ArticleI{
  qt:number,
  article_devise: string,
        article_TVA: string,
        article_message_deballage: string,
        article_bonnet_designation: string,
        article_designation: string,
        article_code_article: string,
        article_theme_designation: String,
        article_taille_designation: string,
        article_enseigne: string,
        article_reference_coloris: string,
        article_reference_libelle: string,
        article_reference: string,
        article_statut: string,
        a_horo_modification: string,
        article_couleur_designation: string,
        article_couleur_code: string,
        id: number,
        d_actif: number,
        infos_caisse: string,
        article_commentaire: string,
        article_pv_ttc: string
}
  