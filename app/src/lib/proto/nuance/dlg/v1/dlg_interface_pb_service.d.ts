// package: nuance.dlg.v1
// file: nuance/dlg/v1/dlg_interface.proto

import * as nuance_dlg_v1_dlg_interface_pb from "../../../nuance/dlg/v1/dlg_interface_pb";
import * as nuance_dlg_v1_dlg_messages_pb from "../../../nuance/dlg/v1/dlg_messages_pb";
import {grpc} from "@improbable-eng/grpc-web";

type DialogServiceStart = {
  readonly methodName: string;
  readonly service: typeof DialogService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof nuance_dlg_v1_dlg_messages_pb.StartRequest;
  readonly responseType: typeof nuance_dlg_v1_dlg_messages_pb.StartResponse;
};

type DialogServiceUpdate = {
  readonly methodName: string;
  readonly service: typeof DialogService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof nuance_dlg_v1_dlg_messages_pb.UpdateRequest;
  readonly responseType: typeof nuance_dlg_v1_dlg_messages_pb.UpdateResponse;
};

type DialogServiceExecute = {
  readonly methodName: string;
  readonly service: typeof DialogService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof nuance_dlg_v1_dlg_messages_pb.ExecuteRequest;
  readonly responseType: typeof nuance_dlg_v1_dlg_messages_pb.ExecuteResponse;
};

type DialogServiceExecuteStream = {
  readonly methodName: string;
  readonly service: typeof DialogService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof nuance_dlg_v1_dlg_messages_pb.StreamInput;
  readonly responseType: typeof nuance_dlg_v1_dlg_messages_pb.StreamOutput;
};

type DialogServiceStop = {
  readonly methodName: string;
  readonly service: typeof DialogService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof nuance_dlg_v1_dlg_messages_pb.StopRequest;
  readonly responseType: typeof nuance_dlg_v1_dlg_messages_pb.StopResponse;
};

type DialogServiceStatus = {
  readonly methodName: string;
  readonly service: typeof DialogService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof nuance_dlg_v1_dlg_messages_pb.StatusRequest;
  readonly responseType: typeof nuance_dlg_v1_dlg_messages_pb.StatusResponse;
};

export class DialogService {
  static readonly serviceName: string;
  static readonly Start: DialogServiceStart;
  static readonly Update: DialogServiceUpdate;
  static readonly Execute: DialogServiceExecute;
  static readonly ExecuteStream: DialogServiceExecuteStream;
  static readonly Stop: DialogServiceStop;
  static readonly Status: DialogServiceStatus;
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
  on(type: 'error', handler: (error: Error) => void): ResponseStream<T>;
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

export class DialogServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  start(
    requestMessage: nuance_dlg_v1_dlg_messages_pb.StartRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: nuance_dlg_v1_dlg_messages_pb.StartResponse|null) => void
  ): UnaryResponse;
  start(
    requestMessage: nuance_dlg_v1_dlg_messages_pb.StartRequest,
    callback: (error: ServiceError|null, responseMessage: nuance_dlg_v1_dlg_messages_pb.StartResponse|null) => void
  ): UnaryResponse;
  update(
    requestMessage: nuance_dlg_v1_dlg_messages_pb.UpdateRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: nuance_dlg_v1_dlg_messages_pb.UpdateResponse|null) => void
  ): UnaryResponse;
  update(
    requestMessage: nuance_dlg_v1_dlg_messages_pb.UpdateRequest,
    callback: (error: ServiceError|null, responseMessage: nuance_dlg_v1_dlg_messages_pb.UpdateResponse|null) => void
  ): UnaryResponse;
  execute(
    requestMessage: nuance_dlg_v1_dlg_messages_pb.ExecuteRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: nuance_dlg_v1_dlg_messages_pb.ExecuteResponse|null) => void
  ): UnaryResponse;
  execute(
    requestMessage: nuance_dlg_v1_dlg_messages_pb.ExecuteRequest,
    callback: (error: ServiceError|null, responseMessage: nuance_dlg_v1_dlg_messages_pb.ExecuteResponse|null) => void
  ): UnaryResponse;
  executeStream(metadata?: grpc.Metadata): BidirectionalStream<nuance_dlg_v1_dlg_messages_pb.StreamInput, nuance_dlg_v1_dlg_messages_pb.StreamOutput>;
  stop(
    requestMessage: nuance_dlg_v1_dlg_messages_pb.StopRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: nuance_dlg_v1_dlg_messages_pb.StopResponse|null) => void
  ): UnaryResponse;
  stop(
    requestMessage: nuance_dlg_v1_dlg_messages_pb.StopRequest,
    callback: (error: ServiceError|null, responseMessage: nuance_dlg_v1_dlg_messages_pb.StopResponse|null) => void
  ): UnaryResponse;
  status(
    requestMessage: nuance_dlg_v1_dlg_messages_pb.StatusRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: nuance_dlg_v1_dlg_messages_pb.StatusResponse|null) => void
  ): UnaryResponse;
  status(
    requestMessage: nuance_dlg_v1_dlg_messages_pb.StatusRequest,
    callback: (error: ServiceError|null, responseMessage: nuance_dlg_v1_dlg_messages_pb.StatusResponse|null) => void
  ): UnaryResponse;
}

