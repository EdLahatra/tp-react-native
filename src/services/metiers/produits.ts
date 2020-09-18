import produits from '../repository/produits';
import { Produit } from '../../interfaces/produits';

export const getProduits = async (): Promise<Produit[]> => await produits.getProduits();

export default { getProduits };
