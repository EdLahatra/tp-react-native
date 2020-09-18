import { ProduitsActionTypes } from './types';
import { ProduitsState } from '../../../interfaces/produits';
import { GET_PRODUITS, ADD_PRODUIT } from './constants';

const initialState: ProduitsState = {
	list: [],
};

export const produitsReducer = (state = initialState, action: ProduitsActionTypes): ProduitsState => {
	switch (action.type) {
		case GET_PRODUITS:
			return {
				...state,
				list: action.payload,
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
