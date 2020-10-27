import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from "@react-navigation/native";

import { RootState } from '../../services/redux/reducers';
import { Produit, ProduitsState } from '../../interfaces/produits';
import { getProduitsAction } from '../../services/redux/produits/actions';

import {StackParams} from '../../presentations/navigation';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { FormatData } from '../../interfaces';
import { loginUser } from '../../services/redux/system/actions';
import { SystemState } from '../../services/redux/system/types';

type Route = RouteProp<StackParams, 'Password'>;

 type NavigationProps = StackNavigationProp<StackParams, 'Password'>;
// interface IProps extends Produit {
// 	getProduits: () => Promise<void>;
// 	produits: ProduitsState,
	
// }
export interface Props {
    title?: string;
    nom?: string;
    route?: Route;
    navigation: NavigationProps;
		system: SystemState,
		loginUser: (user: FormatData | null) => Promise<void>;
  }
  interface State {
    
  }

export default class PasswordController extends React.Component<Props,State> {
	
	readonly state:State = {
		
	}
	
	componentDidMount() {
		//this.props.getProduits();
	}
}

const mapStateToProps = (state: RootState) => ({
	produits: state.produits,
	system: state.system,
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
		getProduits: () => dispatch(getProduitsAction()),
		loginUser: (user: FormatData | null) => dispatch(loginUser(user)),
  };
};

export const reduxConnect = (component: any) =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component);
