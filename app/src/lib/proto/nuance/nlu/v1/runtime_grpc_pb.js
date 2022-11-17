// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// *
// This is one of five proto files that define the services and
// messages to request interpretation from NLU as a Service and return
// a result. Once you have compiled these files to interfaces or
// modules for you implementation language, you can call the resulting
// functions or methods from your client application.
//
'use strict';
var grpc = require('@grpc/grpc-js');
var nuance_nlu_v1_runtime_pb = require('../../../nuance/nlu/v1/runtime_pb.js');
var nuance_nlu_v1_result_pb = require('../../../nuance/nlu/v1/result_pb.js');
var google_api_annotations_pb = require('../../../google/api/annotations_pb.js');
var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');

function serialize_nuance_nlu_v1_InterpretRequest(arg) {
  if (!(arg instanceof nuance_nlu_v1_runtime_pb.InterpretRequest)) {
    throw new Error('Expected argument of type nuance.nlu.v1.InterpretRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_nlu_v1_InterpretRequest(buffer_arg) {
  return nuance_nlu_v1_runtime_pb.InterpretRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_nlu_v1_InterpretResponse(arg) {
  if (!(arg instanceof nuance_nlu_v1_runtime_pb.InterpretResponse)) {
    throw new Error('Expected argument of type nuance.nlu.v1.InterpretResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_nlu_v1_InterpretResponse(buffer_arg) {
  return nuance_nlu_v1_runtime_pb.InterpretResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// *
// Interpretation service. Use the Interpret procedure to request an
// interpretation.
var RuntimeService = exports.RuntimeService = {
  // Starts an interpretation request and returns a response.
interpret: {
    path: '/nuance.nlu.v1.Runtime/Interpret',
    requestStream: false,
    responseStream: false,
    requestType: nuance_nlu_v1_runtime_pb.InterpretRequest,
    responseType: nuance_nlu_v1_runtime_pb.InterpretResponse,
    requestSerialize: serialize_nuance_nlu_v1_InterpretRequest,
    requestDeserialize: deserialize_nuance_nlu_v1_InterpretRequest,
    responseSerialize: serialize_nuance_nlu_v1_InterpretResponse,
    responseDeserialize: deserialize_nuance_nlu_v1_InterpretResponse,
  },
};

exports.RuntimeClient = grpc.makeGenericClientConstructor(RuntimeService);
