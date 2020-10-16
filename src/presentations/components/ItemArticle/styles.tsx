import {StyleSheet,Dimensions} from 'react-native';
const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  container:{
    flex: 1,
    flexDirection: 'row',
    height:52,
    alignItems:'center',
    justifyContent:'center'
  },
  chp1:{
    flex:1,
    flexDirection:'column'
  },
  chp2:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  button: {
    
   
    marginStart:5,
    flex:1,
    backgroundColor: '#859a9b',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width:20,
    height:20,
    
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  img:{
    width:10,
    height:14,
   
  },
  txtItem:{
      marginStart:10,
      marginEnd:10,
  }
  
  
});
