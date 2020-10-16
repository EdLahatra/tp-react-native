import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootState } from '../../services/redux/reducers';

import {StackParams} from '../../presentations/navigation';
import { Article } from '../../presentations/screens/Encaissement/Article';

type NavigationProps = StackNavigationProp<StackParams, 'Encaissement'>;

export interface Props {
    
    navigation: NavigationProps;
  }
  interface State {
    articles:Article[]
  }
 
export default class EncaissementController extends React.Component<Props,State> {
	
	readonly state:State = {
        articles:[]
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
