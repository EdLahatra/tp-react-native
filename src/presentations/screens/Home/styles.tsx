import { Dimensions, ViewStyle,  } from 'react-native';

// interface Styles {
//   wrapper: ViewStyle;
//   textContent: TextStyle;
// }

export default {
  container: {
    flex: 1,
  },
  cameraView: {
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width - 100,
    alignItems: 'center',
    marginTop: -30,
    marginLeft: 50,
    marginBottom: 30,
  },
  body: {
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    flex: 1,
  },
  preview: {
    backgroundColor: 'transparent',
    height: '100%',
    width: Dimensions.get('window').width - 100,
  },
  input: {
    padding: 5,
    borderBottomColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    margin: 50,
    marginBottom: 10,
    marginTop: 10,
  },
};
