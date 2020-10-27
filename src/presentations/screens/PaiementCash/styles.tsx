import { Dimensions, ViewStyle, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');
// interface Styles {
//   wrapper: ViewStyle;
//   textContent: TextStyle;
// }

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding:10,
        justifyContent:'flex-start',
        
        backgroundColor:'#FFFFFF',
      },
     
  });
  

