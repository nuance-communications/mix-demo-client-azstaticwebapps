// package: nuance.asr.v1
// file: nuance/asr/v1/recognizer.proto

import * as jspb from "google-protobuf";
import * as nuance_asr_v1_resource_pb from "../../../nuance/asr/v1/resource_pb";
import * as nuance_asr_v1_result_pb from "../../../nuance/asr/v1/result_pb";

export class RecognitionRequest extends jspb.Message {
  hasRecognitionInitMessage(): boolean;
  clearRecognitionInitMessage(): void;
  getRecognitionInitMessage(): RecognitionInitMessage | undefined;
  setRecognitionInitMessage(value?: RecognitionInitMessage): void;

  hasControlMessage(): boolean;
  clearControlMessage(): void;
  getControlMessage(): ControlMessage | undefined;
  setControlMessage(value?: ControlMessage): void;

  hasAudio(): boolean;
  clearAudio(): void;
  getAudio(): Uint8Array | string;
  getAudio_asU8(): Uint8Array;
  getAudio_asB64(): string;
  setAudio(value: Uint8Array | string): void;

  getRequestUnionCase(): RecognitionRequest.RequestUnionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecognitionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RecognitionRequest): RecognitionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RecognitionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecognitionRequest;
  static deserializeBinaryFromReader(message: RecognitionRequest, reader: jspb.BinaryReader): RecognitionRequest;
}

export namespace RecognitionRequest {
  export type AsObject = {
    recognitionInitMessage?: RecognitionInitMessage.AsObject,
    controlMessage?: ControlMessage.AsObject,
    audio: Uint8Array | string,
  }

  export enum RequestUnionCase {
    REQUEST_UNION_NOT_SET = 0,
    RECOGNITION_INIT_MESSAGE = 1,
    CONTROL_MESSAGE = 2,
    AUDIO = 3,
  }
}

export class RecognitionInitMessage extends jspb.Message {
  hasParameters(): boolean;
  clearParameters(): void;
  getParameters(): RecognitionParameters | undefined;
  setParameters(value?: RecognitionParameters): void;

  clearResourcesList(): void;
  getResourcesList(): Array<nuance_asr_v1_resource_pb.RecognitionResource>;
  setResourcesList(value: Array<nuance_asr_v1_resource_pb.RecognitionResource>): void;
  addResources(value?: nuance_asr_v1_resource_pb.RecognitionResource, index?: number): nuance_asr_v1_resource_pb.RecognitionResource;

  getClientDataMap(): jspb.Map<string, string>;
  clearClientDataMap(): void;
  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecognitionInitMessage.AsObject;
  static toObject(includeInstance: boolean, msg: RecognitionInitMessage): RecognitionInitMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RecognitionInitMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecognitionInitMessage;
  static deserializeBinaryFromReader(message: RecognitionInitMessage, reader: jspb.BinaryReader): RecognitionInitMessage;
}

export namespace RecognitionInitMessage {
  export type AsObject = {
    parameters?: RecognitionParameters.AsObject,
    resourcesList: Array<nuance_asr_v1_resource_pb.RecognitionResource.AsObject>,
    clientDataMap: Array<[string, string]>,
    userId: string,
  }
}

export class RecognitionParameters extends jspb.Message {
  getLanguage(): string;
  setLanguage(value: string): void;

  getTopic(): string;
  setTopic(value: string): void;

  hasAudioFormat(): boolean;
  clearAudioFormat(): void;
  getAudioFormat(): AudioFormat | undefined;
  setAudioFormat(value?: AudioFormat): void;

  getUtteranceDetectionMode(): EnumUtteranceDetectionModeMap[keyof EnumUtteranceDetectionModeMap];
  setUtteranceDetectionMode(value: EnumUtteranceDetectionModeMap[keyof EnumUtteranceDetectionModeMap]): void;

  getResultType(): nuance_asr_v1_result_pb.EnumResultTypeMap[keyof nuance_asr_v1_result_pb.EnumResultTypeMap];
  setResultType(value: nuance_asr_v1_result_pb.EnumResultTypeMap[keyof nuance_asr_v1_result_pb.EnumResultTypeMap]): void;

