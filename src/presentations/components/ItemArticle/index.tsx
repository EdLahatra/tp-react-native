import React from 'react';
import {Image,TextInput, View,Text,TouchableOpacity} from 'react-native';
import { ArticleDto } from '../../screens/Encaissement/Article';
import { CircleButton } from '../CircleButton';
import {styles} from './styles';


interface Props {
    article: ArticleDto
  }
  
  interface State {
   qt:number;
}
export class ItemArticle extends React.Component<Props,State> {
    readonly state:State = {
		qt:0
	}
    constructor(props:Props) {
      super(props);
     
    }
    componentDidMount() {
       
        
      }
      add(){

      }
      delete(){

      }
      
     
    render() {
       
      return (
       <View style={styles.container}>
          <View style={styles.chp1}>
            <Text>{this.props.article.designation}</Text>
            <Text>{this.props.article.code}</Text>
          </View>
          <View style={styles.chp1}>
            <Text>{this.props.article.prix}</Text>
          </View>
          <View style={styles.chp1}>
            <Text>{this.props.article.remise}</Text>
          </View>
          <View style={styles.chp2}>
           
            <CircleButton
                onPress = {() => this.delete()}
                circleDiameter = {20}
                source={ require("../../resources/images/flash.png") }
                >
                
            </CircleButton>
            <Text style={styles.txtItem}>{this.props.article.qt}</Text>
            
            <CircleButton
                onPress = {() => this.add()}
                circleDiameter = {20}
                source={ require("../../resources/images/flash.png") }
                >
                
            </CircleButton>
          </View>
       </View>
           

       
      );
    }
  }