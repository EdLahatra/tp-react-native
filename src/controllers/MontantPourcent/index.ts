import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from "@react-navigation/native";

import { RootState } from '../../services/redux/reducers';

import {StackParams} from '../../presentations/navigation';

type Route = RouteProp<StackParams, 'MontantPourcent'>;

 type NavigationProps = StackNavigationProp<StackParams, 'MontantPourcent'>;

export interface Props {
    
    route?: Route;
    navigation: NavigationProps;
	
  }

  interface State {
    
  }

export default class MontantPourcentController extends React.Component<Props,State> {
	
	readonly state:State = {
		
	}
	
	componentDidMount() {
		//this.props.getProduits();
	}
}

const mapStateToProps = (state: RootState) => ({

})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
	
  };
};

export const reduxConnect = (component: any) =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component);
