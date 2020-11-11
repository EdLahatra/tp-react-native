import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from "@react-navigation/native";

import { RootState } from '../../services/redux/reducers';

import {StackParams} from '../../presentations/navigation';
import { loginUser, loginOldUser } from '../../services/redux/system/actions';
import { SystemState } from '../../services/redux/system/types';
import { Utilisateurs } from '../../interfaces';

type Route = RouteProp<StackParams, 'Password'>;

type NavigationProps = StackNavigationProp<StackParams, 'Password'>;

export interface Props {
    title?: string;
    nom?: string;
    route?: Route;
    navigation: NavigationProps;
		system: SystemState,
    loginUser: (user: Utilisateurs) => Promise<void>;
    loginOldUser: (user: Utilisateurs) => Promise<void>;
  }

  interface State {
    
  }

export default class PasswordController extends React.Component<Props,State> {
	
	readonly state:State = {
		
	}

}

const mapStateToProps = (state: RootState) => ({
	system: state.system,
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
    loginUser: (user: Utilisateurs) => dispatch(loginUser(user)),
    loginOldUser: (user: Utilisateurs) => dispatch(loginOldUser(user)),
  };
};

export const reduxConnect = (component: any) =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component);
