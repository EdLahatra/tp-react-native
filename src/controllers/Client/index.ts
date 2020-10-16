import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootState } from '../../services/redux/reducers';

import {StackParams} from '../../presentations/navigation';
// import { getClients } from '../../services/applicatif/clients';

type NavigationProps = StackNavigationProp<StackParams, 'Client'>;

export interface Props {
    
    navigation: NavigationProps;
  }
  interface State {
    
  }
 
export default class ClientController extends React.Component<Props,State> {
	
	readonly state:State = {
    clients :[]
	}
  
  async getClientList(){
    // let clients = await getClients();
    // console.log("clients " + clients);
    // return clients ;
  }

	componentDidMount() {
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
