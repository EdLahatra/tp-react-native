import React from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import { RootState } from '../../services/redux/reducers';

import {StackParams} from '../../presentations/navigation';
import { SystemState, Parametres } from '../../services/redux/system/types';
import { updateParametres, loginUser } from '../../services/redux/system/actions';
import { Utilisateurs } from '../../interfaces';

type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

export interface IProps {
  updateParametres: (params: Parametres) => Promise<void>;
  loginUser: (user: Utilisateurs) => Promise<void>;
	navigation: NavigationProps;
  system: SystemState;
}

export default class HomeController extends React.Component<IProps> {}

const mapStateToProps = (state: RootState) => ({
  system: state.system,
  request: state.request,
})


const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
    updateParametres: (params: Parametres) => dispatch(updateParametres(params)),
    loginUser: (user: Utilisateurs) => dispatch(loginUser(user)),
  };
};

export const reduxConnect = (component: any) =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component);
