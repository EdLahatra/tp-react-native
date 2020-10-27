import { Dispatch } from 'redux';
import { TicketsActionTypes } from './types';
import { Ticket } from '../../../interfaces/tickets';
import tick from '../../../services/applicatif/produits';
import { GET_TICKETS} from './constants';
import { useAppTickets } from '../../../services/applicatif/tickets';

export const getTicketsRx = (tickets: Tickets[]): ProduitsActionTypes => ({
	type: GET_TICKETS,
	payload: tickets,
});



export const setTicketsAction = (tickets: Tickets[]) => async (dispatch: Dispatch): Promise<void> => {
  	dispatch(getTicketsRx(tickets));
};
