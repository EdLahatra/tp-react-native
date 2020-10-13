import moment from 'moment';

const insertArticle = `
INSERT INTO Articles(
  a_horo_modification,
  article_bonnet_designation,
  article_code_article,
  article_commentaire,
  article_couleur_code,
  article_couleur_designation,
  article_designation,
  article_enseigne,
  article_message_deballage,
  article_pv_ttc,
  article_reference,
  article_reference_libelle,
  article_reference_coloris,
  article_statut,
  article_theme_designation,
  article_theme_designation,
  article_TVA,
  d_actif,
  article_devise,
  infos_caisse) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
`;

const insertClient = `
INSERT INTO Clients(
  id_client,
  nom,
  prenom,
  telephone,
  user_createur,
  date_creation,
  date_modification,
  salarie,
  code_pin,
  remise_permanente,
  numero_carte,
  groupe,
  date_naissance,
  email,
  code_postal,
  axe1,
  axe2,
  axe3,
  axe4,
  axe5,
  axe6,
  axe7,
  axe8,
  axe9,
  axe10,
  axe11,
  axe12,
  axe13,
  axe14,
  axe15,
  axe16,
  axe17,
  axe18,
  axe19,
  axe20,
  axe21,
  axe22,
  axe23,
  axe24,
  axe25,
  axe26,
  axe27,
  axe28,
  axe29,
  axe30,
  message_caisse,
  nom_conjoint,
  prenom_conjoint,
  solde_points,
  date_modif_caisse,
  date_naissance_enfant1,
  date_naissance_enfant2,
  date_naissance_enfant3,
  date_naissance_enfant4,
  sexe_enfant1,
  sexe_enfant2,
  sexe_enfant3,
  sexe_enfant4,
  sexe) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
`;
  
const requete = "INSERT INTO Utilisateurs (date_creation, date_modif, date_naissance, derniere_connexion, droit_abandon, droit_admin, droit_avoir, droit_avoir_force, droit_cloture_sans_decompte, droit_fermeture, droit_kdo_force, droit_manager, droit_ouverture, droit_ouverture_tiroir, droit_remise1, droit_remise2, droit_remise3, droit_retour, droit_retour_force, droit_vente, droit_rembourse_esp, nom, nom_user, numero_tel, passwd, prenom) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

export const toClients = (cols: any) => {
  const values = [
    cols[0],
    cols[1],
    cols[2],
    cols[3],
    cols[4],
    cols[5],
    cols[6],
    cols[7],
    cols[8],
    cols[9],
    cols[10],
    cols[11],
    cols[12],
    cols[13],
    cols[14],
    cols[15],
    cols[16],
    cols[17],
    cols[18],
    cols[19],
    cols[20],
    cols[21],
    cols[22],
    cols[23],
    cols[24],
    cols[25],
    cols[26],
    cols[27],
    cols[28],
    cols[29],
    cols[30],
    cols[31],
    cols[32],
    cols[33],
    cols[34],
    cols[35],
    cols[36],
    cols[37],
    cols[38],
    cols[39],
    cols[40],
    cols[41],
    cols[42],
    cols[43],
    cols[44],
    cols[45],
    cols[46],
    cols[47],
    cols[48],
    cols[49],
    cols[50],
    cols[51],
    cols[52],
    cols[53],
    cols[54],
    cols[55],
    cols[56],
    cols[57],
    cols[58],
  ];
  return {
    requete: insertClient,
    values,
  }
}
// ({
//   date_creation: cols[0],
//   date_modification: cols[1],
//   id_client: cols[2],
//   nom: cols[3],
//   prenom: cols[4],
//   telephone: cols[5],
//   user_createur: cols[6],
//   salarie: cols[7]=== "1"? true : false,
//   code_pin: cols[8],
//   remise_permanente: cols[9],
//   numero_carte: cols[10],
//   groupe: cols[11],
//   date_naissance: cols[12]=== "null" ? null : cols[12],
//   email: cols[13] === "null" ? null : cols[13],
//   code_postal: cols[14] === "null" ? null : cols[14],
//   axe1: cols[15],
//   axe2: cols[16],
//   axe3: cols[17],
//   axe4: cols[18],
//   axe5: cols[19],
//   axe6: cols[20],
//   axe7: cols[21],
//   axe8: cols[22],
//   axe9: cols[23],
//   axe10: cols[24],
//   axe11: cols[25],
//   axe12: cols[26],
//   axe13: cols[27],
//   axe14: cols[28],
//   axe15: cols[29],
//   axe16: cols[30],
//   axe17: cols[31],
//   axe18: cols[32],
//   axe19: cols[33],
//   axe20: cols[34],
//   axe21: cols[35],
//   axe22: cols[36],
//   axe23: cols[37],
//   axe24: cols[38],
//   axe25: cols[39],
//   axe26: cols[40],
//   axe27: cols[41],
//   axe28: cols[42],
//   axe29: cols[43],
//   axe30: cols[44],
//   message_caisse: cols[45],
//   nom_conjoint: cols[46],
//   prenom_conjoint: cols[47],
//   solde_points: cols[48],
//   date_modif_caisse: cols[49],
//   date_naissance_enfant1: cols[50],
//   date_naissance_enfant2: cols[51],
//   date_naissance_enfant3: cols[52],
//   date_naissance_enfant4: cols[53],
//   sexe_enfant1: cols[54],
//   sexe_enfant2: cols[55],
//   sexe_enfant3: cols[56],
//   sexe_enfant4: cols[57],
//   sexe: cols[58],
// });

