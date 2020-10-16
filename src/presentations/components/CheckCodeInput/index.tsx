import React from 'react';
import {TouchableOpacity, View,TextInput,Image} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {styles} from './styles';


interface Props {
    add: () => void;
  }
  
  interface State {
   query:string,
   codes:string[]
}
export class CheckCodeInput extends React.Component<Props,State> {
    readonly state:State = {
        query: '',
        codes:[]
	}
    constructor(props:Props) {
      super(props);
     
    }
    componentDidMount() {
        
       
        this.setState({ query:'' , codes: ['Jim','Jimmy','Maliah','Connor','Col','Jean','Jolo','Jeeee','Jerrr'] });
       
        
      }
      
      getData(item:string){
        this.setState({ query: item });
      }  
      findCode(query:string){
        if (query === '') {
            return [];
          }
      
          const { codes } = this.state;
          const regex = new RegExp(`${query.trim()}`, 'i');
          return codes.filter(code => code.search(regex) >= 0);
      }
    
    render() {
        const { query } = this.state;
        const data = this.findCode(query);
      return (
       <View style={styles.linearclientheader}>
           <View style={{flex:5}}>
           <View style={styles.autocompleteContainer}>
           <TextInput
                        style={styles.inputname}
                        multiline={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        placeholder=''/>
                    
            
            </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => this.props.add()} >
            
                <Image style={styles.img} source={require("../../resources/images/flash.png")}/>
        
            </TouchableOpacity>
   
        </View>
           

       
      );
    }
  }