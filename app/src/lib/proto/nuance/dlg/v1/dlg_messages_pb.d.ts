// package: nuance.dlg.v1
// file: nuance/dlg/v1/dlg_messages.proto

import * as jspb from "google-protobuf";
import * as nuance_asr_v1_recognizer_pb from "../../../nuance/asr/v1/recognizer_pb";
import * as nuance_asr_v1_result_pb from "../../../nuance/asr/v1/result_pb";
import * as nuance_asr_v1_resource_pb from "../../../nuance/asr/v1/resource_pb";
import * as nuance_tts_v1_nuance_tts_v1_pb from "../../../nuance/tts/v1/nuance_tts_v1_pb";
import * as nuance_dlg_v1_common_dlg_common_messages_pb from "../../../nuance/dlg/v1/common/dlg_common_messages_pb";

export class StreamInput extends jspb.Message {
  hasRequest(): boolean;
  clearRequest(): void;
  getRequest(): ExecuteRequest | undefined;
  setRequest(value?: ExecuteRequest): void;

  hasAsrControlV1(): boolean;
  clearAsrControlV1(): void;
  getAsrControlV1(): AsrParamsV1 | undefined;
  setAsrControlV1(value?: AsrParamsV1): void;

  getAudio(): Uint8Array | string;
  getAudio_asU8(): Uint8Array;
  getAudio_asB64(): string;
  setAudio(value: Uint8Array | string): void;

  hasTtsControlV1(): boolean;
  clearTtsControlV1(): void;
  getTtsControlV1(): TtsParamsV1 | undefined;
  setTtsControlV1(value?: TtsParamsV1): void;

  hasControlMessage(): boolean;
  clearControlMessage(): void;
  getControlMessage(): nuance_asr_v1_recognizer_pb.ControlMessage | undefined;
  setControlMessage(value?: nuance_asr_v1_recognizer_pb.ControlMessage): void;

  getAsrControlOneofCase(): StreamInput.AsrControlOneofCase;
  getTtsControlOneofCase(): StreamInput.TtsControlOneofCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamInput.AsObject;
  static toObject(includeInstance: boolean, msg: StreamInput): StreamInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StreamInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamInput;
  static deserializeBinaryFromReader(message: StreamInput, reader: jspb.BinaryReader): StreamInput;
}

export namespace StreamInput {
  export type AsObject = {
    request?: ExecuteRequest.AsObject,
    asrControlV1?: AsrParamsV1.AsObject,
    audio: Uint8Array | string,
    ttsControlV1?: TtsParamsV1.AsObject,
    controlMessage?: nuance_asr_v1_recognizer_pb.ControlMessage.AsObject,
  }

  export enum AsrControlOneofCase {
    ASR_CONTROL_ONEOF_NOT_SET = 0,
    ASR_CONTROL_V1 = 2,
  }

  export enum TtsControlOneofCase {
    TTS_CONTROL_ONEOF_NOT_SET = 0,
    TTS_CONTROL_V1 = 4,
  }
}

export class StreamOutput extends jspb.Message {
  hasResponse(): boolean;
  clearResponse(): void;
  getResponse(): ExecuteResponse | undefined;
  setResponse(value?: ExecuteResponse): void;

  hasAudio(): boolean;
  clearAudio(): void;
  getAudio(): nuance_tts_v1_nuance_tts_v1_pb.SynthesisResponse | undefined;
  setAudio(value?: nuance_tts_v1_nuance_tts_v1_pb.SynthesisResponse): void;

  hasAsrResult(): boolean;
  clearAsrResult(): void;
  getAsrResult(): nuance_asr_v1_result_pb.Result | undefined;
  setAsrResult(value?: nuance_asr_v1_result_pb.Result): void;

  hasAsrStatus(): boolean;
  clearAsrStatus(): void;
  getAsrStatus(): nuance_asr_v1_recognizer_pb.Status | undefined;
  setAsrStatus(value?: nuance_asr_v1_recognizer_pb.Status): void;

