export default {
  Clients: `
  CREATE TABLE IF NOT EXISTS Clients(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
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
    [sexe] [char](1) NULL,
    [synchro_up] [bit] DEFAULT 0 NOT NULL
  );
  `,

  Articles: `
  CREATE TABLE IF NOT EXISTS Articles(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
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
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [code_barre] [varchar](45) NULL,
    [article_code_article] [varchar](45) NULL
  );
  `,

  Magasins: `
  CREATE TABLE IF NOT EXISTS Magasins(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
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
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
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
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
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
  CREATE TABLE IF NOT EXISTS MotifsGeneriques(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [date_modif] [varchar](5) NULL,
    [id_motif_generique] [varchar](5) NULL,
    [libelle_motif] [varchar](5) NULL,
    [id_type] [varchar](5) NULL
  );
  `,

  MotifsRemises: `
  CREATE TABLE IF NOT EXISTS MotifsRemises(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
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
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [Caisse] [nvarchar](50) NULL,
    [Variable] [nvarchar](50) NULL,
    [Enseigne] [nvarchar](255) NULL,
    [CodeMag] [nvarchar](255) NULL
  );
  `,

  PromosCoupons: `
  CREATE TABLE IF NOT EXISTS PromosCoupons(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
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
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
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
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [type_carte] [varchar](5) NULL,
    [id_carte] [varchar](50) NULL,
    [date_modif] [datetime] NULL
  );
  `,
  
  SynchroDownFileCSV: `
  CREATE TABLE IF NOT EXISTS SynchroDownFileCSV(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [lines] [int] NULL,
    [name] [varchar](50) NULL,
    [size] [int] NULL,
    [date] [int] NULL,
    [numero_line] [int] NULL,
    [fin] [int] NULL
  );
  `,

  Utilisateurs: `
  CREATE TABLE IF NOT EXISTS Utilisateurs(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
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
  
  Tickets: `
  CREATE TABLE IF NOT EXISTS Tickets(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [numero_ticket] [varchar](16) NULL,
    [statut] [bit] NULL,
    [user_creation] [varchar](30) NULL,
    [id_client] [varchar](17) NULL,
    [user_annulation] [varchar](30) NULL,
    [motif_annulation] [nvarchar](50) NULL,
    [date_debut] [datetime] NULL,
    [date_fin] [datetime] NULL,
    [id_cloture] [varchar](17) NULL,
    [vendeurs] [varchar](92) NULL,
    [synchro_up] [bit] DEFAULT 0 NOT NULL
  )
`,

  TicketsDetail: `
  CREATE TABLE IF NOT EXISTS TicketsDetail(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [numero_ticket] [varchar](16) NULL,
    [numero_ligne] [tinyint] NULL,
    [code_article] [varchar](45) NULL,
    [statut] [bit] NULL,
    [user_creation] [nvarchar](30) NULL,
    [date_creation] [datetime] NULL,
    [user_annulation] [nvarchar](30) NULL,
    [date_annulation] [datetime] NULL,
    [motif_annulation] [nvarchar](50) NULL,
    [quantite] [smallint] NULL,
    [motif_remise] [nvarchar](30) NULL,
    [motif_retour] [nvarchar](50) NULL,
    [complement_designation] [nvarchar](30) NULL,
    [user_retour] [nvarchar](30) NULL,
    [prix_base_unitaire_ttc] [money] NULL,
    [remise_totale_ttc] [money] NULL,
    [tva_totale] [money] NULL,
    [prix_total_ttc] [money] NULL,
    [motif_remise_complet] [nvarchar](50) NULL,
    [envoye] [bit] NULL,
    [id_promo] [int] NULL,
    [synchro_up] [bit] DEFAULT 0 NOT NULL
    )
`,

  TicketsPaiements: `
  CREATE TABLE IF NOT EXISTS TicketsPaiements(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [numero_ticket] [varchar](16) NULL,
    [numero_ligne] [tinyint] NULL,
    [mode_paiement] [varchar](3) NULL,
    [montant_paiement] [money] NULL,
    [info_paiement] [nvarchar](50) NULL,
    [encaisse] [bit] NULL,
    [user_annulation] [varchar](30) NULL,
    [date_annulation] [datetime] NULL,
    [motif_annulation] [nvarchar](50) NULL,
    [synchro_up] [bit] DEFAULT 0 NOT NULL
    )
  `,

  Clotures: `
  CREATE TABLE IF NOT EXISTS Clotures(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [id_cloture] [varchar](17) NULL,
    [code_mag] [varchar](5) NULL,
    [caisse] [varchar](4) NULL,
    [date_ouverture] [datetime] NULL,
    [date_fin_ouverture] [datetime] NULL,
    [usr_ouverture] [varchar](30) NULL,
    [ouverture_coupures_500] [smallint] NULL,
    [ouverture_coupures_200] [smallint] NULL,
    [ouverture_coupures_100] [smallint] NULL,
    [ouverture_coupures_50] [smallint] NULL,
    [ouverture_coupures_20] [smallint] NULL,
    [ouverture_coupures_10] [smallint] NULL,
    [ouverture_coupures_5] [smallint] NULL,
    [ouverture_coupures_2] [smallint] NULL,
    [ouverture_coupures_1] [smallint] NULL,
    [ouverture_coupures_050] [smallint] NULL,
    [ouverture_coupures_020] [smallint] NULL,
    [ouverture_coupures_010] [smallint] NULL,
    [ouverture_coupures_005] [smallint] NULL,
    [ouverture_coupures_002] [smallint] NULL,
    [ouverture_coupures_001] [smallint] NULL,
    [date_fermeture] [datetime] NULL,
    [date_fin_fermeture] [datetime] NULL,
    [usr_fermeture] [varchar](30) NULL,
    [fermeture_coupures_500] [smallint] NULL,
    [fermeture_coupures_200] [smallint] NULL,
    [fermeture_coupures_100] [smallint] NULL,
    [fermeture_coupures_50] [smallint] NULL,
    [fermeture_coupures_20] [smallint] NULL,
    [fermeture_coupures_10] [smallint] NULL,
    [fermeture_coupures_5] [smallint] NULL,
    [fermeture_coupures_2] [smallint] NULL,
    [fermeture_coupures_1] [smallint] NULL,
    [fermeture_coupures_050] [smallint] NULL,
    [fermeture_coupures_020] [smallint] NULL,
    [fermeture_coupures_010] [smallint] NULL,
    [fermeture_coupures_005] [smallint] NULL,
    [fermeture_coupures_002] [smallint] NULL,
    [fermeture_coupures_001] [smallint] NULL,
    [mnt_1_reel] [money] NULL,
    [nb_1_reel] [smallint] NULL,
    [mnt_1_theo] [money] NULL,
    [nb_1_theo] [smallint] NULL,
    [mnt_2_reel] [money] NULL,
    [nb_2_reel] [smallint] NULL,
    [mnt_2_theo] [money] NULL,
    [nb_2_theo] [smallint] NULL,
    [mnt_3_reel] [money] NULL,
    [nb_3_reel] [smallint] NULL,
    [mnt_3_theo] [money] NULL,
    [nb_3_theo] [smallint] NULL,
    [mnt_4_reel] [money] NULL,
    [nb_4_reel] [smallint] NULL,
    [mnt_4_theo] [money] NULL,
    [nb_4_theo] [smallint] NULL,
    [mnt_5_reel] [money] NULL,
    [nb_5_reel] [smallint] NULL,
    [mnt_5_theo] [money] NULL,
    [nb_5_theo] [smallint] NULL,
    [mnt_6_reel] [money] NULL,
    [nb_6_reel] [smallint] NULL,
    [mnt_6_theo] [money] NULL,
    [nb_6_theo] [smallint] NULL,
    [mnt_7_reel] [money] NULL,
    [nb_7_reel] [smallint] NULL,
    [mnt_7_theo] [money] NULL,
    [nb_7_theo] [smallint] NULL,
    [mnt_8_reel] [money] NULL,
    [nb_8_reel] [smallint] NULL,
    [mnt_8_theo] [money] NULL,
    [nb_8_theo] [smallint] NULL,
    [nb_ticket_valide] [smallint] NULL,
    [nb_ticket_non_valide] [smallint] NULL,
    [nb_article_valide] [smallint] NULL,
    [nb_article_non_valide] [smallint] NULL,
    [commentaire] [nvarchar](250) NULL,
    [no_bordereau1] [varchar](13) NULL,
    [no_bordereau2] [varchar](13) NULL,
    [no_bordereau3] [varchar](13) NULL,
    [no_bordereau4] [varchar](13) NULL,
    [no_bordereau5] [varchar](13) NULL,
    [no_bordereau6] [varchar](13) NULL,
    [no_bordereau7] [varchar](13) NULL,
    [no_bordereau8] [varchar](13) NULL,
    [responsable_ecart1] [varchar](30) NULL,
    [responsable_ecart2] [varchar](30) NULL,
    [responsable_ecart3] [varchar](30) NULL,
    [synchro_up] [bit] DEFAULT 0 NOT NULL
    )
  `,

  CloturesAnnuelle: `
  CREATE TABLE IF NOT EXISTS CloturesAnnuelle(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [annee] [smallint] NULL,
    [code_mag] [varchar](5) NULL,
    [caisse] [varchar](4) NULL,
    [code_mode_reglement] [varchar](3) NULL,
    [nb_ticket_valide] [int] NULL,
    [nb_ticket_non_valide] [int] NULL,
    [nb_article_valide] [int] NULL,
    [nb_article_non_valide] [int] NULL,
    [ca_total] [money] NULL,
    [num_ticket_debut] [varchar](12) NULL,
    [num_ticket_fin] [varchar](12) NULL,
    [integrite_ok] [bit] NULL,
    [synchro_up] [bit] DEFAULT 0 NOT NULL
  )
`,

  CloturesDetailsPaiement: `
  CREATE TABLE IF NOT EXISTS CloturesDetailsPaiement(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [id_detail_paiement] [int] IDENTITY(1,1) NULL,
    [id_cloture] [varchar](17) NULL,
    [mode_paiement] [varchar](3) NULL,
    [numero_moyen_paiement] [varchar](50) NULL,
    [info] [varchar](50) NULL,
    [montant] [money] NULL,
    [synchro_up] [bit] DEFAULT 0 NOT NULL
  )
`,

  CloturesMensuelle: `
  CREATE TABLE IF NOT EXISTS CloturesMensuelle(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [annee] [smallint] NULL,
    [mois] [tinyint] NULL,
    [code_mag] [varchar](5) NULL,
    [caisse] [varchar](4) NULL,
    [code_mode_reglement] [nvarchar](3) NULL,
    [nb_ticket_valide] [int] NULL,
    [nb_ticket_non_valide] [int] NULL,
    [nb_article_valide] [int] NULL,
    [nb_article_non_valide] [int] NULL,
    [ca_total] [money] NULL,
    [num_ticket_debut] [varchar](12) NULL,
    [num_ticket_fin] [varchar](12) NULL,
    [synchro_up] [bit] DEFAULT 0 NOT NULL
  )
  `,

  ControlesCaisse: `
  CREATE TABLE IF NOT EXISTS ControlesCaisse(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [id_cloture] [varchar](17) NULL,
    [user_sortant] [varchar](30) NULL,
    [user_entrant] [varchar](30) NULL,
    [date_debut] [datetime] NULL,
    [date_fin] [datetime] NULL,
    [mnt_1_reel] [money] NULL,
    [mnt_1_theo] [money] NULL,
    [nb_1_reel] [smallint] NULL,
    [nb_1_theo] [smallint] NULL,
    [mnt_2_reel] [money] NULL,
    [mnt_2_theo] [money] NULL,
    [nb_2_reel] [smallint] NULL,
    [nb_2_theo] [smallint] NULL,
    [mnt_3_reel] [money] NULL,
    [mnt_3_theo] [money] NULL,
    [nb_3_reel] [smallint] NULL,
    [nb_3_theo] [smallint] NULL,
    [mnt_4_reel] [money] NULL,
    [mnt_4_theo] [money] NULL,
    [nb_4_reel] [smallint] NULL,
    [nb_4_theo] [smallint] NULL,
    [mnt_5_reel] [money] NULL,
    [mnt_5_theo] [money] NULL,
    [nb_5_reel] [smallint] NULL,
    [nb_5_theo] [smallint] NULL,
    [mnt_6_reel] [money] NULL,
    [mnt_6_theo] [money] NULL,
    [nb_6_reel] [smallint] NULL,
    [nb_6_theo] [smallint] NULL,
    [mnt_7_reel] [money] NULL,
    [mnt_7_theo] [money] NULL,
    [nb_7_reel] [smallint] NULL,
    [nb_7_theo] [smallint] NULL,
    [mnt_8_reel] [money] NULL,
    [mnt_8_theo] [money] NULL,
    [nb_8_reel] [smallint] NULL,
    [nb_8_theo] [smallint] NULL,
    [ecart] [bit] NOT NULL,
    [synchro_up] [bit] DEFAULT 0 NOT NULL
  )
  `,

  Pointages: `
  CREATE TABLE IF NOT EXISTS Pointages(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [nom_user] [nvarchar](30) NULL,
    [date] [datetime] NULL,
    [lieu] [nvarchar](5) NULL,
    [type_mouvement] [nvarchar](3) NULL,
    [synchro_up] [bit] DEFAULT 0 NOT NULL
  )
`,

  DepotFonds: `
  CREATE TABLE IF NOT EXISTS DepotFonds(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [id_depot] [varchar](17) NULL,
    [coupures_500] [smallint] NULL,
    [coupures_200] [smallint] NULL,
    [coupures_100] [smallint] NULL,
    [coupures_50] [smallint] NULL,
    [coupures_20] [smallint] NULL,
    [coupures_10] [smallint] NULL,
    [coupures_5] [smallint] NULL,
    [coupures_2] [smallint] NULL,
    [coupures_1] [smallint] NULL,
    [coupures_050] [smallint] NULL,
    [coupures_020] [smallint] NULL,
    [coupures_010] [smallint] NULL,
    [coupures_005] [smallint] NULL,
    [coupures_002] [smallint] NULL,
    [coupures_001] [smallint] NULL,
    [usr_depot] [varchar](30) NULL,
    [date_depot] [datetime] NULL,
    [caisse_depot] [varchar](10) NULL,
    [no_bordereau] [varchar](13) NULL,
    [id_cloture] [varchar](17) NULL,
    [synchro_up] [bit] DEFAULT 0 NOT NULL
  )
  `,

  OuverturesTiroir: `
  CREATE TABLE IF NOT EXISTS OuverturesTiroir(
    [id_ouverture] INTEGER PRIMARY KEY AUTOINCREMENT,
    [date] [datetime] NULL,
    [code_mag] [varchar](5) NULL,
    [caisse] [varchar](4) NULL,
    [nom_user] [varchar](30) NULL,
    [raison] [varchar](10) NULL
  )
`,

  SynchroUp: `
  CREATE TABLE IF NOT EXISTS SynchroUp(
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [type_envoi] [varchar](25) NULL,
    [id_ligne] [varchar](25) NULL,
    [date_demande_envoi] [datetime] NULL,
    [date_envoi] [datetime] NULL,
    [msg_erreur] [varchar](255) NULL
  )
`,
}
