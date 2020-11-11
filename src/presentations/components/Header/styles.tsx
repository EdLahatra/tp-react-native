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
  {flexDirection: "row", width: 160, height:56, marginTop: 20},
  txtstyle: {
    fontSize: 16,
    fontWeight: 'bold',
    
    
    color: '#998C7E',
  },
  txtstyleNormal: {
    fontSize: 16,
    
    color: '#998C7E',
  },
  nomstyle:{
    fontSize: 10,
    fontWeight: 'bold',
    right:0,
    left:0,
    top:height * 0.28,
    position: 'absolute',
    marginTop: 20,
    marginStart:10,
    color: '#4F4F4F'
  },
  

});
