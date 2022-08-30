// GENERATED CODE -- DO NOT EDIT!

// package: nuance.nlu.v1
// file: nuance/nlu/v1/runtime.proto

import * as nuance_nlu_v1_runtime_pb from "../../../nuance/nlu/v1/runtime_pb";
import * as grpc from "@grpc/grpc-js";

interface IRuntimeService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  interpret: grpc.MethodDefinition<nuance_nlu_v1_runtime_pb.InterpretRequest, nuance_nlu_v1_runtime_pb.InterpretResponse>;
}

export const RuntimeService: IRuntimeService;

export interface IRuntimeServer extends grpc.UntypedServiceImplementation {
  interpret: grpc.handleUnaryCall<nuance_nlu_v1_runtime_pb.InterpretRequest, nuance_nlu_v1_runtime_pb.InterpretResponse>;
}

export class RuntimeClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  interpret(argument: nuance_nlu_v1_runtime_pb.InterpretRequest, callback: grpc.requestCallback<nuance_nlu_v1_runtime_pb.InterpretResponse>): grpc.ClientUnaryCall;
  interpret(argument: nuance_nlu_v1_runtime_pb.InterpretRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<nuance_nlu_v1_runtime_pb.InterpretResponse>): grpc.ClientUnaryCall;
  interpret(argument: nuance_nlu_v1_runtime_pb.InterpretRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<nuance_nlu_v1_runtime_pb.InterpretResponse>): grpc.ClientUnaryCall;
}
