import {StyleSheet,Dimensions} from 'react-native';
const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  
  parentContainer:{
    flex:1,
    
    flexDirection:'row',
   
   
  },
  inputname:{ 
    backgroundColor: '#F5F5FF' ,
    borderRadius: 5,
    flex:5,
    height:44,
    
},
  autocompleteContainer: {
    
    zIndex:1,
    position:'absolute',
    left:0,top:0,right:0
  },
  autocompleteContainerstyle: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  linearclientheader:{
    flexDirection: 'row',
    height:51,
    marginTop:10
    
  },
  itemstyle:{
    fontSize: 14,
    fontWeight: 'bold',
    paddingStart:5,
  },
  heightItem:{
    height:40,
  },
  button: {
   
    backgroundColor: '#859a9b',
    borderRadius: 2,
    marginStart:5,
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    width: 50,
    height:44,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  img:{
    width:20,
    height:26,
   
  },

});
