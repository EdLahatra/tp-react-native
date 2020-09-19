import { ProduitsActionTypes } from './types';
import { ProduitsState } from '../../../interfaces/produits';
import { GET_PRODUITS, ADD_PRODUIT } from './constants';

const initialState: ProduitsState = {
	list: [],
};

export const produitsReducer = (state = initialState, action: ProduitsActionTypes): ProduitsState => {
	switch (action.type) {
		case GET_PRODUITS:
			const ids = state.list.map(i => i.id);
			const newProduit = action.payload.filter(({ id }) => !ids.includes(id))
			return {
				...state,
				list: [...state.list, ...newProduit],
			};
		case ADD_PRODUIT:
			return {
				...state,
				list: [...state.list, action.payload],
			}
		default:
			return state;
	}
};
