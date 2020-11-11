
import React , { useState, useEffect, useContext } from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  SafeAreaView, 
  FlatList
} from 'react-native';
import { HeaderListTicket }  from '../../../components/HistoriqueTicket/HeaderListTicket';
import { ItemListTicketAttente}  from '../../../components/HistoriqueTicket/ItemListTicket/ItemAttente';
import { styles } from './styles';
import { Ticket, Tickets } from '../../../../interfaces/tickets';
import { useAppTickets } from '../../../../services/applicatif/tickets';
import { reduxConnect } from '../../../../controllers/HistoriqueTicket';

const renderSeparatorView = () => {
  return (
    <View style={{
        height: 1, 
        width: "100%",
        backgroundColor: "#CEDCCE",
      }}
    />
  );
};

export const TicketAttenteScreen : React.FunctionComponent<Props> = function (props) {
  const { navigation } = props;

  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
       getTickets();
    }, []);


  function getTickets(){
    console.log('TICKETS REDUX ',props.tickets);
  }

  function filterTicketAttente(ticketList:Tickets[]){
    return ticketList.filter(ticket => ticket.statut == 0);
  } 
  function gotoEncaissement(item:Tickets){
    navigation.navigate('Encaissement', {fromHistoAttente:true, tickets:item });
    
  }
  /*const gotoEncaissements = (item: Tickets) => {

  }*/
  return (
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1 , padding: 16}}>
        <HeaderListTicket/>
         { props.tickets.list && props.tickets.list.length > 0 ? 
          <FlatList          
                  data={filterTicketAttente(props.tickets.list)}  
                  keyExtractor={(_, index) => index.toString()} 
                  ItemSeparatorComponent={renderSeparatorView}       
                  renderItem={({ item }) =>
                  <ItemListTicketAttente ticket={item} onCheck={() => gotoEncaissement(item)}/>
                }/>  
                : <View/>}
        </View>
      </SafeAreaView>
  );
}

export const TicketAttente = reduxConnect(TicketAttenteScreen);