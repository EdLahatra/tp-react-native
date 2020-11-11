import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, FlatList } from 'react-native';

import {styles} from './styles';

import BackHeader from '../../components/NavigationHeader/backHeader';
import { Props, reduxConnect } from '../../../controllers/ChoixMotifRemise';
import Button from '../../components/Button';

import { useAppMotifRemise } from '../../../services/applicatif/motifRemise';
import { MotifRemise } from '../../../interfaces';
import { tables } from '../../../services/utils';
import { useAppTickets } from '../../../services/applicatif/tickets';


export const ChoixMotifRemiseScreen: React.FunctionComponent<Props> = function (props) {
  const { navigation, route , system} = props;
  const [titleHeader, setHeadTitle] = useState('');
  const { getMotifRemise } = useAppMotifRemise();
  const [motislist,setMotifList] = useState<MotifRemise[]>([]);
  const [motifchoisi, setMotifChoisi] = useState('');
  const {getTicketsDetail,updateTicketsDetail} = useAppTickets();
  const {user} = system;
  const niveaudroit:Array<number> = [];
  useEffect(() => {
    setHeadTitle('Choix motif de la remise');
    console.log('dddd',props.tickets.numero_ticket);
      async function getTicketDetailFromDb(){
        const data = {
            query: props.tickets.numero_ticket,
            // table: name,
            // where: ['statut'],
            where: ['numero_ticket'],
            like: true,
            // operator: 'OR',
            limit: 200,
          };
          const ticketsDetails = await getTicketsDetail(data);
      }
      getTicketDetailFromDb();

    async function setToState() {
        const queryDB = {
            table:tables.MotifRemise.name,
            limit: 10,
          };
          const motifRemiseLIst:Array<MotifRemise> = await getMotifRemise(queryDB);
          const listMotifRemise:Array<MotifRemise> = [];
          console.log('motifRemiseLIst',motifRemiseLIst);
          console.log('',user);
            if(user.droit_remise1 === '1'){
              niveaudroit.push(1);
            }
            if(user.droit_remise2){
              niveaudroit.push(2);
            }
            if(user.droit_remise3){
              niveaudroit.push(3);
            }

            console.log('niveaudroit',niveaudroit);

            motifRemiseLIst.forEach(function (value){
              niveaudroit.forEach(function (i){
                if(value.niveau_droit == i){
                  listMotifRemise.push(value);
                }
              });
             });
             setMotifList(listMotifRemise);
          
         /* let mo: MotifRemise = {
            libelle_complet: "Article +50",
            libelle_impression:'',
            id:0,id_motif_remise:3,
            date_modification:'',niveau_droit:1,pourcent_remise_max:2
          }
          let mo1: MotifRemise = {
            libelle_complet: "Article remise",
            libelle_impression:'',
            id:0,id_motif_remise:3,
            date_modification:'',niveau_droit:1,pourcent_remise_max:2
          }
          motifRemiseLIst.push(mo);
          motifRemiseLIst.push(mo1);
          motifRemiseLIst.push(mo);
          motifRemiseLIst.push(mo1);
          motifRemiseLIst.push(mo);
          motifRemiseLIst.push(mo1);
          motifRemiseLIst.push(mo);
          motifRemiseLIst.push(mo1);
          motifRemiseLIst.push(mo);
          motifRemiseLIst.push(mo1);
          console.log('motif', motifRemiseLIst.length);*/
         
    }
    setToState();
   
  },[]);

  
  const renderSeparatorView = () => {
    return (
      <View style={{
          height: 5, 
          width: "100%",
         
        }}
      />
    );
  };

  return (


    <KeyboardAvoidingView style={styles.body}>
         <BackHeader msg={titleHeader} goBack = {() => navigation.goBack()}/>
         <FlatList
            style={{marginTop:10,marginBottom:180}}
         data={motislist}  
         keyExtractor={(_, index) => index.toString()} 
         ItemSeparatorComponent={renderSeparatorView}       
         renderItem={({ item }) =>
         <TouchableOpacity onPress={()=> setMotifChoisi(item.libelle_complet)}>
         <View style={{height:40,marginLeft:10,marginRight:10,backgroundColor:'#FBFBFB', justifyContent:'center'}}>
             <Text style={{color:'#4F4F4F',fontSize:14,fontWeight:'bold',marginLeft:10}}>{item.libelle_complet}</Text>
        </View>
        </TouchableOpacity>
       }/>  
        
       <View style={{flexDirection:'column' ,position:'absolute',bottom:0,left:0,right:0}}>
            <Text style={{marginLeft:10}}>Raison de la remise à imprimer sur ticket</Text>
            <View style={{ margin:10,height:50}}>
            <TextInput
                        style={styles.inputname}
                        multiline={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        editable={false}
                        value={motifchoisi}
                        placeholder='Raison de la remise'/>
             </View>
            <View style={{flexDirection:'row', margin:10}}>
                <View style={{flex:1,height:50}}>
                    <Button message="Annuler" iscancel onPress={() =>{}}/>
                </View>
               <View style={{flex:1,height:50,marginStart:40}}>
                    <Button message="Ok" iscancel={false} onPress={() =>{navigation.navigate('MontantRemise')}}/>

               </View>
              
            </View>
     </View>
    </KeyboardAvoidingView>
  )

}

export const ChoixMotifRemise = reduxConnect(ChoixMotifRemiseScreen);
