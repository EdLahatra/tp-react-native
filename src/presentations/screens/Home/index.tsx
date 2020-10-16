import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, Button, TextInput, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';

import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
// import qs from 'qs';
import RNFetchBlob from "rn-fetch-blob";
import RNFS, { MainBundlePath, DocumentDirectoryPath, unlink } from 'react-native-fs';

import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';

import { useClients } from "../../../hooks/home";

import styles from './styles';

import { reduxConnect } from '../../../controllers/Home';

import transformString from '../../../services/utils/convert';

// import { openRealm } from '../../services/repository/RealmService';

import {StackParams} from '../../../presentations/navigation/main';

type NavigationProps = StackNavigationProp<StackParams, 'Home'>;
import { File, Flags } from '../../../interfaces/request';

const url = 'http://192.168.1.40:6891/';

const toData = (name = 'no%20file') => `action=update&code_mag=HAP1&numero_caisse=07&cle_serveur=5DADA245&last_file=${name}`;
const newLine = /\r?\n/;
const defaultFieldDelimiter = ";";

const temp = `${RNFS.CachesDirectoryPath}/temp`;

interface IProps {
  setRequestOff: () => Promise<void>;
  setRequestOn: () => Promise<void>;
  addFile: (files: File[]) => Promise<void>;
  removeFile: (files: File) => Promise<void>;
  setLastFile: (name: string) => Promise<void>;
  navigation: NavigationProps;
  request: Flags;
}


// reglements.csv reglements2.csv reglements3.csv
// utilisateurs.csv utilisateurs2.csv utilisateurs3.csv
// clients.csv clients2.csv clients3.csv
// articles.csv articles2.csv articles3.csv
// codesbarres.csv codesbarres2.csv codesbarres3.csv
// magasins.csv magasins2.csv magasins3.csv
// motifs2.csv motifs2.csv motifs2.csv
// parametres2.csv
// promos3.csv
// reglements_verifs.csv
// 20200124_101305_hap

const fileN = {
  reglements: 'reglements3.csv',
  utilisateurs: 'utilisateurs3.csv',
  clients: 'clients3.csv',
  articles: 'articles3.csv',
  codesbarres: 'codesbarres.csv',
  magasins: 'magasins.csv',
  motifs: 'motifs2.csv',
  parametres: 'parametres2.csv',
  promos: 'promos3.csv',
  messages: 'messages.csv',
  reglements_verifs: 'reglements_verifs.csv',
}

export const post = async (name: string | undefined) => {
  try {
    const res = await axios({
      method: 'post',     //put
      url,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
      data: toData(name),
    });
    // console.log('post res ------------>', res);
    return res;
  } catch (e) {
    console.log('e.response', e);

    const errors = e && e.response ? e.response.data : { error: true };
    console.log('post errors ------------>', errors);
    return errors;
  }
};

// 20191125_150805_hap

export const getZipFile = async (name = '20191125_150805_hap') => {
  const res = await RNFetchBlob
    .config({ fileCache: true, path: `${temp}/${name}.zip` })
    .fetch('GET', `http://192.168.1.40:8081/runshop_zip/${name}.zip`, {});
  console.log({ res });

  if(res) {
    return res.path();
  }
  return null;
}

export const unzipFile = async (name: string) => {
  const sourcePath = `${temp}/${name}.zip`;
  // const sourcePath = `${res.path()}/20191119_161550_hap.zip`
  // const targetPath = `${temp}`;
  const charset = 'UTF-8';

  // await RNFS.mkdir(targetPath);
  // charset possible values: UTF-8, GBK, US-ASCII and so on. If none was passed, default value is UTF-8

  const zipFiles = await unzip(sourcePath, temp, charset);
  if (zipFiles) {
    await RNFS.unlink(sourcePath);
    return zipFiles;
  }
  return null;
}