export const toArticle = (cols: any) => cols && cols.length > 17 ? ({ requete: insertArticle, values: cols }) : {};

// ({
//   a_horo_modification: cols[0],
//   article_bonnet_designation: cols[6],
//   article_code_article: cols[7],
//   article_commentaire: cols[9],
//   article_couleur_code: cols[10], //.Value,
//   article_couleur_designation: cols[11],
//   article_designation: cols[12],
//   article_enseigne: cols[13],
//   article_message_deballage: cols[14],
//   article_pv_ttc: cols[15],
//   article_reference: cols[16],
//   article_reference_libelle: cols[17],
//   article_reference_coloris: cols[18],
//   article_statut: cols[19],
//   article_taille_designation: cols[20],
//   article_theme_designation: cols[21],
//   article_TVA: cols[22],
//   bactif: cols[23] ? true : false,
//   d_actif: cols[23],
//   article_devise: cols[26],
// });

const insertArticlesCodesBarres = `
INSERT INTO ArticlesCodesBarres(code_barre, article_code_article) VALUES (?,?);
`;

export const toArticlesCodesBarre = (cols: any) => {
  if(!cols || cols.length !== 2 || cols[0].length < 5) {
    return {};
  }
  return {
    requete: insertArticlesCodesBarres,
    values: {
      code_barre: cols[0],
      article_code_article: cols[1],
    },
  }
}

const insertModesReglementsVerifs = `
INSERT INTO ModesReglementsVerifs (type_carte, id_carte, date_modif) VALUES (?,?,?);
`;

export const toModesReglementsVerifs = (cols: any) => {
  if(!cols || cols.length < 3) {
    return {};
  }
  return {
    requete: insertModesReglementsVerifs,
    values: {
      type_carte: cols[0],
      id_carte: cols[1],
      date_modif: cols[2],
    },
  }
}

// ({
//   code_barre: cols[0],
//   article_code_article: cols[1],
// });

const insertMagasin = `
INSERT INTO Magasins(
  code_magasin_franchiseur,
  code_magasin_interne,
  date_modification,
  designation,
  no_enseigne,
  no_magasin,
  ville,
  enseigne,
  need_deballage) VALUES (?,?,?,?,?,?,?,?,?);
`;

