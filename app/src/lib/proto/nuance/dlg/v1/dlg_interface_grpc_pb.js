// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
//  Copyright (C) 2020 - 2021 Nuance Communications, Inc. All Rights Reserved.
// 
//  The copyright to the computer program(s) herein is the property of
//  Nuance Communications, Inc. The program(s) may be used and/or copied
//  only with the written permission from Nuance Communications, Inc.
//  or in accordance with the terms and conditions stipulated in the
//  agreement/contract under which the program(s) have been supplied.
'use strict';
var grpc = require('@grpc/grpc-js');
var google_api_annotations_pb = require('../../../google/api/annotations_pb.js');
var nuance_dlg_v1_dlg_messages_pb = require('../../../nuance/dlg/v1/dlg_messages_pb.js');

function serialize_nuance_dlg_v1_ExecuteRequest(arg) {
  if (!(arg instanceof nuance_dlg_v1_dlg_messages_pb.ExecuteRequest)) {
    throw new Error('Expected argument of type nuance.dlg.v1.ExecuteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_dlg_v1_ExecuteRequest(buffer_arg) {
  return nuance_dlg_v1_dlg_messages_pb.ExecuteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_dlg_v1_ExecuteResponse(arg) {
  if (!(arg instanceof nuance_dlg_v1_dlg_messages_pb.ExecuteResponse)) {
    throw new Error('Expected argument of type nuance.dlg.v1.ExecuteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_dlg_v1_ExecuteResponse(buffer_arg) {
  return nuance_dlg_v1_dlg_messages_pb.ExecuteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_dlg_v1_StartRequest(arg) {
  if (!(arg instanceof nuance_dlg_v1_dlg_messages_pb.StartRequest)) {
    throw new Error('Expected argument of type nuance.dlg.v1.StartRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_dlg_v1_StartRequest(buffer_arg) {
  return nuance_dlg_v1_dlg_messages_pb.StartRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_dlg_v1_StartResponse(arg) {
  if (!(arg instanceof nuance_dlg_v1_dlg_messages_pb.StartResponse)) {
    throw new Error('Expected argument of type nuance.dlg.v1.StartResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_dlg_v1_StartResponse(buffer_arg) {
  return nuance_dlg_v1_dlg_messages_pb.StartResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_dlg_v1_StatusRequest(arg) {
  if (!(arg instanceof nuance_dlg_v1_dlg_messages_pb.StatusRequest)) {
    throw new Error('Expected argument of type nuance.dlg.v1.StatusRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_dlg_v1_StatusRequest(buffer_arg) {
  return nuance_dlg_v1_dlg_messages_pb.StatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_dlg_v1_StatusResponse(arg) {
  if (!(arg instanceof nuance_dlg_v1_dlg_messages_pb.StatusResponse)) {
    throw new Error('Expected argument of type nuance.dlg.v1.StatusResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_dlg_v1_StatusResponse(buffer_arg) {
  return nuance_dlg_v1_dlg_messages_pb.StatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_dlg_v1_StopRequest(arg) {
  if (!(arg instanceof nuance_dlg_v1_dlg_messages_pb.StopRequest)) {
    throw new Error('Expected argument of type nuance.dlg.v1.StopRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_dlg_v1_StopRequest(buffer_arg) {
  return nuance_dlg_v1_dlg_messages_pb.StopRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_dlg_v1_StopResponse(arg) {
  if (!(arg instanceof nuance_dlg_v1_dlg_messages_pb.StopResponse)) {
    throw new Error('Expected argument of type nuance.dlg.v1.StopResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_dlg_v1_StopResponse(buffer_arg) {
  return nuance_dlg_v1_dlg_messages_pb.StopResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_dlg_v1_StreamInput(arg) {
  if (!(arg instanceof nuance_dlg_v1_dlg_messages_pb.StreamInput)) {
    throw new Error('Expected argument of type nuance.dlg.v1.StreamInput');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_dlg_v1_StreamInput(buffer_arg) {
  return nuance_dlg_v1_dlg_messages_pb.StreamInput.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_dlg_v1_StreamOutput(arg) {
  if (!(arg instanceof nuance_dlg_v1_dlg_messages_pb.StreamOutput)) {
    throw new Error('Expected argument of type nuance.dlg.v1.StreamOutput');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_dlg_v1_StreamOutput(buffer_arg) {
  return nuance_dlg_v1_dlg_messages_pb.StreamOutput.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_dlg_v1_UpdateRequest(arg) {
  if (!(arg instanceof nuance_dlg_v1_dlg_messages_pb.UpdateRequest)) {
    throw new Error('Expected argument of type nuance.dlg.v1.UpdateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_dlg_v1_UpdateRequest(buffer_arg) {
  return nuance_dlg_v1_dlg_messages_pb.UpdateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nuance_dlg_v1_UpdateResponse(arg) {
  if (!(arg instanceof nuance_dlg_v1_dlg_messages_pb.UpdateResponse)) {
    throw new Error('Expected argument of type nuance.dlg.v1.UpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nuance_dlg_v1_UpdateResponse(buffer_arg) {
  return nuance_dlg_v1_dlg_messages_pb.UpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DialogServiceService = exports.DialogServiceService = {
  // Starts a conversation.
// Returns a **StartResponse** object.
start: {
    path: '/nuance.dlg.v1.DialogService/Start',
    requestStream: false,
    responseStream: false,
    requestType: nuance_dlg_v1_dlg_messages_pb.StartRequest,
    responseType: nuance_dlg_v1_dlg_messages_pb.StartResponse,
    requestSerialize: serialize_nuance_dlg_v1_StartRequest,
    requestDeserialize: deserialize_nuance_dlg_v1_StartRequest,
    responseSerialize: serialize_nuance_dlg_v1_StartResponse,
    responseDeserialize: deserialize_nuance_dlg_v1_StartResponse,
  },
  // Updates the state of a session without advancing the conversation.
// Returns a **UpdateResponse** object.
update: {
    path: '/nuance.dlg.v1.DialogService/Update',
    requestStream: false,
    responseStream: false,
    requestType: nuance_dlg_v1_dlg_messages_pb.UpdateRequest,
    responseType: nuance_dlg_v1_dlg_messages_pb.UpdateResponse,
    requestSerialize: serialize_nuance_dlg_v1_UpdateRequest,
    requestDeserialize: deserialize_nuance_dlg_v1_UpdateRequest,
    responseSerialize: serialize_nuance_dlg_v1_UpdateResponse,
    responseDeserialize: deserialize_nuance_dlg_v1_UpdateResponse,
  },
  // Used to continuously interact with the conversation based on end user input or events.
// Returns an **ExecuteResponse** object that will contain data related to the dialog interactions and that can be 
// used by the client to interact with the end user.
execute: {
    path: '/nuance.dlg.v1.DialogService/Execute',
    requestStream: false,
    responseStream: false,
    requestType: nuance_dlg_v1_dlg_messages_pb.ExecuteRequest,
    responseType: nuance_dlg_v1_dlg_messages_pb.ExecuteResponse,
    requestSerialize: serialize_nuance_dlg_v1_ExecuteRequest,
    requestDeserialize: deserialize_nuance_dlg_v1_ExecuteRequest,
    responseSerialize: serialize_nuance_dlg_v1_ExecuteResponse,
    responseDeserialize: deserialize_nuance_dlg_v1_ExecuteResponse,
  },
  // Performs recognition on streamed audio using ASRaaS and provides speech synthesis using TTSaaS.
executeStream: {
    path: '/nuance.dlg.v1.DialogService/ExecuteStream',
    requestStream: true,
    responseStream: true,
    requestType: nuance_dlg_v1_dlg_messages_pb.StreamInput,
    responseType: nuance_dlg_v1_dlg_messages_pb.StreamOutput,
    requestSerialize: serialize_nuance_dlg_v1_StreamInput,
    requestDeserialize: deserialize_nuance_dlg_v1_StreamInput,
    responseSerialize: serialize_nuance_dlg_v1_StreamOutput,
    responseDeserialize: deserialize_nuance_dlg_v1_StreamOutput,
  },
  // Ends a conversation and performs cleanup.
// Returns a **StopResponse** object.
stop: {
    path: '/nuance.dlg.v1.DialogService/Stop',
    requestStream: false,
    responseStream: false,
    requestType: nuance_dlg_v1_dlg_messages_pb.StopRequest,
    responseType: nuance_dlg_v1_dlg_messages_pb.StopResponse,
    requestSerialize: serialize_nuance_dlg_v1_StopRequest,
    requestDeserialize: deserialize_nuance_dlg_v1_StopRequest,
    responseSerialize: serialize_nuance_dlg_v1_StopResponse,
    responseDeserialize: deserialize_nuance_dlg_v1_StopResponse,
  },
  // Returns the status of a session. Returns grpc status 0 (OK) if found, 5 (NOT_FOUND) if no session was found
// Returns a **StatusResponse** object.
status: {
    path: '/nuance.dlg.v1.DialogService/Status',
    requestStream: false,
    responseStream: false,
    requestType: nuance_dlg_v1_dlg_messages_pb.StatusRequest,
    responseType: nuance_dlg_v1_dlg_messages_pb.StatusResponse,
    requestSerialize: serialize_nuance_dlg_v1_StatusRequest,
    requestDeserialize: deserialize_nuance_dlg_v1_StatusRequest,
    responseSerialize: serialize_nuance_dlg_v1_StatusResponse,
    responseDeserialize: deserialize_nuance_dlg_v1_StatusResponse,
  },
};

exports.DialogServiceClient = grpc.makeGenericClientConstructor(DialogServiceService);
