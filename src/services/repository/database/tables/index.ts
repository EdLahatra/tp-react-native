export default {
  Clients: `
  CREATE TABLE IF NOT EXISTS Clients(
    [id_client] [varchar](17) NOT NULL,
    [nom] [nvarchar](60) NOT NULL,
    [prenom] [nvarchar](60) NOT NULL,
    [telephone] [varchar](10) NOT NULL,
    [user_createur] [varchar](30) NOT NULL,
    [date_creation] [datetime] NOT NULL,
    [date_modification] [datetime] NULL,
    [salarie] [bit] NOT NULL,
    [code_pin] [varchar](32) NULL,
    [remise_permanente] [tinyint] NULL,
    [numero_carte] [varchar](30) NOT NULL,
    [groupe] [varchar](15) NOT NULL,
    [date_naissance] [date] NULL,
    [email] [varchar](70) NULL,
    [code_postal] [char](5) NULL,
    [axe1] [char](1) NOT NULL,
    [axe2] [char](1) NOT NULL,
    [axe3] [char](1) NOT NULL,
    [axe4] [char](1) NOT NULL,
    [axe5] [char](1) NOT NULL,
    [axe6] [char](1) NOT NULL,
    [axe7] [char](1) NOT NULL,
    [axe8] [char](1) NOT NULL,
    [axe9] [char](1) NOT NULL,
    [axe10] [char](1) NOT NULL,
    [axe11] [char](1) NOT NULL,
    [axe12] [char](1) NOT NULL,
    [axe13] [char](1) NOT NULL,
    [axe14] [char](1) NOT NULL,
    [axe15] [char](1) NOT NULL,
    [axe16] [char](1) NOT NULL,
    [axe17] [char](1) NOT NULL,
    [axe18] [char](1) NOT NULL,
    [axe19] [char](1) NOT NULL,
    [axe20] [char](1) NOT NULL,
    [axe21] [char](1) NOT NULL,
    [axe22] [char](1) NOT NULL,
    [axe23] [char](1) NOT NULL,
    [axe24] [char](1) NOT NULL,
    [axe25] [char](1) NOT NULL,
    [axe26] [char](1) NOT NULL,
    [axe27] [char](1) NOT NULL,
    [axe28] [char](1) NOT NULL,
    [axe29] [char](1) NOT NULL,
    [axe30] [char](1) NOT NULL,
    [message_caisse] [varchar](250) NULL,
    [nom_conjoint] [nvarchar](60) NULL,
    [prenom_conjoint] [nvarchar](60) NULL,
    [solde_points] [int] NULL,
    [date_modif_caisse] [datetime] NULL,
    [date_naissance_enfant1] [datetime] NULL,
    [date_naissance_enfant2] [datetime] NULL,
    [date_naissance_enfant3] [datetime] NULL,
    [date_naissance_enfant4] [datetime] NULL,
    [sexe_enfant1] [char](1) NULL,
    [sexe_enfant2] [char](1) NULL,
    [sexe_enfant3] [char](1) NULL,
    [sexe_enfant4] [char](1) NULL,
    [sexe] [char](1) NULL
  );
  `,

  Articles: `
  CREATE TABLE IF NOT EXISTS Articles(
    [infos_caisse] [varchar](1000) NULL,
    [a_horo_modification] [datetime] NOT NULL,
    [d_actif] [bit] NOT NULL,
    [article_pv_ttc] [nvarchar](25) NULL,
    [article_reference] [nvarchar](5) NULL,
    [article_reference_libelle] [nvarchar](5) NULL,
    [article_reference_coloris] [nvarchar](5) NULL,
    [article_code_article] [varchar](45) NOT NULL,
    [article_statut] [nvarchar](25) NOT NULL,
    [article_enseigne] [varchar](3) NOT NULL,
    [article_designation] [nvarchar](70) NOT NULL,
    [article_commentaire] [nvarchar](500) NULL,
    [article_couleur_code] [varchar](20) NULL,
    [article_couleur_designation] [varchar](20) NULL,
    [article_taille_designation] [varchar](20) NULL,
    [article_bonnet_designation] [nvarchar](2) NULL,
    [article_message_deballage] [nvarchar](150) NULL,
    [article_theme_designation] [varchar](5) NULL,
    [article_TVA] [varchar](20) NULL,
    [article_devise] [varchar](5) NULL
  );
  `,

  ArticlesCodesBarres: `
  CREATE TABLE IF NOT EXISTS ArticlesCodesBarres(
    [code_barre] [varchar](45) NULL,
    [article_code_article] [varchar](45) NULL
  );
  `,

  Magasins: `
  CREATE TABLE IF NOT EXISTS Magasins(
    [code_magasin_franchiseur] [varchar](5) NULL,
    [code_magasin_interne] [varchar](8) NULL,
    [designation] [varchar](100) NULL,
    [ville] [varchar](50) NULL,
    [no_enseigne] [varchar](3) NULL,
    [no_magasin] [varchar](3) NULL,
    [date_modification] [datetime] NULL,
    [enseigne] [varchar](3) NULL,
    [need_deballage] [varchar](3) NULL
  );
  `,

  Messages: `
  CREATE TABLE IF NOT EXISTS Messages(
    [usr_source] [varchar](30) NULL,
    [source] [varchar](100) NULL,
    [usr_destination] [varchar](30) NULL,
    [destination] [varchar](30) NULL,
    [contenu] [nvarchar](4000) NULL,
    [date_creation] [datetime] NULL,
    [date_lecture] [datetime] NULL,
    [date_modification] [datetime] NULL
  );
  `,

  ModesReglements: `
  CREATE TABLE IF NOT EXISTS ModesReglements(
    [code_mode_reglement] [nvarchar](3) NULL,
    [libelle_mode_reglement] [nvarchar](20) NULL,
    [autorise_rendu_monnaie] [bit] NULL,
    [date_modification] [datetime] NULL,
    [type_decompte] [varchar](10) NULL,
    [ordre_affichage] [tinyint] NULL,
    [actif] [bit] NULL,
    [montant_min] [money] NULL,
    [montant_max] [money] NULL,
    [demande_id_unique] [bit] NULL,
    [verif_id_unique] [bit] NULL,
    [need_depot_banque] [bit] NULL
  );
  `,

  MotifsGeneriques: `
  CREATE TABLE IF NOT EXISTS MotifsGenerique(
    [date_modif] [varchar](5) NULL,
    [id_motif_generique] [varchar](5) NULL,
    [libelle_motif] [varchar](5) NULL,
    [id_type] [varchar](5) NULL
  );
  `,

  MotifsRemises: `
  CREATE TABLE IF NOT EXISTS MotifsRemises(
    [id_motif_remise] [int] IDENTITY(1,1) NULL,
    [libelle_impression] [nvarchar](20) NULL,
    [libelle_complet] [nvarchar](50) NULL,
    [date_modification] [datetime] NULL,
    [niveau_droit] [tinyint] NULL,
    [pourcent_remise_max] [tinyint] NULL
  );
  `,

  Parametres: `
  CREATE TABLE IF NOT EXISTS Parametres(
    [Caisse] [nvarchar](50) NULL,
    [Variable] [nvarchar](50) NULL,
    [Enseigne] [nvarchar](255) NULL,
    [CodeMag] [nvarchar](255) NULL
  );
  `,

  PromosCoupons: `
  CREATE TABLE IF NOT EXISTS PromosCoupons(
    [code_coupon] [varchar](19) NOT NULL,
    [date_creation] [datetime] NOT NULL,
    [user_creation] [varchar](30) NOT NULL,
    [date_modif] [datetime] NOT NULL,
    [no_ticket] [varchar](12) NOT NULL,
    [id_promo_source] [int] NOT NULL,
    [id_promo_cible] [int] NOT NULL,
    [date_fin] [datetime] NULL,
    [nb_utilisation_autorise] [smallint] NOT NULL,
    [nb_utilisation_restant] [smallint] NOT NULL
  );
  `,

  Promos: `
  CREATE TABLE IF NOT EXISTS Promos(
    [id_promo] [int] IDENTITY(1,1) NULL,
    [code_magasin] [varchar](5) NULL,
    [date_debut] [datetime] NULL,
    [date_fin] [datetime] NULL,
    [date_modification] [datetime] NULL,
    [montant_remise] [money] NULL,
    [pourcent_remise] [tinyint] NULL,
    [montant_cible] [money] NULL,
    [quantite_requise] [tinyint] NULL,
    [designation] [varchar](50) NULL,
    [lot_ref1] [text] NULL,
    [lot_ref2] [text] NULL,
    [lot_ref3] [text] NULL,
    [lot_ref4] [text] NULL,
    [lot_ref5] [text] NULL,
    [lot_ref6] [text] NULL,
    [lot_ref7] [text] NULL,
    [lot_ref8] [text] NULL,
    [lot_ref9] [text] NULL,
    [lot_ref10] [text] NULL,
    [lot_ref11] [text] NULL,
    [lot_ref12] [text] NULL,
    [lot_ref13] [text] NULL,
    [lot_ref14] [text] NULL,
    [lot_ref15] [text] NULL,
    [conditions] [varchar](1000) NULL,
    [actif] [bit] NULL,
    [message_client] [varchar](500) NULL
  );
  `,

  ModesReglementsVerifs: `
  CREATE TABLE IF NOT EXISTS ModesReglementsVerifs(
    [type_carte] [varchar](5) NULL,
    [id_carte] [varchar](50) NULL,
    [date_modif] [datetime] NULL
  );
  `,
  
  LastFileDown: `
  CREATE TABLE IF NOT EXISTS LastFileDown(
    [name] [varchar](50) NULL,
    [size] [int] NULL,
    [date] [int] NULL
  );
  `,

  Utilisateurs: `
  CREATE TABLE IF NOT EXISTS Utilisateurs(
    [derniere_connexion] [datetime] NULL,
    [date_modif] [datetime] NULL,
    [date_creation] [datetime] NULL,
    [date_naissance] [date] NULL,
    [nom] [nvarchar](50) NULL,
    [prenom] [nvarchar](50) NULL,
    [numero_tel] [nvarchar](10) NULL,
    [nom_user] [nvarchar](30) NOT NULL,
    [passwd] [nvarchar](32) NOT NULL,
    [droit_ouverture] [nvarchar](1) NOT NULL,
    [droit_vente] [nvarchar](1) NOT NULL,
    [droit_retour] [nvarchar](1) NOT NULL,
    [droit_admin] [nvarchar](1) NOT NULL,
    [droit_abandon] [nvarchar](1) NOT NULL,
    [droit_manager] [nvarchar](1) NOT NULL,
    [droit_avoir] [nvarchar](1) NOT NULL,
    [droit_avoir_force] [nvarchar](1) NOT NULL,
    [droit_cloture_sans_decompte] [[nvarchar](1) NOT NULL,
    [droit_fermeture] [nvarchar](1) NOT NULL,
    [droit_kdo_force] [nvarchar](1) NOT NULL,
    [droit_remise3] [nvarchar](1) NOT NULL,
    [droit_remise2] [nvarchar](1) NOT NULL,
    [droit_remise1] [nvarchar](1) NOT NULL,
    [droit_retour_force] [nvarchar](1) NOT NULL,
    [droit_rembourse_esp] [nvarchar](1) NOT NULL,
    [droit_ouverture_tiroir] [nvarchar](1) NOT NULL
  );
  `,

}
