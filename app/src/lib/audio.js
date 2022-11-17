/*
 * Copyright 2022-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in 
 * the LICENSE.md file in the root directory of this source tree.
 *
 */
 import { EventEmitter } from 'events'

class AudioSource extends EventEmitter {
  constructor() {
    super();
    this._analyzer = undefined
    this._analyzerSamples = 64
  }
  get analyzer() {
    return this._analyzer;
  }
  get analyzerSamples() {
    return this._analyzerSamples;
  }
  sendAudio(audio, volume) {
    this.emit('audio', audio)
    if (volume) {
      this.emit('volume', volume)
    }
  }
  dispose() {
    this.removeAllListeners()
  }
}

export class MicrophoneAudioSource extends AudioSource {

  constructor({targetSampleRate, monitorAudio, captureAudio}){
    super()

    this._audioContext = new AudioContext({
      sampleRate: targetSampleRate
    })
    this._audioData = new Int16Array(0)
    this._targetSampleRate = this._audioContext.sampleRate
    this._monitorAudio = monitorAudio || false
    this._captureAudio = captureAudio || false
    this._analyzerSamples = 32
    this._mic = undefined
    this._processor = undefined
    this._rawData = []
    this._rawStream = null

    this.onAccessGranted = this.onMicAccessGranted.bind(this)

    this.logDevices()
  }

  async onMicAccessGranted(stream){
    this._rawStream = stream
    this._mic = this._audioContext.createMediaStreamSource(stream)
    
    await this._audioContext.audioWorklet.addModule("/asr-worklet.js")

    this._processor = new AudioWorkletNode(this._audioContext, 'asr-worklet', {
      numberOfInputs: 1,
      numberOfOutputs: 1
    })
    this._processor.port.onmessage = (evt) => {
      const data = evt.data
      this.sendAudio(data.int16Array.buffer, data.volume)
    }

    this._analyzer = this._audioContext.createAnalyser()
    this._analyzer.fftSize = this._analyzerSamples
    this._mic.connect(this._analyzer)
    this._analyzer.connect(this._processor)
    this._processor.connect(this._audioContext.destination)
    this._audioContext.resume()
    this.emit('microphone:connected') 
  }

  async init(){
    /*
     * If the mic is ready, proceed, otherwise request
     * permission, and gain control.
     */
    return new Promise((resolve, reject) => {
      if(this._mic){
        console.log('Mic live.')
        resolve('Mic ready.')
        return
      }
      return navigator
        .mediaDevices
        .getUserMedia({
          audio:true,
          video: false
        })
        .then((stream) => {
          return this.onAccessGranted.call(this, stream)
        })
        .catch((err) => {
          console.error('[mic] error', err)
          reject('Mic init failed.', err)
        })
        .then(() => {
          console.log('[mic] connected')
          resolve('Mic ready.')
        })
    })
  }

  async destroy(){
    return new Promise((resolve, reject) => {
      if(!this._rawStream){
        console.log("Mic doesnt exist.")
        resolve('No mic to destroy')
        return
      }
      this._rawStream.getTracks().forEach((track) => {
        track.stop();
      });
      this._rawStream = null
      resolve('Mic destroyed')
    })
  }

  logDevices(){
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      devices.forEach(function(device) {
        console.log('\t' + device.kind + ": " + device.label +
                    " id = " + device.deviceId)
      })
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message)
    })
  }

  get audioData(){
    this._captureAudio = false
    this._monitorAudio = false
    return this._audioData
  }

  dispose(){
    super.dispose()
    if(this._mic){
      this._mic.disconnect()
    }
    if(this._analyzer && this._processor){
      this._analyzer.disconnect(this._processor)
    }
    if(this._processor){
      this._processor.disconnect(this._audioContext.destination)
    }
    if(this._audioContext){
      this._audioContext.close()
    }
    this.destroy()
  }
}