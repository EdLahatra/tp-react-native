// React Native Tab
// https://aboutreact.com/react-native-tab/

import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';

const TicketTermineScreen = ({ navigation }) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 , padding: 16}}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16
              }}>
              Setting{'\n'}(You are on SecondPage)
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={
                () => navigation.navigate('FirstPage')
              }>
              <Text>Go to Home Tab</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default TicketTermineScreen;