export const getFileToString = async (csvFilePath: string) => {
  try {
    const fileString = await RNFetchBlob.fs.readFile(csvFilePath, 'utf8');
    // await RNFS.unlink(csvFilePath);
    return fileString;
  } catch (err) {
    return null;
    // console.log('ERROR:', err);
  }
}

export const boocleGetCSV = async (file: string, addFile: Function, isFirst: boolean | undefined) => {
  const filename = await post(file);
  if (filename && filename.data && filename.data !== 'no update') {
    const nameFile = filename.data;
    const zipFile = await getZipFile(nameFile);
    if(zipFile) {
      const unZip = await unzipFile(nameFile);
      console.log({ unZip });
      if(unZip) {
        const files = await ckeckCSVName(unZip);
        if(files && files.length) {
          addFile(files);
        }
        console.log({ files });
      }
    }
    await boocleGetCSV(nameFile, addFile, false);
  }
}

export const synchroOneToOne = async (file: string) => {
  const nameLastFile = file && file.length > 5 ? file : 'no%20file';
  const filename = await post(nameLastFile);
  if (filename && filename.data && filename.data !== 'no update') {
    const nameFile = filename.data;
    const zipFile = await getZipFile(nameFile);
    if(zipFile) {
      const unZip = await unzipFile(nameFile);
      console.log({ unZip });
      if(unZip) {
        const files = await ckeckCSVName(unZip);
        if (files && files.length > 0) {
          return {
            files,
            zip_name: filename.data,
          };
        }
      }
    }
  }
  return {
    zip_name: filename?.data,
    files: [],
  };
}

// export const boocleGetCSV = async (file: string, synchroDown: Function, isFirst: boolean | undefined) => {
//   const isTempExist = await RNFS.exists(temp);
//   if(isFirst && isTempExist) {
//     await RNFS.unlink(temp);
//     await RNFS.mkdir(temp);
//   }
//   if (isTempExist) {
//     await RNFS.mkdir(temp);
//   }

//   const filename = await post(file);
//   // 20191125_122308_hap no update
//   if (filename && filename.data && filename.data !== 'no update') {
//     const nameFile = filename.data;
//     const zipF = await getZipFile(nameFile);
//     if(zipF) {
//       const unZip = await unzipFile(nameFile);
//       console.log({ unZip });
//       if (unZip) {
//         const files = await ckeckCSVName(unZip);
//         console.log({ files });
//         files?.map(async (file) => {
//           if(file) {
//             const { path, transform, name } = file;
//             const dataString = await getFileToString(path);
//             const data = {
//               dataString,
//               name,
//               trasfomToObj: transform,
//             };
//             console.log({ data })
//             await synchroDown(data, () => console.log('Fin'));
//           }
//         });
//       }
//     }

//     await boocleGetCSV(nameFile, synchroDown, false);
//   }
// }

const ckeckFile = async (file: string, path: string) => {
  console.log(file);
  
  if(file === fileN.articles) {
    return {
      path,
      name: 'Articles',
      transform: transformString.Articles,
    };
  }

  if(file === fileN.clients) {
    return {
      path,
      name: 'Clients',
      transform: transformString.Clients,
    };
  }

  if(file === fileN.codesbarres) {
    return {
      path,
      name: 'ArticlesCodesBarres',
      transform: transformString.ArticlesCodesBarres,
    };
  }
  if(file === fileN.messages) {
    return {
      path,
      name: 'Messages',
      transform: transformString.Messages,
    };
  }
  if(file === fileN.motifs) {
    return {
      path,
      name: 'MotifsRemises',
      transform: transformString.MotifsRemises,
    };
  }
  if(file === fileN.magasins) {
    return {
      path,
      name: 'Magasins',
      transform: transformString.Magasins,
    };
  }

  if(file === fileN.magasins) {
    return {
      path,
      name: 'Magasins',
      transform: transformString.Magasins,
    };
  }
  if(file.includes(fileN.motifs)) {
    return {
      path,
      name: 'MotifsRemises',
      transform: transformString.MotifsRemises,
    };
  }
  if(file === fileN.parametres) {
    return {
      path,
      name: 'Parametres',
      transform: transformString.Parametres,
    };
  }
  if(file === fileN.promos) {
    return {
      path,
      name: 'Promos',
      transform: transformString.Promos,
    };
  }
  if(file === fileN.reglements_verifs) {
    return {
      path,
      name: 'ModesReglementsVerifs',
      transform: transformString.ModesReglementsVerifs,
    };
  }
  if(file === fileN.reglements) {
    return {
      path,
      name: 'ModesReglements',
      transform: transformString.ModesReglements,
    };
  }
  if(file === fileN.utilisateurs) {
    return {
      path,
      name: 'Utilisateurs',
      transform: transformString.Utilisateurs,
    };
  }
  await RNFS.unlink(path);
  return null;
}

