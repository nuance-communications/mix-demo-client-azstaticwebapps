// GENERATED CODE -- DO NOT EDIT!

// package: nuance.dlg.v1
// file: nuance/dlg/v1/dlg_interface.proto

import * as nuance_dlg_v1_dlg_interface_pb from "../../../nuance/dlg/v1/dlg_interface_pb";
import * as nuance_dlg_v1_dlg_messages_pb from "../../../nuance/dlg/v1/dlg_messages_pb";
import * as grpc from "@grpc/grpc-js";

interface IDialogServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  start: grpc.MethodDefinition<nuance_dlg_v1_dlg_messages_pb.StartRequest, nuance_dlg_v1_dlg_messages_pb.StartResponse>;
  update: grpc.MethodDefinition<nuance_dlg_v1_dlg_messages_pb.UpdateRequest, nuance_dlg_v1_dlg_messages_pb.UpdateResponse>;
  execute: grpc.MethodDefinition<nuance_dlg_v1_dlg_messages_pb.ExecuteRequest, nuance_dlg_v1_dlg_messages_pb.ExecuteResponse>;
  executeStream: grpc.MethodDefinition<nuance_dlg_v1_dlg_messages_pb.StreamInput, nuance_dlg_v1_dlg_messages_pb.StreamOutput>;
  stop: grpc.MethodDefinition<nuance_dlg_v1_dlg_messages_pb.StopRequest, nuance_dlg_v1_dlg_messages_pb.StopResponse>;
  status: grpc.MethodDefinition<nuance_dlg_v1_dlg_messages_pb.StatusRequest, nuance_dlg_v1_dlg_messages_pb.StatusResponse>;
}

export const DialogServiceService: IDialogServiceService;

export interface IDialogServiceServer extends grpc.UntypedServiceImplementation {
  start: grpc.handleUnaryCall<nuance_dlg_v1_dlg_messages_pb.StartRequest, nuance_dlg_v1_dlg_messages_pb.StartResponse>;
  update: grpc.handleUnaryCall<nuance_dlg_v1_dlg_messages_pb.UpdateRequest, nuance_dlg_v1_dlg_messages_pb.UpdateResponse>;
  execute: grpc.handleUnaryCall<nuance_dlg_v1_dlg_messages_pb.ExecuteRequest, nuance_dlg_v1_dlg_messages_pb.ExecuteResponse>;
  executeStream: grpc.handleBidiStreamingCall<nuance_dlg_v1_dlg_messages_pb.StreamInput, nuance_dlg_v1_dlg_messages_pb.StreamOutput>;
  stop: grpc.handleUnaryCall<nuance_dlg_v1_dlg_messages_pb.StopRequest, nuance_dlg_v1_dlg_messages_pb.StopResponse>;
  status: grpc.handleUnaryCall<nuance_dlg_v1_dlg_messages_pb.StatusRequest, nuance_dlg_v1_dlg_messages_pb.StatusResponse>;
}

export class DialogServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  start(argument: nuance_dlg_v1_dlg_messages_pb.StartRequest, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.StartResponse>): grpc.ClientUnaryCall;
  start(argument: nuance_dlg_v1_dlg_messages_pb.StartRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.StartResponse>): grpc.ClientUnaryCall;
  start(argument: nuance_dlg_v1_dlg_messages_pb.StartRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.StartResponse>): grpc.ClientUnaryCall;
  update(argument: nuance_dlg_v1_dlg_messages_pb.UpdateRequest, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.UpdateResponse>): grpc.ClientUnaryCall;
  update(argument: nuance_dlg_v1_dlg_messages_pb.UpdateRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.UpdateResponse>): grpc.ClientUnaryCall;
  update(argument: nuance_dlg_v1_dlg_messages_pb.UpdateRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.UpdateResponse>): grpc.ClientUnaryCall;
  execute(argument: nuance_dlg_v1_dlg_messages_pb.ExecuteRequest, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.ExecuteResponse>): grpc.ClientUnaryCall;
  execute(argument: nuance_dlg_v1_dlg_messages_pb.ExecuteRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.ExecuteResponse>): grpc.ClientUnaryCall;
  execute(argument: nuance_dlg_v1_dlg_messages_pb.ExecuteRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.ExecuteResponse>): grpc.ClientUnaryCall;
  executeStream(metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientDuplexStream<nuance_dlg_v1_dlg_messages_pb.StreamInput, nuance_dlg_v1_dlg_messages_pb.StreamOutput>;
  executeStream(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientDuplexStream<nuance_dlg_v1_dlg_messages_pb.StreamInput, nuance_dlg_v1_dlg_messages_pb.StreamOutput>;
  stop(argument: nuance_dlg_v1_dlg_messages_pb.StopRequest, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.StopResponse>): grpc.ClientUnaryCall;
  stop(argument: nuance_dlg_v1_dlg_messages_pb.StopRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.StopResponse>): grpc.ClientUnaryCall;
  stop(argument: nuance_dlg_v1_dlg_messages_pb.StopRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.StopResponse>): grpc.ClientUnaryCall;
  status(argument: nuance_dlg_v1_dlg_messages_pb.StatusRequest, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.StatusResponse>): grpc.ClientUnaryCall;
  status(argument: nuance_dlg_v1_dlg_messages_pb.StatusRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.StatusResponse>): grpc.ClientUnaryCall;
  status(argument: nuance_dlg_v1_dlg_messages_pb.StatusRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<nuance_dlg_v1_dlg_messages_pb.StatusResponse>): grpc.ClientUnaryCall;
}