export const toMagasin = (cols: any) => {
  if (!cols || cols.length < 9) {
    return null;
  }

  const values = {
    code_magasin_franchiseur: cols[0],
    code_magasin_interne: cols[1],
    date_modification: cols[2],
    designation: cols[3],
    //id_magasin: cols[4], // autoincrement
    no_enseigne: cols[5],
    no_magasin: cols[6],
    ville: cols[7],
    enseigne: cols[8],
    need_deballage: cols[9],
  }

  return {
    values,
    requete: insertMagasin,
  }
};

const insertMessage = `
INSERT INTO Messages(
  contenu,
  date_creation,
  date_lecture,
  date_modification,
  destination,
  source,
  usr_destination,
  usr_source) VALUES (?,?,?,?,?,?,?,?);
`;


export  const toMessages = (cols: any) => {
  if (!cols || cols < 8) {
    return [];
  }
  return {
    requete: insertMessage,
    values: {
      contenu: cols[0],
      date_creation: cols[1],
      date_lecture: cols[2],
      date_modification: cols[3],
      destination: cols[4],
      source: cols[6],
      usr_destination: cols[7],
      usr_source: cols[8],
    }
  }
};

const insertModesReglements = `
INSERT INTO ModesReglements(
  autorise_rendu_monnaie,
  code_mode_reglement,
  date_modification,
  libelle_mode_reglement,
  type_decompte,
  ordre_affichage,
  actif,
  montant_min,
  montant_max,
  demande_id_unique,
  verif_id_unique,
  need_depot_banque) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);
`;

export const toModesReglements = (cols: any) => {
  if (!cols || !cols[0] || cols[0] === 'false' || !cols[1]) {
    return [];
  }
  const values = {
    autorise_rendu_monnaie: cols[0],
    code_mode_reglement: cols[1],
    date_modification: toDate(cols[2]),
    libelle_mode_reglement: cols[3],
    type_decompte: cols[4],
    ordre_affichage: cols[5],
    actif: cols[6],
    montant_min: cols[7],
    montant_max: cols[8],
    demande_id_unique: cols[9],
    verif_id_unique: cols[10],
    need_depot_banque: cols[11],
  }

  return {
    values,
    requete: insertModesReglements,
  }
}
// ({
//   autorise_rendu_monnaie: cols[0],
//   code_mode_reglement: cols[1],
//   date_modification: cols[2],
//   libelle_mode_reglement: cols[3],
// });

export const toMotifsGenerique = (cols: any) => ({
  date_modif: cols[0].Value,
  id_motif_generique: cols[1],
  libelle_motif: cols[2],
  id_type: cols[3],
});

const insertMotifsRemises = `
INSERT INTO MotifsRemises(
  date_modification,
  id_motif_remise,
  libelle_complet,
  libelle_impression,
  niveau_droit,
  pourcent_remise_max) VALUES (?,?,?,?,?,?);
`;


export  const toMotifsRemises = (cols: any) => {
  if (!cols || !cols[0] || cols.length < 4) {
    return [];
  }
  return {
    requete: insertMotifsRemises,
    values: {
      date_modification: cols[0],
      id_motif_remise: cols[1],
      libelle_complet: cols[2],
      libelle_impression: cols[3],
      niveau_droit: cols[4],
      pourcent_remise_max: cols[5],
    }
  }
};

const insertParametre = `
INSERT INTO Parametres (Caisse, Variable, Enseigne, CodeMag) VALUES (?,?,?,?);
`;


export  const toParametres = (cols: any) => {
  if (cols && cols.length > 2) {
    return {
      requete: insertParametre,
      values: {
        Caisse: cols[3],
        Variable: cols[0],
        Enseigne: cols[1],
        CodeMag: cols[2],
      }
    }
  }
  return [];
};

export  const toPromosCoupons = (cols: any) => ({
  code_coupon: cols[0],
  date_creation: cols[1],
  date_fin: cols[2],
  id_promo_cible: cols[3],
  id_promo_source: cols[4],
  no_ticket: cols[5],
  user_creation: cols[6],
});