export const ckeckCSVName = async (targetPath: string) => {
  const dir = await RNFS.readDir(targetPath);
  console.log({ dir });
  if(dir){
    const dirs = dir.map(async ({ path, name, size }) => {
      // console.log({ name, path });
      const curent = await ckeckFile(name, path);
      // console.log({ curent });
      if(curent) {
        return { size, ...curent };
      }
      return null;
    });
    // console.log({ dirs })
    return Promise.all(dirs).then((res) => {
      console.log({ res });
      return res ? res.filter(k => k !== null) : [];
    }).catch(() => []);
  }

  return [];
}

// RNFS.DownloadDirectoryPath

export const ScanScreen: React.FunctionComponent<IProps> = function (props) {
  const { setRequestOff, setRequestOn, request, addFile, setLastFile, navigation } = props;

  const { insertSynchroOneToOne, count, selectCountClients, insertLastFileDown, getInsertLastFileDown, insertTest, requestFlagsSychro } = useClients();
  const [loading, setLoading] = useState(false);
  // const { db } = useRealm();
  const [fileLaste, setFileLaste] = useState('');

  useEffect(() => {
    initialState();
  }, []);

  async function initialState() {
    const name = await getInsertLastFileDown();
    return setFileLaste(name);
  }

  async function recurciveGetFile(lastFile: string) {
    const { zip_name, files } = await synchroOneToOne(lastFile);
    console.log('===================================================> ', lastFile);
    
    if (zip_name && zip_name !== 'no update') {
      const date = new Date().getTime() / 1000;
      setLastFile(zip_name);
      setFileLaste(zip_name);
      insertLastFileDown(zip_name, 2, date);
    }
    console.log({ files });
    if (files && files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file) {
          const { path, transform } = file;
          const fileString = await getFileToString(path);
          const lines = fileString.split(newLine);
          if (lines && lines.length > 0) {
            await recurciveInsert(transform, lines);
          }
          await RNFS.unlink(path);
          // console.log({ fileString }); 
        }
        // const dataString = await getFileToString(path);
      }
    }
    if (zip_name === 'no update') {
      return setLoading(false);
    }
    await recurciveGetFile(zip_name);
  }

  async function handleListClicked() {
    setLoading(true)
    console.log(`handleListClicked clicked! =======>`, addFile);
    // await boocleGetCSV('no%20file', synchroDown, true);
    // await boocleGetCSV('no%20file', addFile, true);
    await recurciveGetFile(fileLaste);
  }

  async function recurciveInsert(transform: Function, lines: string[]) {
    const currentLine = lines[0].split(defaultFieldDelimiter);
    const currentTable = transform(currentLine);
    if (currentTable && currentTable.requete && currentTable.values) {
      const { requete, values } = currentTable;
      console.log({ requete, values  });
      const res = await insertSynchroOneToOne(requete, values);
      console.log({ res });
    }
    const newLines = lines.splice(1);
    console.log({ newLines });
    if(newLines && newLines.length > 1) {
      await recurciveInsert(transform, newLines);
    }
  }

  async function testClick() {
    console.log(`testClick clicked! =======>`, { request: request.files });
    // return;
    const { files } = request;
    setLoading(true)
    if (files && files.length > 0) {
      const promiseInsert = files.map(async ({ name, path }) => {
        console.log({ name, path });
        const file = await ckeckFile(name, path);
        const dataString = await getFileToString(path);
        const lines = dataString.split(newLine);
        if(lines && file && lines.length > 0) {
          // transform
          const transform = file.transform;
          // const currentLine = lines[0].split(defaultFieldDelimiter);
          // const { requete, values } = transform(currentLine);
          // console.log({ requete, values });
          // if (requete && values) {
          //   const res = await insertSynchroOneToOne(requete, values);
          //   console.log({ res });
          // }
          await recurciveInsert(transform, lines);
          return;
        }
      })
      Promise.all(promiseInsert)
        .then((res_promise) => {
          console.log({ res_promise });
          setLoading(false)
        })
        .catch(() => setLoading(false));
      return;
    }
    setLoading(false)
      // const { dataString, trasfomToObj } = data;
  }

  console.log({ request: request.flag });

  const {
    articles,
    reglements,
    clients,
    utilisateurs,
    codebarres,
    reglements_verifs,
    magasins,
    motifs,
    parametres,
    promos,
    messages,
  } = count;

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            flex: 1,
          }}>
          <View
            style={{
              height: Dimensions.get('window').height / 2 + 100,
              width: Dimensions.get('window').width - 100,
              alignItems: 'center',
              // marginTop: -30,
              // marginLeft: 50,
              // marginBottom: 30,
              justifyContent: 'center',
              alignSelf: 'center'
            }}>
            {<Text style={{ fontSize: 20, color: 'black' }}>articles : {articles}</Text>}
            {<Text style={{ fontSize: 20, color: 'black' }}>reglements : {reglements}</Text>}
            {<Text style={{ fontSize: 20, color: 'black' }}>clients : {clients}</Text>}
            {<Text style={{ fontSize: 20, color: 'black' }}>utilisateurs : {utilisateurs}</Text>}
            {<Text style={{ fontSize: 20, color: 'black' }}>codebarres : {codebarres}</Text>}
            {<Text style={{ fontSize: 20, color: 'black' }}>ReglementsVerifs : {reglements_verifs}</Text>}
            {<Text style={{ fontSize: 20, color: 'black' }}>magasins : {magasins}</Text>}
            {<Text style={{ fontSize: 20, color: 'black' }}>motifs : {motifs}</Text>}
            {<Text style={{ fontSize: 20, color: 'black' }}>parametres : {parametres}</Text>}
            {<Text style={{ fontSize: 20, color: 'black' }}>promos : {promos}</Text>}
            {<Text style={{ fontSize: 20, color: 'black' }}>messages : {messages}</Text>}
            
            <TextInput
              value={fileLaste}
              onChangeText={(name) => setFileLaste(name)}
              style={{
                // height: 25,
                width: Dimensions.get('window').width - 40, fontSize: 25,
                color: 'black',
                textAlign: 'center',
                borderBottomWidth: 1,
                borderColor: 'red',
                borderRadius: 10,
              }}
            />
          </View>
          <View style={{ padding: 20 }}>
          {/* {loading
              ? <ActivityIndicator size='large' color='red' />
              : <Button
              title="Synchronisation"
              onPress={() => handleListClicked()}
            />} */}
             {/* <View style={{ height: 5 }} /> */}

             <View style={{ height: 5 }} />
             <Button
              title="Count"
              onPress={async () => await selectCountClients()}
            />
            <View style={{ height: 5 }} />
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')}
            />
            <View style={{ height: 5 }} />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export const Home = reduxConnect(ScanScreen);
