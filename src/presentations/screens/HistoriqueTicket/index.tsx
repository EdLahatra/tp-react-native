import React from 'react';
import { View,TouchableOpacity , Text, TextInput,Image, ListItem, FlatList} from 'react-native';
import HistoriqueTicketController, { reduxConnect } from '../../../controllers/HistoriqueTicket';
import {
    createMaterialTopTabNavigator
  } from '@react-navigation/material-top-tabs';

import {styles} from './styles';
import TicketAttente from './TicketAttente';
import TicketTermine from './TicketTermine';

const Tab = createMaterialTopTabNavigator();

class HistoriqueTicketScreen extends HistoriqueTicketController {
   

    componentDidMount() {
        let clients: { name: string, phone: string, group: string }[] =[
            { name : "Baba", phone :"0621458543", group :"-"},
            { name : "Baba1", phone :"0621458543", group :"-"},
            { name : "Baba2", phone :"0621458543", group :"-"},
            { name : "Baba3", phone :"0621458543", group :"-"},
          ];
    }

    render(){
        return (
            <View style={styles.container}>
               <View style={styles.linearclientheader}>
                 <Text style={styles.txtTitle}>Recherche ticket</Text>
                 <View style={styles.edtStyleCli}>
                    <TextInput
                        style={styles.inputname}
                        multiline={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        placeholder=''/>
                    <TouchableOpacity style={styles.button}>
                        <Image style={styles.img} source={require("../../resources/images/flash.png")}/>
                     </TouchableOpacity>
                 </View>
               </View>
               <Tab.Navigator
                initialRouteName="Feed"
                tabBarOptions={{
                    activeTintColor: '#FFFFFF',
                    inactiveTintColor: '#F8F8F8',
                    style: {
                    backgroundColor: '#633689',
                    },
                    labelStyle: {
                    textAlign: 'center',
                    },
                    indicatorStyle: {
                    borderBottomColor: '#87B56A',
                    borderBottomWidth: 2,
                    },
                }}>
                <Tab.Screen
                    name="TicketAttente"
                    component={TicketAttente}
                    options={{
                    tabBarLabel: 'Tickets en attente',
                    }}  />
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
}
export const HistoriqueTicket = reduxConnect(HistoriqueTicketScreen);