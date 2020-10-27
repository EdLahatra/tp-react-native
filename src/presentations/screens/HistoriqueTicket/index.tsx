import React, { useState, useEffect, createContext, useContext } from 'react';
import { View,TouchableOpacity , Text, TextInput,Image, ListItem, FlatList, BackHandler} from 'react-native';
import HistoriqueTicketController, { reduxConnect } from '../../../controllers/HistoriqueTicket';
import {
    createMaterialTopTabNavigator
  } from '@react-navigation/material-top-tabs';

import {styles} from './styles';
import { TicketAttente }  from './TicketAttente';
import { TicketTermine }from './TicketTermine';

import { Tickets } from '../../../interfaces/tickets';
import { useAppTickets } from '../../../services/applicatif/tickets';
import HistoriqueTicketHeader from '../../components/NavigationHeader/historiqueTickets';

const Tab = createMaterialTopTabNavigator();

export const HistoriqueTicketScreen : React.FunctionComponent<Props> = function (props) {
    
    const {navigation} = props;
    const [valueSearch, setValueSearch] = useState('');

    const {  getTickets, getTicketsPaiements, findTicketsPaiements } = useAppTickets();

    useEffect(() => {
       //getTicketsState();
        getTicketsFromDb();
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, []);

     function handleBackButtonClick(){
      navigation.goBack();
      return true;
    }

    async function getTicketsFromDb(){
       const data = {
        query: '',
        // table: name,
        // where: ['statut'],
        where: ['numero_ticket'],
        like: true,
        // operator: 'OR',
        limit: 20,
        };
      const asyncResp = await getTicketsPaiements(data);
      console.log(asyncResp);
      if (asyncResp){
        props.setTickets(asyncResp);
      }
    }

    async function searchTickets(value:string){
      console.log("value string", value);
      const queryTickets = {
          query: value,
          where: ['numero_ticket', 'user_creation'],
          like: true,
          operator: 'OR',
          limit: 10,
        };
        const tickets= await findTicketsPaiements(queryTickets);
       console.log("Tickets search", tickets);
        props.setTickets(tickets);
   }

    return (
        <View style={styles.container}>
          <HistoriqueTicketHeader goBack={() => {navigation.goBack()}}/>
          <View style={styles.linearclientheader}>
            <Text style={styles.txtTitle}>Recherche ticket</Text>
            <View style={styles.edtStyleCli}>
              <TextInput
                  style={styles.inputname}
                  multiline={false}
                  autoCorrect={false}
                  autoCapitalize='none'
                  keyboardType='numeric'
                  placeholder=''
                  onChangeText={(value) => setValueSearch(value)}/>
              <TouchableOpacity style={styles.button} onPress={() => {searchTickets(valueSearch)}}>
                  <Image style={styles.img} source={require("../../resources/images/goahead.png")}/>
                </TouchableOpacity>
            </View>
          </View>
          
          <Tab.Navigator
              initialRouteName="Feed"
              style= {{paddingLeft : 10, paddingRight : 10}}
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
                  name="TicketAttente"
                  component={TicketAttente}
                  options={{
                  tabBarLabel: 'Tickets en attente',
                  }}
                  />
              <Tab.Screen
                  name="TicketTermine"
                  component={TicketTermine}
                  options={{
                  tabBarLabel: 'Tickets terminés',
                  }} />
              </Tab.Navigator>
      </View>
       
    )
}

export const HistoriqueTicket = reduxConnect(HistoriqueTicketScreen);
