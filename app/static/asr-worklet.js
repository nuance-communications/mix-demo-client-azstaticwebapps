/*
 * Copyright 2022-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in 
 * the LICENSE.md file in the root directory of this source tree.
 *
 */


// Source https://github.com/higuma/wav-audio-encoder-js/blob/master/lib/WavAudioEncoder.js
// The MIT License (MIT)

// Copyright (c) 2015 Yuji Miyane

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

function setString(view, offset, str) {
  const len = str.length;
  for (let i = 0; i < len; ++i) view.setUint8(offset + i, str.charCodeAt(i));
}

export default class WavEncoder {
  constructor(sampleRate, numChannels) {
    this.sampleRate = sampleRate;
    this.numChannels = numChannels;
    this.numSamples = 0;
    this.dataViews = [];
  }

  encode(buffer) {
    const len = buffer.length;
    this.numSamples += len;
    this.dataViews.push(buffer);
  }

  finish() {
    const dataSize = this.numChannels * this.numSamples * 2;
    const view = new DataView(new ArrayBuffer(44));
    setString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    setString(view, 8, 'WAVE');
    setString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, this.numChannels, true);
    view.setUint32(24, this.sampleRate, true);
    view.setUint32(28, this.sampleRate * 4, true);
    view.setUint16(32, this.numChannels * 2, true);
    view.setUint16(34, 16, true);
    setString(view, 36, 'data');
    view.setUint32(40, dataSize, true);
    this.dataViews.unshift(view);
    const blob = new Blob(this.dataViews, { type: 'audio/wav' });
    delete this.dataViews;

    return blob;
  }
}

// Source https://github.com/watson-developer-cloud/speech-javascript-sdk/blob/master/speech-to-text/webaudio-l16-stream.js
/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const TARGET_SAMPLE_RATE = 16000;

class WebAudioL16Stream {
  /**
    * Transforms Buffers or AudioBuffers into a binary stream of l16 (raw wav) audio, downsampling in the process.
    *
    * The watson speech-to-text service works on 16kHz and internally downsamples audio received at higher samplerates.
    * WebAudio is usually 44.1kHz or 48kHz, so downsampling here reduces bandwidth usage by ~2/3.
    *
    * Format event + stream can be combined with https://www.npmjs.com/package/wav to generate a wav file with a proper header
    *
    * Todo: support multi-channel audio (for use with <audio>/<video> elements) - will require interleaving audio channels
    *
    * @param {Object} options
    * @constructor
    */
  constructor(
    options = {
      sourceSampleRate: 48000,
      downsample: true,
    },
  ) {
    this.options = options;
    this.bufferUnusedSamples = [];
    this.transform = this.handleFirstAudioBuffer;
  }
 
  /**
    * Downsamples WebAudio to 16 kHz.
    *
    * Browsers can downsample WebAudio natively with OfflineAudioContext's but it was designed for non-streaming use and
    * requires a new context for each AudioBuffer. Firefox can handle this, but chrome (v47) crashes after a few minutes.
    * So, we'll do it in JS for now.
    *
    * This really belongs in it's own stream, but there's no way to create new AudioBuffer instances from JS, so its
    * fairly coupled to the wav conversion code.
    *
    * @param  {AudioBuffer} bufferNewSamples Microphone/MediaElement audio chunk
    * @return {Float32Array} 'audio/l16' chunk
    */
  downsample(bufferNewSamples) {
    let buffer = null;
    const newSamples = bufferNewSamples.length;
    const unusedSamples = this.bufferUnusedSamples.length;
    let i;
    let offset;
    if (unusedSamples > 0) {
      buffer = new Float32Array(unusedSamples + newSamples);
      for (i = 0; i < unusedSamples; ++i) {
        buffer[i] = this.bufferUnusedSamples[i];
      }
      for (i = 0; i < newSamples; ++i) {
        buffer[unusedSamples + i] = bufferNewSamples[i];
      }
    } else {
      buffer = bufferNewSamples;
    }
    // Downsampling and low-pass filter:
    // Input audio is typically 44.1kHz or 48kHz, this downsamples it to 16kHz.
    // It uses a FIR (finite impulse response) Filter to remove (or, at least attinuate)
    // audio frequencies > ~8kHz because sampled audio cannot accurately represent
    // frequiencies greater than half of the sample rate.
    // (Human voice tops out at < 4kHz, so nothing important is lost for transcription.)
    // See http://dsp.stackexchange.com/a/37475/26392 for a good explination of this code.
    const filter = [
      -0.037935,
      -0.00089024,
      0.040173,
      0.019989,
      0.0047792,
      -0.058675,
      -0.056487,
      -0.0040653,
      0.14527,
      0.26927,
      0.33913,
      0.26927,
      0.14527,
      -0.0040653,
      -0.056487,
      -0.058675,
      0.0047792,
      0.019989,
      0.040173,
      -0.00089024,
      -0.037935,
    ];
    const samplingRateRatio =
       this.options.sourceSampleRate / TARGET_SAMPLE_RATE;
    const nOutputSamples =
       Math.floor((buffer.length - filter.length) / samplingRateRatio) + 1;
    const outputBuffer = new Float32Array(nOutputSamples);
    for (i = 0; i + filter.length - 1 < buffer.length; i++) {
      offset = Math.round(samplingRateRatio * i);
      let sample = 0;
      for (let j = 0; j < filter.length; ++j) {
        sample += buffer[offset + j] * filter[j];
      }
      outputBuffer[i] = sample;
    }
    const indexSampleAfterLastUsed = Math.round(samplingRateRatio * i);
    const remaining = buffer.length - indexSampleAfterLastUsed;
    if (remaining > 0) {
      this.bufferUnusedSamples = new Float32Array(remaining);
      for (i = 0; i < remaining; ++i) {
        this.bufferUnusedSamples[i] = buffer[indexSampleAfterLastUsed + i];
      }
    } else {
      this.bufferUnusedSamples = new Float32Array(0);
    }
    return outputBuffer;
  }
 
