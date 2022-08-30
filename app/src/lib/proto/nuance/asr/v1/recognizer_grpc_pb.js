// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
//  Copyright (C) 2020 - 2021 Nuance Communications, Inc. All Rights Reserved.
// 
//  The copyright to the computer program(s) herein is the property of
//  Nuance Communications, Inc. The program(s) may be used and/or copied
//  only with the written permission from Nuance Communications, Inc.
//  or in accordance with the terms and conditions stipulated in the
//  agreement/contract under which the program(s) have been supplied.
//
'use strict';
var grpc = require('@grpc/grpc-js');
var nuance_asr_v1_recognizer_pb = require('../../../nuance/asr/v1/recognizer_pb.js');
var nuance_asr_v1_resource_pb = require('../../../nuance/asr/v1/resource_pb.js');
var nuance_asr_v1_result_pb = require('../../../nuance/asr/v1/result_pb.js');

function serialize_nuance_asr_v1_RecognitionRequest(arg) {
  if (!(arg instanceof nuance_asr_v1_recognizer_pb.RecognitionRequest)) {
    throw new Error('Expected argument of type nuance.asr.v1.RecognitionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_asr_v1_RecognitionRequest(buffer_arg) {
  return nuance_asr_v1_recognizer_pb.RecognitionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_asr_v1_RecognitionResponse(arg) {
  if (!(arg instanceof nuance_asr_v1_recognizer_pb.RecognitionResponse)) {
    throw new Error('Expected argument of type nuance.asr.v1.RecognitionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_asr_v1_RecognitionResponse(buffer_arg) {
  return nuance_asr_v1_recognizer_pb.RecognitionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// 
// Streaming recognition service API.  
var RecognizerService = exports.RecognizerService = {
  recognize: {
    path: '/nuance.asr.v1.Recognizer/Recognize',
    requestStream: true,
    responseStream: true,
    requestType: nuance_asr_v1_recognizer_pb.RecognitionRequest,
    responseType: nuance_asr_v1_recognizer_pb.RecognitionResponse,
    requestSerialize: serialize_nuance_asr_v1_RecognitionRequest,
    requestDeserialize: deserialize_nuance_asr_v1_RecognitionRequest,
    responseSerialize: serialize_nuance_asr_v1_RecognitionResponse,
    responseDeserialize: deserialize_nuance_asr_v1_RecognitionResponse,
  },
  // Starts a recognition request and returns a response. 
};

exports.RecognizerClient = grpc.makeGenericClientConstructor(RecognizerService);
