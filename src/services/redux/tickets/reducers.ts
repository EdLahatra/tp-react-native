import { TicketsActionTypes,TicketState } from './types';
import { GET_TICKETS, SAVE_NUM_TICKET } from './constants';

const initialState: TicketState = {
	numero_ticket:'',
	list: [],
};

export const ticketsReducer = (state = initialState, action: TicketsActionTypes): TicketState => {
	switch (action.type) {
		case GET_TICKETS:
			/*const ids = state.list.map(i => i.id);
      const newTicket = action.payload.filter(({ id }) => !ids.includes(id))*/
      console.log(action.payload);
			return {
				...state,
				list: action.payload,
			};
		case SAVE_NUM_TICKET:
			return{
				...state,
				numero_ticket: action.payload
			}
		default:
			return state;
	}
};
