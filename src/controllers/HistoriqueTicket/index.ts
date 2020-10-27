import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootState } from '../../services/redux/reducers';

import {StackParams} from '../../presentations/navigation';
import { setTicketsAction } from '../../services/redux/tickets/actions';
import { toDatetimeDisplay } from '../../services/utils';

type NavigationProps = StackNavigationProp<StackParams, 'HistoriqueTicket'>;

interface Props {
    
    navigation: NavigationProps;
  }
  interface State {
    
  }
 
export default class HistoriqueTicketController extends React.Component<Props,State> {
	
	readonly state:State = {
    client :{}
	}
	
	componentDidMount() {
	
	}
}

const mapStateToProps = (state: RootState) => ({
	tickets: state.tickets,
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
    setTickets: (payload) => dispatch(setTicketsAction(payload)),
  };
};

export const reduxConnect = (component: any) =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component);
