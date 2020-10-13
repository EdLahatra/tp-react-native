import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

const styles = {
  root: {
    flex: 1,
  },
  upperSection: {
    flex: 1,
  },
  lowerSection: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  camera: {
    height: '100%',
  },
};

const Images = {
  flash: require('./flash.png'),
  flash_off: require('./flash-off.png'),
};

class ItemBarcodeScanContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: '',
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      },
    };
  }

  onBarCodeRead = () => {
    // scanResult.data will contain your scanned data
  };

  onGetItemPress = () => {
    // do something with button press
  };

  handleChange = () => {
    // handle user input
  };

  render() {
    const {flashMode} = this.state.camera;
    return (
      <KeyboardAvoidingView style={styles.root}>
        {' '}
        {/* OR Use a simple <View> instead of <KeyboardAvoidingView> */}
        <View style={styles.upperSection}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  flashMode: flashMode === 'torch' ? 'on' : 'torch',
                })
              }>
              <Image
                source={Images[flashMode === 'torch' ? 'flash' : 'flash_off']}
                style={{
                  width: 40,
                  height: 40,
                  marginTop: 20,
                  paddingLeft: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <RNCamera
              ref={(ref) => {
                this.camera = ref;
              }}
              defaultTouchToFocus
              flashMode={this.state.flashMode}
              mirrorImage={false}
              onBarCodeRead={this.onBarCodeRead}
              onFacesDetected={() => {}}
              onFocusChanged={() => {}}
              onZoomChanged={() => {}}
              permissionDialogTitle="Permission to use camera"
              permissionDialogMessage="We need your permission to use your camera phone"
              style={styles.preview}
              type={this.state.camera.type}
              defaultVideoQuality={RNCamera.Constants.VideoQuality['720p']}>
              <BarcodeMask />
            </RNCamera>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default ItemBarcodeScanContainer;
