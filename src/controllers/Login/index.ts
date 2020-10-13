import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from '../../services/redux/reducers';
import { Produit, ProduitsState } from '../../interfaces/produits';
import { getProduitsAction } from '../../services/redux/produits/actions';

import { StackParams } from '../../presentations/navigation';

type NavigationProps = StackNavigationProp<StackParams, 'Login'>;
interface IProps extends Produit {
  getProduits: () => Promise<void>;
  produits: ProduitsState,
}

export interface Props {
  navigation: NavigationProps;
}

export interface State {
  query: string;
  films: string[];
}

export default class LoginController extends React.Component<Props, State> {

  readonly state: State = {
    query: 'string',
    films: [],
  }

  componentDidMount() {
    //this.props.getProduits();
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
