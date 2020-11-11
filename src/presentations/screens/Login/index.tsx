import React, { useState, useEffect } from 'react';
import { NativeModules, View, Text, TouchableOpacity, NativeSyntheticEvent, NativeTouchEvent, Image, KeyboardAvoidingView, TextInput } from 'react-native';
import LoginController, { reduxConnect, Props, State } from '../../../controllers/Login';

// import SplashScreen from 'react-native-splash-screen';
import { Header } from '../../components';
import {styles} from './styles';


import { useAppAuth } from '../../../services/applicatif/auth';
import SplashScreen from 'react-native-splash-screen'
import { Utilisateurs } from '../../../interfaces';

export const LoginScreen: React.FunctionComponent<Props> = function (props) {
  const { navigation, loginUser, route } = props;
  console.log({ route });
  const [query, setQuery] = useState('');
  const [data, setData] = useState<Utilisateurs[]>([]);
  const [isHidden, setIsHidden] = useState(false);

  const {  getUsers } = useAppAuth();

  // const { db } = useRealm();
  const [films, setFilms] = useState<Utilisateurs[]>([]);

  useEffect(() => {
    //getUsers('J');
    SplashScreen.hide();
    
    async function setToState() {
       
            const val:Utilisateurs[] =  await getUsers(query);
           // const output = val.map( item => item.nom + ' ' + item.prenom );
           // console.log('Users',val);
            setFilms(val);
       
        
    }    
       setToState();
  }, [query]);

  function findFilm(query:string) {
      
      // console.log('Users ======>',films);
     
    if (query === '') {
      return [];
    }
    // const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => (film.nom.search(regex) >= 0 || film.prenom.search(regex) >= 0));
  }

  function loggin(user:any) {
    // this.setState({ query: item });
    //setQuery(item);
    setIsHidden(true);
    navigation.navigate('Password',{
     
      id: route?.params?.id, user:user
    });

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
    // ToastModule.showToast('/data/user/0/com.ghanty.mobile/cache/temp/20201103_103903_hap_codesbarres.csv');
  }

  // const data = findFilm(query);

  //console.log({ data });

  return (


    <KeyboardAvoidingView style={styles.verticalStyle}>
      <Header title="CONNEXION" nom="Nom d'utilisateur" ispass={false} />
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
        {/* <Autocomplete
          data={data}
          defaultValue={query}
          hideResults = {isHidden}
          placeholder="Recherche..."
          onChangeText={text => setQuery(text)}
          // onChangeText={async text => await getUserInDB(text)}
          renderItem={({ item }: any, index: number) => {
            console.log({ item }, index);
            return (
              <TouchableOpacity key={index} style={styles.heightItem} onPress={() => loggin(item)}>
                <Text style={styles.itemstyle}>{item.nom + ' '+item.prenom}</Text>
              </TouchableOpacity>
            )
          }
          } /> */}

      </View>
      <TouchableOpacity style={styles.button} onPress={() => goToScan()}>

        <Image style={styles.img} source={require("../../resources/images/g_ico_scan.png")} />

      </TouchableOpacity>

    </KeyboardAvoidingView>
  )

}

export const Login = reduxConnect(LoginScreen);
