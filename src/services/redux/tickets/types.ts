import { GET_TICKETS, SAVE_NUM_TICKET } from './constants';
import { Tickets } from '../../../interfaces/tickets';

interface GetTicketsAction {
  type: typeof GET_TICKETS
  payload: Tickets[]
}
interface SaveNumTicket {
  type: typeof SAVE_NUM_TICKET
  payload: string
}
export interface TicketState {
  numero_ticket: string,
  list: Tickets[],
};

export type TicketsActionTypes = GetTicketsAction | SaveNumTicket;