  hasAsrStartOfSpeech(): boolean;
  clearAsrStartOfSpeech(): void;
  getAsrStartOfSpeech(): nuance_asr_v1_recognizer_pb.StartOfSpeech | undefined;
  setAsrStartOfSpeech(value?: nuance_asr_v1_recognizer_pb.StartOfSpeech): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamOutput.AsObject;
  static toObject(includeInstance: boolean, msg: StreamOutput): StreamOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StreamOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamOutput;
  static deserializeBinaryFromReader(message: StreamOutput, reader: jspb.BinaryReader): StreamOutput;
}

export namespace StreamOutput {
  export type AsObject = {
    response?: ExecuteResponse.AsObject,
    audio?: nuance_tts_v1_nuance_tts_v1_pb.SynthesisResponse.AsObject,
    asrResult?: nuance_asr_v1_result_pb.Result.AsObject,
    asrStatus?: nuance_asr_v1_recognizer_pb.Status.AsObject,
    asrStartOfSpeech?: nuance_asr_v1_recognizer_pb.StartOfSpeech.AsObject,
  }
}

export class StartRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): void;

  hasSelector(): boolean;
  clearSelector(): void;
  getSelector(): nuance_dlg_v1_common_dlg_common_messages_pb.Selector | undefined;
  setSelector(value?: nuance_dlg_v1_common_dlg_common_messages_pb.Selector): void;

  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): nuance_dlg_v1_common_dlg_common_messages_pb.StartRequestPayload | undefined;
  setPayload(value?: nuance_dlg_v1_common_dlg_common_messages_pb.StartRequestPayload): void;

  getSessionTimeoutSec(): number;
  setSessionTimeoutSec(value: number): void;

  getUserId(): string;
  setUserId(value: string): void;

  getClientDataMap(): jspb.Map<string, string>;
  clearClientDataMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StartRequest): StartRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartRequest;
  static deserializeBinaryFromReader(message: StartRequest, reader: jspb.BinaryReader): StartRequest;
}

export namespace StartRequest {
  export type AsObject = {
    sessionId: string,
    selector?: nuance_dlg_v1_common_dlg_common_messages_pb.Selector.AsObject,
    payload?: nuance_dlg_v1_common_dlg_common_messages_pb.StartRequestPayload.AsObject,
    sessionTimeoutSec: number,
    userId: string,
    clientDataMap: Array<[string, string]>,
  }
}

export class StartResponse extends jspb.Message {
  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): nuance_dlg_v1_common_dlg_common_messages_pb.StartResponsePayload | undefined;
  setPayload(value?: nuance_dlg_v1_common_dlg_common_messages_pb.StartResponsePayload): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StartResponse): StartResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartResponse;
  static deserializeBinaryFromReader(message: StartResponse, reader: jspb.BinaryReader): StartResponse;
}

export namespace StartResponse {
  export type AsObject = {
    payload?: nuance_dlg_v1_common_dlg_common_messages_pb.StartResponsePayload.AsObject,
  }
}

export class UpdateRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): void;

  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): nuance_dlg_v1_common_dlg_common_messages_pb.UpdateRequestPayload | undefined;
  setPayload(value?: nuance_dlg_v1_common_dlg_common_messages_pb.UpdateRequestPayload): void;

  getClientDataMap(): jspb.Map<string, string>;
  clearClientDataMap(): void;
  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRequest): UpdateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRequest;
  static deserializeBinaryFromReader(message: UpdateRequest, reader: jspb.BinaryReader): UpdateRequest;
}

export namespace UpdateRequest {
  export type AsObject = {
    sessionId: string,
    payload?: nuance_dlg_v1_common_dlg_common_messages_pb.UpdateRequestPayload.AsObject,
    clientDataMap: Array<[string, string]>,
    userId: string,
  }
}

export class UpdateResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateResponse): UpdateResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateResponse;
  static deserializeBinaryFromReader(message: UpdateResponse, reader: jspb.BinaryReader): UpdateResponse;
}

export namespace UpdateResponse {
  export type AsObject = {
  }
}

export class ExecuteRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): void;

  hasSelector(): boolean;
  clearSelector(): void;
  getSelector(): nuance_dlg_v1_common_dlg_common_messages_pb.Selector | undefined;
  setSelector(value?: nuance_dlg_v1_common_dlg_common_messages_pb.Selector): void;

  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): nuance_dlg_v1_common_dlg_common_messages_pb.ExecuteRequestPayload | undefined;
  setPayload(value?: nuance_dlg_v1_common_dlg_common_messages_pb.ExecuteRequestPayload): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteRequest): ExecuteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExecuteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteRequest;
  static deserializeBinaryFromReader(message: ExecuteRequest, reader: jspb.BinaryReader): ExecuteRequest;
}

