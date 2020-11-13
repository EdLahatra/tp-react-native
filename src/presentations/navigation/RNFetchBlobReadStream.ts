import React, { useContext, useState, useEffect, useRef, Component } from 'react';
import {
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';
// import Realm from 'realm';


const RNFetchBlob = NativeModules.ToastModule
const emitter = DeviceEventEmitter

class RepositoryShema {
  static shema = {
    name: 'Repository',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      name: 'string',
      fullName: 'string',
      description: 'string',
      stars: 'int',
      forks: 'int',
    },
  }
}

export function useInsertData() {

  const [data, setData] = useState<string[]>([]);
  const [isInsert, setIsInsert] = useState<boolean>(false);
  const [realm, setRealm] = useState('');

  useEffect(() => {
    // Realm.open({ schema: [RepositoryShema.shema] })
		// 	.then((res) => {
		// 		setRealm(realm);
		// 	})
		// 	.catch(() => {});
  }, []);

  useEffect(() => {
    console.log(data.length);
  }, [data]);

  async function checkInsertgoToSynchro(list: ConcatArray<string>) {
    setData(data.concat(list));
  }

  async function goToSynchro() {
    if(data.length > 0) {
      setIsInsert(true);
    }
    setIsInsert(false);
  }
  
  return {
    setData,
    checkInsertgoToSynchro,
    realm,
    goToSynchro,
  };
}

/**
 * Create file stream from file at `path`.
 * @param  {string} path   The file path.
 * @param  {string} encoding Data encoding, should be one of `base64`, `utf8`, `ascii`
 * @return {ReadStreamCSV} ReadStreamCSV stream instance.
 */
export function readStream(
  path: string,
  insertData?: Function,
  insertFinnish?: Function,
): Promise<ReadStreamCSV> {
  if (typeof path !== 'string') {
    return Promise.reject(0)
  }
  console.log('ffffffffffffffffffff');
  return Promise.resolve(new ReadStreamCSV(path, insertData, insertFinnish))
}

export default class ReadStreamCSV {
  path: string;
  closed: boolean;
  data: string[];
  isInsert: boolean;
  streamId: string;
  insertData?: Function
  dataStak: string[];

  constructor(path: string, insertData?: Function, insertFinnish?: Function) {
    if(!path) throw Error('RNFetchBlob could not open file stream with empty `path`')
    this.path = path
    this.data = [];
    this.dataStak = [];
    this.closed = false
    this.isInsert = false
    this.streamId = 'RNFBRS'+ Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    this.insertData = insertData;
  
    let subscription = emitter.addListener(this.streamId, async ({ event, detail }) => {
      console.log('subscription =>', this.data.length);
      // if(this.data.length === 10) {
      //   // this.dataStak = this.dataStak.concat(this.data);
      //   // await this.recursiveInsert();
      //   insertData && await insertData(this.data);
      //   this.data = [];
      // }
      if(detail && event === 'data') {
        // this.data = [...this.data, detail];
        insertData && await insertData(detail);
      } else if (event === 'end') {
        insertFinnish && await insertFinnish();
      }
      if (event === 'error' || event === 'end') {
        subscription.remove();
        this.closed = true
      }
    })

  }

  open() {
    console.log('this.path =>', this.path, this.closed);
    if(!this.closed)
      RNFetchBlob.readStream(this.path, this.streamId)
    else
      throw new Error('Stream closed')
  }

  async recursiveInsert() {
    // if(this.isInsert) return;
    this.isInsert = true
    while(this.data.length > 0){
      // this.insertData && await this.insertData(this.data[0]);
    }
    this.isInsert = false;
  }
}
