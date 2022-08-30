// package: nuance.tts.v1
// file: nuance/tts/v1/nuance_tts_v1.proto

import * as nuance_tts_v1_nuance_tts_v1_pb from "../../../nuance/tts/v1/nuance_tts_v1_pb";
import {grpc} from "@improbable-eng/grpc-web";

type SynthesizerGetVoices = {
  readonly methodName: string;
  readonly service: typeof Synthesizer;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof nuance_tts_v1_nuance_tts_v1_pb.GetVoicesRequest;
  readonly responseType: typeof nuance_tts_v1_nuance_tts_v1_pb.GetVoicesResponse;
};

type SynthesizerSynthesize = {
  readonly methodName: string;
  readonly service: typeof Synthesizer;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest;
  readonly responseType: typeof nuance_tts_v1_nuance_tts_v1_pb.SynthesisResponse;
};

type SynthesizerUnarySynthesize = {
  readonly methodName: string;
  readonly service: typeof Synthesizer;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest;
  readonly responseType: typeof nuance_tts_v1_nuance_tts_v1_pb.UnarySynthesisResponse;
};

export class Synthesizer {
  static readonly serviceName: string;
  static readonly GetVoices: SynthesizerGetVoices;
  static readonly Synthesize: SynthesizerSynthesize;
  static readonly UnarySynthesize: SynthesizerUnarySynthesize;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class SynthesizerClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getVoices(
    requestMessage: nuance_tts_v1_nuance_tts_v1_pb.GetVoicesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: nuance_tts_v1_nuance_tts_v1_pb.GetVoicesResponse|null) => void
  ): UnaryResponse;
  getVoices(
    requestMessage: nuance_tts_v1_nuance_tts_v1_pb.GetVoicesRequest,
    callback: (error: ServiceError|null, responseMessage: nuance_tts_v1_nuance_tts_v1_pb.GetVoicesResponse|null) => void
  ): UnaryResponse;
  synthesize(requestMessage: nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest, metadata?: grpc.Metadata): ResponseStream<nuance_tts_v1_nuance_tts_v1_pb.SynthesisResponse>;
  unarySynthesize(
    requestMessage: nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: nuance_tts_v1_nuance_tts_v1_pb.UnarySynthesisResponse|null) => void
  ): UnaryResponse;
  unarySynthesize(
    requestMessage: nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest,
    callback: (error: ServiceError|null, responseMessage: nuance_tts_v1_nuance_tts_v1_pb.UnarySynthesisResponse|null) => void
  ): UnaryResponse;
}

