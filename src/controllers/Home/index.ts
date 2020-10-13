import React from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import csv from 'csvtojson';

import axios from 'axios';
import qs from 'qs';
import RNFetchBlob from "rn-fetch-blob";
import RNFS, { MainBundlePath, DocumentDirectoryPath } from 'react-native-fs';

import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';

import { RootState } from '../../services/redux/reducers';

import { Produit } from '../../interfaces/produits';
import { File } from '../../interfaces/request';
import { addProduit } from '../../services/redux/produits/actions';
import { setRequestOff, setRequestOn, addFile, removeFile, setLastFile } from '../../services/redux/request/actions';

import {StackParams} from '../../presentations/navigation/main';

const csvToJson = require('./convert-csv-to-json');

type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

interface AppState extends Produit {
	flash: boolean
}

interface IProps extends Produit {
  addProduit: (produit: Produit) => Promise<void>;
  setRequestOff: () => Promise<void>;
  setRequestOn: () => Promise<void>;
	produit: Produit,
	navigation: NavigationProps;
}

const url = 'http://192.168.1.40:6891/';

const data = "action=update&code_mag=HAP1&numero_caisse=05&cle_serveur=5DADA245&last_file=no%20file";
const newLine = /\r?\n/;
const defaultFieldDelimiter = ";";

export const post = async () => {
  try {
    const res = await axios({
      method: 'post',     //put
      url,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
      data,
    });
    console.log('post res ------------>', res);
    return res;
  } catch (e) {
    console.log('e.response', e.response);

    const errors = e && e.response ? e.response.data : { error: true };
    console.log('post errors ------------>', errors);
    return errors;
  }
};

export const get = async () => {
  try {
    const res = await axios({
      method: 'get',     //put
      url: 'http://192.168.1.40:8081/runshop_zip/20191119_161550_hap.zip',
      headers: {'Accept-Encoding': 'application/zip'},
    });
    console.log('post res ------------>', res);
    return res;
  } catch (e) {
    console.log('e.response', e.response);

    const errors = e && e.response ? e.response.data : { error: true };
    console.log('post errors ------------>', errors);
    return errors;
  }
};

export default class HomeController extends React.Component<IProps> {
	readonly state: AppState = {
		name: '',
		code: '',
		id: '',
    flash: false,
  };

  async componentDidMount() {
    
    // // const data = {
    // //   action: 'update',
    // //   code_mag: 'HAP1',
    // //   numero_caisse: '05',
    // //   cle_serveur: '5DADA245',
    // //   last_file: 'no fle',
    // // };
    // const zip = await post();

    // console.log({ zip });
    // const dirs = RNFetchBlob.fs.dirs
    // RNFetchBlob
    //   .config({
    //     // add this option that makes response data to be stored as a file,
    //     // this is much more performant.
    //     fileCache : true,
    //     // appendExt : 'zip',
    //     path: `${DocumentDirectoryPath}/myFile.zip`
    //   })
    //   .fetch('GET', 'http://192.168.1.40:8081/runshop_zip/20191125_150805_hap.zip', {
    //     //some headers ..
    //   })
    //   .then((res: any) => {
    //     // the temp file path
    //     console.log('The file saved to ', res.path())
    //     const sourcePath = `${DocumentDirectoryPath}/myFile.zip`
    //     // const sourcePath = `${res.path()}/20191119_161550_hap.zip`
    //     const targetPath = DocumentDirectoryPath;
    //     const charset = 'UTF-8'
    //     // charset possible values: UTF-8, GBK, US-ASCII and so on. If none was passed, default value is UTF-8
        
    //     unzip(sourcePath, targetPath, charset)
    //     .then((path) => {
    //       console.log(`unzip completed at ${path}`);
    //       RNFS.readDir(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    //         .then((result) => {
    //           console.log('GOT RESULT', result);
    //           // const jsonOutput = csvToJson.getJsonFromCsv('/data/user/0/com.rnwebmobiledesktop/files/reglements3.csv');
    //           // console.log({ jsonOutput });
    //           // const reader = new FileReader();

    //           // reader.onabort = () => console.log('file reading was aborted')
    //           // reader.onerror = () => console.log('file reading has failed')
    //           // reader.onload = () => {
    //           //   var csv = reader.result;
    //           //   console.log({ csv });
    //           //   const jsonOutput = csvToJson.getJsonFromCsv(csv);
    //           //   console.log('============+> jsonOutput' + { jsonOutput });
    //           // }
    //           // reader.readAsText('/data/user/0/com.rnwebmobiledesktop/files/reglements3.csv', 'Cp1252');

    //           RNFS.readFile('/data/user/0/com.rnwebmobiledesktop/files/reglements3.csv', 'utf8')
    //             .then((csv) => {
    //               console.log({ csv });
    //               const jsonOutput = csvToJson.getJsonFromCsv(csv);
    //               console.log('============+> jsonOutput' + { jsonOutput });
    //             })
    //             .catch(er => console.error(er))

    //           return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    //         })
    //         .then((statResult) => {
    //           console.log({ statResult });
    //           if (statResult[0].isFile()) {
    //             // if we have a file, read it
    //             return RNFS.readFile(statResult[1], 'utf8');
    //           }

    //           return 'no file';
    //         })
    //         .then((contents) => {
    //           // log the file contents
    //           console.log(contents);
    //         })
    //         .catch((err) => {
    //           console.log(err.message, err.code);
    //         });
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    //   })

    // const t: object = await axios({
    //   method: 'post',     //put
    //   url,
    //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
    //   data,
    // });

    // console.log('=============++>' + { t: JSON.parse(t) });
  }
  
