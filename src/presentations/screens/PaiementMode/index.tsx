import React ,{ useEffect, useRef, useState }from 'react';
import { View,TouchableOpacity , Text} from 'react-native';
import  {  reduxConnect } from '../../../controllers/Encaissement';


import { STRING } from '../../../data/Constants'
import {styles} from './styles';
import {StackNavigationProp,RouteProp} from '@react-navigation/stack';

import {StackParams} from '../../navigation';
import Button from '../../components/Button';
import { FlatGrid } from 'react-native-super-grid';

type NavigationProps = StackNavigationProp<StackParams, 'PaiementMode'>;
type Route = RouteProp<StackParams, 'PaiementMode'>;

 interface Props {
    
    navigation: NavigationProps;
    route: Route;
  }
export const PaiementModeScreen : React.FunctionComponent<Props> = function (props) {
    
    const { navigation ,route} = props;
    const {montant} = route.params;
    const [cartemode, setCarteMode] = useState([0]);
    let values:number[] = [];
    useEffect(() => {
        console.log('mont',montant);
        for (let i = 0; i <= montant.count; i=i+5) {
            let j = i+5;
            if(j <= montant.count){
                values.push(j);
                
            }
           
          }
       
        setCarteMode(values);
    },[]);

    function goToPaiement(item:number){
        //let montantregle = montant.toString().split(' ');
        console.log('mode', item);
        navigation.navigate('Paiement',{articleTotal:montant,iscodechoisi:true,montantregle:{count:item,devises:montant.devises}});
    }
   
   
        return (
           
            <View style={styles.body}>
                <Text style={styles.txtTitle}>Veuillez séléctionner le bon de réduction :</Text>
                <FlatGrid
                itemDimension={130}
                data={cartemode}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                spacing={14}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => {
                        goToPaiement(item)
                        
                    }}>
                    <Text style={styles.itemName}>{item+' '+montant.devises}</Text>
                    
                    </TouchableOpacity>
                )}
                />
            </View>
           
        )
    
}
export const PaiementMode = reduxConnect(PaiementModeScreen);
