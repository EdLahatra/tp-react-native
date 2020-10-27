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
    marginStart:10,
    marginEnd:10,
    marginTop:10,
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
      marginStart:15,
      marginEnd:15,
      height:20
  },
  inputname:{ 
    textAlign: 'center',
    backgroundColor: '#F5F5FF' ,
    borderRadius: 5,
    margin:5,
    fontSize:14,
    fontWeight:'bold',
    color:'black',
    flex:5,
    height:44,
    
},
  
  
});
