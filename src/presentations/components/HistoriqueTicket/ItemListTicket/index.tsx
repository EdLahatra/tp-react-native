import React, { useEffect } from 'react';
import {Image,TextInput, View,Text,TouchableOpacity} from 'react-native';
import { Tickets } from '../../../../interfaces/tickets';
import { ArticleDto } from '../../../screens/Encaissement/Article';
import {styles} from './styles';

export const ItemListTicketAttente : React.FunctionComponent<Props> = function (props) {

  const {ticket} = props;
  const [ticketToDisplay, setTicketToDisplay] = useState({
    numero_ticket: '',
    statut: 0,
    user_creation: '',
    id_client: '',
    user_annulation: '',
    motif_annulation: '',
    date_debut: new Date()
   
  });

  useEffect(() => {
    getTicketToDisplay();
 }, []);

 function getTicketToDisplay(){
  const newTicketToDisplay = {
    numero_ticket: ticket.numero_ticket,
    info_paiement: '',
    encaisse: 1,
    user_annulation: '',
    date_annulation: '',
    motif_annulation: '',
  };
 }
  return (
    <View style={styles.container}>
    <View style={styles.chp1}>
      <Text>{ticket.date}</Text>
      <Text>{ticket.hour}</Text>
    </View>
    <View style={styles.chp1}>
      <Text>{ticket.number}</Text>
    </View>
    <View style={styles.chp1}>
      <Text>{ticket.user}</Text>
    </View>
    <View style={styles.chp2}>
      <Text>{ticket.amount}</Text>
    </View>
 </View>
  );
}
 