  // async componentDidMount () {
  //   console.log('componentDidMount =====================>');
  //   const zip = await axios({
  //     method: 'post',
  //     url: 'http://192.168.1.40:6891/',
  //     data: {
  //       action: 'update',
  //       code_mag: 'HAP1',
  //       numero_caisse: '05',
  //       cle_serveur: '5DADA245',
  //       last_file: 'no fle',
  //     }
  //   });

  //   console.log({ zip });
  // }

  onBarCodeRead = (scanResult: any) => {
		console.log({ scanResult });
		if(scanResult && scanResult.data) {
			this.setState({ code: scanResult.data });
		}
	}
	
	addProduit = async () => {
		// const { name, code } = this.state;
		// if(name && code) {
		// 	this.props.addProduit({ name, code, id: code + Math.round(20) });
		// 	this.props.navigation.navigate('Produits');
    // }
    // android:largeHeap="true"
    console.log('componentDidMount =====================>');
    const csvFilePath='/data/user/0/com.rnwebmobiledesktop/files/clients2.csv';

      try {
          await RNFetchBlob.fs.readFile(csvFilePath, 'utf8')
            .then((data: String) => {
              // asset_content = data;
              // console.log("got data: ", data);
              const lines = data.split(newLine);
              console.log(lines.length);
              for (let i = 0; i < lines.length; i++) {
                let currentLine = lines[i].split(defaultFieldDelimiter);
                console.log({ currentLine });
                // if (stringUtils.hasContent(currentLine)) {
                //   jsonResult.push(this.buildJsonResult(headers, currentLine));
                // }
                // console.log(lines[i]);
              }
                  // let json = csvToJson.csvStringToJson(data);
                  // for(let i=0; i<json.length;i++){
                  //     // console.log(json[i]);
                  // }
            })
            .catch((e: any) => {
              console.error("got error: ", e);
            })
        } catch (err) {
          console.log('ERROR:', err);
      }

      // const assets = JSON.parse(asset_content);
    // try {
    //   console.log('try ====>');
    //   const csvFilePath='/data/user/0/com.rnwebmobiledesktop/files/clients2.csv';
      
    //   if(await RNFS.exists(csvFilePath)) {
    //     console.log('RNFS.exists file loading ...');
    //     this.setState({ flash: true });
    //     const result = await RNFS.readFile(csvFilePath, 'utf8');
    //     console.log('loading end ...');
    //     const headers = [];
    //     this.setState({ code: 'scanResult.data' });
    //     console.log({ result });
    //     let json = csvToJson.csvStringToJson(result);
    //     for(let i=0; i<json.length;i++){
    //         console.log(json[i]);
    //     }
    //     this.setState({ code: 'scanResult.data' + json.length });
    //     this.setState({ flash: false });
    //   }
      
    //   console.log('loading end parse ...');

    // } catch (error) {
    //   this.setState({ code: 'error' });
    //   console.log({ error });
    // }
	}
}

const mapStateToProps = (state: RootState) => ({
  system: state.system,
  produits: state.produits,
  request: state.request,
})


const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
    addProduit: (payload: Produit) => dispatch(addProduit(payload)),
    setRequestOn: () => dispatch(setRequestOn()),
    setRequestOff: () => dispatch(setRequestOff()),
    addFile: (files: File[]) => dispatch(addFile(files)),
    removeFile: (file: File) => dispatch(removeFile(file)),
    setLastFile: (name: string) => dispatch(setLastFile(name)),
  };
};

export const reduxConnect = (component: any) =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component);
