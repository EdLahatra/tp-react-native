import { Produit } from '../../interfaces/produits';

const { produits } = require('./data.json');

export const getProduits = async (): Promise<Produit[]> => Promise.resolve(produits);

export  default { getProduits };
