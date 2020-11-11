import { Dimensions, ViewStyle, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');
// interface Styles {
//   wrapper: ViewStyle;
//   textContent: TextStyle;
// }

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems:'stretch',
        padding:10,
        backgroundColor:'#FFFFFF',
       marginBottom:70
      },
      linearheader:{
        flexDirection: 'row',
        height:50
      },
      linearclientheader:{
        flexDirection: 'column',
        
        height:70,
        
      },
      inputcontainer:{
        flexDirection: 'row',
        height:51,
        marginTop:10
        
      },
      edtStyleCli:{
        flexDirection: 'row',
        flex:1,
        height:60
      },
      box1:{
        flex:1,
        flexDirection:'column',
        height: 50,
      },
      box2:{
        flex:1,
        flexDirection:'column',
        height: 50,
      },
      txtTitle:{
        fontSize:10,
        fontWeight:'bold',
        color:'#4F4F4F'
      },
      headertxtColor:{
        color:'#998C7E'
      },
      margin:{
          marginTop:10,
      },
      txtValue:{
        fontSize:16,
        fontWeight:'bold',
        color:'#000000',
      },
      inputname:{ 
        backgroundColor: '#F2F2F2' ,
        borderRadius: 5,
        marginTop:5,
        fontSize:14,
        fontWeight:'bold',
        color:'black',
        flex:5,
        height:44,
        
    },
    
    button: {
    
        marginTop:5,
        marginStart:5,
        flex:1,
        backgroundColor: '#E0C298',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width:50,
        height:44,
        
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
      },
      buttonOK: {
    
        marginTop:5,
        marginStart:5,
        flex:1,
        backgroundColor: '#998C7E',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width:50,
        height:44,
        
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
      },
      img:{
        width:24,
        height:24,
       
      },
     
      listContainer:{
        flexDirection:'row',
        marginTop:10

      },
      chp1:{
        flex:1
      },
      chp2:{
        flex:1
      },
    chp3:{
        flex:1
    },
    chp4:{
        flex:1
    },
    result:{
      flexDirection:'row',
      
    },
    article:{
      flex:1,
      flexDirection:'row'
    },
    total:{
      flex:1,
      flexDirection:'row'
    },
    remise:{
      flex:1,
      flexDirection:'row'
    },
    bottomview:{
      height:75, position:'absolute', left:0,right:0,bottom:0,backgroundColor:'#F2F2F2',flexDirection:'row',
      
    },
    txtstyle:{
      fontSize:12,
      fontStyle:'normal',
      fontWeight:'bold',
      color:'#000000',
      textAlign: 'center'
  },
  });
  