export namespace ExecuteRequest {
  export type AsObject = {
    sessionId: string,
    selector?: nuance_dlg_v1_common_dlg_common_messages_pb.Selector.AsObject,
    payload?: nuance_dlg_v1_common_dlg_common_messages_pb.ExecuteRequestPayload.AsObject,
    userId: string,
  }
}

export class AsrParamsV1 extends jspb.Message {
  hasAudioFormat(): boolean;
  clearAudioFormat(): void;
  getAudioFormat(): nuance_asr_v1_recognizer_pb.AudioFormat | undefined;
  setAudioFormat(value?: nuance_asr_v1_recognizer_pb.AudioFormat): void;

  getUtteranceDetectionMode(): nuance_asr_v1_recognizer_pb.EnumUtteranceDetectionModeMap[keyof nuance_asr_v1_recognizer_pb.EnumUtteranceDetectionModeMap];
  setUtteranceDetectionMode(value: nuance_asr_v1_recognizer_pb.EnumUtteranceDetectionModeMap[keyof nuance_asr_v1_recognizer_pb.EnumUtteranceDetectionModeMap]): void;

  hasRecognitionFlags(): boolean;
  clearRecognitionFlags(): void;
  getRecognitionFlags(): nuance_asr_v1_recognizer_pb.RecognitionFlags | undefined;
  setRecognitionFlags(value?: nuance_asr_v1_recognizer_pb.RecognitionFlags): void;

  getResultType(): nuance_asr_v1_result_pb.EnumResultTypeMap[keyof nuance_asr_v1_result_pb.EnumResultTypeMap];
  setResultType(value: nuance_asr_v1_result_pb.EnumResultTypeMap[keyof nuance_asr_v1_result_pb.EnumResultTypeMap]): void;

  getNoInputTimeoutMs(): number;
  setNoInputTimeoutMs(value: number): void;

  getRecognitionTimeoutMs(): number;
  setRecognitionTimeoutMs(value: number): void;

  getUtteranceEndSilenceMs(): number;
  setUtteranceEndSilenceMs(value: number): void;

  hasSpeechDetectionSensitivity(): boolean;
  clearSpeechDetectionSensitivity(): void;
  getSpeechDetectionSensitivity(): number;
  setSpeechDetectionSensitivity(value: number): void;

  getMaxHypotheses(): number;
  setMaxHypotheses(value: number): void;

  getEndStreamNoValidHypotheses(): boolean;
  setEndStreamNoValidHypotheses(value: boolean): void;

  clearResourcesList(): void;
  getResourcesList(): Array<nuance_asr_v1_resource_pb.RecognitionResource>;
  setResourcesList(value: Array<nuance_asr_v1_resource_pb.RecognitionResource>): void;
  addResources(value?: nuance_asr_v1_resource_pb.RecognitionResource, index?: number): nuance_asr_v1_resource_pb.RecognitionResource;

  getSpeechDomain(): string;
  setSpeechDomain(value: string): void;

  hasFormatting(): boolean;
  clearFormatting(): void;
  getFormatting(): nuance_asr_v1_recognizer_pb.Formatting | undefined;
  setFormatting(value?: nuance_asr_v1_recognizer_pb.Formatting): void;

  getOptionalSpeechDetectionSensitivityCase(): AsrParamsV1.OptionalSpeechDetectionSensitivityCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AsrParamsV1.AsObject;
  static toObject(includeInstance: boolean, msg: AsrParamsV1): AsrParamsV1.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AsrParamsV1, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AsrParamsV1;
  static deserializeBinaryFromReader(message: AsrParamsV1, reader: jspb.BinaryReader): AsrParamsV1;
}

