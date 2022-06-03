// package: nuance.asr.v1
// file: nuance/asr/v1/recognizer.proto

import * as nuance_asr_v1_recognizer_pb from "../../../nuance/asr/v1/recognizer_pb";
import {grpc} from "@improbable-eng/grpc-web";

type RecognizerRecognize = {
  readonly methodName: string;
  readonly service: typeof Recognizer;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof nuance_asr_v1_recognizer_pb.RecognitionRequest;
  readonly responseType: typeof nuance_asr_v1_recognizer_pb.RecognitionResponse;
};

export class Recognizer {
  static readonly serviceName: string;
  static readonly Recognize: RecognizerRecognize;
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
  on(type: 'error', handler: (error: Error) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
  on(type: 'error', handler: (error: Error) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'error', handler: (error: Error) => void): BidirectionalStream<ReqT, ResT>;
}

export class RecognizerClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  recognize(metadata?: grpc.Metadata): BidirectionalStream<nuance_asr_v1_recognizer_pb.RecognitionRequest, nuance_asr_v1_recognizer_pb.RecognitionResponse>;
}

