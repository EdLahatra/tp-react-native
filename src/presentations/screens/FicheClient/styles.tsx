import { Dimensions, ViewStyle, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems:'stretch',
        padding:10,
        backgroundColor:'white'
       
      },
      linearheader:{
        flexDirection: 'row',
        height:50
      },
      linearclientheader:{
        flexDirection: 'column',
        flex:1,
       marginTop:10
        
      },
      edtStyleCli:{
        flexDirection: 'row',
        flex:1,
       
        borderRadius:5,
        
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
        marginBottom:10
      },
      txtValue:{
        fontSize:16,
        fontWeight:'bold',
        color:'#3928A6',
      },
      inputname:{ 
        borderRadius: 5,
        flex:5,
        backgroundColor:'#F2F2F2',
        height:50
    },
    
    button: {
    
        marginTop:5,
        marginStart:5,
        flex:1,
        backgroundColor: '#859a9b',
        borderRadius: 2,
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
        width:20,
        height:26,
       
      },
     
  });
  

