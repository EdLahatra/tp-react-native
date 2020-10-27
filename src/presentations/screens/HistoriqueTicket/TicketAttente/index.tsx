
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
import { Ticket } from '../../../../interfaces/tickets';
import { useAppTickets } from '../../../../services/applicatif/tickets';
import { reduxConnect } from '../../../../controllers/HistoriqueTicket';

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

export const TicketAttenteScreen : React.FunctionComponent<Props> = function (props) {
  const { navigation } = props;

  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
       getTickets();
    }, []);


  function getTickets(){
    console.log("TICKETS REDUX");
    console.log(props.tickets);
  }

  function filterTicketAttente(ticketList){
    return ticketList.filter(ticket => ticket.statut == 0);
  } 

  return (
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1 , padding: 16}}>
        <HeaderListTicket/>
         { props.tickets.list && props.tickets.list.length > 0 ? 
          <FlatList          
                  data={filterTicketAttente(props.tickets.list[0])}  
                  keyExtractor={(_, index) => index.toString()} 
                  ItemSeparatorComponent={renderSeparatorView}       
                  renderItem={({ item }) =>
                  <ItemListTicketAttente ticket={item} />
                }/>  
                : <View/>}
        </View>
      </SafeAreaView>
  );
}

export const TicketAttente = reduxConnect(TicketAttenteScreen);