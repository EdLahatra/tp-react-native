// Copyright 2016 wkh237@github. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

import {
  NativeModules,
  DeviceEventEmitter,
  NativeAppEventEmitter,
} from 'react-native'

import { useEffect, useState, Component } from 'react';

const RNFetchBlob = NativeModules.ToastModule
const emitter = DeviceEventEmitter

export function ReadStreamCSVhOOKS(path, insertData, insertFinnish) {
  const [stack, setStack] = useState([]);
  const [isInsert, setIsInsert] = useState(false);
  const [closed, setClosed] = useState(false);
  const [streamId, setStreamId] = useState('RNFBRS'+ Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

  useEffect(() => {
    let subscription = emitter.addListener(streamId, async ({ event, detail }) => {
      if(detail && event === 'data') {
        setStack([...stack, detail]);
        if (!isInsert) {
          console.log('Not insert ============++>');
          await this.recursiveInsert();
        }
        
      } else if (event === 'end') {
        await insertFinnish();
      }

      if (event === 'error' || event === 'end') {
        subscription.remove()
        setClosed(true);
      }
    })

    return function () {
      subscription.remove();
    };
  }, []);

  async function recursiveInsert() {
    console.log('Is Recursive ============++> àààààààààà àààààààààààààààà recursiveInsert');
  }

  function open() {
    console.log('e =>', closed);
    if(!closed)
      RNFetchBlob.readStream(path, streamId)
    else
      throw new Error('Stream closed')
  }
  
  return {
    open,
  };
}



function getUUID() {
  return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

// import UUID from '../utils/uuid'

/**
 * Create file stream from file at `path`.
 * @param  {string} path   The file path.
 * @param  {string} encoding Data encoding, should be one of `base64`, `utf8`, `ascii`
 * @param  {boolean} bufferSize Size of stream buffer.
 * @param  {number} [tick=10] Interval in milliseconds between reading chunks of data
 * @return {RNFetchBlobStream} RNFetchBlobStream stream instance.
 */
export function readStream(
  path: string,
  insertData?: Function,
  insertFinnish?: Function,
): Promise<ReadStreamCSV> {
  if (typeof path !== 'string') {
    return Promise.reject(0)
  }
  // const { open } = ReadStreamCSVhOOKS(path, insertData, insertFinnish);
  return Promise.resolve(new ReadStreamCSV(path, insertData, insertFinnish))
}



export default class ReadStreamCSV {
  path: string;
  closed: boolean;
  stack: string[];
  isInsert: boolean;

  constructor(path: string, insertData?: Function, insertFinnish?: Function) {
    if(!path) throw Error('RNFetchBlob could not open file stream with empty `path`')
    this.path = path
    this.stack = [];
    this.closed = false
    this.isInsert = false
    this._onData = () => {}
    this._onEnd = () => {}
    this._onError = () => {}
    this.streamId = 'RNFBRS'+ Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    // register for file stream event
    let subscription = emitter.addListener(this.streamId, async ({ event, detail }) => {
      // console.log('subscription =>', detail);
      if(detail && event === 'data') {
        // console.log('Is First ============++>', this.stack.length);
        // this.stack = [...this.stack, detail];
        // await recursiveInsert();
        this.stack = [...this.stack, detail];
        if (!this.isInsert) {
          console.log('Not insert ============++>');
          await this.recursiveInsert();
        }
        // if(this.stack.length === 0) {
        //   console.log('Is First ============++>');
        //   this.isInsert = true
        //   await insertData(detail);
        //   this.isInsert = false
        // } else {
        //   this.stack = [...this.stack, detail];
        //   if (this.isInsert) {
        //     !this.isInsert && await this.recursiveInsert();
        //   }
          
        // }
        
        
      } else if (event === 'end') {
        await insertFinnish();
      }
      // if(this._onData && event === 'data') {
      //   this._onData(detail)
      //   return
      // }
      // else if (this._onEnd && event === 'end') {
      //   this._onEnd(detail)
      // }
      // else {
      //   const err = new Error(detail)
      //   err.code = 'EUNSPECIFIED'
      //   if(this._onError)
      //     this._onError(err)
      //   else
      //     throw err
      // }
      // when stream closed or error, remove event handler
      if (event === 'error' || event === 'end') {
        subscription.remove()
        this.closed = true
      }
    })

  }

  open() {
    console.log('e =>', this.closed);
    if(!this.closed)
      RNFetchBlob.readStream(this.path, this.streamId)
    else
      throw new Error('Stream closed')
  }

  onData(fn:() => void) {
    this._onData = fn
  }

  onError(fn) {
    this._onError = fn
  }

  onEnd (fn) {
    this._onEnd = fn
  }

  recursiveInsert = async () => {
    if(this.isInsert) return;
    console.log('Is Recursive ============++> àààààààààà àààààààààààààààà recursiveInsert');
    this.isInsert = true
    await insertData(this.stack[0]);
    this.stack = this.stack.shift();
    this.isInsert = false;
    // setTimeout(function(){
    //   // if (this.stack.length > 0) {
    //   //   console.log('GO');
    //   //   this.stack = this.stack.shift();
    //   //   await this.recursiveInsert();
    //   // } else {
    //   //   this.isInsert = false;
    //   // }
    //   this.isInsert = false;
    // }, 3000);
    // this.isInsert = true
    // await insertData(this.stack[0]);
    // this.stack = this.stack.shift();
    // if (this.stack.length > 0) {
    //   await this.recursiveInsert();
    // } else {
    //   this.isInsert = false;
    // }
    // setTimeout(async () => {
      
    // }, 200);
  }
}
