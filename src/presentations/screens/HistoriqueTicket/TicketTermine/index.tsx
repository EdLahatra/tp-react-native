// React Native Tab
// https://aboutreact.com/react-native-tab/

import React , { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView, 
  FlatList,
  Image
} from 'react-native';

import { styles } from './styles';
import { HeaderListTicket }  from '../../../components/HistoriqueTicket/HeaderListTicket';
import { ItemListTicketTermine }  from '../../../components/HistoriqueTicket/ItemListTicket/ItemTermine';
import { reduxConnect } from '../../../../controllers/HistoriqueTicket';
import { useAppTickets } from '../../../../services/applicatif/tickets';

renderSeparatorView = () => {
  return (
    <View style={{
        height: 1, 
        width: "100%",
        backgroundColor: "#CEDCCE",
      }}
    />
  );
};

export const TicketTermineScreen : React.FunctionComponent<Props> = function (props) {
  const { navigation } = props;
  const {  getTicketsPaiements } = useAppTickets();

  useEffect(() => {
       getTicketsPaiementDB();
    }, []);

  function onEmail (ticket){

  }

  function onCheck(ticket){

  }

  function filterTicketTermine(ticketList ){
    return ticketList.filter(ticket => ticket.statut == 1);
  }

  async function getTicketsPaiementDB(){
    console.log("props list");
    console.log(props.tickets.list[0]);

    /*const data = {
     query: '',
     // table: name,
     // where: ['statut'],
     where: ['numero_ticket'],
     like: true,
     // operator: 'OR',
     limit: 200,
     };
   const asyncResp = await getTicketsPaiements(data);
   console.log("TicketPaiment");
   console.log(asyncResp);
   if (asyncResp){
     //props.setTickets(asyncResp);
   }*/
 }

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ flex: 1 , padding: 16}}>
      <HeaderListTicket/>
      { props.tickets.list && props.tickets.list.length > 0? 
        <FlatList          
                data={filterTicketTermine(props.tickets.list[0])}  
                keyExtractor={(_, index) => index.toString()} 
                ItemSeparatorComponent={renderSeparatorView}       
                renderItem={({ item }) =>
                <ItemListTicketTermine ticket={item} 
                  onEmail={() => onEmail(item)}
                  onCheck={() => onCheck(item)}/>
              }                                  
            /> : <View/>
           }
      </View>
      
    </SafeAreaView>
  );
}
export const TicketTermine = reduxConnect(TicketTermineScreen);