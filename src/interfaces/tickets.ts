export interface Ticket {
    date: string
    hour: string
	number: string
    user: string
    amount: string
};
export interface Tickets {
  synchro_up: number, //0 ou 1
        date_fin: string,
        date_debut: '',
        motif_annulation: '',
        id_cloture: '',
        user_annulation: '',
        vendeurs: '',
        numero_ticket: string,
        statut: 0,
        id: number,
        id_client: string,
        user_creation: string
};
export interface TicketDetails {
  numero_ticket: '',
  numero_ligne: 0,
  code_article: '',
  statut: 0,
  user_creation: '',
  date_creation: '',
  user_annulation: '',
  date_annulation: '',
  motif_annulation: '',
  quantite: 1,
  motif_remise: '',
  motif_retour: '',
  complement_designation: '',
  user_retour: '',
  prix_base_unitaire_ttc: 0,
  remise_totale_ttc: 0,
  tva_totale: string,
  prix_total_ttc: string,
  motif_remise_complet: '',
  envoye: '',
  id_promo: '',
  id:0
};
export interface TicketsState {
  list: Ticket[]
};
