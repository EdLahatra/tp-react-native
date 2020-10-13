import { Dimensions, ViewStyle, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');
// interface Styles {
//   wrapper: ViewStyle;
//   textContent: TextStyle;
// }

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        flexDirection: 'column',
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
      gridView: {
          flex:1, 
          
          marginTop:width - 172,
          marginEnd:10, 
          marginStart:10,
          justifyContent:'center'
        },
      itemContainer: {
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 5,
        width:156,
        height: 78,
      },
      itemName: {
         textTransform: 'uppercase',
        fontSize: 16,
        textAlign:'center',
        color: '#fff',
        fontWeight: '600',
      },
      itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
      },
     
  });
  

