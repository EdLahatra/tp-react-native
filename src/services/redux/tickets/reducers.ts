import { TicketsActionTypes } from './types';
import { Ticket } from '../../../interfaces/tickets';
import { GET_TICKETS } from './constants';

const initialState: TicketsState = {
	list: [],
};

export const ticketsReducer = (state = initialState, action: TicketsActionTypes): TicketsState => {
	switch (action.type) {
		case GET_TICKETS:
			/*const ids = state.list.map(i => i.id);
			const newTicket = action.payload.filter(({ id }) => !ids.includes(id))*/
			return {
				...state,
				list: [action.payload]
			};
		default:
			return state;
	}
};
