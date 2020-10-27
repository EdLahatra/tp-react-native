import { GET_TICKETS } from './constants';
import { Ticket } from '../../../interfaces/tickets';

interface GetTicketsAction {
  type: typeof GET_TICKETS
  payload: Ticket[]
}


export type TicketsActionTypes = GetTicketsAction ;
