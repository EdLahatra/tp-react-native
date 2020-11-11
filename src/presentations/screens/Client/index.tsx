import React , { useState, useEffect } from 'react';
import { View,TouchableOpacity , Text, TextInput,Image, ListItem, FlatList, BackHandler} from 'react-native';
import ClientController, { reduxConnect, Props } from '../../../controllers/Client';
import HeaderClient from '../../components/Client/HeaderClient';

import {styles} from './styles';
import { useAppClients } from '../../../services/applicatif/clients';
import { ClientI } from '../../../interfaces';
import ItemClient from '../../components/Client/ItemClient';

function renderSeparatorView(){
    return (
      <View style={{
          height: 1, 
          width: "100%",
          backgroundColor: "#CEDCCE",
        }}
      />
    );
  };

export const ClientScreen: React.FunctionComponent<Props> = function (props) {
    const { navigation } = props;
    const [clients, setclients] = useState< Array<ClientI>>();
    const [valueInput, setValueInput] = useState('');
   const { getClients } = useAppClients();

    useEffect(() => {
         //getClients();
         BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
         return () => {
           BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
         };
      }, []);
      function handleBackButtonClick(){
        navigation.goBack();
        return true;
      }

    /*function getClients(){
        let clients: { name: string, phone: string, group: string }[] =[
            { name : "Baba", phone :"0621458543", group :"-"},
            { name : "Baba1", phone :"0621458543", group :"-"},
            { name : "Baba2", phone :"0621458543", group :"-"},
            { name : "Baba3", phone :"0621458543", group :"-"},
          ];
          setclients(clients);
    }*/
     async function searchClient(value:string){
        const queryClient = {
            query: value,
            where: ['nom', 'prenom', 'telephone', 'numero_carte'],
            like: true,
            operator: 'OR',
            limit: 10,
          };
          const client: Array<ClientI> = await getClients(queryClient);

          setclients(client);
     }
     function goToFicheClient(clientItem:ClientI){
        navigation.navigate("FicheClient", {client : clientItem});
     }
     function validClient(clientItem:ClientI){
        navigation.navigate("Encaissement",{clientI:clientItem,fromHome:false});
     }

    return (
        <View style={styles.container}>
            <View style={styles.linearclientheader}>
                <Text style={styles.txtTitle}>Recherche(nom / numéro tel / code carte) client</Text>
                <View style={styles.edtStyleCli}>
                <TextInput
                    style={styles.inputname}
                    multiline={false}
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType='default'
                    onChangeText={(value) => setValueInput(value)}
                    value={valueInput}
                    placeholder=''/>
                
                <TouchableOpacity style={styles.button} onPress={() => searchClient(valueInput)}>
        
                    <Image style={styles.img} source={require("../../resources/images/ok.png")}/>

                    </TouchableOpacity>
                </View>
                
            </View>
            <HeaderClient/>
            <FlatList          
                data={clients}  
                keyExtractor={(_, index) => index.toString()} 
                ItemSeparatorComponent={renderSeparatorView}       
                renderItem={({ item }) =>
                <ItemClient client={item} 
                    onCheck= {() => validClient(item)} 
                    onInfoClicked= {() => goToFicheClient(item)}/>}                                  
            />   
        </View>
    )   
}
export const Client = reduxConnect(ClientScreen);
