import React from 'react';
import { View, SafeAreaView, ScrollView, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import styles from './styles';

import HomeController, { reduxConnect } from '../../../controllers/Home';

const flashImage = {
  on: require('../../resources/images/flash.png'),
  off: require('../../resources/images/flash-off.png'),
};

class ScanScreen extends HomeController {
  camera: RNCamera | null | undefined;
  render() {
    const { flash } = this.state;
    const { on, off } = flashImage;
    return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.body}>
            <View style={styles.cameraView}>
              <RNCamera
                ref={(ref) => {
                  this.camera = ref;
                }}
                defaultTouchToFocus
                // flashMode={RNCamera.Constants.FlashMode.torch}
                mirrorImage={false}
                onBarCodeRead={async (scanResult) => await this.onBarCodeRead(scanResult)}
                onFacesDetected={() => { }}
                onFocusChanged={() => { }}
                onZoomChanged={() => { }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                // defaultVideoQuality={RNCamera.Constants.VideoQuality['720p']}
              >
                <BarcodeMask />
              </RNCamera>
              <TouchableOpacity
                onPress={() => this.setState({ flash: !flash })}
                activeOpacity={1}
              >
                <Image
                  source={flash ? on : off}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ alignContent: 'center' }}>
              <TextInput
                value={this.state.name}
                onChangeText={(name) => this.setState({ name })}
                placeholder={'Produit name'}
                style={styles.input}
              />
            </View>
            <View style={{ padding: 20 }}>
              <Button
                testID="Scan Produits"
                title="Scan Produits"
                onPress={() => {}}
              />
              <View style={{ height: 10 }} />
              <Button
                testID="again"
                title="Go to Produits"
                onPress={() => this.props.navigation.navigate('Produits')}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export const Home = reduxConnect(ScanScreen);
