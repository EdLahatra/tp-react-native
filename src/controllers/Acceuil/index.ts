import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootState } from '../../services/redux/reducers';

import {StackParams} from '../../presentations/navigation';

type NavigationProps = StackNavigationProp<StackParams, 'Acceuil'>;

interface Props {
    title?: string;
    nom?: string;
    navigation: NavigationProps;
  }
  interface State {
    number: { num: string, color: string }[];
  }
 
export default class AccueilController extends React.Component<Props,State> {
	
	readonly state:State = {
        number:[]
	}
	
	componentDidMount() {
		//this.props.getProduits();
	}
}

const mapStateToProps = (state: RootState) => ({
	//produits: state.produits,
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
