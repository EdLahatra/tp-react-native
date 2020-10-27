import { Dimensions, StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      padding: 10,
      marginTop: 10,
      alignSelf: "center"
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
      elevation: 11,

      justifyContent: 'space-between'
      },
      bottomItemView : {
        flexDirection: 'column',
        flex : 1,
        marginLeft : 20,
        marginRight : 30,
        marginBottom :  10,
        alignItems: 'flex-start' ,
        elevation: 2,
        alignSelf : "baseline"
      },
      txtValue : {
        textAlignVertical: 'center',
        alignSelf: "center",
        textAlign : 'center'
      }
  });