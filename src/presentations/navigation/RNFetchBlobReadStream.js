// Copyright 2016 wkh237@github. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

import {
  NativeModules,
  DeviceEventEmitter,
  NativeAppEventEmitter,
} from 'react-native'

function getUUID() {
  return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

// import UUID from '../utils/uuid'

const RNFetchBlob = NativeModules.ToastModule
const emitter = DeviceEventEmitter

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
): Promise<ReadStreamCSV> {
  if (typeof path !== 'string') {
    return Promise.reject(0)
  }
  return Promise.resolve(new ReadStreamCSV(path))
}

export default class ReadStreamCSV {
  path : string;
  closed : boolean;

  constructor(path: string) {
    if(!path) throw Error('RNFetchBlob could not open file stream with empty `path`')
    this.path = path
    this.closed = false
    this._onData = () => {}
    this._onEnd = () => {}
    this._onError = () => {}
    this.streamId = 'RNFBRS'+ Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    // register for file stream event
    let subscription = emitter.addListener(this.streamId, ({ event, detail }) => {
      console.log('subscription =>', detail);
      if(this._onData && event === 'data') {
        console.log('subscription =>', detail);
        this._onData(detail)
        return
      }
      else if (this._onEnd && event === 'end') {
        this._onEnd(detail)
      }
      else {
        const err = new Error(detail)
        err.code = 'EUNSPECIFIED'
        if(this._onError)
          this._onError(err)
        else
          throw err
      }
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

}
