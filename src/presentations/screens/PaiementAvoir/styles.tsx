import { Dimensions, ViewStyle, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');
// interface Styles {
//   wrapper: ViewStyle;
//   textContent: TextStyle;
// }

export const styles = StyleSheet.create({
    body: {
        
        flexDirection: 'column',
        
        flex: 1,
      },
      txtTitle:{
        marginTop:20,
        fontSize:16,
        textAlign:'center'

    },
    
  });
  

