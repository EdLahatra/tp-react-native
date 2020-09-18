import { Dispatch } from 'redux';
import { ProduitsActionTypes } from './types';
import { Produit } from '../../../interfaces/produits';
import sApp from '../../../services/applicatif/produits';
import { GET_PRODUITS, ADD_PRODUIT } from './constants';

export const getProduits = (produits: Produit[]): ProduitsActionTypes => ({
	type: GET_PRODUITS,
	payload: produits,
});

export const addProduit = (produit: Produit): ProduitsActionTypes => ({
	type: ADD_PRODUIT,
	payload: produit,
});

export const getProduitsAction = () => async (dispatch: Dispatch): Promise<void> => {
	const asyncResp = await sApp.getProduitsSA();
  dispatch(getProduits(asyncResp));
};