  /**
    * Accepts a Float32Array of audio data and converts it to a Buffer of l16 audio data (raw wav)
    *
    * Explanation for the math: The raw values captured from the Web Audio API are
    * in 32-bit Floating Point, between -1 and 1 (per the specification).
    * The values for 16-bit PCM range between -32768 and +32767 (16-bit signed integer).
    * Filter & combine samples to reduce frequency, then multiply to by 0x7FFF (32767) to convert.
    * Store in little endian.
    *
    * @param {Float32Array} input
    * @return {Int16Array}
    */
  floatTo16BitPCM(input) {
    const output = new DataView(new ArrayBuffer(input.length * 2)); // length is in bytes (8-bit), so *2 to get 16-bit length
    for (let i = 0; i < input.length; i++) {
      const multiplier = input[i] < 0 ? 0x8000 : 0x7fff; // 16-bit signed range is -32768 to 32767
      output.setInt16(i * 2, (input[i] * multiplier) | 0, true); // index, value, little edian
    }
    return new Int16Array(output.buffer);
  }
 
  /**
    * Does some one-time setup to grab sampleRate and emit format, then sets _transform to the actual audio buffer handler and calls it.
    * @param {AudioBuffer} audioBuffer
    */
  handleFirstAudioBuffer(audioBuffer) {
    // eslint-disable-next-line no-undef
    this.options.sourceSampleRate = sampleRate;
    this.transform = this.transformAudioBuffer;
    return this.transform(audioBuffer);
  }
 
  /**
    * Accepts an AudioBuffer (for objectMode), then downsamples to 16000 and converts to a 16-bit pcm
    *
    * @param {AudioBuffer} audioBuffer
    */
  transformAudioBuffer(audioBuffer) {
    let source = audioBuffer;
    if (this.options.downsample) {
      source = this.downsample(source);
    }
 
    return this.floatTo16BitPCM(source);
  }
}
 
const audioConverter = new WebAudioL16Stream();

const calculateVolumeWithFloat32Array = (audio) => {
  let bufLength = audio.length
  let sum = 0
  for (let i = 0; i < bufLength; i++) {
    sum += audio[i] * audio[i]
  }
  let rms = Math.sqrt(sum / bufLength)
  let volume = rms
  if (volume > 1.0) {
    volume = 1.0
  }
  return volume * 100
}

// 
class AsrAudioProcessor extends AudioWorkletProcessor {
  constructor(){
    super()
    this.buffer = new Float32Array(0)
  }
  process(inputs, outputs, parameters){
    // console.log(inputs, outputs, parameters)
    const input = inputs[0]
    this.buffer = new Float32Array([...this.buffer, ...input[0]])
    if (this.buffer.length >= 1028) {
      const int16Array = audioConverter.transform(this.buffer)
      const volume = calculateVolumeWithFloat32Array(this.buffer)
      this.port.postMessage({
        'int16Array': int16Array, 
        'volume': volume,
      })
      this.buffer = new Float32Array(0)
    }
    return true
  }
}

registerProcessor('asr-worklet', AsrAudioProcessor)