  hasRecognitionFlags(): boolean;
  clearRecognitionFlags(): void;
  getRecognitionFlags(): RecognitionFlags | undefined;
  setRecognitionFlags(value?: RecognitionFlags): void;

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

  getSpeechDomain(): string;
  setSpeechDomain(value: string): void;

  hasFormatting(): boolean;
  clearFormatting(): void;
  getFormatting(): Formatting | undefined;
  setFormatting(value?: Formatting): void;

  getOptionalSpeechDetectionSensitivityCase(): RecognitionParameters.OptionalSpeechDetectionSensitivityCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecognitionParameters.AsObject;
  static toObject(includeInstance: boolean, msg: RecognitionParameters): RecognitionParameters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RecognitionParameters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecognitionParameters;
  static deserializeBinaryFromReader(message: RecognitionParameters, reader: jspb.BinaryReader): RecognitionParameters;
}

export namespace RecognitionParameters {
  export type AsObject = {
    language: string,
    topic: string,
    audioFormat?: AudioFormat.AsObject,
    utteranceDetectionMode: EnumUtteranceDetectionModeMap[keyof EnumUtteranceDetectionModeMap],
    resultType: nuance_asr_v1_result_pb.EnumResultTypeMap[keyof nuance_asr_v1_result_pb.EnumResultTypeMap],
    recognitionFlags?: RecognitionFlags.AsObject,
    noInputTimeoutMs: number,
    recognitionTimeoutMs: number,
    utteranceEndSilenceMs: number,
    speechDetectionSensitivity: number,
    maxHypotheses: number,
    speechDomain: string,
    formatting?: Formatting.AsObject,
  }

  export enum OptionalSpeechDetectionSensitivityCase {
    OPTIONAL_SPEECH_DETECTION_SENSITIVITY_NOT_SET = 0,
    SPEECH_DETECTION_SENSITIVITY = 10,
  }
}

export class AudioFormat extends jspb.Message {
  hasPcm(): boolean;
  clearPcm(): void;
  getPcm(): PCM | undefined;
  setPcm(value?: PCM): void;

  hasAlaw(): boolean;
  clearAlaw(): void;
  getAlaw(): ALaw | undefined;
  setAlaw(value?: ALaw): void;

  hasUlaw(): boolean;
  clearUlaw(): void;
  getUlaw(): ULaw | undefined;
  setUlaw(value?: ULaw): void;

  hasOpus(): boolean;
  clearOpus(): void;
  getOpus(): Opus | undefined;
  setOpus(value?: Opus): void;

  hasOggOpus(): boolean;
  clearOggOpus(): void;
  getOggOpus(): OggOpus | undefined;
  setOggOpus(value?: OggOpus): void;

  getAudioFormatUnionCase(): AudioFormat.AudioFormatUnionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AudioFormat.AsObject;
  static toObject(includeInstance: boolean, msg: AudioFormat): AudioFormat.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AudioFormat, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AudioFormat;
  static deserializeBinaryFromReader(message: AudioFormat, reader: jspb.BinaryReader): AudioFormat;
}

export namespace AudioFormat {
  export type AsObject = {
    pcm?: PCM.AsObject,
    alaw?: ALaw.AsObject,
    ulaw?: ULaw.AsObject,
    opus?: Opus.AsObject,
    oggOpus?: OggOpus.AsObject,
  }

  export enum AudioFormatUnionCase {
    AUDIO_FORMAT_UNION_NOT_SET = 0,
    PCM = 1,
    ALAW = 2,
    ULAW = 3,
    OPUS = 4,
    OGG_OPUS = 5,
  }
}

export class PCM extends jspb.Message {
  getSampleRateHz(): number;
  setSampleRateHz(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PCM.AsObject;
  static toObject(includeInstance: boolean, msg: PCM): PCM.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PCM, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PCM;
  static deserializeBinaryFromReader(message: PCM, reader: jspb.BinaryReader): PCM;
}

export namespace PCM {
  export type AsObject = {
    sampleRateHz: number,
  }
}

export class ALaw extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ALaw.AsObject;
  static toObject(includeInstance: boolean, msg: ALaw): ALaw.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ALaw, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ALaw;
  static deserializeBinaryFromReader(message: ALaw, reader: jspb.BinaryReader): ALaw;
}

