import { Dimensions, ViewStyle, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');
// interface Styles {
//   wrapper: ViewStyle;
//   textContent: TextStyle;
// }

export const styles = StyleSheet.create({
    body: {
        
        flexDirection: 'column',
        backgroundColor:'white',
        flex: 1,
      },
      txtTitle:{
        marginTop:20,
        fontSize:16,
        textAlign:'center'

    },
    inputname:{ 
        backgroundColor: '#F2F2F2' ,
        borderRadius: 5,
        paddingLeft:5,
        flex:1,
        height:44,
        fontWeight:'bold',
        fontSize:14,
        color:'#000000'
       
    },
    
  });
  

