import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, TextInput } from 'react-native';

import {styles} from './styles';


import { useAppAuth } from '../../../services/applicatif/auth';

import { Utilisateurs } from '../../../interfaces';
import BackHeader from '../../components/NavigationHeader/backHeader';
import { Props, reduxConnect } from '../../../controllers/AuthSupervisor';
import Popup from '../../components/Popup';
import { STRING } from '../../../data/Constants';




export const AuthSupervisorScreen: React.FunctionComponent<Props> = function (props) {
  const { navigation, loginUser, route } = props;
  
  const [query, setQuery] = useState('');
  const [data, setData] = useState<Utilisateurs[]>([]);
  const [isHidden, setIsHidden] = useState(false);
  const [titleHeader, setHeadTitle] = useState('');
  const [titleScreen, setTitleScreen] = useState('');
  const [isVisibilitySupervisor, setVisibilityIsNotSupervisor] = useState(false);
  const {  getUsers } = useAppAuth();

  // const { db } = useRealm();
  const [films, setFilms] = useState<Utilisateurs[]>([]);
 

  useEffect(() => {
    //getUsers('J');
   if(route.params?.id=='remise_panier'){
    setHeadTitle('Authentification superviseur');
    setTitleScreen('Veuillez vous connecter en tant que superviseur pour permettre la remise');
   }
    
    async function setToState() {
       
            const val:Utilisateurs[] =  await getUsers(query);
           // const output = val.map( item => item.nom + ' ' + item.prenom );
           // console.log('Users',val);
            setFilms(val);
       
        
    }    
       setToState();
  }, [query]);

  
  function loggin(user:any) {
    // this.setState({ query: item });
    //setQuery(item);
    console.log('ser', user);
    setIsHidden(true);
    if(user.droit_manager == '1'){
      navigation.navigate('Password',{
     
        id: 8, user:user
      });
  
    }else{
      setVisibilityIsNotSupervisor(true);
    }
   
  }

  async function getUserInDB(query: string) {
    let res:Utilisateurs[] = []
    if(query === ''){
      res.length = 0;
      setData(res);
      return;
    }
    const val:Utilisateurs[] =  await getUsers(query);
    // const output = val.map( item => item.nom + ' ' + item.prenom );
    const regex = new RegExp(`${query.trim()}`, 'i');
    res = val.filter(film => (film.nom.search(regex) >= 0 || film.prenom.search(regex) >= 0))
    //console.log('Users ============+>', res);
    // setFilms(val);
    setData(res);
  }

  function goToScan() {
   
    
  }

 

  return (


    <KeyboardAvoidingView style={styles.verticalStyle}>
         <BackHeader msg={titleHeader} goBack = {() => navigation.goBack()}/>
        <View style={{marginTop:40,alignItems:'center'}}>
        <Text style={{textAlign:'center'}}>{titleScreen}</Text>
        </View>
      <Text style={styles.txt}>Nom d'utilisateur</Text>
      <View style={styles.autocompleteContainer}>
       
       <TextInput
        onChangeText={text => getUserInDB(text)}
        style={styles.inputname}
        placeholder='Entrer votre nom'
       />
       <View
          style={{ zIndex: 10, backgroundColor: 'white', elevation:4 , paddingLeft: 10 }}
        >
          {
            data.map((item: any, index: number) => {
              const { nom, prenom } = item;
              console.log({ nom, prenom }, index);
              return (
                <TouchableOpacity key={index} style={styles.heightItem} onPress={() => loggin(item)}>
                  <Text style={styles.itemstyle}>{nom + ' '+prenom}</Text>
                </TouchableOpacity>
              )
            })
          }
       </View>
       

      </View>
      <TouchableOpacity style={styles.button} onPress={() => goToScan()}>

        <Image style={styles.img} source={require("../../resources/images/g_ico_scan.png")} />

      </TouchableOpacity>
      <Popup modalVisible ={isVisibilitySupervisor} 
                setModalVisible ={setVisibilityIsNotSupervisor} 
                cancelButton = 'Annuler'
                okButton = {STRING.OK}
                isTwoButton = {false}
                message = "Vous n'êtes pas superviseur" />

    </KeyboardAvoidingView>
  )

}

export const AuthSupervisor = reduxConnect(AuthSupervisorScreen);
