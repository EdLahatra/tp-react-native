import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, NativeSyntheticEvent, NativeTouchEvent, Image, KeyboardAvoidingView } from 'react-native';
import LoginController, { reduxConnect, Props, State } from '../../../controllers/Login';
import styles from './styles';
// import SplashScreen from 'react-native-splash-screen';
import { Header } from '../../components';
import Autocomplete from 'react-native-autocomplete-input';

import { useAppAuth } from '../../../services/applicatif/auth';

// class LoginScreen extends LoginController{
//     componentDidMount() {

//         setTimeout(() => {
//         //    SplashScreen.hide();
//         }, 3000); // amount of time the splash is shown from the time component is rendered
//         this.setState({ query:'' , films: ['Jim','Jimmy','Maliah','Connor','Col','Jean','Jolo','Jeeee','Jerrr'] });

//     }
//     findFilm(query:string) {
//         if (query === '') {
//           return [];
//         }

//         const { films } = this.state;
//         const regex = new RegExp(`${query.trim()}`, 'i');
//         return films.filter(film => film.search(regex) >= 0);
//       }
//       loggin(item:string){
//         this.setState({ query: item });
//         this.props.navigation.navigate('Password');
//       }
//       goToScan(){
//         this.props.navigation.navigate('Password');
//       }
//     render() {
//         const { query } = this.state;
//         const data = this.findFilm(query);
//         return (


//         <KeyboardAvoidingView style={styles.verticalStyle}>
//             <Header title="CONNEXION" nom="Nom d'utilisateur" ispass={false}/>
//             <View style={styles.autocompleteContainer}>
//                 <Autocomplete 
//                     data={data}
//                     defaultValue={query}
//                     placeholder="Recherche..."
//                     onChangeText={text => this.setState({ query: text })}
//                     renderItem={({ item }) => (
//                     <TouchableOpacity style={styles.heightItem} onPress={() => this.loggin(item)}>
//                         <Text style={styles.itemstyle}>{item}</Text>
//                     </TouchableOpacity>
//                 )}/>

//             </View>
//             <TouchableOpacity style={styles.button} onPress={() => this.goToScan()}>

//                 <Image style={styles.img} source={require("../../resources/images/flash.png")}/>

//             </TouchableOpacity>

//         </KeyboardAvoidingView>
//         )
//     }
// }
export interface Utilisateur{
    nom:string,
    prenom:string,
    password:string,
}
export const LoginScreen: React.FunctionComponent<Props> = function (props) {
  const { navigation } = props;
  const [query, setQuery] = useState('');
  const [isHidden, setIsHidden] = useState(false);

  const {  getUsers } = useAppAuth();

  // const { db } = useRealm();
  const [films, setFilms] = useState<Utilisateur[]>([]);

  useEffect(() => {
    //getUsers('J');
  
    
    async function setToState() {
       
            const val:Utilisateur[] =  await getUsers(query);
           // const output = val.map( item => item.nom + ' ' + item.prenom );
           // console.log('Users',val);
            setFilms(val);
       
        
    }    
       setToState();
  }, []);

  function findFilm(query:string) {
      
      console.log('Users',films);
     
    if (query === '') {
      return [];
    }
    // const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => (film.nom.search(regex) >= 0 || film.prenom.search(regex) >= 0));
  }

  function loggin(item:any) {
    // this.setState({ query: item });
    //setQuery(item);
    setIsHidden(true);
    navigation.navigate('Password',{
        item
    });
  }

  function goToScan() {
   
    navigation.navigate('Password');
  }

  const data = findFilm(query);

  return (


    <KeyboardAvoidingView style={styles.verticalStyle}>
      <Header title="CONNEXION" nom="Nom d'utilisateur" ispass={false} />
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          data={data}
          defaultValue={query}
          hideResults = {isHidden}
          placeholder="Recherche..."
          onChangeText={text => setQuery(text)}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.heightItem} onPress={() => loggin(item)}>
              <Text style={styles.itemstyle}>{item.nom + ' '+item.prenom}</Text>
            </TouchableOpacity>
          )} />

      </View>
      <TouchableOpacity style={styles.button} onPress={() => goToScan()}>

        <Image style={styles.img} source={require("../../resources/images/flash.png")} />

      </TouchableOpacity>

    </KeyboardAvoidingView>
  )

}

export const Login = reduxConnect(LoginScreen);