export namespace ALaw {
  export type AsObject = {
  }
}

export class ULaw extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ULaw.AsObject;
  static toObject(includeInstance: boolean, msg: ULaw): ULaw.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ULaw, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ULaw;
  static deserializeBinaryFromReader(message: ULaw, reader: jspb.BinaryReader): ULaw;
}

export namespace ULaw {
  export type AsObject = {
  }
}

export class Opus extends jspb.Message {
  getDecodeRateHz(): number;
  setDecodeRateHz(value: number): void;

  getPreskipSamples(): number;
  setPreskipSamples(value: number): void;

  getSourceRateHz(): number;
  setSourceRateHz(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Opus.AsObject;
  static toObject(includeInstance: boolean, msg: Opus): Opus.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Opus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Opus;
  static deserializeBinaryFromReader(message: Opus, reader: jspb.BinaryReader): Opus;
}

export namespace Opus {
  export type AsObject = {
    decodeRateHz: number,
    preskipSamples: number,
    sourceRateHz: number,
  }
}

export class OggOpus extends jspb.Message {
  getDecodeRateHz(): number;
  setDecodeRateHz(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OggOpus.AsObject;
  static toObject(includeInstance: boolean, msg: OggOpus): OggOpus.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OggOpus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OggOpus;
  static deserializeBinaryFromReader(message: OggOpus, reader: jspb.BinaryReader): OggOpus;
}

export namespace OggOpus {
  export type AsObject = {
    decodeRateHz: number,
  }
}

export class RecognitionFlags extends jspb.Message {
  getAutoPunctuate(): boolean;
  setAutoPunctuate(value: boolean): void;

  getFilterProfanity(): boolean;
  setFilterProfanity(value: boolean): void;

  getIncludeTokenization(): boolean;
  setIncludeTokenization(value: boolean): void;

  getStallTimers(): boolean;
  setStallTimers(value: boolean): void;

  getDiscardSpeakerAdaptation(): boolean;
  setDiscardSpeakerAdaptation(value: boolean): void;

  getSuppressCallRecording(): boolean;
  setSuppressCallRecording(value: boolean): void;

  getMaskLoadFailures(): boolean;
  setMaskLoadFailures(value: boolean): void;

  getSuppressInitialCapitalization(): boolean;
  setSuppressInitialCapitalization(value: boolean): void;

  getAllowZeroBaseLmWeight(): boolean;
  setAllowZeroBaseLmWeight(value: boolean): void;

  getFilterWakeupWord(): boolean;
  setFilterWakeupWord(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecognitionFlags.AsObject;
  static toObject(includeInstance: boolean, msg: RecognitionFlags): RecognitionFlags.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RecognitionFlags, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecognitionFlags;
  static deserializeBinaryFromReader(message: RecognitionFlags, reader: jspb.BinaryReader): RecognitionFlags;
}

export namespace RecognitionFlags {
  export type AsObject = {
    autoPunctuate: boolean,
    filterProfanity: boolean,
    includeTokenization: boolean,
    stallTimers: boolean,
    discardSpeakerAdaptation: boolean,
    suppressCallRecording: boolean,
    maskLoadFailures: boolean,
    suppressInitialCapitalization: boolean,
    allowZeroBaseLmWeight: boolean,
    filterWakeupWord: boolean,
  }
}

export class Formatting extends jspb.Message {
  getScheme(): string;
  setScheme(value: string): void;