const insertPromo = `
INSERT INTO Promos(
  id_promo,
  code_magasin,
  date_debut,
  date_fin,
  montant_remise,
  pourcent_remise,
  montant_cible,
  quantite_requise,
  lot_ref1,
  lot_ref2,
  lot_ref3,
  lot_ref4,
  lot_ref5,
  lot_ref6,
  lot_ref7,
  lot_ref8,
  lot_ref9,
  lot_ref10,
  lot_ref11,
  lot_ref12,
  lot_ref13,
  lot_ref14,
  lot_ref15,
  designation,
  conditions,
  message_client) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
`;

export  const toPromo = (cols: any) => {
  return {
    requete: insertPromo,
    values: {
      id_promo: cols[0],
      code_magasin: cols[1],
      date_debut: cols[2],
      date_fin: cols[3],
      montant_remise: cols[4],
      pourcent_remise: cols[5],
      montant_cible: cols[6],
      quantite_requise: cols[7],
      lot_ref1: cols[8],
      lot_ref2: cols[9],
      lot_ref3: cols[10],
      lot_ref4: cols[11],
      lot_ref5: cols[12],
      lot_ref6: cols[13],
      lot_ref7: cols[14],
      lot_ref8: cols[15],
      lot_ref9: cols[16],
      lot_ref10: cols[17],
      lot_ref11: cols[18],
      lot_ref12: cols[19],
      lot_ref13: cols[20],
      lot_ref14: cols[21],
      lot_ref15: cols[22],
      designation: cols[23],
      conditions: cols[24],
      message_client: cols[25],
    }
  }
};

export const toDate = (col: Date) => Math.floor((moment(col).valueOf() || 1000) / 1000);

export  const toUtilisateurs = (cols: any) => {
  const nbC = cols.length;
  if (nbC !== 27) return [];

  const values = [
    toDate(cols[0]),
    toDate(cols[1]),
    toDate(cols[2]),
    toDate(cols[3]),
    cols[4],
    cols[5],
    cols[6],
    cols[7],
    cols[8],
    cols[9],
    cols[10],
    cols[11],
    cols[12],
    cols[13],
    cols[14],
    cols[15],
    cols[16],
    cols[17],
    cols[18],
    cols[19],
    cols[20],
    cols[22],
    cols[23],
    cols[24],
    cols[25],
    cols[26]
  ];
  

  return {
    requete,
    values,
  };
  // return {
  //   date_creation: toDate(cols[0]),
  //   date_modif: toDate(cols[1]),
  //   date_naissance: toDate(cols[2]),
  //   derniere_connexion: toDate(cols[3]),
  //   droit_abandon: cols[4],
  //   droit_admin: cols[5],
  //   droit_avoir: cols[6],
  //   droit_avoir_force: cols[7],
  //   droit_cloture_sans_decompte: cols[8],
  //   droit_fermeture: cols[9],
  //   droit_kdo_force: cols[10],
  //   droit_manager: cols[11],
  //   droit_ouverture: cols[12],
  //   droit_ouverture_tiroir: cols[13],
  //   droit_remise1: cols[14],
  //   droit_remise2: cols[15],
  //   droit_remise3: cols[16],
  //   droit_retour: cols[17],
  //   droit_retour_force: cols[18],
  //   droit_vente: cols[19],
  //   droit_rembourse_esp: cols[20],
  //   nom: cols[22],
  //   nom_user: cols[23],
  //   numero_tel: cols[24],
  //   passwd: cols[25], // Math.random()
  //   prenom: cols[26],
  // }
};

export default {
  Clients: toClients,
  Articles: toArticle,
  ArticlesCodesBarres: toArticlesCodesBarre,
  Promos: toPromo,
  Utilisateurs: toUtilisateurs,
  PromosCoupons: toPromosCoupons,
  Parametres: toParametres,
  MotifsRemises: toMotifsRemises,
  ModesReglements: toModesReglements,
  Messages: toMessages,
  Magasins: toMagasin,
  ModesReglementsVerifs: toModesReglementsVerifs,
};