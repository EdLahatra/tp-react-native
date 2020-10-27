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
import { SystemState, Parametres } from '../../services/redux/system/types';
import { updateParametres } from '../../services/redux/system/actions';

const csvToJson = require('./convert-csv-to-json');

type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

interface AppState extends Produit {
	flash: boolean
}

export interface IProps extends Produit {
  addProduit: (produit: Produit) => Promise<void>;
  setRequestOff: () => Promise<void>;
  setRequestOn: () => Promise<void>;
  updateParametres: (params: Parametres) => Promise<void>;
	produit: Produit,
	navigation: NavigationProps;
	system: SystemState;
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
    updateParametres: (params: Parametres) => dispatch(updateParametres(params)),
  };
};

export const reduxConnect = (component: any) =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component);
