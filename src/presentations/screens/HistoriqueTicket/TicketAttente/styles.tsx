import { Dimensions, StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      padding: 10,
      marginTop: 16,
    },
    img:{
      width:20,
      height:26,
     
    },
    bottomView : {
      padding: 0,
      backgroundColor: "#FFFFFF", 
      flex: 0.2 ,
      flexDirection:"row",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11
      },
      bottomItemView : {
        flexDirection: 'column',
        marginLeft : 20,
        alignItems: 'flex-start' ,
        elevation: 2
        }
  });