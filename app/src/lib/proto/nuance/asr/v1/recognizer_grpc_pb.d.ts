// GENERATED CODE -- DO NOT EDIT!

// package: nuance.asr.v1
// file: nuance/asr/v1/recognizer.proto

import * as nuance_asr_v1_recognizer_pb from "../../../nuance/asr/v1/recognizer_pb";
import * as grpc from "@grpc/grpc-js";

interface IRecognizerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  recognize: grpc.MethodDefinition<nuance_asr_v1_recognizer_pb.RecognitionRequest, nuance_asr_v1_recognizer_pb.RecognitionResponse>;
}

export const RecognizerService: IRecognizerService;

export interface IRecognizerServer extends grpc.UntypedServiceImplementation {
  recognize: grpc.handleBidiStreamingCall<nuance_asr_v1_recognizer_pb.RecognitionRequest, nuance_asr_v1_recognizer_pb.RecognitionResponse>;
}

export class RecognizerClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  recognize(metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientDuplexStream<nuance_asr_v1_recognizer_pb.RecognitionRequest, nuance_asr_v1_recognizer_pb.RecognitionResponse>;
  recognize(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientDuplexStream<nuance_asr_v1_recognizer_pb.RecognitionRequest, nuance_asr_v1_recognizer_pb.RecognitionResponse>;
}
