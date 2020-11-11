import { Dimensions, ViewStyle, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');
// interface Styles {
//   wrapper: ViewStyle;
//   textContent: TextStyle;
// }
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor:'white'
  },
 
  inputname:{ 
    backgroundColor: '#F2F2F2' ,
    borderRadius: 5,
    
    fontSize:14,
    fontWeight:'bold',
    color:'black',
    flex:5,
    height:44,
    
},
txtStyle:{
    marginTop:20,
    fontSize:10,
    marginBottom:10,
    fontWeight:'bold'
},
icon:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height:50,
  },
  imgIcon:{
    width:13,
    height:19,
  },

});
