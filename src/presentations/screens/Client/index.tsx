import React , { useState, useEffect } from 'react';
import { View,TouchableOpacity , Text, TextInput,Image, ListItem, FlatList} from 'react-native';
import ClientController, { reduxConnect, Props } from '../../../controllers/Client';

import {styles} from './styles';

import { useAppClients } from '../../../services/metiers/clients';

/*class ClientScreen extends ClientController {
    componentDidMount() {
        let clients: { name: string, phone: string, group: string }[] =[
            { name : "Baba", phone :"0621458543", group :"-"},
            { name : "Baba1", phone :"0621458543", group :"-"},
            { name : "Baba2", phone :"0621458543", group :"-"},
            { name : "Baba3", phone :"0621458543", group :"-"},
          ];
         this.setState({clients});

        // this.getClientList();
    }
    render(){
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
                        keyboardType='numeric'
                        placeholder=''/>
                    
                    <TouchableOpacity style={styles.button}>
            
                        <Image style={styles.img} source={require("../../resources/images/flash.png")}/>
    
                     </TouchableOpacity>
                 </View>
                    
               </View>
               <FlatList          
                    data={this.state.clients}  
                    keyExtractor={(_, index) => index.toString()}        
                    renderItem={({ item }) => ( 
                        <View style={{flex:1 , flexDirection: 'row' , justifyContent:'space-between'}} >
                            <Text>{item.name}</Text>
                            <Text>{item.phone}</Text>
                            <Text>{item.group}</Text>
                            <TouchableOpacity style={styles.button} 
                                onPress={() => { 
                                    this.props.navigation.navigate('FicheClient' ,{
                                        client: item
                                      });
                                }}>
                                <Image style={styles.img} source={require("../../resources/images/flash.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} >
                                <Image style={styles.img} source={require("../../resources/images/flash.png")}/>
                            </TouchableOpacity>
                        </View>
                    )}                                  
                    />   
            </View>
        )
    }
}*/

export const ClientScreen: React.FunctionComponent<Props> = function (props) {
    const { navigation } = props;
    const [clients, setclients] = useState<{ name: string, phone: string, group: string }[]>([]);

    const { getClients } = useAppClients();
    useEffect(() => {
        // getClients();
      }, []);

    // function getClients(){
    //     let res: { name: string, phone: string, group: string }[] =[
    //         { name : "Baba", phone :"0621458543", group :"-"},
    //         { name : "Baba1", phone :"0621458543", group :"-"},
    //         { name : "Baba2", phone :"0621458543", group :"-"},
    //         { name : "Baba3", phone :"0621458543", group :"-"},
    //       ];
    //       setclients(res);
    //     //  this.setState({clients});
    // }
    
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
                    keyboardType='numeric'
                    placeholder=''/>
                
                <TouchableOpacity style={styles.button}>
        
                    <Image style={styles.img} source={require("../../resources/images/flash.png")}/>

                    </TouchableOpacity>
                </View>
                
            </View>
            <FlatList          
                data={clients}  
                keyExtractor={(_, index) => index.toString()}        
                renderItem={({ item }) => ( 
                    <View style={{flex:1 , flexDirection: 'row' , justifyContent:'space-between'}} >
                        <Text>{item.name}</Text>
                        <Text>{item.phone}</Text>
                        <Text>{item.group}</Text>
                        <TouchableOpacity style={styles.button} 
                            onPress={() => { 
                                navigation.navigate('FicheClient' ,{
                                    client: item
                                    });
                            }}>
                            <Image style={styles.img} source={require("../../resources/images/flash.png")}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} >
                            <Image style={styles.img} source={require("../../resources/images/flash.png")}/>
                        </TouchableOpacity>
                    </View>
                )}                                  
                />   
        </View>
    )   
}
export const Client = reduxConnect(ClientScreen);