  getOptionsMap(): jspb.Map<string, boolean>;
  clearOptionsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Formatting.AsObject;
  static toObject(includeInstance: boolean, msg: Formatting): Formatting.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Formatting, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Formatting;
  static deserializeBinaryFromReader(message: Formatting, reader: jspb.BinaryReader): Formatting;
}

export namespace Formatting {
  export type AsObject = {
    scheme: string,
    optionsMap: Array<[string, boolean]>,
  }
}

export class ControlMessage extends jspb.Message {
  hasStartTimersMessage(): boolean;
  clearStartTimersMessage(): void;
  getStartTimersMessage(): StartTimersControlMessage | undefined;
  setStartTimersMessage(value?: StartTimersControlMessage): void;

  getControlMessageUnionCase(): ControlMessage.ControlMessageUnionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ControlMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ControlMessage): ControlMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ControlMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ControlMessage;
  static deserializeBinaryFromReader(message: ControlMessage, reader: jspb.BinaryReader): ControlMessage;
}

export namespace ControlMessage {
  export type AsObject = {
    startTimersMessage?: StartTimersControlMessage.AsObject,
  }

  export enum ControlMessageUnionCase {
    CONTROL_MESSAGE_UNION_NOT_SET = 0,
    START_TIMERS_MESSAGE = 1,
  }
}

export class StartTimersControlMessage extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartTimersControlMessage.AsObject;
  static toObject(includeInstance: boolean, msg: StartTimersControlMessage): StartTimersControlMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartTimersControlMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartTimersControlMessage;
  static deserializeBinaryFromReader(message: StartTimersControlMessage, reader: jspb.BinaryReader): StartTimersControlMessage;
}

export namespace StartTimersControlMessage {
  export type AsObject = {
  }
}

export class RecognitionResponse extends jspb.Message {
  hasStatus(): boolean;
  clearStatus(): void;
  getStatus(): Status | undefined;
  setStatus(value?: Status): void;

  hasStartOfSpeech(): boolean;
  clearStartOfSpeech(): void;
  getStartOfSpeech(): StartOfSpeech | undefined;
  setStartOfSpeech(value?: StartOfSpeech): void;

  hasResult(): boolean;
  clearResult(): void;
  getResult(): nuance_asr_v1_result_pb.Result | undefined;
  setResult(value?: nuance_asr_v1_result_pb.Result): void;

  getResponseUnionCase(): RecognitionResponse.ResponseUnionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecognitionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RecognitionResponse): RecognitionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RecognitionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecognitionResponse;
  static deserializeBinaryFromReader(message: RecognitionResponse, reader: jspb.BinaryReader): RecognitionResponse;
}

export namespace RecognitionResponse {
  export type AsObject = {
    status?: Status.AsObject,
    startOfSpeech?: StartOfSpeech.AsObject,
    result?: nuance_asr_v1_result_pb.Result.AsObject,
  }

  export enum ResponseUnionCase {
    RESPONSE_UNION_NOT_SET = 0,
    STATUS = 1,
    START_OF_SPEECH = 2,
    RESULT = 3,
  }
}

export class Status extends jspb.Message {
  getCode(): number;
  setCode(value: number): void;

  getMessage(): string;
  setMessage(value: string): void;

  getDetails(): string;
  setDetails(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Status.AsObject;
  static toObject(includeInstance: boolean, msg: Status): Status.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Status, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Status;
  static deserializeBinaryFromReader(message: Status, reader: jspb.BinaryReader): Status;
}

export namespace Status {
  export type AsObject = {
    code: number,
    message: string,
    details: string,
  }
}

export class StartOfSpeech extends jspb.Message {
  getFirstAudioToStartOfSpeechMs(): number;
  setFirstAudioToStartOfSpeechMs(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartOfSpeech.AsObject;
  static toObject(includeInstance: boolean, msg: StartOfSpeech): StartOfSpeech.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartOfSpeech, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartOfSpeech;
  static deserializeBinaryFromReader(message: StartOfSpeech, reader: jspb.BinaryReader): StartOfSpeech;
}

export namespace StartOfSpeech {
  export type AsObject = {
    firstAudioToStartOfSpeechMs: number,
  }
}

export interface EnumUtteranceDetectionModeMap {
  SINGLE: 0;
  MULTIPLE: 1;
  DISABLED: 2;
}

export const EnumUtteranceDetectionMode: EnumUtteranceDetectionModeMap;

