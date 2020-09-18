import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from '../../services/redux/reducers';
import { Produit, ProduitsState } from '../../interfaces/produits';
import { getProduitsAction } from '../../services/redux/produits/actions';

interface IProps extends Produit {
	getProduits: () => Promise<void>;
	produits: ProduitsState,
}

export default class ProduitsController extends React.Component<IProps> {
	readonly state: Produit = {
		name: '',
		code: 0,
		id: '',
	};
	
	componentDidMount() {
		this.props.getProduits();
	}
}

const mapStateToProps = (state: RootState) => ({
	produits: state.produits,
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
    getProduits: () => dispatch(getProduitsAction()),
  };
};

export const reduxConnect = (component: any) =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component);
