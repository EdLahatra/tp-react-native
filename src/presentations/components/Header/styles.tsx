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
  {flexDirection: "row", width: 75, height:75, marginTop: 20},
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
    top:height * 0.26,
    position: 'absolute',
    marginTop: 20,
    marginStart:10,
    color: '#34B6DC'
  },
  

});
