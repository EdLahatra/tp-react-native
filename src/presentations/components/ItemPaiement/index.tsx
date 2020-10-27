
import React from 'react';
import {Image,TextInput, View,Text,TouchableOpacity} from 'react-native';
import { Panier } from '../../screens/Paiement';
import {styles} from './styles';

interface Props{
  article:Panier,
 
  deleteValue:() => void
}

const ItemPaiement : React.FunctionComponent<Props> = function (props) {
  const { article, deleteValue } = props;
  
  return (
    
    <View style={styles.container}>
           
          <View style={styles.chp1}>
            <Text>{article.code}</Text>
          </View>
          <View style={styles.chp1}>
            <Text>{article.mode}</Text>
          </View>
          <View style={styles.chp1}>
             <Text>{article.total+' '+article.devise}</Text>
          </View>
          <View style={styles.chp2}>
             <Text>{article.valid}</Text>
             <TouchableOpacity style={{position:'absolute', right:0,marginEnd:5}} onPress={() => deleteValue()}>
                <Image style={styles.img} source={require("../../resources/images/flash.png")}/>
             </TouchableOpacity>
          </View>
    </View>

  
  );
};
export default ItemPaiement;