export namespace AsrParamsV1 {
  export type AsObject = {
    audioFormat?: nuance_asr_v1_recognizer_pb.AudioFormat.AsObject,
    utteranceDetectionMode: nuance_asr_v1_recognizer_pb.EnumUtteranceDetectionModeMap[keyof nuance_asr_v1_recognizer_pb.EnumUtteranceDetectionModeMap],
    recognitionFlags?: nuance_asr_v1_recognizer_pb.RecognitionFlags.AsObject,
    resultType: nuance_asr_v1_result_pb.EnumResultTypeMap[keyof nuance_asr_v1_result_pb.EnumResultTypeMap],
    noInputTimeoutMs: number,
    recognitionTimeoutMs: number,
    utteranceEndSilenceMs: number,
    speechDetectionSensitivity: number,
    maxHypotheses: number,
    endStreamNoValidHypotheses: boolean,
    resourcesList: Array<nuance_asr_v1_resource_pb.RecognitionResource.AsObject>,
    speechDomain: string,
    formatting?: nuance_asr_v1_recognizer_pb.Formatting.AsObject,
  }

  export enum OptionalSpeechDetectionSensitivityCase {
    OPTIONAL_SPEECH_DETECTION_SENSITIVITY_NOT_SET = 0,
    SPEECH_DETECTION_SENSITIVITY = 8,
  }
}

export class TtsParamsV1 extends jspb.Message {
  hasAudioParams(): boolean;
  clearAudioParams(): void;
  getAudioParams(): nuance_tts_v1_nuance_tts_v1_pb.AudioParameters | undefined;
  setAudioParams(value?: nuance_tts_v1_nuance_tts_v1_pb.AudioParameters): void;

  hasVoice(): boolean;
  clearVoice(): void;
  getVoice(): nuance_tts_v1_nuance_tts_v1_pb.Voice | undefined;
  setVoice(value?: nuance_tts_v1_nuance_tts_v1_pb.Voice): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TtsParamsV1.AsObject;
  static toObject(includeInstance: boolean, msg: TtsParamsV1): TtsParamsV1.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TtsParamsV1, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TtsParamsV1;
  static deserializeBinaryFromReader(message: TtsParamsV1, reader: jspb.BinaryReader): TtsParamsV1;
}

export namespace TtsParamsV1 {
  export type AsObject = {
    audioParams?: nuance_tts_v1_nuance_tts_v1_pb.AudioParameters.AsObject,
    voice?: nuance_tts_v1_nuance_tts_v1_pb.Voice.AsObject,
  }
}

export class ExecuteResponse extends jspb.Message {
  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): nuance_dlg_v1_common_dlg_common_messages_pb.ExecuteResponsePayload | undefined;
  setPayload(value?: nuance_dlg_v1_common_dlg_common_messages_pb.ExecuteResponsePayload): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteResponse): ExecuteResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExecuteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteResponse;
  static deserializeBinaryFromReader(message: ExecuteResponse, reader: jspb.BinaryReader): ExecuteResponse;
}

export namespace ExecuteResponse {
  export type AsObject = {
    payload?: nuance_dlg_v1_common_dlg_common_messages_pb.ExecuteResponsePayload.AsObject,
  }
}

export class StopRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StopRequest): StopRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StopRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopRequest;
  static deserializeBinaryFromReader(message: StopRequest, reader: jspb.BinaryReader): StopRequest;
}

export namespace StopRequest {
  export type AsObject = {
    sessionId: string,
    userId: string,
  }
}

export class StopResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StopResponse): StopResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StopResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopResponse;
  static deserializeBinaryFromReader(message: StopResponse, reader: jspb.BinaryReader): StopResponse;
}

export namespace StopResponse {
  export type AsObject = {
  }
}

export class StatusRequest extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StatusRequest): StatusRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StatusRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusRequest;
  static deserializeBinaryFromReader(message: StatusRequest, reader: jspb.BinaryReader): StatusRequest;
}

export namespace StatusRequest {
  export type AsObject = {
    sessionId: string,
  }
}

export class StatusResponse extends jspb.Message {
  getSessionRemainingSec(): number;
  setSessionRemainingSec(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StatusResponse): StatusResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusResponse;
  static deserializeBinaryFromReader(message: StatusResponse, reader: jspb.BinaryReader): StatusResponse;
}

export namespace StatusResponse {
  export type AsObject = {
    sessionRemainingSec: number,
  }
}

