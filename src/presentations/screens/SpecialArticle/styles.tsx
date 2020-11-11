import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  body: {
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  txtTitle: {
    marginTop: 20,
    color: '#000000',
    fontSize: 16,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
    // margin: 20,
    borderRadius: 20,
    alignSelf: 'center',
    alignContent: 'center',
  },
  itemContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 5,
    // backgroundColor: '#D6D7F7',
    // elevation: 1,
    // width: 160,
    // height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 100,
    padding: 25,
    backgroundColor: '#E0C298',
  },
  itemName: {
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});
