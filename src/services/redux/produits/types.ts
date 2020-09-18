import { GET_PRODUITS, ADD_PRODUIT } from './constants';
import { Produit } from '../../../interfaces/produits';

interface GetProduitsAction {
  type: typeof GET_PRODUITS
  payload: Produit[]
}

interface AddProduitActionTypes{
	type: typeof ADD_PRODUIT
  payload: Produit
} 

export type ProduitsActionTypes = GetProduitsAction | AddProduitActionTypes;
