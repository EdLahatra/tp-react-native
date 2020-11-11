import { Dimensions, ViewStyle, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');
// interface Styles {
//   wrapper: ViewStyle;
//   textContent: TextStyle;
// }
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalStyle:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'white'
  },
  body: {
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    flex: 1,
  },
  autocompleteContainer: {
    right:0,
    left:0,
    top:height * 0.32,
    position: 'absolute',
    marginTop: 20,
    marginStart:10,
    
    marginEnd:width * 0.2,
    zIndex: 1
  },
  itemstyle:{
    fontSize: 14,
    fontWeight: 'bold',
    paddingStart:5,
    marginTop:5,
    color:'#998C7E'

  },
  heightItem:{
    height:40,
  },
  button: {
    top:height * 0.32,
    right:0,
    marginEnd:10,
    position: 'absolute',
    backgroundColor: '#E0C298',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width:50,
    height:44,
    marginTop:20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  img:{
    width:20,
    height:26,
   
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

});
