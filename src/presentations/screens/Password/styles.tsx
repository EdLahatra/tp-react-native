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
      },
      body: {
        justifyContent: 'center',
        flexDirection: 'column',
        
        flex: 1,
      },
      autocompleteContainer: {
        right:0,
        left:0,
        top:height * 0.32,
        position: 'absolute',
        marginTop: 20,
        
        
        zIndex: 1
      },
     
  });
  

