import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootState } from '../../services/redux/reducers';

import {StackParams} from '../../presentations/navigation';

import { RouteProp } from '@react-navigation/native';
import { SystemState } from '../../services/redux/system/types';
import { setTicketNumero } from '../../services/redux/tickets/actions';
import { TicketState } from '../../services/redux/tickets/types';

type NavigationProps = StackNavigationProp<StackParams, 'ChoixMotifRemise'>;
type Route = RouteProp<StackParams, 'ChoixMotifRemise'>;

export interface Props {
    
    navigation: NavigationProps;
    route:Route;
    system: SystemState;
    tickets: TicketState;
  }
  interface State {
    
  }
 
export default class ChoixMotifController extends React.Component<Props,State> {
	
	readonly state:State = {
      
	}
	
	componentDidMount() {
	
	}
}

const mapStateToProps = (state: RootState) => ({
    system: state.system,
    tickets:state.tickets
    
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
    setTicketNumero: (payload: string) => dispatch(setTicketNumero(payload)),
  };
};

export const reduxConnect = (component: any) =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component);
