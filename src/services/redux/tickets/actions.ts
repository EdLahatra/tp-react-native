import { Dispatch } from 'redux';
import { TicketsActionTypes } from './types';
import { Tickets } from '../../../interfaces/tickets';
import { GET_TICKETS, SAVE_NUM_TICKET } from './constants';

export const getTicketsRx = (tickets: Tickets[]) => ({
  type: GET_TICKETS,
  payload: tickets,
});

export const setTicketsAction = (tickets: Tickets[]) => async (dispatch: Dispatch): Promise<void> => {
  dispatch(getTicketsRx(tickets));
};

export const setTicketNumero = (num: string): TicketsActionTypes => ({
  type: SAVE_NUM_TICKET,
  payload: num,
});
