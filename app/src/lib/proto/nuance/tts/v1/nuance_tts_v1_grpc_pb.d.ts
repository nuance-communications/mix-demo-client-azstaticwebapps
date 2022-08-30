// GENERATED CODE -- DO NOT EDIT!

// package: nuance.tts.v1
// file: nuance/tts/v1/nuance_tts_v1.proto

import * as nuance_tts_v1_nuance_tts_v1_pb from "../../../nuance/tts/v1/nuance_tts_v1_pb";
import * as grpc from "@grpc/grpc-js";

interface ISynthesizerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getVoices: grpc.MethodDefinition<nuance_tts_v1_nuance_tts_v1_pb.GetVoicesRequest, nuance_tts_v1_nuance_tts_v1_pb.GetVoicesResponse>;
  synthesize: grpc.MethodDefinition<nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest, nuance_tts_v1_nuance_tts_v1_pb.SynthesisResponse>;
  unarySynthesize: grpc.MethodDefinition<nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest, nuance_tts_v1_nuance_tts_v1_pb.UnarySynthesisResponse>;
}

export const SynthesizerService: ISynthesizerService;

export interface ISynthesizerServer extends grpc.UntypedServiceImplementation {
  getVoices: grpc.handleUnaryCall<nuance_tts_v1_nuance_tts_v1_pb.GetVoicesRequest, nuance_tts_v1_nuance_tts_v1_pb.GetVoicesResponse>;
  synthesize: grpc.handleServerStreamingCall<nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest, nuance_tts_v1_nuance_tts_v1_pb.SynthesisResponse>;
  unarySynthesize: grpc.handleUnaryCall<nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest, nuance_tts_v1_nuance_tts_v1_pb.UnarySynthesisResponse>;
}

export class SynthesizerClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getVoices(argument: nuance_tts_v1_nuance_tts_v1_pb.GetVoicesRequest, callback: grpc.requestCallback<nuance_tts_v1_nuance_tts_v1_pb.GetVoicesResponse>): grpc.ClientUnaryCall;
  getVoices(argument: nuance_tts_v1_nuance_tts_v1_pb.GetVoicesRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<nuance_tts_v1_nuance_tts_v1_pb.GetVoicesResponse>): grpc.ClientUnaryCall;
  getVoices(argument: nuance_tts_v1_nuance_tts_v1_pb.GetVoicesRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<nuance_tts_v1_nuance_tts_v1_pb.GetVoicesResponse>): grpc.ClientUnaryCall;
  synthesize(argument: nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<nuance_tts_v1_nuance_tts_v1_pb.SynthesisResponse>;
  synthesize(argument: nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<nuance_tts_v1_nuance_tts_v1_pb.SynthesisResponse>;
  unarySynthesize(argument: nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest, callback: grpc.requestCallback<nuance_tts_v1_nuance_tts_v1_pb.UnarySynthesisResponse>): grpc.ClientUnaryCall;
  unarySynthesize(argument: nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<nuance_tts_v1_nuance_tts_v1_pb.UnarySynthesisResponse>): grpc.ClientUnaryCall;
  unarySynthesize(argument: nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<nuance_tts_v1_nuance_tts_v1_pb.UnarySynthesisResponse>): grpc.ClientUnaryCall;
}
