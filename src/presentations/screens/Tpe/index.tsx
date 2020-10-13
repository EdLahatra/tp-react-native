import React, { Component} from 'react';
import {
    
    StyleSheet,
    View,Text,
  } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';

export interface Props {
    name: string ;
    timer:boolean;
   
  }
class TpeScreen extends React.Component<{}, Props> {
    manager : BleManager;
    readonly state: Props = {
		name: "",
		timer: false,
	};
    constructor(props:Props)
    {
      super(props);
        this.manager = new BleManager();
        this.state = {name: "init 6", timer:false};
       
   
        
    }
    componentDidMount() {
       
    
        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this.scanAndConnect();
                subscription.remove();
            }
        }, true);
    }
    scanAndConnect() {
        console.log("Start scan");
        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log('error', error.message);
                this.setState({name: error.message });
                // Handle error (scanning will be stopped automatically)
                return
            }
            var nameStr = device?.name;

            if(nameStr == null){
                nameStr = "Non reconnu";
            }
            this.setState({name: nameStr });
            console.log('device', nameStr);
            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            if (nameStr === 'TI BLE Sensor Tag' || 
                nameStr === 'SensorTag') {
                
                // Stop scanning as it's not necessary if you are scanning for one device.
                this.manager.stopDeviceScan();
    
                // Proceed with connection.
                device!.connect()
                    .then((device) => {
                        return device.discoverAllServicesAndCharacteristics()
                    })
                    .then((device) => {
                    // Do work on device with services and characteristics
                    })
                    .catch((error) => {
                        // Handle errors
                    });
                            }
                });
    }
    render() {
      
      return (
       <View>
           <Text>Device Name: {this.state.name}     </Text>
       </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: '#F5FCFF',
    }
    
  });
  export default TpeScreen ;
  
  