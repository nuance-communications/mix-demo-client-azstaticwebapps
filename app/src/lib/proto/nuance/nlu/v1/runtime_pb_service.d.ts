// package: nuance.nlu.v1
// file: nuance/nlu/v1/runtime.proto

import * as nuance_nlu_v1_runtime_pb from "../../../nuance/nlu/v1/runtime_pb";
import {grpc} from "@improbable-eng/grpc-web";

type RuntimeInterpret = {
  readonly methodName: string;
  readonly service: typeof Runtime;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof nuance_nlu_v1_runtime_pb.InterpretRequest;
  readonly responseType: typeof nuance_nlu_v1_runtime_pb.InterpretResponse;
};

export class Runtime {
  static readonly serviceName: string;
  static readonly Interpret: RuntimeInterpret;
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

export class RuntimeClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  interpret(
    requestMessage: nuance_nlu_v1_runtime_pb.InterpretRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: nuance_nlu_v1_runtime_pb.InterpretResponse|null) => void
  ): UnaryResponse;
  interpret(
    requestMessage: nuance_nlu_v1_runtime_pb.InterpretRequest,
    callback: (error: ServiceError|null, responseMessage: nuance_nlu_v1_runtime_pb.InterpretResponse|null) => void
  ): UnaryResponse;
}

