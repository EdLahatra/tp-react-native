import React from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import { RootState } from '../../services/redux/reducers';

import { Produit } from '../../interfaces/produits';
import { addProduit } from '../../services/redux/produits/actions';

import {StackParams} from '../../presentations/navigation';

type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

interface AppState extends Produit {
	flash: boolean
}

interface IProps extends Produit {
	addProduit: () => Promise<void>;
	produit: Produit,
	navigation: NavigationProps;
}

export default class HomeController extends React.Component<IProps> {
	readonly state: AppState = {
		name: '',
		code: 0,
		id: '',
		flash: false,
	};

  onBarCodeRead = (scanResult: any) => {
    console.log({ scanResult });
  }
}

const mapStateToProps = (state: RootState) => ({
  system: state.system,
  produits: state.produits,
})


const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
    addProduit: (payload: Produit) => dispatch(addProduit(payload)),
  };
};

export const reduxConnect = (component: any) =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component);
