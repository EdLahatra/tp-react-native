import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootState } from '../../services/redux/reducers';

import {StackParams} from '../../presentations/navigation';
import { SystemState } from '../../services/redux/system/types';
import { RouteProp } from '@react-navigation/native';
import { loginUser } from '../../services/redux/system/actions';
import { Utilisateurs } from '../../interfaces';

type NavigationProps = StackNavigationProp<StackParams, 'Acceuil'>;
type Route = RouteProp<StackParams, 'Acceuil'>;
export interface Props {
	system: SystemState,
  navigation: NavigationProps;
  route:Route;
  loginUser: (user: Utilisateurs) => Promise<void>;
}
  interface State {
    number: { num: string, color: string }[];
  }
 
export default class AccueilController extends React.Component<Props,State> {
	
	readonly state:State = {
        number:[]
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
  };
};

export const reduxConnect = (component: any) =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component);
