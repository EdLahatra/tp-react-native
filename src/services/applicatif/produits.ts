import repository from '../repository/produits';
import { Produit } from '../../interfaces/produits';

export default {
	getProduitsSA: async (): Promise<Produit[]> => await repository.getProduits()
};
