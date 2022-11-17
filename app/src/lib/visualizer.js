/*
 * Copyright 2022-present, Nuance, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in 
 * the LICENSE.md file in the root directory of this source tree.
 *
 */

import React from "react"

const FACTOR = 13

if(typeof window !== 'undefined'){
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
  }
}

export class AudioVisualizer extends React.Component {

  constructor(props){
    super(props)
    this.canvasId = `eq-viz-${new Date().toISOString()}`
    this.canvas = null
    this.canvasContext = null
    this._onAudioSourceVolumeHandler = this.onAudioVolume.bind(this)
    this._animationFrameRequest = null
    this._reset = false
    this._canvasIsCleared = true
  }

  componentDidMount(){
    this.canvas = document.getElementById(this.canvasId)
    this.canvasContext = this.canvas.getContext('2d')
    if(this.props.audioDataSource){
      this.props.audioDataSource.on('volume', this._onAudioSourceVolumeHandler)
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.audioDataSource !== this.props.audioDataSource){
      cancelAnimationFrame(this._animationFrameRequest)
      if(this.props.audioDataSource){
        this.props.audioDataSource.off('volume', this._onAudioSourceVolumeHandler)
      }
      if(nextProps.audioDataSource){
        nextProps.audioDataSource.on('volume', this._onAudioSourceVolumeHandler)
      }
      this._reset = true
      this.clear()
    }
  }

  componentWillUnmount(){
    if(this.props.audioDataSource){
      this.props.audioDataSource.off('volume', this._onAudioSourceVolumeHandler)
    }
  }

  onAudioVolume(vol){
    this.draw(vol)
  }

  reset(){
    this._reset = true
  }

  clear(){
    const w = parseInt(this.props.width, 10)
    const h = parseInt(this.props.height, 10)
    if(this.canvasContext){
      this.canvasContext.clearRect(0, 0, w, h)
    }
  }

  draw(vol){
    this._animationFrameRequest = requestAnimationFrame(() => {
      if(this._reset){
        this.clear()
        this._reset = false
      }
      const w = parseInt(this.props.width, 10)
      const h = parseInt(this.props.height, 10)
      this.canvasContext.fillStyle = this.props.color
      this.canvasContext.clearRect(0, 0, w, h)
      if(this.props.audioDataSource){
        const data = new Uint8Array(this.props.audioDataSource.analyzerSamples)
        this.props.audioDataSource.analyzer.getByteFrequencyData(data)

        const length = data.length
        const barWidth = Math.floor((w / (length * this.props.barWidthFactor)))
        const midPoint = Math.floor(w / 2)

        for(let i = 0; i < length; i++){
          const value = data[i]
          let top = h - Math.floor((h * (value * 1.0) / 216.0))
          const left1 = midPoint + i * barWidth
          const left2 = midPoint - i * barWidth
          const width = barWidth - 3

          if(top < (h / 4)){
            top = Math.floor((h / FACTOR)) 
          } else if (top < (1 * h / 4)){
            top = Math.floor(3 * (h / FACTOR))
          } else if (top < (2 * h / 4)){
            top = Math.floor(5 * (h / FACTOR))
          } else if (top < (3 * h / 4)){
            top = Math.floor(8 * (h / FACTOR))
          } else if (top < (h - (h/10))){
            top = Math.floor(10 * (h / FACTOR)) 
          } else {
            top = h - (h/7)
          }
          const height = h - top
          top = Math.floor(top / 2)

          this.canvasContext.roundRect(left1, top, width, height, 3).fill()
          this.canvasContext.roundRect(left2, top, width, height, 3).fill()
          this._canvasIsCleared = false
        }
      }
    })
  }

  render(){
    return (
      <div className="visualizer">
        <canvas 
          id={this.canvasId}
          height={this.props.height}
          width={this.props.width}>
        </canvas>
      </div>
    )
  }

}