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
export interface TicketsState {
  list: Ticket[]
};
