import React from 'react';
import {Image, View,Text,Dimensions} from 'react-native';
import {styles} from './styles';

export default class HeaderClient extends React.Component<Props> {

    render(){
        return (
             <View style ={ styles.container}>
                  <View style={styles.listContainer}>
                    <View style={styles.chp1}>
                         <Text style={[styles.txtTitle,styles.headertxtColor]}>Nom</Text>
                         <Text style={[styles.txtTitle,styles.headertxtColor]}>et prénom</Text>
                    </View>
                    <View style={styles.chp2}>
                         <Text style={[styles.txtTitle,styles.headertxtColor]}>Téléphone</Text>
                    </View>
                    <View style={styles.chp2}>
                         <Text style={[styles.txtTitle,styles.headertxtColor]}>Groupe</Text>
                    </View>
                    <View style={styles.chp2}>
                    </View>
               </View>
               <View style={{
                         height: 1, 
                         width: "100%",
                         backgroundColor: "#CEDCCE",
                    }}/>
             </View>
            
        );
    }
    
}

/**/