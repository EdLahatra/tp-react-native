import React from 'react';
import {Image, View,Text,Dimensions} from 'react-native';
import {styles} from './styles';
const { height, width } = Dimensions.get('window');

interface Props {
    title?: string;
    nom?: string;
    ispass:boolean;
  }
  
export class Header extends React.Component<Props> {
    constructor(props:Props) {
      super(props);
     
    }
    componentDidMount() {
          
         
        
      }
   
    render() {
       
      return (
       <View style={styles.verticalAlign}>
           <View style={{alignSelf: 'center'}}>
            <Image 
                style={styles.imgstyle}
                source={require('../../resources/images/g_logoheader.png')} />
            </View>
            <View style={{
                position: 'absolute',
               
                left: 0,
                top:height * 0.20,
                flexDirection:'row',
                marginTop: 20,
                marginStart:10,
                
              }}>
           {this.props.ispass && (<Text style={styles.txtstyleNormal}>BIENVENUE </Text>  )}
           <Text style={styles.txtstyle}>{this.props.title}</Text>  
           </View>
           <View style={{height:4, width:40,backgroundColor:'#E0C298', position:'absolute', top:height * 0.28,marginStart:10}}></View>
          <Text style={styles.nomstyle}>{this.props.nom}</Text> 
           
       </View>
           

       
      );
    }
  }