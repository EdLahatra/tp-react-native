import {StyleSheet,Dimensions} from 'react-native';
const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  verticalAlign:{
    flex: 1,
    flexDirection: 'column',
  },
  
  imgstyle:
  {flexDirection: "row", width: 100, height:100, marginTop: 20},
  txtstyle: {
    fontSize: 16,
    fontWeight: 'bold',
    
    
    color: '#34B6DC',
  },
  txtstyleNormal: {
    fontSize: 16,
    
    color: '#34B6DC',
  },
  nomstyle:{
    fontSize: 10,
    fontWeight: 'bold',
    right:0,
    left:0,
    top:height * 0.32,
    position: 'absolute',
    marginTop: 20,
    marginStart:10,
    marginEnd:20,
    color: '#34B6DC'
  },
  parentContainer:{
    flex:1,
    
    flexDirection:'column',
   
   
  },
  horizontal:{
    flex:1,
    
    flexDirection:'row',
   
  },
  txtContainer: {
    
    flex:1,
    alignItems:'center',
    marginStart: width * 0.2,
    marginEnd: width * 0.2,
    flexDirection:'column',
   
    zIndex: 1
  },
  passwordinput:{ 
      backgroundColor: '#F5F5FF' ,
      borderRadius: 5,
      height:44,
      flex:5
  },
  button: {
    
    backgroundColor: '#859a9b',
    borderRadius: 2,
    marginStart:5,
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    width:50,
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
  input:{
    fontSize: 14,
    position: 'absolute',
    right:0,
    left:0,
    color: '#34B6DC',
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 5,
    width:55,
    height: 55,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },

});
