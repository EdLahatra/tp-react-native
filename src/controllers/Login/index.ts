import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from "@react-navigation/native";

import { RootState } from '../../services/redux/reducers';
import { getProduitsAction } from '../../services/redux/produits/actions';

import { StackParams } from '../../presentations/navigation';
import { loginUser } from '../../services/redux/system/actions';
import { FormatData } from '../../interfaces';


type NavigationProps = StackNavigationProp<StackParams, 'Login'>;

type Route = RouteProp<StackParams, 'Login'>;

export interface Props {
	navigation: NavigationProps;
	route: Route;
	loginUser: (user: FormatData | null) => Promise<void>;
  //navigation: NavigationScreenProp<NavigationState, NavigationParams>;
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
