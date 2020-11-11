import React, { useEffect } from 'react';
import { Image, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { displayDate, displayHour } from '../../../../../services/utils';
import { styles } from './styles';


export const ItemListTicketTermine: React.FunctionComponent<Props> = function (props) {
  const { ticket } = props;

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.chp1}>
        <Text style={styles.txtItem}>{displayDate(ticket.date_debut)}</Text>
        <Text style={styles.txtItem}>{displayHour(ticket.date_debut)}</Text>
      </View>
      <View style={styles.chp1}>
        <Text style={styles.txtItem}>{ticket.numero_ticket}</Text>
      </View>
      <View style={styles.chp1}>
        <Text style={styles.txtItem}>{ticket.user_creation}</Text>
      </View>
      <View style={styles.chp2}>
        <Text style={styles.txtItem}></Text>
      </View>
      <View style={styles.chp3}>
        <TouchableOpacity style={styles.button} onPress={() => props.onEmail()}>
          <Image style={styles.img} source={require("../../resources/images/email.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.chp3}>
        <TouchableOpacity style={styles.button} onPress={() => props.onCheck()}>
          <Image style={styles.img} source={require("../../resources/images/consult.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
