import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'white'
  },
  linearheader: {
    flexDirection: 'row',
    height: 50
  },
  linearclientheader: {
    flexDirection: 'column',
    height: 90,
    padding: 10,
  },
  edtStyleCli: {
    flexDirection: 'row',
    flex: 1,
    height: 60
  },
  box1: {
    flex: 1,
    flexDirection: 'column',
    height: 50,
  },
  box2: {
    flex: 1,
    flexDirection: 'column',
    height: 50,
  },
  txtTitle: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  txtValue: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#3928A6',
  },
  inputname: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 44,
    left: 10,
  },

  button: {
    marginTop: 5,
    flex: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 40,
    backgroundColor: '#E0C298',
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft: 10
  },
  img: {
    width: 20,
    height: 20,
  },

});
