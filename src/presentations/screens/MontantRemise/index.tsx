import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, BackHandler} from 'react-native';

import {
    createMaterialTopTabNavigator
  } from '@react-navigation/material-top-tabs';

import {styles} from './styles';
import BackHeader from '../../components/NavigationHeader/backHeader';
import { Props, reduxConnect } from '../../../controllers/MontantRemise';
import { Montant } from './Montant';
import { Pourcent } from './Pourcent';



const Tab = createMaterialTopTabNavigator();

export const MontantRemiseScreen : React.FunctionComponent<Props> = function (props) {
    
    const {navigation} = props;
    const [valueSearch, setValueSearch] = useState('');
    const [titleHeader, setHeadTitle] = useState('');
  

    useEffect(() => {
        setHeadTitle('Montant de la remise');
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, []);

     function handleBackButtonClick(){
      navigation.goBack();
      return true;
    }
   

    

    return (
        <View style={styles.container}>
            <BackHeader msg={titleHeader} goBack = {() => navigation.goBack()}/>
          
          
          <Tab.Navigator
              initialRouteName="Feed"
              style={{marginLeft:10,marginRight:10}}
              tabBarOptions={{
                  activeTintColor: '#998C7E',
                  inactiveTintColor: '#E0C298',
                  labelStyle: {
                      textTransform: 'none',
                      textAlign: 'center',
                  },
                  indicatorStyle: {
                      borderBottomColor: '#998C7E',
                      borderBottomWidth: 3,
                  },
              }}>
              <Tab.Screen
                  name="Montant"
                  component={Montant}
                  options={{
                  tabBarLabel: 'Montant',
                  }}
                  />
              <Tab.Screen
                  name="Pourcent"
                  component={Pourcent}
                  options={{
                  tabBarLabel: 'Pourcent',
                  }} />
              </Tab.Navigator>
      </View>
       
    )
}

export const MontantRemise = reduxConnect(MontantRemiseScreen);
