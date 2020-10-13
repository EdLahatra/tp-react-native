
import DataWedgeIntents from 'react-native-datawedge-intents';
import { DeviceEventEmitter } from 'react-native';
export default class ScanZebraBarcode {
    enumerateScannersHandler: (data: any) => void;
    scanHandler: (data: any) => void;
    constructor(enumerateScannersHandler: (data: any) => void, scanHandler:(data: any) => void) {
        this.enumerateScannersHandler = enumerateScannersHandler;
        this.scanHandler = scanHandler;
      }

    register(){
        DeviceEventEmitter.addListener('enumerated_scanners', this.enumerateScannersHandler);
        DeviceEventEmitter.addListener('barcode_scan', this.scanHandler);
        //  NOTE: DataWedge must be configured to send intents with this action for the demo to work (do not specify a category)
        //  Feel free to modify this call to listen for a different action.
        DataWedgeIntents.registerReceiver('com.zebra.dwintents.ACTION', '');
    }
    startScan(){
        DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_SOFTSCANTRIGGER,DataWedgeIntents.START_SCANNING);
    }
    stopScan(){
        DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_SOFTSCANTRIGGER,DataWedgeIntents.STOP_SCANNING);
    }
    toggleScan(){
        DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_SOFTSCANTRIGGER,DataWedgeIntents.TOGGLE_SCANNING);
    }
    enableScanning(){
        DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_SCANNERINPUTPLUGIN,DataWedgeIntents.ENABLE_PLUGIN);
    }
    disableScanning(){
        DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_SCANNERINPUTPLUGIN,DataWedgeIntents.DISABLE_PLUGIN);
    }

}