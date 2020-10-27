import { Dimensions, StyleSheet } from 'react-native';
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
        alignItems: 'center',
        flexDirection: 'column',
        
        flex: 1,
      },
      txtTitle:{
          marginTop:20,

      },
      gridView: {
        marginTop: 10,
        flex: 1,
      },
      itemContainer: {
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 5,
        backgroundColor:'#D6D7F7',
        elevation:1,
        width:160,
        height: 55,
      },
      itemName: {
        fontSize: 16,
        color: '#3928A6',
        fontWeight: '600',
      },
     
     
  });
  

