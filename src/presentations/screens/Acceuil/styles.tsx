import { Dimensions, ViewStyle, StyleSheet } from 'react-native';
// const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  verticalStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  body: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  gridView: {
    flex: 1,
    // margin: 20,
    borderRadius: 20,
    alignSelf: 'center',
    alignContent: 'center',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 100,
    padding: 10,
  },
  itemName: {
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },

});
