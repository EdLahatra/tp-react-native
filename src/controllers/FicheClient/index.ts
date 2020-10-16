import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootState } from '../../services/redux/reducers';

import {StackParams} from '../../presentations/navigation';

type NavigationProps = StackNavigationProp<StackParams, 'FicheClient'>;

interface Props {
    
    navigation: NavigationProps;
  }
  interface State {
    
  }
 
export default class FicheClientController extends React.Component<Props,State> {
	
	readonly state:State = {
    client :{}
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
