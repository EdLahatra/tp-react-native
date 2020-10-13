import React from 'react';
import { View,TouchableOpacity , Text} from 'react-native';
import AccueilController, { reduxConnect } from '../../../controllers/Acceuil';
import {styles} from './styles';
import { FlatGrid } from 'react-native-super-grid';

class AcceuilScreen extends AccueilController {
    componentDidMount() {
        let userTestStatus: { num: string, color: string }[] = [
           
            { "num": "Encaissement", "color": '#6FCF97' },
            { "num": "Historique tickets", "color": '#D6D7F6' },
            { "num": "Ouverture caisse", "color": '#D6D7F6' },
            { "num": "Clôture caisse", "color": '#D6D7F6' },
            { "num": "Contrôle caisse", "color": '#D6D7F6' },
            { "num": "Paramètres caisses", "color": '#D6D7F6' },
           
        ];
         this.setState({number:userTestStatus});
        
    }
    
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.gridView}>
                  <FlatGrid
                itemDimension={150}
                data={this.state.number}
                
                // staticDimension={300}
                // fixed
                spacing={7}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={[styles.itemContainer, { backgroundColor: item.color }]} onPress={() => {
                       
                        switch(index){
                            case 0:
                                this.props.navigation.navigate('Encaissement');
                                break;
                            case 1:
                                break;    
                        }
                    }}>
                    <Text adjustsFontSizeToFit={true} style={styles.itemName}>{item.num}</Text>
                    
                    </TouchableOpacity>
                )}
                />
                </View>
            </View>
        )
    }
}
export const Acceuil = reduxConnect(AcceuilScreen);