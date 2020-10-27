import React, { useState, useEffect } from 'react';
import {Image,TextInput, View,Text,TouchableOpacity} from 'react-native';
import { Tickets } from '../../../../../interfaces/tickets';
import { displayDate , displayHour} from '../../../../../services/utils';
import {styles} from './styles';
export const ItemListTicketAttente : React.FunctionComponent<Props> = function (props) {
  const {ticket} = props;

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
    <View style={styles.chp2}>
    <TouchableOpacity style={styles.button} onPress= {() => onCheck()}>
         <Image style={styles.img} source={require("../../resources/images/edit.png")}/>
    </TouchableOpacity>
    </View>
 </View>
  );
}
 