// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
//  Copyright (C) 2018 - 2021 Nuance Communications, Inc. All Rights Reserved.
// 
//  The copyright to the computer program(s) herein is the property of
//  Nuance Communications, Inc. The program(s) may be used and/or copied
//  only with the written permission from Nuance Communications, Inc.
//  or in accordance with the terms and conditions stipulated in the
//  agreement/contract under which the program(s) have been supplied.
//
'use strict';
var grpc = require('@grpc/grpc-js');
var nuance_tts_v1_nuance_tts_v1_pb = require('../../../nuance/tts/v1/nuance_tts_v1_pb.js');

function serialize_nuance_tts_v1_GetVoicesRequest(arg) {
  if (!(arg instanceof nuance_tts_v1_nuance_tts_v1_pb.GetVoicesRequest)) {
    throw new Error('Expected argument of type nuance.tts.v1.GetVoicesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_tts_v1_GetVoicesRequest(buffer_arg) {
  return nuance_tts_v1_nuance_tts_v1_pb.GetVoicesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_tts_v1_GetVoicesResponse(arg) {
  if (!(arg instanceof nuance_tts_v1_nuance_tts_v1_pb.GetVoicesResponse)) {
    throw new Error('Expected argument of type nuance.tts.v1.GetVoicesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_tts_v1_GetVoicesResponse(buffer_arg) {
  return nuance_tts_v1_nuance_tts_v1_pb.GetVoicesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_tts_v1_SynthesisRequest(arg) {
  if (!(arg instanceof nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest)) {
    throw new Error('Expected argument of type nuance.tts.v1.SynthesisRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_tts_v1_SynthesisRequest(buffer_arg) {
  return nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_tts_v1_SynthesisResponse(arg) {
  if (!(arg instanceof nuance_tts_v1_nuance_tts_v1_pb.SynthesisResponse)) {
    throw new Error('Expected argument of type nuance.tts.v1.SynthesisResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_tts_v1_SynthesisResponse(buffer_arg) {
  return nuance_tts_v1_nuance_tts_v1_pb.SynthesisResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_tts_v1_UnarySynthesisResponse(arg) {
  if (!(arg instanceof nuance_tts_v1_nuance_tts_v1_pb.UnarySynthesisResponse)) {
    throw new Error('Expected argument of type nuance.tts.v1.UnarySynthesisResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_tts_v1_UnarySynthesisResponse(buffer_arg) {
  return nuance_tts_v1_nuance_tts_v1_pb.UnarySynthesisResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// option java_package = "com.nuance.rpc.tts.v1";
// option java_outer_classname = "SynthesizerProto";
//
// 
// The Synthesizer service offers these functionalities:
// - GetVoices: Queries the list of available voices, with filters to reduce the search space.  
// - Synthesize: Synthesizes audio from input text and parameters, and returns an audio stream. 
// - UnarySynthesize: Synthesizes audio from input text and parameters, and returns a single audio response. 
var SynthesizerService = exports.SynthesizerService = {
  getVoices: {
    path: '/nuance.tts.v1.Synthesizer/GetVoices',
    requestStream: false,
    responseStream: false,
    requestType: nuance_tts_v1_nuance_tts_v1_pb.GetVoicesRequest,
    responseType: nuance_tts_v1_nuance_tts_v1_pb.GetVoicesResponse,
    requestSerialize: serialize_nuance_tts_v1_GetVoicesRequest,
    requestDeserialize: deserialize_nuance_tts_v1_GetVoicesRequest,
    responseSerialize: serialize_nuance_tts_v1_GetVoicesResponse,
    responseDeserialize: deserialize_nuance_tts_v1_GetVoicesResponse,
  },
  synthesize: {
    path: '/nuance.tts.v1.Synthesizer/Synthesize',
    requestStream: false,
    responseStream: true,
    requestType: nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest,
    responseType: nuance_tts_v1_nuance_tts_v1_pb.SynthesisResponse,
    requestSerialize: serialize_nuance_tts_v1_SynthesisRequest,
    requestDeserialize: deserialize_nuance_tts_v1_SynthesisRequest,
    responseSerialize: serialize_nuance_tts_v1_SynthesisResponse,
    responseDeserialize: deserialize_nuance_tts_v1_SynthesisResponse,
  },
  unarySynthesize: {
    path: '/nuance.tts.v1.Synthesizer/UnarySynthesize',
    requestStream: false,
    responseStream: false,
    requestType: nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest,
    responseType: nuance_tts_v1_nuance_tts_v1_pb.UnarySynthesisResponse,
    requestSerialize: serialize_nuance_tts_v1_SynthesisRequest,
    requestDeserialize: deserialize_nuance_tts_v1_SynthesisRequest,
    responseSerialize: serialize_nuance_tts_v1_UnarySynthesisResponse,
    responseDeserialize: deserialize_nuance_tts_v1_UnarySynthesisResponse,
  },
};

exports.SynthesizerClient = grpc.makeGenericClientConstructor(SynthesizerService);
